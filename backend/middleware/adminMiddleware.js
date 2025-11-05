import prisma from '../utils/prismaClient.js';

export default async function adminMiddleware(req, res, next) {
  if (!req.user || !req.user.userId) {
    return res.status(403).json({ error: 'Access Required' });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.userId },
      select: { isAdmin: true },
    });

    if (!user || !user.isAdmin) {
      return res.status(403).json({ error: 'Access Required' });
    }

    next();
  } catch (err) {
    console.error('Error checking admin status:', err);
    res.status(500).json({ error: 'Server error' });
  }
}