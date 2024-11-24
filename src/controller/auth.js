const db = require('../models');
const helper = require('../shared/helper');
const sequelize = require('sequelize');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Op = sequelize.Op;

module.exports = {

    async signUp(data) {

        try {

            const {
                firstName,
                lastName,
                email,
                password,
                roleSlug,
            } = data;

            const doesEmailExits = helper.shallowCopy(await db.users.findOne(
                {
                    
                    where: {
                        email: { [Op.like]: `%${email}%` },
                        deletedAt: null
                    },
                    attributes: ['id']
                }
            ));
            
            if (doesEmailExits) {
                throw Error('User already exists with this email, try for forget password.');
            }

            const roles = helper.shallowCopy(await db.roles.findOne(
                {
                    where: {
                        slug: roleSlug,
                        deletedAt: null
                    },
                    attributes: ['id']
                }
            ));

            if (!roles || !Object.keys(roles).length) {
                throw Error('Invalide role selected!');
            }

            const bcryptPassword = await bcrypt.hash(password, 1);

            console.log('object', {
                email,
                    firstName,
                    lastName,
                    password: bcryptPassword,
                    roleId: roles.id,
            });

            await db.users.create(
                {
                    email,
                    firstName,
                    lastName,
                    password: bcryptPassword,
                    roleId: roles.id,
                },
            );

            return true;

        } catch (error) {
            console.log('err', error);
            throw error;
        }
    },


    async login(data) {

        try {
            
            const {
                email,
                password
            } = data;
    
            const isUserExist = helper.shallowCopy(await db.users.findOne(
                {
                    
                    where: {
                        email: { [Op.like]: `%${email}%` },
                        deletedAt: null
                    },
                    include: {
                        model: db.roles,
                        as: 'role',
                        attributes: ['id', 'name', 'slug']
                    },
                    attributes: ['id', 'firstName', 'lastName', 'password']
                }
            ));
            
            if (!isUserExist) {
                throw Error('User not found!');
            }
    
            const { password: userPassword } = isUserExist;
                
            const bcryptedPassword = await bcrypt.compare(password, userPassword);
    
            if (!bcryptedPassword) {
                throw Error('Wrong Password!');
            }
        
            const userToken = jwt.sign(
                {
                    id: isUserExist.id,
                },
                process.env.JWT_SECRET_KEY,
                {
                    expiresIn: '24h',
                }
            );
        
            delete isUserExist?.password;
    
            return {
                ...isUserExist,
                token: userToken
            };

        } catch (error) {
            throw error;   
        }

    }
}