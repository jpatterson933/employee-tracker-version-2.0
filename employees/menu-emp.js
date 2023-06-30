const inquirer = require('inquirer');
const connection = require('../config/connection');
const viewEmployees = require('./view-emp')
const addEmployee = require('./add-emp')
const deleteEmployee = require('./del-emp')
const editEmployee = require('./edit-emp')
const mainMenu = require('../main-menu')

class Employee {
    constructor() {

        this.roleId = [];
        this.roleDisplay = [];

    }

    menu() {
        inquirer.prompt([
            {
                type: 'list',
                message: 'Employees Menu',
                name: 'response',
                choices: ['View Employees', 'Add Employee', 'Edit Employee', 'Delete Employee', 'Exit']
            }
        ])
            .then(({ response }) => {
                switch (response) {
                    case 'View Employees':
                        console.log('You have chosen to view employees')
                        // viewEmployees();
                        this.view();
                        break;
                    case 'Add Employee':
                        console.log('You have chosen to add an employee')
                        // addEmployee();
                        // this.getRoles();
                        this.add();
                        break;
                    case 'Edit Employee':
                        console.log('You have chosen to edit an employee')
                        editEmployee()
                        break;
                    case 'Delete Employee':
                        console.log('You have chosen to fire someone')
                        deleteEmployee();
                        break;
                    case 'Exit':
                        console.log('Goodbye! Type node server to pull up main menu!')
                        // //need to add an exit function
                        // return mainMenu();
                        connection.end();
                        break;
                }
            })
    }

    async getRoles() {
        const query = 'SELECT * FROM role';
        connection.query(query, (err, res) => {
            try {
                res.forEach(({ role_id, title }) => {
                    this.roleId.push(role_id)
                    this.roleDisplay.push(`-- ${title}: ${role_id} --`)
                })

            } catch (err) {
                console.log(err);
            }
        });
    }

    async add() {
        try {
            this.getRoles();
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
                        message: this.roleDisplay,
                        name: 'roleId',
                        choices: this.roleId
                    }
                    //i need to add a role chain here as well as an manager boolean yes or no choice option
                ])
                .then(({ firstName, lastName, roleId }) => {
                    console.log('Inserting a new employee...\n');

                    const query = 'INSERT INTO employee SET ?'

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

                                inquirer.prompt([
                                    {
                                        type: 'confirm',
                                        message: 'Would you like to add another employee?',
                                        name: 'add'
                                    }
                                ])
                                    .then(choice => {
                                        if (!choice.add) {
                                            this.menu(); // return to main employee menu
                                        } else if (choice.add) {
                                            addEmployee();
                                            return;
                                        }
                                    })
                            } catch (err) {
                                console.log(err);
                            }
                        })
                })
        } catch (err) {
            console.log(err)
        }

    }

    async view() {
        connection.query('SELECT * FROM employee', (err, res) => {
            if (err) throw err;
            try {

                //deconstruct
                res.forEach(({ employee_id, first_name, last_name, role_id }) => {
                    console.log(`Employee ID : ${employee_id} | Employee Name : ${first_name} ${last_name} | Role ID : ${role_id}`);
                });
                console.log('-----------------------------------');
                // console.log('Type node server and press ENTER for Main Menu')
                // connection.end();
                this.menu();
            } catch (err) {
                console.log(err);
            }
        });
    }

}


const employeeMenu = (menuMessage, choiceArray) => {
    inquirer.prompt([
        {
            type: 'list',
            message: menuMessage,
            name: 'response',
            choices: choiceArray
        }
    ])
        .then(({ response }) => {
            switch (response) {
                case 'View Employees':
                    console.log('You have chosen to view employees')
                    viewEmployees();
                    break;
                case 'Add Employee':
                    console.log('You ahve chosen to add an employee')
                    addEmployee();
                    break;
                case 'Edit Employee':
                    console.log('You have chosen to edit an employee')
                    editEmployee()
                    break;
                case 'Delete Employee':
                    console.log('You have chosen to fire someone')
                    deleteEmployee();
                    break;
                case 'Exit':
                    console.log('Goodbye! Type node server to pull up main menu!')
                    // //need to add an exit function
                    // return mainMenu();
                    connection.end();
                    break;
            }
        })
}

module.exports = Employee;