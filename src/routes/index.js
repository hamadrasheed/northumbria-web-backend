const express = require('express');
const router = express.Router();

const auth = require('./auth');
const parkingSpace = require('./parkingSpace');

router.use('/user', auth);
router.use('/parking-spot', parkingSpace);

router.get('/', function (req, res, next) {
  res.send({ title: 'Bellona' });
});

module.exports = router;
