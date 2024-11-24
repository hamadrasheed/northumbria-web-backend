'use strict'
const authController = require('../controller/auth')
const express = require('express');
const router = express.Router();


router.post('/register', async (req, res) => {
    try {

        const result = await authController.signUp(req.body);

        res.status(200).send({
            message: "User registered successfully",
            data: result,
        });

    } catch (err) {
        res.status(406).send({
            message: err?.message
        })
    }
});

router.post('/login', async (req, res) => {
    try {

        const result = await authController.login(req.body);

        res.status(200).send({
            message: "Login successfull",
            data: result,
        });

    } catch (err) {
        res.status(406).send({
            message: err?.message
        })
    }
})

module.exports = router;
