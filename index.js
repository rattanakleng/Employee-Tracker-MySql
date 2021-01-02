const mysql = require("mysql");
const inquirer = require("inquirer");

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


// const array to do list
let todoList = [
    "Add role", "View an employee", "Add a position", "Add a department", "View deparments", "View roles", "View all employees", "Update employee role", "Update employee manager", "View employee by manager", "Delete departments", "Delete roles", "Delete employees", "View the total utilitized budget of a department", "Exit"
]

// send request to employee_DB
connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");

    start();
});

// function readColleges() {
//     connection.query("SELECT name FROM colleges", function (err, res) {
//         if (err) throw err;

//         // Log all results of the SELECT statement
//         console.log(res);
//         connection.end();
//     });
// }

// inquerer to ask for options
// What would you like to do? (add role, view employee, add position, add department, view deparments, view roles, view employees, update employee roles, update employee managers, view employee by manager, delete departments, delete roles, delete employees, view the total utilitized budget of a department)


const start = () => {
    inquirer.prompt(
        {
            message: "What would you like to do?",
            name: "answer",
            type: "list",
            choices: todoList
        }
    ).then(function (response) {
        switch (response.answer) {
            case "Add role":
                addRole();
                break;

            case "View an employee":
                viewAnEmployee();
                break;

            case "Add a position":
                addPosition();
                break;

            case "Add a department":
                addDepartment();
                break;

            case "Exit":
                break;

            default:
                start();
        }
    })
};

// Function add departments, roles, employees
const addRole = () => {
    inquirer.prompt(
        {
            message: "What department do you want to add?",
            type: "input",
            name: "deptName"
        }
    ).then(function (response1) {
        connection.connect("INSERT INTO department(name) VALUE (response1.deptName)", function (err) {
            if (err) throw err;
            console.log(response1.deptName);
        })
        console.log(response1.deptName);
        start();
    });
};

const viewAnEmployee = () => {
    console.log("Here is employee list");
    start();
};

const addPosition = () => {
    console.log("Position is added");
    start();
};

const addDepartment = () => {
    console.log("Department is added");
    start();
}

// function add department with id

// function add roles with id

// function add employee last_name, first_name, link-role id, link manager id



// View departments, roles, employees

// Update employee roles

// Bonus points if you're able to:

// Update employee managers

// View employees by manager

// Delete departments, roles, and employees

// View the total utilized budget of a department -- ie the combined salaries of all employees in that department


