const inquirer = require('inquirer');
const connection = require('../config/connection');
const viewRoles = require('./view-roles')
const addRole = require('./add-role');
const deleteRole = require('./del-role')
const editRole = require('./edit-role')
const mainMenu = require('../main-menu')

class Role {
    constructor() {

    }


    menu() {
        try {
            inquirer
                .prompt([
                    {
                        type: 'list',
                        message: 'Employee Roles Menu',
                        name: 'menuChoice',
                        choices: ['View Roles', 'Add Role', 'Edit Role', 'Delete Role', 'Exit']
                    }
                ])
                .then(({ menuChoice }) => {
                    try {
                        switch (menuChoice) {
                            case 'View Roles':
                                console.log('You have chosen to view roles');
                                viewRoles();
                                break;
                            case 'Add Role':
                                console.log('You have chosen to add a role');
                                addRole();
                                break;
                            case 'Edit Role':
                                console.log('You have chosen to edit role');
                                editRole();
                                break;
                            case 'Delete Role':
                                console.log('You have chosen to delete a role');
                                deleteRole();
                                break;
                            case 'Exit':
                                console.log('Goodbye! Type node server to pull up main menu!');
                                connection.end();
                                break;
                        }
                    } catch (err) {
                        console.log(err);
                    };
                });
        } catch (err) {
            console.log(err);
        }
    }
}

const rolesMenu = () => {
    inquirer
        .prompt([
            {
                type: 'list',
                message: 'Employee Roles Menu',
                name: 'menuChoice',
                choices: ['View Roles', 'Add Role', 'Edit Role', 'Delete Role', 'Exit']
            }
        ])
        .then(({ menuChoice }) => {
            try {
                switch (menuChoice) {
                    case 'View Roles':
                        console.log('You have chosen to view roles');
                        viewRoles();
                        break;
                    case 'Add Role':
                        console.log('You have chosen to add a role');
                        addRole();
                        break;
                    case 'Edit Role':
                        console.log('You have chosen to edit role');
                        editRole();
                        break;
                    case 'Delete Role':
                        console.log('You have chosen to delete a role');
                        deleteRole();
                        break;
                    case 'Exit':
                        console.log('Goodbye! Type node server to pull up main menu!');
                        connection.end();
                        break;
                }
            } catch (err) {
                console.log(err);
            };
        });

};

module.exports = rolesMenu