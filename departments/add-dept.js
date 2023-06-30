const inquirer = require('inquirer');
const connection = require('../config/connection');
const cTable = require('console.table')

const addDepartment = () => {
    inquirer
        .prompt([
            {
                type: 'input',
                message: 'Please enter a Department Name',
                name: 'deptName',
                validate: checkInput => {
                    if (checkInput) {
                        return true;
                    } else {
                        console.log(`Please enter a department name!`)
                        return false;
                    }
                }
            }
        ])
        .then(name => {
            console.log('Inserting a new departments...\n');

            const insert = 'INSERT INTO department SET ?'

            connection.query(insert,
                {
                    department_name: `${name.deptName}`
                },
                (err, res) => {

                    if (err) throw err;

                    console.log(`${res.affectedRows} new department!\n`);
                    // once the option has been inserted will need to call another prompt
                    inquirer.prompt([
                        {
                            type: 'confirm',
                            message: 'Would you like to add another department?',
                            name: 'add'
                        }
                    ])
                        .then(choice => {
                            if (!choice.add) {
                                connection.end()
                                console.log('Type node server and press ENTER for main menu!')
                            } else if (choice.add) {
                                addDepartment();
                                return;
                            }
                        })
                })
        })
}

module.exports = addDepartment