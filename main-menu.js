const inquirer = require('inquirer');
const connection = require('./config/connection');
const departmentsMenu = require('./departments/menu-dept')
const rolesMenu = require('./roles/menu-roles')
const employeeMenu = require('./employees/menu-emp')


const mainMenu = async () => {
    inquirer.prompt ([
        {
            type: 'list',
            message: 'Main Menu',
            name: 'menu',
            choices: ['Departments', 'Employee Roles', 'Employees', 'Exit']
        }
    ])
    .then (menuChoice => {
        switch (menuChoice.menu) {
            case 'Departments':
                console.log('You choose departments')
                departmentsMenu();
                break;
            case 'Employee Roles':
                console.log('You choose employee roles')
                rolesMenu();
                break;
            case 'Employees':
                console.log('You have chosen Employees')
                employeeMenu();
                break;
            case 'Exit':
                console.log('Goodbye! Type node server to restart the Employee Management System!')
                //why does this work here but not inside my other functions?
                // return mainMenu();
                //we will turn this on once we finalize the application
                connection.end();
                break;
        }
    })
}


module.exports = mainMenu;