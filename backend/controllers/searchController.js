import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const searchThreads = async (req, res) => {
  try {
    const { q, filter, category, tags } = req.query;

    let whereClause = {};

    if (q) {
      whereClause.OR = [
        { title: { contains: q, mode: 'insensitive' } },
        { description: { contains: q, mode: 'insensitive' } }
      ];
    }

    if (category) {
      whereClause.category = {
        name: { equals: category, mode: 'insensitive' }
      };
    }

    if (tags) {
      const tagArray = tags.split(',');
      whereClause.tags = {
        some: {
          tag: {
            name: { in: tagArray, mode: 'insensitive' }
          }
        }
      };
    }

    let orderByClause = { createdAt: 'desc' };
    if (filter === 'recent') {
      orderByClause = { createdAt: 'desc' };
    } else if (filter === 'upvoted') {
      orderByClause = {
        votes: {
          _count: 'desc'
        }
      };
    }

    const threads = await prisma.thread.findMany({
      where: whereClause,
      include: {
        author: { select: { id: true, name: true } },
        category: true,
        tags: {
          include: { tag: true }
        },
        _count: {
          select: { votes: true, replies: true }
        }
      },
      orderBy: orderByClause
    });

    res.json(threads);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong while searching threads' });
  }
};
