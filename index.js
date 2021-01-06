const db = require("./db");
const inquirer = require("inquirer");
const connection = require("./db/connection");
const { createPromptModule } = require("inquirer");

let todoList = [
    "Add Department", "Add Role", "Add Employee", "View Departments", "View Employees", "View Roles", "Update Employee Role", "Delete a Department", "Exit"
]

//Init function
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

            case "Add Department":
                addDepartment();
                return;

            case "Add Role":
                addRole();
                return;

            case "Add Employee":
                addEmployee();
                return;

            case "Update Employee Role":
                updateEmployeeRole();
                return;

            case "View Departments":
                viewDepartments();
                return;

            case "View Employees":
                viewEmployees();
                return;

            case "View Roles":
                viewRoles();
                return;

            case "Delete a Department":
                deleteDepartment();
                return;

            default:
                connection.end();
        }
    })
};

//Function addRole to roles table
const addRole = () => {

    //Get department IDs and names
    db
        .getDepartments()
        .then((departments) => {

            const departmentChoices = departments.map((department) => ({
                value: department.id,
                name: department.name
            }))
            // getDepartmentList();

            inquirer.prompt([
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
                    message: "What department is this role in?",
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

                viewRoles();
            });
        });
};

//Function add employee to employees table
const addEmployee = () => {

    //Get roleIDs and titles
    db
        .getRoles()
        .then((roles) => {
            const roleChoices = roles.map((role) => ({
                value: role.id,
                name: role.title
            }))

            inquirer
                .prompt([
                    {
                        message: "Please enter employee first name",
                        name: "firstName",
                        type: "input"
                    },
                    {
                        message: "Please enter employee last name",
                        name: "lastName",
                        type: "input"
                    },
                    {
                        message: "Which department is the employee in?",
                        name: "roleId",
                        type: "list",
                        choices: roleChoices
                    },
                    {
                        message: "Please enter manger's ID, if the employee has no manager please enter 0",
                        name: "managerId",
                        type: "input"
                    }
                ]).then(res => {
                    connection.query("INSERT INTO employees SET ?", {
                        first_name: res.firstName,
                        last_name: res.lastName,
                        role_id: res.roleId,
                        manager_id: res.managerId
                    })

                    console.log(res)
                    viewEmployees();
                });
        });
};

//Function addDepartment
const addDepartment = () => {
    inquirer
        .prompt([
            {
                message: "What department do you want to add?",
                name: "departmentName",
                type: "input"
            }
        ]).then(res => {
            connection.query("INSERT INTO departments SET ?", { name: res.departmentName })

            console.log(`${res.departmentName} department is added`)

            viewDepartments();
        });
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

//Function update employee role
const updateEmployeeRole = () => {

    db
        .getRoles()
        .then((roles) => {
            const roleChoices = roles.map((role) => ({
                value: role.id,
                name: role.title
            }))

            db
                .getEmployees()
                .then((employees) => {
                    const employeeNames = employees.map((employee) => ({
                        value: employee.id,
                        name: `${employee.first_name} ${employee.last_name}`
                    }))

                    inquirer
                        .prompt([
                            {
                                message: "Which employee do you want to update the role?",
                                name: "employeeName",
                                type: "list",
                                choices: employeeNames
                            },
                            {
                                message: "New employee's role",
                                name: "newRole",
                                type: "list",
                                choices: roleChoices
                            },
                        ]).then(res => {
                            connection.query("UPDATE employees SET ? WHERE ?", [
                                {
                                    role_id: res.newRole
                                },
                                {
                                    id: res.employeeName
                                }
                            ])

                            viewEmployees();
                        })
                })
        })
}

//Function delete department
const deleteDepartment = () => {

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
                        message: "Which department do you want to delete?",
                        name: "departmentName",
                        type: "list",
                        choices: departmentChoices
                    },

                ]).then(res => {

                    connection.query("DELETE FROM departments WHERE ?",
                        {
                            id: res.departmentName
                        }
                    );

                    viewDepartments();
                })
        })
}

//run init function
start();

