const db = require('../models');
const helper = require('../shared/helper');
const sequelize = require('sequelize');

const Op = sequelize.Op;

module.exports = {

    async createOwnerParkingSpace(data, filePath) {

        const _transaction = await db.sequelize.transaction();

        try {

            const {
                title,
                address,
                city,
                postalCode,
                availability,
                price,
                description,
                weekdays,
                userId,
                userRole,
            } = data;

            console.log('data', data);

            if (!weekdays?.length) {
                throw Error('No available days selected');
            }

            const existingSpace = helper.shallowCopy(await db.parkingSpaces.findOne({
                where: {
                    ownerId: userId,
                    postCode: postalCode,
                    address
                }
            }));

            if (existingSpace) {
                throw Error('Parking Space already exist with same information');
            }

            const createdSpace = helper.shallowCopy(await db.parkingSpaces.create(
                {
                    title,
                    address,
                    city,
                    postCode: postalCode,
                    availableType: availability,
                    rate: price,
                    description,
                    isAvailable: true,
                    ownerId: userId,
                    pictureUrl: filePath
                },
                {
                    transaction: _transaction,
                }

            ));

            const availableDaysData = helper.shallowCopy(await db.availableDays.findAll({
                where: {
                    name: { [Op.in]: weekdays.split(',') }
                },
                attributes: ['id']

            })).map(x => ({
                parkingSpacesId: createdSpace.id,
                availableDayId: x.id
            }));

            await db.parkingSpaceAvailableDays.bulkCreate(availableDaysData, { transaction: _transaction })

            await _transaction.commit()

            return true;

        } catch (error) {

            console.log('err', error);
            await _transaction.rollback();
            throw error;
        }
    },

    async getOwnerParkingSpace(data) {

        try {

            const {
                userId,
                ownerOnly,
                postcode,
                isAdmin
            } = data;
            console.log('data',data);
            
            let whereClause = {};

            if (ownerOnly == 'true') {
                whereClause.ownerId = userId
            }

            if (postcode?.length) {
                whereClause.postCode = {[Op.like]: `%${postcode}%` }
            }

            if (isAdmin == 'true') {
                whereClause = {};
            }

            console.log('whereClause',whereClause);
            const existingSpace = helper.shallowCopy(await db.parkingSpaces.findAll({
                where: {
                    ...whereClause,
                },
                include: {
                    as: 'availableDays',
                    model:  db.parkingSpaceAvailableDays,
                    include: {
                        as: 'availableDay',
                        model:  db.availableDays,
                        attributes: ['name']
                    },
                    attributes: ['id']
                }
            }));

            return existingSpace.map(x => ({
                    id: x.id,
                    ownerId: x.ownerId,
                    title: x.title,
                    address: x.address,
                    postalCode: x.postCode,
                    availability: x.availableType,
                    price: x.rate,
                    description: x.description,
                    description: x.description,
                    description: x.description,
                    description: x.description,
                    picture: x.pictureUrl,
                    weekdays: x?.availableDays?.map(days => days?.availableDay?.name)?.join(", ")
            }));

        } catch (error) {

            console.log('err', error);
            throw error;
        }
    },

    async getBookedSpots(data) {

        try {

            const {
                userId,
                isAdmin
            } = data;

            let whereClause = {
                userId: userId
            };

            if (isAdmin == 'true') {
                whereClause = {};
            }
            

            const bookings = helper.shallowCopy(await db.bookings.findAll(
                {
                    where: {
                        ...whereClause
                    },
                    attributes: ['id', 'startTime', 'endTime'],
                    include: {
                        as: 'parkingSpace',
                        model: db.parkingSpaces,
                        include: {
                            as: 'availableDays',
                            model:  db.parkingSpaceAvailableDays,
                            include: {
                                as: 'availableDay',
                                model:  db.availableDays,
                                attributes: ['name']
                            },
                            attributes: ['id']
                        }
                    }
                }
            ));

            const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

            return bookings.map(x => {
                
                const date = new Date(x.endTime);
                const dayIndex = date.getDay(); // Get the day index (0-6)
                const dayName = daysOfWeek[dayIndex];

                return {
                    startTime: x.startTime,
                    dayName: dayName,
                    endTime: x.endTime,
                    id: x.parkingSpace?.id,
                    ownerId: x.parkingSpace?.ownerId,
                    title: x.parkingSpace?.title,
                    address: x.parkingSpace?.address,
                    postalCode: x.parkingSpace?.postCode,
                    availability: x.parkingSpace?.availableType,
                    price: x.parkingSpace?.rate,
                    description: x.parkingSpace?.description,
                    description: x.parkingSpace?.description,
                    description: x.parkingSpace?.description,
                    description: x.parkingSpace?.description,
                    picture: x.parkingSpace?.pictureUrl,
                    weekdays: x?.parkingSpace?.availableDays?.map(days => days?.availableDay?.name)?.join(", ")

                }
            });

        } catch (error) {

            console.log('err', error);
            throw error;
        }
    },

}