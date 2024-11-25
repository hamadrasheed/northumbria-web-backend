const db = require('../models');
const helper = require('../shared/helper');
const sequelize = require('sequelize');

const Op = sequelize.Op;

module.exports = {

    async allUsers(data) {

        try {

            const {} = data;

            const allUsers = helper.shallowCopy(await db.users.findAll(
                {
                    
                    where: {
                        deletedAt: null
                    },
                    attributes: ['id', 'firstName', 'lastName', 'email'],
                    include: {
                        model: db.roles,
                        as: 'role',
                        attributes: ['id', 'name', 'slug']
                    },
                }
            ));
            
            return allUsers.map(x => ({
                id: x?.id,
                name: `${x?.firstName} ${x?.lastName}`,
                email: x?.email,
                role: x?.role?.name
            }));

        } catch (error) {
            console.log('err', error);
            throw error;
        }
    },

}