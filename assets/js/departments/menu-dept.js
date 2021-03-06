const inquirer = require('inquirer');
const connection = require('../../../config/connection');
const viewDepartments = require('../departments/view-dept')
const addDepartment = require('../departments/add-dept')
const deleteDepartment = require('../departments/del-dep')
const editDepartment = require('../departments/edit-dept')
const mainMenu = require('../main-menu')

const departmentsMenu = () => {
    inquirer.prompt ([
        {
            type: 'list',
            message: 'Departments Menu',
            name: 'deptMenu',
            choices: ['View Departments', 'Add Departments', 'Edit Departments', 'Delete Departments', 'Exit']
        }
    ])
    .then(menuChoice => {
        switch (menuChoice.deptMenu) {
            case 'View Departments':
                console.log('You chose view departments')
                viewDepartments();
                break;
            case 'Add Departments':
                console.log('You chose to add a department')
                addDepartment();
                break;
            case 'Edit Departments':
                console.log('You chose to edit the departments')
                editDepartment();
                break;
            case 'Delete Departments':
                console.log('You are eleminating an entire Department')
                deleteDepartment();
                break;
            case 'Exit':
                console.log('Goodbye! Type node server to pull up main menu!')
                //need to add an exit function
                // return mainMenu();
                connection.end();
                break;
        }
    })
}

module.exports = departmentsMenu