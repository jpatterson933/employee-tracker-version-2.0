const inquirer = require('inquirer');
const connection = require('../config/connection');
const viewDepartments = require('../departments/view-dept')
const addDepartment = require('../departments/add-dept')
const deleteDepartment = require('../departments/del-dep')
const editDepartment = require('../departments/edit-dept')
const mainMenu = require('../main-menu')

class Department {
    constructor() {

    }





    menu() {
        inquirer
            .prompt([
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
                        // viewDepartments();
                        this.view();
                        break;
                    case 'Add Departments':
                        console.log('You chose to add a department')
                        // addDepartment();
                        this.add();
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


    view() {
        try {
            const query = 'SELECT * FROM department';

            connection.query(query, (err, res) => {
                // if (err) throw err;
                try {

                    res.forEach(({ department_id, department_name }) => {
                        console.table(`${department_id} | ${department_name}`);
                    });
                    console.log('-----------------------------------');
                    // console.log('Type CTRL + C to exit!')
                    this.menu();
                } catch (err) {
                    console.log(err);
                };
                // connection.end();
            });
        } catch (err) {
            console.log(err);
        };
    };

    add() {
        inquirer
            .prompt([
                {
                    type: 'input',
                    message: 'Please enter a Department Name',
                    name: 'deptName',
                    validate: checkInput => checkInput ? true : (console.log('Please enter a department name!'), false)
                }
            ])
            .then(({ deptName }) => {
                console.log('Inserting a new departments...\n');

                const insert = 'INSERT INTO department SET ?'

                connection.query(insert,
                    {
                        department_name: `${deptName}`
                    },
                    (err, res) => {


                        console.log(`${res.affectedRows} new department!\n`);
                        // once the option has been inserted will need to call another prompt
                        inquirer.prompt([
                            {
                                type: 'confirm',
                                message: 'Would you like to add another department?',
                                name: 'add'
                            }
                        ])
                            .then(({ add }) => {
                                if (!add) {
                                    // connection.end()
                                    this.menu();
                                    console.log('Type node server and press ENTER for main menu!');
                                } else if (add) {
                                    this.add();
                                    return;
                                };
                            });
                    });
            });
    };

    edit() {
        inquirer
            .prompt([
                {
                    type: 'input',
                    message: `Current Departments \n ${deptDisplay}\n Please Enter a Department name`,
                    name: 'oldName',
                    validate: checkInput => {
                        if (checkInput) {
                            return true;
                        } else {
                            console.log(`Please enter a department name!`)
                            return false;
                        }
                    },
                },
                {
                    type: 'input',
                    message: 'Enter new department name',
                    name: 'newName',
                    validate: checkInput => checkInput ? true : (console.log("Please enter a department name!"), false)
                }
            ])
            .then(edit => {
                //---------------------------------
                const query = 'UPDATE department SET ? WHERE ?';
                console.log('Updating Department Name...\n');
                connection.query(query,
                    [
                        {
                            department_name: `${edit.newName}`,
                        },
                        {
                            department_name: `${edit.oldName}`
                        }
                    ],
                    (err, res) => {
                        if (err) throw err;
                        console.log(`${res.affectedRows} department updated!\n`);
                        //do i need to call my delete function?
                        console.log('Type node server and press ENTER for Main Menu')
                        // connection.end();
                        this.menu();
                    }
                );

                // logs the actual query being run
                // console.log(query.sql); --I do not need this now
                //-----------------------------------
            })
    }


};

const departmentsMenu = () => {
    inquirer
        .prompt([
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

module.exports = Department;