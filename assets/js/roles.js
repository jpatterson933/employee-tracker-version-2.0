const inquirer = require('inquirer');
const connection = require('../../config/connection');

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
                break;
            case 'Add Role':
                console.log('You have chosen to add a role')
                break;
            case 'Edit Role':
                console.log('You have chosen to edit role')
                break;
            case 'Delete Role':
                console.log('You have chose to delete a role')
                break;
            case 'Exit':
                console.log('Goodbye')
                //need to add an exit function
                break;
        }
    })

}

module.exports = rolesMenu