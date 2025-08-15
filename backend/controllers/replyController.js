import prisma from "../prismaClient.js";

export const createReply = async (req, res) => {
  try {
    const { content, threadId, parentId } = req.body;

    if (!content || !threadId) {
      return res.status(400).json({ error: "Content and threadId are required" });
    }

    const reply = await prisma.reply.create({
      data: {
        content,
        authorId: req.user.userId, // from authMiddleware
        threadId,
        parentId: parentId || null,
      },
    });

    res.status(201).json(reply);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong while creating reply" });
  }
};

export const getRepliesByThread = async (req, res) => {
  try {
    const { threadId } = req.params;

    const replies = await prisma.reply.findMany({
      where: { threadId: parseInt(threadId) },
      include: {
        author: { select: { id: true, name: true, email: true } },
        children: true,
      },
    });

    res.json(replies);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching replies" });
  }
};

export const deleteReply = async (req, res) => {
  try {
    const { id } = req.params;

    const reply = await prisma.reply.findUnique({ where: { id: parseInt(id) } });

    if (!reply) {
      return res.status(404).json({ error: "Reply not found" });
    }

    if (reply.authorId !== req.user.userId) {
      return res.status(403).json({ error: "Not authorized to delete this reply" });
    }

    await prisma.reply.delete({ where: { id: parseInt(id) } });

    res.json({ message: "Reply deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error deleting reply" });
  }
};
