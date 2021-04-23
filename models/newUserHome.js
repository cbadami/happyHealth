/**
 *  admin login page model
 *  explains each attribute in a admin page.
 *
 * @author Sowmya Thogiti
 * 
 *
 */
'use strict';
var admin = {};
module.exports = (sequelize, DataTypes) => {
    admin = sequelize.define('admin', {
        UserName: {
            type: DataTypes.UserName,
            primaryKey: true,
            notEmpty: true,
            validate: {
                isUserName: true
            }
        },
        Password: {
            type: DataTypes.Password,
            allowNull: false,
            notEmpty: true,
        },
        Forgot_Password: {
            type: DataTypes.boolean,
        },

        NotAdmin: {
            type: DataTypes.boolean,
        },
    });
    admin.associate = function (models) {
        // associations can be defined here
    };
    return admin;
};