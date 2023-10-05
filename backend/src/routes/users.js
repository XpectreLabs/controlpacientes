
const express = require("express");
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

router.post('/', async (req, res, next) => {
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


router.get('/', async (req, res, next) => {
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
});

router.get('/:userId', async (req, res, next) => {
  if (req.params.userId !== null) {
    const id = req.params.userId;
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

router.put('/:userId', async (req, res, next) => {
  const id = parseInt(req.body.user_id);
  getUsers({userId: id})
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



router.get('/:userId/patients', async (req, res, next) => {
  if (req.params.userId !== null) {
    const id = req.params.userId;

    const listPatients = await prisma.patients.findMany({
      where: {
        user_id: parseInt(id),
        active: 1,
      },
      select: {
        patient_id: true,
        firstname: true,
        lastname: true,
        phone: true,
        email: true,
        ssn: true,
        date: true,
      },
    });
    res.json({ listPatients });
  }
});


module.exports = router;