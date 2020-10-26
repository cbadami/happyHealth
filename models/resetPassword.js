/**
*  password reset page model
*  explains each attribute in a password attribute page.
*
* @author Sowmya Thogiti
* 
*
*/
'use strict';
var reset = {};
module.exports = (sequelize, DataTypes) => {
    reset = sequelize.define('reset', {
        verificationCode: {
            type: DataTypes.integer,
            validate: {
                iscode: true
            }
        },

    });
    reset.associate = function (models) {
        // associations can be defined here
    };
    return reset;
};
