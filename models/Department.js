const inquirer = require('inquirer');
const connection = require('../config/connection');
const Main = require('./Main');
// const mainMenu = require('../main-menu');
class Department extends Main {
    constructor(mainMenu) {
        super();
        this.mainMenu = mainMenu;
    }

    menu() {
        try {
            inquirer
                .prompt([
                    {
                        type: 'list',
                        message: 'Departments Menu',
                        name: 'menuChoice',
                        choices: ['View Departments', 'Add Departments', 'Edit Departments', 'Delete Departments', 'Exit']
                    }
                ])
                .then(({ menuChoice }) => {
                    try {

                        switch (menuChoice) {
                            case 'View Departments':
                                console.log('You chose view departments')
                                this.view(this.mainMenu);
                                break;
                            case 'Add Departments':
                                console.log('You chose to add a department')
                                this.add(this.mainMenu);
                                break;
                            case 'Edit Departments':
                                console.log('You chose to edit the departments')
                                super.getDepartments();
                                this.edit(this.mainMenu);
                                break;
                            case 'Delete Departments':
                                console.log('You are eleminating an entire Department')
                                this.delete(this.mainMenu);
                                break;
                            case 'Exit':
                                console.log('Goodbye! Type node server to pull up main menu!')
                                this.mainMenu();
                                break;
                        };
                    } catch (err) {
                        console.log(err);
                    }
                });
        } catch (err) {
            console.log(err);
        };
    };

    view() {
        try {
            const query = 'SELECT * FROM department';
            connection.query(query, (err, res) => {
                try {
                    res.forEach(({ department_id, department_name }) => {
                        console.table(`${department_id} | ${department_name}`);
                    });
                    console.log('-----------------------------------');
                    this.menu(this.mainMenu);
                } catch (err) {
                    console.log(err);
                };
            });
        } catch (err) {
            console.log(err);
        };
    };

    add() {
        try {
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
                    try {
                        console.log('Inserting a new departments...\n');

                        const query = 'INSERT INTO department SET ?'

                        connection.query(query,
                            {
                                department_name: `${deptName}`
                            },
                            (err, res) => {
                                try {
                                    console.log(`${res.affectedRows} new department!\n`);
                                    // once the option has been inserted will need to call another prompt
                                    inquirer
                                        .prompt([
                                            {
                                                type: 'confirm',
                                                message: 'Would you like to add another department?',
                                                name: 'add'
                                            }
                                        ])
                                        .then(({ add }) => {
                                            try {
                                                if (!add) {
                                                    this.menu(this.mainMenu);
                                                } else if (add) {
                                                    this.add(this.mainMenu);
                                                    return;
                                                };
                                            } catch (err) {
                                                console.log(err);
                                            }
                                        });
                                } catch (err) {
                                    console.log(err);
                                };
                            });
                    } catch (err) {
                        console.log(err);
                    };
                });
        } catch (err) {
            console.log(err);
        };
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
                ])
                .then(({ edit }) => {
                    if (!edit) {
                        this.menu(this.mainMenu);
                        return;
                    } else if (edit) {
                        try {

                            inquirer
                                .prompt([

                                    {
                                        type: 'list',
                                        message: this.departments,
                                        name: 'id',
                                        choices: this.departmentId,
                                    },
                                    {
                                        type: 'input',
                                        message: 'Enter new department name',
                                        name: 'newName',
                                        validate: checkInput => checkInput ? true : (console.log("Please enter a department name!"), false)
                                    }
                                ])
                                .then(({ id, newName }) => {
                                    try {
                                        const query = 'UPDATE department SET ? WHERE ?';
                                        console.log('Updating Department Name...\n');
                                        connection.query(query,
                                            [
                                                {
                                                    department_name: `${newName}`,
                                                },
                                                {
                                                    department_id: `${id}`
                                                }
                                            ],
                                            (err, res) => {
                                                try {
                                                    console.log(`${res.affectedRows} department updated!\n`);
                                                    this.menu(this.mainMenu);
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
                            console.error(err);
                        };
                    };
                });

        } catch (err) {
            console.log(err);
        };
    };

    delete() {
        // needs to be kept in here so it refreshes list when this.delete() is called if user decides to delete another department
        super.getDepartments();
        try {
            inquirer
                .prompt([
                    {
                        type: 'confirm',
                        message: 'Are you sure you want to delete a department?',
                        name: 'remove'
                    },
                ])
                .then(({ remove }) => {
                    try {
                        if (!remove) {
                            this.menu(this.mainMenu);
                            return;
                        } else if (remove) {
                            inquirer
                                .prompt([
                                    {
                                        type: 'list',
                                        message: this.departments,
                                        name: 'department',
                                        choices: this.departmentId
                                    }
                                ])

                                .then(({ department }) => {
                                    try {
                                        const query = 'DELETE FROM department WHERE ?';
                                        //lets user know that the department is being deleted
                                        console.log('Deleting department...\n');
                                        connection.query(query,
                                            {
                                                department_id: `${department}`,
                                            },
                                            (err, res) => {
                                                try {
                                                    console.log(`${res.affectedRows} departments deleted!\n`);
                                                    inquirer
                                                        .prompt([
                                                            {
                                                                type: 'confirm',
                                                                message: 'Would you like to delete another department?',
                                                                name: 'del'
                                                            }
                                                        ])
                                                        .then(({ del }) => {
                                                            try {
                                                                return (!del) ? (this.menu(this.mainMenu)) : (this.delete(this.mainMenu));
                                                            } catch (err) {
                                                                console.error(err);
                                                            };
                                                        });
                                                } catch (err) {
                                                    console.log(err);
                                                };
                                            }
                                        );
                                    } catch (err) {
                                        console.log(err);
                                    };
                                });
                        };
                    } catch (err) {
                        console.log(err);
                    };
                });
        } catch (err) {
            console.log(err);
        };
    };
};

module.exports = Department;