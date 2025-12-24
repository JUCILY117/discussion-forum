import prisma from '../utils/prismaClient.js';

export class FilterService {

  static buildWhereConditions(filters) {
    const { category, tags, search } = filters;
    const whereConditions = {};

    if (category) {
      if (isNaN(category)) {
        whereConditions.category = { name: { equals: category, mode: 'insensitive' } };
      } else {
        whereConditions.categoryId = parseInt(category);
      }
    }

    if (tags) {
      const tagNames = tags.split(',').map(tag => tag.trim());
      whereConditions.tags = {
        some: { tag: { name: { in: tagNames, mode: 'insensitive' } } }
      };
    }

    if (search) {
      whereConditions.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }

    return whereConditions;
  }

  static buildIncludeConditions() {
    return {
      author: { select: { id: true, username: true, avatar: true } },
      category: { select: { id: true, name: true } },
      tags: { include: { tag: { select: { id: true, name: true } } } },
      votes: true
    };
  }

  static calculateVoteScores(threads) {
    return threads.map(thread => {
      const upvotes = thread.votes.filter(vote => vote.value === 1).length;
      const downvotes = thread.votes.filter(vote => vote.value === -1).length;
      const score = upvotes - downvotes;

      return {
        ...thread,
        voteScore: score,
        upvotes,
        downvotes,
        votes: undefined
      };
    });
  }

  static sortByUpvotes(threads) {
    return threads.sort((a, b) => b.voteScore - a.voteScore);
  }

  static async getFilteredThreads(filters) {
    const { sort = 'recent', limit, page = 1 } = filters;

    const whereConditions = this.buildWhereConditions(filters);
    const includeConditions = this.buildIncludeConditions();

    let orderBy;
    if (sort === 'recent') {
      orderBy = { createdAt: 'desc' };
    } else if (sort === 'oldest') {
      orderBy = { createdAt: 'asc' };
    } else {
      orderBy = { createdAt: 'desc' };
    }

    const threads = await prisma.thread.findMany({
      where: whereConditions,
      include: includeConditions,
      orderBy,
      take: limit ? parseInt(limit) : undefined,
      skip: limit ? (parseInt(page) - 1) * parseInt(limit) : undefined,
    });

    const processedThreads = this.calculateVoteScores(threads);

    return sort === 'upvoted'
      ? this.sortByUpvotes(processedThreads)
      : processedThreads;
  }
}