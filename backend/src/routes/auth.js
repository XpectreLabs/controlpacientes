const express = require("express");
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const jwt = require('jsonwebtoken');
require('dotenv').config();
const fn = require('../services/users.js');
const joi = require('joi');

const schema = joi.object({
  username: joi.string().alphanum().min(3).required(),
  password: joi.string().min(3).required(),
});

router.post('/login', async (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) {
    console.log(error.details[0].message);
    return res.status(400).json({ error: error.details[0].message });
  }

  try {
    let user = await fn.findUser(req.body.username, req.body.password);

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

module.exports = router;