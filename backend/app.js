const express = require('express');
const router = express();
const https = require('https');
const jwt = require('jsonwebtoken');
var LocalStorage = require('node-localstorage').LocalStorage;
localStorage = new LocalStorage('./scratch');
const JWTStrategy = require('passport-jwt').Strategy;
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const cors = require('cors');
require('dotenv').config();

const usersRoutes = require('./src/routes/users');
const patientsRoutes = require('./src/routes/patients');
const authRoutes = require('./src/routes/auth');

router.use(express.static('public'));
router.use(express.urlencoded({ extended: false }));
router.use(express.json());
router.use(cors());

router.use('/api/v1/users', usersRoutes);
router.use('/api/v1/patients', patientsRoutes);
router.use('/api/v1/auth', authRoutes);


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