import prisma from '../utils/prismaClient.js';

export const createReply = async (req, res) => {
  const { threadId, content, parentReplyId } = req.body;
  const authorId = req.user.userId;

  if (!threadId || !content) {
    return res.status(400).json({ error: 'Thread ID and content required' });
  }

  try {
    const reply = await prisma.reply.create({
      data: {
        content,
        authorId,
        threadId,
        parentReplyId: parentReplyId || null
      },
    });
    res.status(201).json(reply);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create reply' });
  }
};

export const getRepliesForThread = async (req, res) => {
  const { threadId } = req.params;
  try {
    const replies = await prisma.reply.findMany({
      where: { threadId: parseInt(threadId), parentReplyId: null },
      include: {
        author: { select: { id: true, name: true } },
        childReplies: {
          include: { author: { select: { id: true, name: true } } }
        },
        votes: true
      },
      orderBy: { createdAt: 'asc' }
    });
    res.json(replies);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch replies' });
  }
};

export const deleteReply = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.userId;

  try {
    const reply = await prisma.reply.findUnique({ where: { id: parseInt(id) } });
    if (!reply) return res.status(404).json({ error: 'Reply not found' });
    if (reply.authorId !== userId) return res.status(403).json({ error: 'Forbidden' });

    await prisma.reply.delete({ where: { id: parseInt(id) } });
    res.json({ message: 'Reply deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete reply' });
  }
};