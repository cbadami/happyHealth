/**
*  admin page model
*  explains each attribute in a admin page.
*
* @author Sowmya Thogiti
* 
*
*/
'use strict';
var admin = {};
module.exports = (sequelize, DataTypes) => {
    admin= sequelize.define('admin', {
        UserName: {
            type: DataTypes.UserName,
            primaryKey: true,
             notEmpty: true
        },
        Password: {
            type: DataTypes.Password,           
        },
        Forgot_Password: {
            type: DataTypes.boolean,            
        },
        Social_Profiles: {
                type: DataTypes.boolean,
               
        },
        Admin: {
                type: DataTypes.boolean,
        },
        Signup: {
                type: DataTypes.boolean,
                },
            }); 
               admin.associate = function(models) {
              // associations can be defined here
                     };
               return admin;
               };
