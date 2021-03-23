const inquirer = require('inquirer');
const connection = require('../../../config/connection');
const viewEmployees = require('./view-emp')
const addEmployee = require('./add-emp')
const deleteEmployee = require('./del-emp')
const editEmployee = require('./edit-emp')
const mainMenu = require('../main-menu')

const employeeMenu = () => {
    inquirer.prompt ([
        {
            type: 'list',
            message: 'Employees Menu',
            name: 'empMenu',
            choices: ['View Employees', 'Add Employee', 'Edit Employee', 'Delete Employee', 'Exit' ]
        }
    ])
    .then(menuChoice => {
        switch (menuChoice.empMenu) {
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

module.exports = employeeMenu