import prisma from '../utils/prismaClient.js';
import { FilterService } from '../services/filterService.js';

export const createThread = async (req, res) => {
  const { title, description, categoryId, tagNames = [] } = req.body;
  const authorId = req.user.userId;

  try {
    const thread = await prisma.thread.create({
      data: { title, description, authorId, categoryId },
    });

    if (tagNames.length > 0) {
      const tagRecords = await Promise.all(
        tagNames.map(async (name) => {
          const normalized = name.trim().toLowerCase();

          let existing = await prisma.tag.findFirst({
            where: { name: { equals: normalized, mode: 'insensitive' } }
          });
          if (!existing) {
            existing = await prisma.tag.create({ data: { name: normalized } });
          }
          return existing;
        })
      );

      const threadTagLinks = tagRecords.map(tag => ({
        threadId: thread.id,
        tagId: tag.id,
      }));

      await prisma.threadTag.createMany({
        data: threadTagLinks,
        skipDuplicates: true,
      });
    }

    const createdThreadWithTags = await prisma.thread.findUnique({
      where: { id: thread.id },
      include: {
        author: { select: { id: true, username: true } },
        category: { select: { id: true, name: true } },
        tags: { include: { tag: true } },
      },
    });

    res.status(201).json(createdThreadWithTags);
  } catch (err) {
    console.error('Failed to create thread:', err);
    res.status(500).json({ error: 'Failed to create thread' });
  }
};

export const getThreads = async (req, res) => {
  try {
    const threads = await FilterService.getFilteredThreads(req.query);
    res.json(threads);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch threads' });
  }
};

export const getThreadById = async (req, res) => {
  const { id } = req.params;
  try {
    const thread = await prisma.thread.findUnique({
      where: { id: parseInt(id) },
      include: { author: { select: { id: true, username: true } }, votes: true, tags: { include: { tag: true } }, category: true },
    });
    if (!thread) return res.status(404).json({ error: 'Thread not found' });
    res.json(thread);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch thread' });
  }
};

export const deleteThread = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.userId;

  try {
    const thread = await prisma.thread.findUnique({ where: { id: parseInt(id) } });
    if (!thread) return res.status(404).json({ error: 'Thread not found' });

    if (thread.authorId !== userId) {
      return res.status(403).json({ error: 'You are not allowed to delete this thread' });
    }

    await prisma.thread.delete({ where: { id: parseInt(id) } });
    res.json({ message: 'Thread deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete thread' });
  }
};

export const addTagToThread = async (req, res) => {
  const { id } = req.params;
  const { tagName } = req.body;
  
  if (!tagName) return res.status(400).json({ error: 'Missing tagName' });

  try {
    const normalized = tagName.trim().toLowerCase();

    const thread = await prisma.thread.findUnique({ where: { id: parseInt(id) } });
    if (!thread) return res.status(404).json({ error: 'Thread not found' });

    let tag = await prisma.tag.findFirst({
      where: { name: { equals: normalized, mode: 'insensitive' } }
    });
    if (!tag) {
      tag = await prisma.tag.create({ data: { name: normalized } });
    }

    const alreadyAssigned = await prisma.threadTag.findUnique({
      where: {
        threadId_tagId: {
          threadId: thread.id,
          tagId: tag.id,
        },
      },
    });

    if (alreadyAssigned) {
      return res.status(200).json({ message: "Tag already associated with thread", tag });
    }

    await prisma.threadTag.create({
      data: {
        threadId: thread.id,
        tagId: tag.id,
      },
    });

    res.status(201).json({ message: 'Tag associated with thread', tag });
  } catch (err) {
    console.error('Failed to add tag:', err);
    res.status(500).json({ error: 'Failed to add tag to thread' });
  }
};

export const removeTagFromThread = async (req, res) => {
  const { id, tagId } = req.params;

  try {
    const existing = await prisma.threadTag.findUnique({
      where: {
        threadId_tagId: {
          threadId: parseInt(id),
          tagId: parseInt(tagId),
        },
      },
    });

    if (!existing) return res.status(404).json({ error: 'Tag association not found' });

    await prisma.threadTag.delete({
      where: { id: existing.id },
    });

    res.json({ message: 'Tag removed from thread' });
  } catch (err) {
    console.error('Failed to remove tag:', err);
    res.status(500).json({ error: 'Failed to remove tag from thread' });
  }
};