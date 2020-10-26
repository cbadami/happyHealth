/**
*  user signup page model
*  explains each attribute in a user signup page.
*
* @author Sowmya Thogiti
* 
*
*/
'use strict';
var signup = {};
module.exports = (sequelize, DataTypes) => {
    signup = sequelize.define('signup', {
        UserName: {
            type: DataTypes.UserName,
            primaryKey: true,
            notEmpty: true,
            validate: {
                isUserName: true
            }
        },
        email:{
            type: DataTypes.email,
            notEmpty: true,
            validate:{
                isemail: true
            }
        },
        Password: {
            type: DataTypes.Password,
            allowNull: false,
            notEmpty: true,
        },
        
    });
    signup.associate = function (models) {
        // associations can be defined here
    };
    return signup;
};
