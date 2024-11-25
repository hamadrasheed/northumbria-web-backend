'use strict'
const parkingSpaceController = require('../controller/parkingSpace')
const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const authAndRoleMiddleware = require('../middlewares/auth');
const dotenv = require('dotenv');
dotenv.config({ path: '.env' });


const uploader = multer({storage:  multer.diskStorage({
    destination: (req, file, cb) => {
        const path = `${process.env.IMAGE_PATH}/public/uploads/`;
        fs.mkdirSync(path, { recursive: true });
        cb(null, path);
    },
    filename: (req, file, cb) => {
        console.log('object',file.fieldname);
        cb(null, `${file.fieldname}-${Date.now()}-${file.originalname}`);
    },
})});


router.post('/', authAndRoleMiddleware(['owner', 'admin']), uploader.single('image'), async (req, res) => {
    try {

        const filePath = `/uploads/${req.file.filename}`;
        
        try {

            const result = await parkingSpaceController.createOwnerParkingSpace({
                ...req.body,
                ...req.query
            }, filePath);
    
            res.status(200).send({
                message: "Pakring spot created successfuly.",
                data: result,
            });

    
        } catch (err) {

            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }

            throw err;
        }

    } catch (error) {
        
        res.status(406).send({
            message: error?.message
        })
    }
});

router.get('/', async (req, res) => {

    try {

        const result = await parkingSpaceController.getOwnerParkingSpace(req.query);

        res.status(200).send({
            message: "Succcess.",
            data: result,
        });

    } catch (error) {
        
        res.status(406).send({
            message: error?.message
        })
    }
});

router.get('/owner', authAndRoleMiddleware(['owner', 'admin']), async (req, res) => {

    try {

        const result = await parkingSpaceController.getOwnerParkingSpace(req.query);

        res.status(200).send({
            message: "Succcess.",
            data: result,
        });

    } catch (error) {
        
        res.status(406).send({
            message: error?.message
        })
    }
});

router.get('/booked', authAndRoleMiddleware(['driver', 'admin']), async (req, res) => {

    try {

        const result = await parkingSpaceController.getBookedSpots(req.query);

        res.status(200).send({
            message: "Succcess.",
            data: result,
        });

    } catch (error) {
        
        res.status(406).send({
            message: error?.message
        })
    }
});


module.exports = router;
