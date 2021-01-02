const mysql = require("mysql");
const { start } = require("repl");
const util = require("util");

// create the connection information for the sql database
const connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "MySql@&2014",
    database: "employee_db"
});
// send request to employee_DB
connection.connect((err) => {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
      
});

//use npm util and promisify enable .chain syntac
connection.query = util.promisify(connection.query);

// export mudule
module.exports = connection;