
const express = require("express");
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const jwt = require('jsonwebtoken');
require('dotenv').config();
const jwtV = require('../services/auth.js');
const sch = require('../schemas/users.js');

router.post('/', async (req, res, next) => {
  const { error } = sch.schemaCreate.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  let date = new Date().toISOString();
  await prisma.users.create({
    data: {
      username: req.body.user,
      firstname: req.body.firstName,
      lastname: req.body.lastName,
      password: req.body.password,
      email: req.body.email,
      date: date,
    },
  });
  res.json({ status: 'success' });
});

router.get('/:userId',jwtV.verifyToken, async (req, res, next) => {
  const { error } = sch.schemaId.validate(req.params);
  if (error) {
    console.log(error.details[0].message)
    return res.status(400).json({ error: error.details[0].message });
  }

  if (req.params.userId !== null) {
    const id = req.params.userId;
    console.log(id)
    const dataUser = await prisma.users.findMany({
      where: {
        user_id: parseInt(id),
      },
      select: {
        user_id: true,
        username: true,
        firstname: true,
        lastname: true,
        password: true,
        date: true,
        email: true,
      },
    });
    res.json({ dataUser });
  }
});

router.put('/',jwtV.verifyToken, async (req, res, next) => {
  console.log(req.body);
  const { error } = sch.schemaUpdate.validate(req.body);
  if (error) {
    console.log(error.details[0].message)
    return res.status(400).json({ error: error.details[0].message });
  }

  const id = parseInt(req.body.user_id);
  await prisma.users.update({
    where: {
      user_id: parseInt(id),
    },
    data: {
      username: req.body.user,
      firstname: req.body.firstName,
      lastname: req.body.lastName,
      email: req.body.email,
    },
  });
  res.json({ status: 'success' });
});

module.exports = router;