const inquirer = require('inquirer');
const connection = require('../../../config/connection');
const viewRoles = require('./view-roles')
const addRole = require('./add-role');
const deleteRole = require('./del-role')
const editRole = require('./edit-role')
const mainMenu = require('../main-menu')

const rolesMenu = () => {
    inquirer.prompt ([
        {
            type: 'list',
            message: 'Employee Roles Menu',
            name: 'roleMenu',
            choices: ['View Roles', 'Add Role', 'Edit Role', 'Delete Role', 'Exit']
        }
    ])
    .then(menuChoice => {
        switch (menuChoice.roleMenu) {
            case 'View Roles':
                console.log('You have chosen to view roles')
                viewRoles();
                break;
            case 'Add Role':
                console.log('You have chosen to add a role')
                addRole()
                break;
            case 'Edit Role':
                console.log('You have chosen to edit role')
                editRole();
                break;
            case 'Delete Role':
                console.log('You have chosen to delete a role')
                deleteRole();
                break;
            case 'Exit':
                console.log('Goodbye! Type node server to pull up main menu!')
                //need to add an exit function
                return mainMenu();
                connection.end();
                break;
        }
    })

}

module.exports = rolesMenu