const prisma = require('../prismaClient.js');

const createThread = async (req, res) => {
  const { title, description } = req.body;
  const authorId = req.user.userId;

  try {
    const thread = await prisma.thread.create({
      data: { title, description, authorId },
    });
    res.status(201).json(thread);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create thread' });
  }
};

const getThreads = async (req, res) => {
  try {
    const threads = await prisma.thread.findMany({
      orderBy: { createdAt: 'desc' },
      include: { author: { select: { id: true, name: true } } },
    });
    res.json(threads);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch threads' });
  }
};

const getThreadById = async (req, res) => {
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

const deleteThread = async (req, res) => {
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

module.exports = {
  createThread,
  getThreads,
  getThreadById,
  deleteThread
};
