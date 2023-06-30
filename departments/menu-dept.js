const inquirer = require('inquirer');
const connection = require('../config/connection');
const viewDepartments = require('../departments/view-dept')
const addDepartment = require('../departments/add-dept')
const deleteDepartment = require('../departments/del-dep')
const editDepartment = require('../departments/edit-dept')
const mainMenu = require('../main-menu')

class Department {
    constructor() {
        this.departments = []

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
                        // editDepartment();
                        this.getDepartments();
                        this.edit();
                        break;
                    case 'Delete Departments':
                        console.log('You are eleminating an entire Department')
                        // deleteDepartment();
                        this.getDepartments();
                        this.delete();
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

    async getDepartments() {
        try {
            connection.query('SELECT * FROM department', (err, res) => {
                if (err) throw err;
                res.forEach(({ department_name }) => {
                    this.departments.push(department_name);
                })
            });
        } catch (err) {
            console.log(err);
        };
    };


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
        try {
            inquirer
                .prompt([
                    {
                        type: 'confirm',
                        message: 'Are you sure you want to edit the departments?',
                        name: 'edit'
                    },
                    {
                        type: 'list',
                        message: 'Please Select a department to edit',
                        name: 'oldName',
                        choices: this.departments,
                        // validate: checkInput => checkInput ? true : (console.log('Please enter a department name!'), false)
                    },
                    {
                        type: 'input',
                        message: 'Enter new department name',
                        name: 'newName',
                        validate: checkInput => checkInput ? true : (console.log("Please enter a department name!"), false)
                    }
                ])
                .then(({ oldName, newName }) => {
                    //---------------------------------
                    try {
                        console.log(oldName, newName, "names here?")
                        const query = 'UPDATE department SET ? WHERE ?';
                        console.log('Updating Department Name...\n');
                        connection.query(query,
                            [
                                {
                                    department_name: `${newName}`,
                                },
                                {
                                    department_name: `${oldName}`
                                }
                            ],
                            (err, res) => {
                                try {
                                    console.log(res, "department edit response")
                                    console.log(`${res.affectedRows} department updated!\n`);
                                    this.menu();
                                } catch (err) {
                                    console.log(err);
                                }
                            }
                        );
                    } catch (err) {
                        console.log(err);
                    };
                });


        } catch (err) {
            console.log(err);
        };
    };

    delete() {
        try {
            inquirer
                .prompt([
                    {
                        type: 'confirm',
                        message: 'Are you sure you want to delete a department?',
                        name: 'delete'
                    },
                    {
                        type: 'list',
                        message: 'Please choose a department to delete',
                        name: 'department',
                        choices: this.departments
                    }
                ])
                .then(({ department }) => {
                    try {
                        const query = 'DELETE FROM department WHERE ?';
                        //lets user know that the department is being deleted
                        console.log('Deleting department...\n');
                        connection.query(query,
                            {
                                department_name: `${department}`,
                            },
                            (err, res) => {
                                try {
                                    console.log(`${res.affectedRows} departments deleted!\n`);
                                    inquirer
                                        .prompt([
                                            {
                                                type: 'confirm',
                                                message: 'Would you like to add another department?',
                                                name: 'del'
                                            }
                                        ])
                                        .then(({ del }) => {
                                            if (!del) {
                                                // connection.end()
                                                this.menu();
                                                // console.log('Type node server and press ENTER for main menu!')
                                            } else if (del) {
                                                //note when the user deletes a department and wnats to delete another one
                                                //it will not remove the department from the display when the funciton is rerun
                                                // deleteDepartment();
                                                this.delete();
                                                return;
                                            }
                                        })
                                } catch (err) {
                                    console.log(err);
                                };
                            }
                        );
                    } catch (err) {
                        console.log(err);
                    };
                });
        } catch (err) {
            console.log(err);
        };
    };


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