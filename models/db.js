const mysql = require('mysql');
const dbConfig = require("../config/db.config")


// create a connection to the database sever
const connection = mysql.createConnection({
    host: dbConfig.host,
    user:dbConfig.user,
    password:dbConfig.password,
    database:dbConfig.DB
});

///open mysql connection
connection.connect(
    (error)=>{
        if(error) throw error;
        console.log("Successfully connected to the databasw...")
    }
);

module.exports = connection;