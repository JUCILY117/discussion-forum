import prisma from '../utils/prismaClient.js';
import { getIO } from '../utils/socketServer.js';

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
    let existingVote;

    if (threadId) {
      existingVote = await prisma.vote.findUnique({
        where: {
          userId_threadId: { userId, threadId },
        },
      });

      if (existingVote && existingVote.value === value) {
        await prisma.vote.delete({
          where: { id: existingVote.id },
        });
      } else if (existingVote) {
        await prisma.vote.update({
          where: { id: existingVote.id },
          data: { value },
        });
      } else {
        await prisma.vote.create({
          data: { userId, threadId, value },
        });
      }

      const counts = {
        upvotes: await prisma.vote.count({ where: { threadId, value: 1 } }),
        downvotes: await prisma.vote.count({ where: { threadId, value: -1 } }),
      };

      res.json({ upvotes: counts.upvotes, downvotes: counts.downvotes });

      getIO().emit('thread-voted', { threadId, ...counts });

    } else {
      existingVote = await prisma.vote.findUnique({
        where: {
          userId_replyId: { userId, replyId },
        },
      });

      if (existingVote && existingVote.value === value) {
        await prisma.vote.delete({
          where: { id: existingVote.id },
        });
      } else if (existingVote) {
        await prisma.vote.update({
          where: { id: existingVote.id },
          data: { value },
        });
      } else {
        await prisma.vote.create({
          data: { userId, replyId, value },
        });
      }

      const counts = {
        upvotes: await prisma.vote.count({ where: { replyId, value: 1 } }),
        downvotes: await prisma.vote.count({ where: { replyId, value: -1 } }),
      };

      res.json({ upvotes: counts.upvotes, downvotes: counts.downvotes });

      getIO().emit('reply-voted', { replyId, ...counts });
    }
  } catch (err) {
    res.status(500).json({ error: 'Voting failed', details: err.message });
  }
};
