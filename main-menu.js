const inquirer = require('inquirer');
const connection = require('./config/connection');
const Menu = require('./models/Menu');
const Department = require('./models/Department');
const Role = require('./models/Role');
const Employee = require('./models/Employee');

const empMenuChoices = ['View Employees', 'Add Employee', 'Edit Employee', 'Delete Employee', 'Exit'];

// const empMenuFunctions = [viewEmployees(), addEmployee(), editEmployee(), deleteEmployee()]
const department = new Department();
const role = new Role();
const employee = new Employee();
const mainMenu = async () => {
    try {
        const { menu } = await inquirer.prompt([
            {
                type: 'list',
                message: 'Main Menu',
                name: 'menu',
                choices: ['Departments', 'Employee Roles', 'Employees', 'Exit']
            }
        ]);

        switch (menu) {
            case 'Departments':
                console.log('You choose departments');
                department.menu(mainMenu);
                break;
            case 'Employee Roles':
                console.log('You choose employee roles');
                role.menu(mainMenu);
                break;
            case 'Employees':
                console.log('You have chosen Employees');
                employee.menu(mainMenu);
                break;
            case 'Exit':
                console.log('Goodbye! Type node server to restart the Employee Management System!');
                connection.end();
                break;
        }
    } catch (err) {
        console.log(err);
    };
};

module.exports = mainMenu;


// const mainMenu = async () => {
//     try {
//         const choice = await menu.menu();
//         menu.nav(choice);
//     } catch (err) {
//         console.log(err);
//     };
// };
// module.exports = mainMenu;