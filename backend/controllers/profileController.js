import prisma from '../utils/prismaClient.js';

const getProfile = async (req, res) => {
  const userId = req.user?.userId;
  if (!userId) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        username: true,
        email: true,
        avatar: true,
        bio: true,
        website: true,
        location: true,
        bannerImage: true,
        isAdmin: true,
        createdAt: true,
      },
    });
    if (!user) return res.status(404).json({ error: 'User not found' });

    res.json({ user });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ error: 'Failed to get profile' });
  }
};

const updateProfile = async (req, res) => {
  const userId = req.user?.userId ?? req.user?.id;
  if (!userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const {
    name,
    username,
    email,
    avatar: avatarUrl,
    bio,
    website,
    location,
    bannerImage: bannerUrl,
  } = req.body;

  try {
    if (username) {
      const existingUser = await prisma.user.findUnique({
        where: { username },
      });
      if (existingUser && existingUser.id !== userId) {
        return res.status(400).json({ error: "Username already taken" });
      }
    }

    if (email) {
      const existingEmail = await prisma.user.findUnique({
        where: { email },
      });
      if (existingEmail && existingEmail.id !== userId) {
        return res.status(400).json({ error: "Email already registered" });
      }
    }

    const baseUrl =
      process.env.BASE_URL ||
      `${req.protocol}://${req.get("host")}`;

    let avatar = avatarUrl;
    let bannerImage = bannerUrl;

    if (req.files?.avatar?.[0]) {
      avatar = `${baseUrl}/uploads/avatars/${req.files.avatar[0].filename}`;
    }

    if (req.files?.bannerImage?.[0]) {
      bannerImage = `${baseUrl}/uploads/banners/${req.files.bannerImage[0].filename}`;
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        ...(name !== undefined && { name }),
        ...(username !== undefined && { username }),
        ...(email !== undefined && { email }),
        ...(avatar !== undefined && { avatar }),
        ...(bio !== undefined && { bio }),
        ...(website !== undefined && { website }),
        ...(location !== undefined && { location }),
        ...(bannerImage !== undefined && { bannerImage }),
      },
      select: {
        id: true,
        name: true,
        username: true,
        email: true,
        avatar: true,
        bio: true,
        website: true,
        location: true,
        bannerImage: true,
        createdAt: true,
      },
    });

    res.json({ message: "Profile updated", user: updatedUser });
  } catch (error) {
    console.error("Update profile error:", error);
    res.status(500).json({ error: "Failed to update profile" });
  }
};

const getPublicProfileByUsername = async (req, res) => {
  const { username } = req.params;

  try {
    const user = await prisma.user.findUnique({
      where: { username },
      select: {
        id: true,
        name: true,
        username: true,
        avatar: true,
        bio: true,
        website: true,
        location: true,
        bannerImage: true,
        createdAt: true,
      },
    });

    if (!user) return res.status(404).json({ error: 'User not found' });

    res.json({ user });
  } catch (error) {
    console.error('Get public profile error:', error);
    res.status(500).json({ error: 'Failed to get user profile' });
  }
};

export { getProfile, getPublicProfileByUsername, updateProfile };

