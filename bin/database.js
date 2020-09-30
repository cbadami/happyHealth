const {createPool 
} = require('mysql');

const pool= createPool({
    host: "35.194.21.170",
    user: "root",
    password:"",
    database:"happyhealth_MySQL"

})