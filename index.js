const db = require("./db");
const inquirer = require("inquirer");
const connection = require("./db/connection");
const { createPromptModule } = require("inquirer");


//const array to do list
// let todoList = [
//     "Add role", "View an employee", "Add a position", "Add a department", "View deparments", "View roles", "View all employees", "Update employee role", "Update employee manager", "View employee by manager", "Delete departments", "Delete roles", "Delete employees", "View the total utilitized budget of a department", "Exit"
// ]

let todoList = [
    "View Departments", "View Employees", "View Roles", "Create Role", "Exit"
]


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
            case "View Departments":
                viewDepartments();
                return;

            case "View Employees":
                viewEmployees();
                return;

            case "View Roles":
                viewRoles();
                return;

            case "Create Role":
                createRole();
                return;

            default:
                connection.end();
        }
    })
};

// Function view departments, roles, employees
const viewDepartments = () => {
    db
        .getDepartments()
        .then((result) => {
            console.table(result);
            start()
        });
};

const viewEmployees = () => {
    db
        .getEmployees()
        .then((result) => {
            console.table(result);
            start();
        });
};

const viewRoles = () => {
    db
        .getRoles()
        .then((result) => {
            console.table(result);
            start();
        });
};

const createRole = () => {
    db
        .getDepartments()
        .then((departments) => {

            const departmentChoices = departments.map((department) => ({
                value: department.id,
                name: department.name
            }))

            inquirer
                .prompt([
                    {
                        message: "What role do you want to add?",
                        name: "roleTitle",
                        type: "input"
                    },
                    {
                        message: "What is the salary of the role",
                        name: "salary",
                        type: "input"
                    },
                    {
                        message: "What department is this role for?",
                        name: "departmentId",
                        type: "list",
                        choices: departmentChoices
                    }
                ]).then(res => {
                    connection.query("INSERT INTO roles SET ?", {
                        title: res.roleTitle,
                        salary: res.salary,
                        department_id: res.departmentId
                    })

                    console.log(res)
                    start();
                });
        });
};

const createRole = () => {
    db
        .getDepartments()
        .then((departments) => {

            const departmentChoices = departments.map((department) => ({
                value: department.id,
                name: department.name
            }))
            
            inquirer
                .prompt([
                    {
                        message: "What role do you want to add?",
                        name: "roleTitle",
                        type: "input"
                    },
                    {
                        message: "What is the salary of the role",
                        name: "salary",
                        type: "input"
                    },
                    {
                        message: "What department is this role for?",
                        name: "departmentId",
                        type: "list",
                        choices: departmentChoices
                    }
                ]).then(res => {
                    connection.query("INSERT INTO roles SET ?", {
                        title: res.roleTitle,
                        salary: res.salary,
                        department_id: res.departmentId
                    })

                    console.log(res)
                    start();
                });
        });
};

// // Function add departments, roles, employees
// const addRole = () => {
//     inquirer.prompt(
//         {
//             message: "What department do you want to add?",
//             type: "input",
//             name: "deptName"
//         }
//     ).then(function (response1) {
//         connection.connect("INSERT INTO department(name) VALUE (response1.deptName)", function (err) {
//             if (err) throw err;
//             console.log(response1.deptName);
//         })
//         console.log(response1.deptName);
//         start();
//     });
// };

// const viewAnEmployee = () => {
//     console.log("Here is employee list");
//     start();
// };

// const addPosition = () => {
//     console.log("Position is added");
//     start();
// };

// const addDepartment = () => {
//     console.log("Department is added");
//     start();
// }

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

start();

