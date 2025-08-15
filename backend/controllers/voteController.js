import prisma from "../prismaClient.js";

export const voteThread = async (req, res) => {
  const { threadId, value } = req.body;
  const userId = req.user.userId;

  if (![1, -1].includes(value)) {
    return res.status(400).json({ error: "Invalid vote value" });
  }

  try {
    const vote = await prisma.vote.upsert({
      where: {
        userId_threadId: { userId, threadId },
      },
      update: { value },
      create: { userId, threadId, value },
    });

    const upvotes = await prisma.vote.count({ where: { threadId, value: 1 } });
    const downvotes = await prisma.vote.count({ where: { threadId, value: -1 } });

    res.json({ vote, upvotes, downvotes });
  } catch (err) {
    res.status(500).json({ error: "Voting failed" });
    console.log(err);
  }
};
