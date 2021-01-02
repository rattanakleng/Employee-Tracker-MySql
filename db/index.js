const connection = require("./connection");

module.exports = {
    getDepartments() {
        return connection.query("SELECT * FROM department");
    },
    getRoles() {
        return connection.query("SELECT * FROM roles");
    },
    getEmployees() {
        return connection.query("SELECT * FROM employees");
    }
};