const inquirer = require('inquirer');
const connection = require('./config/connection');
const departmentsMenu = require('./departments/menu-dept')
const rolesMenu = require('./roles/menu-roles')
const Employee = require('./employees/menu-emp')
const viewEmployees = require('./employees/view-emp')
const addEmployee = require('./employees/add-emp')
const editEmployee = require('./employees/edit-emp')
const deleteEmployee = require('./employees/del-emp')

const empMenuChoices = ['View Employees', 'Add Employee', 'Edit Employee', 'Delete Employee', 'Exit'];

// const empMenuFunctions = [viewEmployees(), addEmployee(), editEmployee(), deleteEmployee()]
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
                console.log('You choose departments')
                departmentsMenu();
                break;
            case 'Employee Roles':
                console.log('You choose employee roles')
                rolesMenu();
                break;
            case 'Employees':
                console.log('You have chosen Employees')
                // employeeMenu('Employees Menu', empMenuChoices);
                // employee.getRoles();
                employee.menu();
                break;
            case 'Exit':
                console.log('Goodbye! Type node server to restart the Employee Management System!')
                //why does this work here but not inside my other functions?
                // return mainMenu();
                //we will turn this on once we finalize the application
                connection.end();
                break;
        }
    } catch (err) {
        console.log(err)
    }
}


module.exports = mainMenu;