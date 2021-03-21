const inquirer = require('inquirer');
const connection = require('../../config/connection');

const mainMenu = () => {
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
                break;
            case 'Employee Roles':
                console.log('You choose employee roles')
                break;
            case 'Employees':
                console.log('You have chosen Employees')
                break;
            case 'Exit':
                console.log('Goodbye!')
                //we will turn this on once we finalize the application
                // connection.end();
                break;
        }
    })
}

module.exports = mainMenu;