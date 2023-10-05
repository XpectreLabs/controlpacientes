
const express = require("express");
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

router.post('/', async (req, res, next) => {
  let date = new Date().toISOString();
  await prisma.patients.create({
    data: {
      firstname: req.body.firstName,
      lastname: req.body.lastName,
      phone: req.body.phone,
      email: req.body.email,
      ssn: req.body.ssn,
      user_id: parseInt(req.body.user_id),
      date: date,
      active: 1,
    },
  });
  res.json({ status: 'success' });
});

router.put('/', async (req, res, next) => {
  const id = parseInt(req.body.patient_id);
  await prisma.patients.update({
    where: {
      patient_id: parseInt(id),
    },
    data: {
      firstname: req.body.firstName,
      lastname: req.body.lastName,
      phone: req.body.phone,
      email: req.body.email,
      ssn: req.body.ssn,
    },
  });
  res.json({ status: 'success' });
});

router.delete('/:patientId', async (req, res, next) => {
  const id = parseInt(req.body.patient_id);
  console.log("D:" + req.body.patient_id)
  await prisma.patients.update({
    where: {
      patient_id: parseInt(id),
    },
    data: {
      active: 0,
    },
  });
  res.json({ status: 'success' });
});

module.exports = router;