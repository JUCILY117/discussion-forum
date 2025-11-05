import prisma from '../utils/prismaClient.js';

export const searchThreads = async (req, res) => {
  try {
    const { q, filter, category, tags, page = 1, limit = 10 } = req.query;

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
      orderByClause = { votes: { _count: 'desc' } };
    } else if (filter === 'discussed') {
      orderByClause = { replies: { _count: 'desc' } };
    }

    const skip = (Number(page) - 1) * Number(limit);
    const take = Number(limit);

    const [threads, total] = await Promise.all([
      prisma.thread.findMany({
        where: whereClause,
        include: {
          author: { select: { id: true, name: true } },
          category: true,
          tags: { include: { tag: true } },
          _count: { select: { votes: true, replies: true } }
        },
        orderBy: orderByClause,
        skip,
        take
      }),
      prisma.thread.count({ where: whereClause })
    ]);

    res.json({
      threads,
      pagination: {
        total,
        page: Number(page),
        limit: Number(limit),
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong while searching threads' });
  }
};
