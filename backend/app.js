const express = require('express');
const router = express();
const https = require('https');
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const jwt = require('jsonwebtoken');

var LocalStorage = require('node-localstorage').LocalStorage;
localStorage = new LocalStorage('./scratch');

const JWTStrategy = require('passport-jwt').Strategy;
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const cors = require('cors');
require('dotenv').config();

router.use(express.static('public'));
router.use(express.urlencoded({ extended: false }));
router.use(express.json());
router.use(cors());

router.post('/login', async (req, res, next) => {
  try {
    let user = await findUser(req.body.username, req.body.password);
    if (user > 0) {
      const token = generateAccessToken(jwt, user);

      res.json({ user_id: user, token: token });
    } else {
      let messageError = 'Incorrect access data';
      console.log(messageError);
      res.json({ auth: messageError });
    }
  } catch (e) {
    let messageError = 'Incorrect access data';
    console.log(messageError);
    res.json({ auth: messageError });
  }
});

function generateAccessToken(user) {
  return jwt.sign({ user }, process.env.SECRET, { expiresIn: 60 * 60 * 24 });
}

async function findUser(username, password) {
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

router.post('/createUser', async (req, res, next) => {
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

router.post('/createPatient', async (req, res, next) => {
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

router.put('/editPatient', async (req, res, next) => {
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

router.get('/listPatients/:userId', async (req, res, next) => {
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

router.post('/deletePatient', async (req, res, next) => {
  const id = parseInt(req.body.patient_id);

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

router.get('/dataUser/:userId', async (req, res, next) => {
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

router.put('/editUser', async (req, res, next) => {
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

// Servidor HTTP
// const serverHttp = http.createServer(router);
// serverHttp.listen(process.env.HTTP_PORT, process.env.IP);
// serverHttp.on('listening', () => console.info(`Notes App running at http://${process.env.IP}:${process.env.HTTP_PORT}`));
router.listen(3001, () => {
  console.log('Aplicación ejecutandose ....');
});

// Servidor HTTP
// const httpsServer = https.createServer(options, router);
// httpsServer.listen(443, process.env.IP);
