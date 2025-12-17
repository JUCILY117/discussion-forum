import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from '../utils/prismaClient.js';

const isProd = process.env.NODE_ENV === 'production';

const register = async (req, res) => {
  const { username, email, password } = req.body;
  const normalizedUsername = username.trim().toLowerCase();
  const normalizedEmail = email.trim().toLowerCase();
  try {
    const hashed = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { username: normalizedUsername, email: normalizedEmail, password: hashed },
    });
    res.status(201).json({ message: 'User registered', userId: user.id });
  } catch (err) {
    res.status(400).json({ error: 'Registration failed' });
  }
};

const checkUsernameAvailability = async (req, res) => {
  try {
    const { username } = req.query;

    if (!username || typeof username !== "string") {
      return res.status(400).json({
        available: false,
        error: "Invalid username",
      });
    }

    const normalizedUsername = username.trim().toLowerCase();

    // Optional: enforce minimum length
    if (normalizedUsername.length < 3) {
      return res.json({ available: false });
    }

    const existingUser = await prisma.user.findUnique({
      where: { username: normalizedUsername },
      select: { id: true },
    });

    return res.json({
      available: !existingUser,
    });
  } catch (err) {
    console.error("Check username error:", err);
    res.status(500).json({ available: false });
  }
};

const checkEmailAvailability = async (req, res) => {
  try {
    const { email } = req.query;

    if (!email || typeof email !== "string") {
      return res.status(400).json({
        available: false,
        error: "Invalid email",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedEmail.includes("@")) {
      return res.json({ available: false });
    }

    const existingUser = await prisma.user.findUnique({
      where: { email: normalizedEmail },
      select: { id: true },
    });

    return res.json({
      available: !existingUser,
    });
  } catch (err) {
    console.error("Check email error:", err);
    res.status(500).json({ available: false });
  }
};

const login = async (req, res) => {
  const { emailOrUsername, password } = req.body;

  try {
    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { email: emailOrUsername },
          { username: emailOrUsername },
        ],
      },
    });

    if (!user) return res.status(401).json({ error: 'Invalid credentials' });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ error: 'Invalid credentials' });

    const accessToken = jwt.sign(
      { userId: user.id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    const refreshToken = jwt.sign(
      { userId: user.id },
      process.env.REFRESH_SECRET,
      { expiresIn: '30d' }
    );

    res.cookie('token', accessToken, {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? 'none' : 'lax',
      domain: isProd ? process.env.COOKIE_DOMAIN : undefined,
      maxAge: 3600000,
      path: '/',
    });

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? 'none' : 'lax',
      domain: isProd ? process.env.COOKIE_DOMAIN : undefined,
      maxAge: 30 * 24 * 60 * 60 * 1000,
      path: '/',
    });

    res.json({ user: { id: user.id, username: user.username, email: user.email } });
  } catch (err) {
    res.status(500).json({ error: 'Login failed' });
  }
};

const refreshToken = (req, res) => {
  const token = req.cookies?.refreshToken;
  if (!token) return res.status(401).json({ error: 'Refresh Token Missing' });

  try {
    const decoded = jwt.verify(token, process.env.REFRESH_SECRET);

    const accessToken = jwt.sign(
      { userId: decoded.userId },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.cookie('token', accessToken, {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? 'none' : 'lax',
      domain: isProd ? process.env.COOKIE_DOMAIN : undefined,
      maxAge: 3600000,
      path: '/',
    });

    res.json({ message: 'Access Token Refreshed' });
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or Expired Refresh Token' });
  }
};

const logout = (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? 'none' : 'lax',
    domain: isProd ? process.env.COOKIE_DOMAIN : undefined,
    path: '/',
  });
  res.clearCookie('refreshToken', {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? 'none' : 'lax',
    domain: isProd ? process.env.COOKIE_DOMAIN : undefined,
    path: '/',
  });
  res.json({ message: 'Logged out successfully' });
};


export { checkEmailAvailability, checkUsernameAvailability, login, logout, refreshToken, register };
