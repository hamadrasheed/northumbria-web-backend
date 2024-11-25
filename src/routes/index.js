const express = require('express');
const router = express.Router();
const authAndRoleMiddleware = require('../middlewares/auth');


const auth = require('./auth');
const parkingSpace = require('./parkingSpace');
const admin = require('./admin');

router.use('/user', auth);
router.use('/parking-spot', parkingSpace);
router.use('/admin', authAndRoleMiddleware(['admin']), admin);

router.get('/', function (req, res, next) {
  res.send({ title: 'Bellona' });
});

module.exports = router;
