/**
*  user login page model
*  explains each attribute in a user login page.
*
* @author Sowmya Thogiti
* 
*
*/
'use strict';
var user = {};
module.exports = (sequelize, DataTypes) => {
    user = sequelize.define('user', {
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

        Admin: {
            type: DataTypes.boolean,
        },
        Signup: {
            type: DataTypes.boolean,
        },
    });
    user.associate = function (models) {
        // associations can be defined here
    };
    return user;
};
