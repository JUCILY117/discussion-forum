import prisma from '../utils/prismaClient.js';
import { FilterService } from '../services/filterService.js';

export const createThread = async (req, res) => {
  const { title, description, categoryId } = req.body;
  const authorId = req.user.userId;

  try {
    const thread = await prisma.thread.create({
      data: { title, description, authorId, categoryId },
    });
    res.status(201).json(thread);
  } catch (err) {
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
      include: { author: { select: { id: true, name: true } } },
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