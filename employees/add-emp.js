const inquirer = require('inquirer');
const connection = require('../config/connection');

let roleId = [];
let roleDisplay = [];

const viewRole = async () => {
    const roleName = connection.query('SELECT * FROM role', (err, res) => {
        if (err) throw err;
        res.forEach(({ role_id, title }) => {
            roleId.push(role_id)
            roleDisplay.push(`-- ${title}: ${role_id} --`)
        })
    });
};

viewRole();

const addEmployee = () => {
    console.log(roleDisplay)
    inquirer.prompt([
        {
            type: 'input',
            message: "Enter employee's first name",
            name: 'firstName',
            validate: checkInput => {
                if (checkInput) {
                    return true;
                } else {
                    console.log(`Please enter a name!`)
                    return false;
                }
            }
        },
        {
            type: 'input',
            message: "Enter employee's last name",
            name: 'lastName',
            validate: checkInput => {
                if (checkInput) {
                    return true;
                } else {
                    console.log(`Please enter a valid role title!`)
                    return false;
                }
            }
        },
        {
            type: 'list',
            message: roleDisplay,
            name: 'roleId',
            choices: roleId
        }
        //i need to add a role chain here as well as an manager boolean yes or no choice option
    ])
        .then(emp => {
            console.log('Inserting a new employee...\n');

            const insert = 'INSERT INTO employee SET ?'

            connection.query(insert,
                {
                    first_name: `${emp.firstName}`,
                    last_name: `${emp.lastName}`,
                    role_id: `${emp.roleId}`
                    //manager boolean?
                },
                (err, res) => {

                    if (err) throw err;

                    console.log(`${res.affectedRows} new employee!\n`);
                    inquirer.prompt([
                        {
                            type: 'confirm',
                            message: 'Would you like to add another employee?',
                            name: 'add'
                        }
                    ])
                        .then(choice => {
                            if (!choice.add) {
                                connection.end()
                                console.log('Type node server and press ENTER for main menu!')
                            } else if (choice.add) {
                                addEmployee();
                                return;
                            }
                        })
                })
        })
}

module.exports = addEmployee