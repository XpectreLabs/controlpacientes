const express = require("express");
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const jwt = require('jsonwebtoken');
require('dotenv').config();

router.post('/login', async (req, res, next) => {
  try {
    let user = await findUser(req.body.username, req.body.password);
    if (user > 0) {
      const token = generateAccessToken(jwt, user);
      res.json({ user_id: user, token: token });
    } else {
      let messageError = 'Incorrect access data 1';
      console.log(messageError);
      res.json({ auth: messageError });
    }
  } catch (e) {
    let messageError = 'Incorrect access data 2';
    console.log(messageError);
    res.json({ auth: messageError });
  }
});

function generateAccessToken(user) {
  return jwt.sign({ user }, process.env.SECRET, { expiresIn: 60 * 60 * 24 });
}

router.post('/changePassword', async (req, res, next) => {
  const id = parseInt(req.body.user_id);
  await prisma.users.update({
    where: {
      user_id: parseInt(id),
    },
    data: {
      password: req.body.password,
    },
  });
  res.json({ status: 'success' });
});

async function findUser(username, password) { 
  console.log(username, password)
  const users = await prisma.users.findFirst({
    where: {
      username,
      password,
    },
    select: {
      user_id: true,
    },
  });

  if (users == null) return 0;

  return users.user_id;
}

function verifyToken(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Token not provider' });
  }

  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid Token' });
    }
    req.user = decoded;
    next();
  });
}

module.exports = router;