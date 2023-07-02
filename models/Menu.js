const inquirer = require('inquirer');
const connection = require('../config/connection');
const Department = require('./Department');
const Role = require('./Role');
const Employee = require('./Employee');
const department = new Department();
const role = new Role();
const employee = new Employee();
class Menu {
    constructor() {

    }

    async menu() {
        try {
            const { menu } = await inquirer.prompt([
                {
                    type: 'list',
                    message: 'Main Menu',
                    name: 'menu',
                    choices: ['Departments', 'Employee Roles', 'Employees', 'Exit']
                }
            ]);

            return menu;

        } catch (err) {
            console.log(err);
        };
    };

    nav(choice) {
        try {
            switch (choice) {
                case 'Departments':
                    console.log('You choose departments');
                    department.menu();
                    break;
                case 'Employee Roles':
                    console.log('You choose employee roles');
                    role.menu();
                    break;
                case 'Employees':
                    console.log('You have chosen Employees');
                    employee.menu();
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

};

module.exports = Menu;