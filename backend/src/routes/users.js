
const express = require("express");
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const jwt = require('jsonwebtoken');
require('dotenv').config();
const jwtV = require('../services/auth.js');
const joi = require('joi');

const schemaCreate = joi.object({
  user: joi.string().alphanum().min(3).required(),
  firstName: joi.string().pattern(new RegExp('^[a-zA-Z0-9 ]{3,100}$')).required(),
  lastName: joi.string().pattern(new RegExp('^[a-zA-Z0-9 ]{3,100}$')).required(),
  password: joi.string().min(3).required(),
  email: joi.string().email().required(),
});

const schemaId = joi.object({
  userId: joi.string().alphanum().min(1).required(),
});

const schemaUpdate = joi.object({
  user_id: joi.number().min(1).required(),
  user: joi.string().alphanum().min(3).required(),
  username: joi.string().alphanum().min(3).required(),
  firstName: joi.string().pattern(new RegExp('^[a-zA-Z0-9 ]{3,100}$')).required(),
  lastName: joi.string().pattern(new RegExp('^[a-zA-Z0-9 ]{3,100}$')).required(),
  password: joi.string().min(3).required(),
  email: joi.string().email().required(),
});

router.post('/', async (req, res, next) => {
  const { error } = schemaCreate.validate(req.body);
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


/*router.get('/', async (req, res, next) => {
  if (req.params.userId !== null) {
    const id = req.params.userId;
    const dataUser = await prisma.users.findMany({
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
    res.json(dataUser);
  }
});*/

router.get('/:userId',jwtV.verifyToken, async (req, res, next) => {
  const { error } = schemaId.validate(req.params);
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
  const { error } = schemaUpdate.validate(req.body);
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