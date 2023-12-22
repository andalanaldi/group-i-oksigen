// import { Request, Response, NextFunction } from 'express';
const { prisma } = require('../Controller/mainController');
const jwt = require('jsonwebtoken');

const verifyToken = (token, secret) => jwt.verify(token, secret);

const findUser = async (id) => await prisma.user.findUnique({ where: { id } });

const authMiddleware = (req, res, next) => {
  const token = req.cookies['access_token']; // get token from cookies
  if (!token) {
    return res.status(403).json({ error: 'No token in your Cookies 🍪, please login first' });
  }
  try {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      return res.status(500).json({ error: 'JWT secret is not set' });
    }
    const decoded = verifyToken(token, secret);
    findUser(decoded.id)
      .then((user) => {
        if (!user) {
          return res.status(403).json({ error: 'Organization not found' });
        }
        req.user = user;
        next();
      })
      .catch((err) => {
        return res.status(403).json({ error: 'Failed to authenticate token' });
      });
  } catch (error) {
    return res.status(403).json({ error: 'Failed to authenticate token' });
  }
};

module.exports = authMiddleware;
