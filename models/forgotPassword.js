/**
*  forgot password page model
*  explains each attribute in a forgot password page.
*
* @author Sowmya Thogiti
* 
*
*/
'use strict';
var forgot = {};
module.exports = (sequelize, DataTypes) => {
    forgot = sequelize.define('forgot', {
        email: {
            type: DataTypes.email,
            primaryKey: true,
            notEmpty: true,
            validate: {
                isemail: true
            }
        },

    });
    forgot.associate = function (models) {
        // associations can be defined here
    };
    return forgot;
};
