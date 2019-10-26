const express = require('express');
const router = express.Router();
const Payment = require('../models/payment');
const EmailSMS = require('../middleware/emailSMS');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config');
const log = require('../log');

const emailSMSObj = new EmailSMS();

router.get('/make', (req, res, next) => {});

router.get('/list', (req, res, next) => {
  emailSMSObj.sendMail(req.body.userEmailId);
});

module.exports = router;
