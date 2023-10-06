
const express = require("express");
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const jwt = require('jsonwebtoken');
require('dotenv').config();
const jwtV = require('../services/auth.js');

router.post('/',jwtV.verifyToken, async (req, res, next) => {
  let date = new Date().toISOString();
  console.log(date);
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

router.get('/:userId/patients',jwtV.verifyToken, async (req, res, next) => {
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

router.put('/',jwtV.verifyToken, async (req, res, next) => {
  const id = parseInt(req.body.patient_id);
  console.log("U:" + id);
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

router.delete('/',jwtV.verifyToken, async (req, res, next) => {
  const id = parseInt(req.body.patient_id);
  console.log("D:" + req.body.patient_id);
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


/*function verifyToken(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Token not provider' });
  }

  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid Token', e:err });
    }
    req.user = decoded;
    next();
  });
}*/

module.exports = router;