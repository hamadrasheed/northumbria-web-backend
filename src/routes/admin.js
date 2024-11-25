'use strict'
const adminController = require('../controller/admin')
const express = require('express');
const router = express.Router();


router.get('/all-users', async (req, res) => {
    try {

        const result = await adminController.allUsers(req.body);

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


module.exports = router;
