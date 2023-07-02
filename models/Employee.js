const inquirer = require('inquirer');
const connection = require('../config/connection');
const Main = require('./Main');
class Employee extends Main {
    constructor() {
        super();
    };

    menu() {
        try {
            inquirer
                .prompt([
                    {
                        type: 'list',
                        message: 'Employees Menu',
                        name: 'menuChoice',
                        choices: ['View Employees', 'Add Employee', 'Edit Employee', 'Delete Employee', 'Exit']
                    }
                ])
                .then(({ menuChoice }) => {
                    switch (menuChoice) {
                        case 'View Employees':
                            console.log('You have chosen to view employees');
                            this.view();
                            break;
                        case 'Add Employee':
                            console.log('You have chosen to add an employee');
                            super.getRoles();
                            this.add();
                            break;
                        case 'Edit Employee':
                            console.log('You have chosen to edit an employee');
                            super.getEmployees();
                            this.edit();
                            break;
                        case 'Delete Employee':
                            console.log('You have chosen to fire someone');
                            super.getEmployees();
                            this.delete();
                            break;
                        case 'Exit':
                            console.log('Goodbye! Type node server to pull up main menu!');
                            connection.end();
                            break;
                    };
                });
        } catch (err) {
            console.log(err);
        };
    };

    view() {
        try {
            const query = 'SELECT * FROM employee';
            connection.query(query, (err, res) => {
                try {
                    res.forEach(({ employee_id, first_name, last_name, role_id }) => {
                        console.log(`Employee ID : ${employee_id} | Employee Name : ${first_name} ${last_name} | Role ID : ${role_id}`);
                    });
                    console.log('-----------------------------------');
                    this.menu();
                } catch (err) {
                    console.log(err);
                };
            });
        } catch (err) {
            console.log(err);
        };
    };

    add() {
        try {
            inquirer
                .prompt([
                    {
                        type: 'input',
                        message: "Enter employee's first name",
                        name: 'firstName',
                        validate: checkInput => checkInput ? true : (console.log('Please enter a name!'), false),
                    },
                    {
                        type: 'input',
                        message: "Enter employee's last name",
                        name: 'lastName',
                        validate: checkInput => checkInput ? true : (console.log("Please enter a valid role title!"), false)
                    },
                    {
                        type: 'list',
                        message: this.roleName,
                        name: 'roleId',
                        choices: this.roleId
                    }
                    //i need to add a role chain here as well as an manager boolean yes or no choice option
                ])
                .then(({ firstName, lastName, roleId }) => {
                    try {
                        console.log('Inserting a new employee...\n');
                        const query = 'INSERT INTO employee SET ?';
                        connection.query(query,
                            {
                                first_name: `${firstName}`,
                                last_name: `${lastName}`,
                                role_id: `${roleId}`
                                //manager boolean?
                            },
                            (err, res) => {

                                try {
                                    console.log(`${res.affectedRows} new employee!\n`);
                                    inquirer
                                        .prompt([
                                            {
                                                type: 'confirm',
                                                message: 'Would you like to add another employee?',
                                                name: 'add'
                                            }
                                        ])
                                        .then(({ add }) => {
                                            try {
                                                if (!add) {
                                                    this.menu(); // return to main employee menu
                                                } else if (add) {
                                                    this.add();
                                                    return;
                                                };
                                            } catch (err) {
                                                console.log(err);
                                            };
                                        });
                                } catch (err) {
                                    console.log(err);
                                };
                            });
                    } catch (err) {
                        console.log(err);
                    };
                });
        } catch (err) {
            console.log(err);
        };
    };

    edit() {
        try {
            inquirer
                .prompt([
                    {
                        type: 'confirm',
                        message: 'Are you sure you would like to edit an employee?',
                        name: 'edit'
                    },
                ])
                .then(({ edit }) => {
                    if (!edit) {
                        this.menu();
                        return;
                    } else if (edit) {
                        inquirer
                            .prompt([
                                {
                                    type: 'list',
                                    message: 'Please choose an employee to edit',
                                    name: 'oldName',
                                    choices: this.employees,
                                },
                                {
                                    type: 'input',
                                    message: 'Enter New Employee First Name',
                                    name: 'firstName',
                                    validate: checkInput => checkInput ? true : (console.log('Please enter their first name!', false))
                                },
                                {
                                    type: 'input',
                                    message: 'Enter New Employee Last Name',
                                    name: 'lastName',
                                    validate: checkInput => checkInput ? true : (console.log('Please enter their last name!'), false)
                                }

                            ])
                            //need to add a prompt that allows you to change the users role
                            .then(({ oldName, firstName, lastName }) => {
                                try {
                                    const query = 'UPDATE employee SET ? WHERE ?';
                                    console.log('Updating Employee Name...\n');
                                    connection.query(query,
                                        [
                                            {
                                                first_name: `${firstName}`,
                                                last_name: `${lastName}`
                                            },
                                            {
                                                first_name: `${oldName}`
                                            }
                                        ],
                                        (err, res) => {
                                            try {
                                                console.log(`${res.affectedRows} employees updated!\n`);
                                                console.log('Type node server and press ENTER for Main Menu');
                                                this.menu();
                                            } catch (err) {
                                                console.log(err);
                                            };
                                        }
                                    );
                                } catch (err) {
                                    console.log(err);
                                };
                            });
                    };
                });
        } catch (err) {
            console.log(err);
        };
    };

    delete() {
        try {
            inquirer
                .prompt([
                    {
                        type: 'confirm',
                        message: 'Are you sure you want to remove an employee?',
                        name: 'remove'
                    },
                ])
                .then(({ remove }) => {
                    try {
                        if (!remove) {
                            this.menu();
                            return;
                        } else if (remove) {
                            try {
                                inquirer
                                    .prompt([
                                        {
                                            type: 'list',
                                            message: 'Choose an employee to delete',
                                            name: 'emp',
                                            choices: this.employees
                                        }
                                    ])
                                    .then(({ emp }) => {
                                        try {
                                            console.log('Deleting employee...\n');
                                            const query = 'DELETE FROM employee WHERE ?';
                                            connection.query(query,
                                                {
                                                    first_name: `${emp}`,
                                                },
                                                (err, res) => {
                                                    try {
                                                        console.log(`${res.affectedRows} employee deleted!\n`);
                                                        this.menu();
                                                    } catch (err) {
                                                        console.log(err);
                                                    };
                                                }
                                            );
                                        } catch (err) {
                                            console.log(err);
                                        };
                                    });
                            } catch (err) {
                                console.log(err);
                            };
                        };
                    } catch (err) {
                        console.log(err);
                    };
                });
        } catch (err) {
            console.log(err);
        };
    };
};

module.exports = Employee;