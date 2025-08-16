import prisma from '../prismaClient.js';

export const vote = async (req, res) => {
  const { threadId, replyId, value } = req.body;
  const userId = req.user.userId;

  if (![1, -1].includes(value)) {
    return res.status(400).json({ error: 'Vote value must be 1 or -1' });
  }
  if (!threadId && !replyId) {
    return res.status(400).json({ error: 'threadId or replyId is required' });
  }

  try {
    let vote, counts;
    if (threadId) {
      vote = await prisma.vote.upsert({
        where: {
          userId_threadId: { userId, threadId },
        },
        update: { value },
        create: { userId, threadId, value },
      });
      counts = {
        upvotes: await prisma.vote.count({ where: { threadId, value: 1 } }),
        downvotes: await prisma.vote.count({ where: { threadId, value: -1 } }),
      };
    } else {
      vote = await prisma.vote.upsert({
        where: {
          userId_replyId: { userId, replyId },
        },
        update: { value },
        create: { userId, replyId, value },
      });
      counts = {
        upvotes: await prisma.vote.count({ where: { replyId, value: 1 } }),
        downvotes: await prisma.vote.count({ where: { replyId, value: -1 } }),
      };
    }

    res.json({ vote, ...counts });
  } catch (err) {
    res.status(500).json({ error: 'Voting failed', details: err.message });
  }
};
