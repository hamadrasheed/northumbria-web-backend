const express = require('express');
const router = express.Router();

const auth = require('./auth');

router.use('/user', auth);

router.get('/', function (req, res, next) {
  res.send({ title: 'Bellona' });
});

module.exports = router;
