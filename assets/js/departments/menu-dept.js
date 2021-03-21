const inquirer = require('inquirer');
const connection = require('../../../config/connection');
const viewDepartments = require('../departments/view-dept')
const addDepartment = require('../departments/add-dept')
const deleteDepartment = require('../departments/del-dep')

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
                break;
            case 'Delete Departments':
                console.log('You are eleminating an entire Department')
                deleteDepartment();
                break;
            case 'Exit':
                console.log('Goodbye');
                //here we will want to take them back to the main menu
                //when you run the mainMenu function it throws an error saying that it is not a function
                // mainMenu();
                break;
        }
    })
}

module.exports = departmentsMenu