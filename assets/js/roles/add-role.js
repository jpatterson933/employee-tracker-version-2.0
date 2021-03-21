const inquirer = require('inquirer');
const connection = require('../../../config/connection');

const addRole = () => {
    inquirer.prompt ([
        {
            type: 'input',
            message: 'Please enter a Role Title',
            name: 'title',
            validate: checkInput => {
                if (checkInput) {
                    return true;
                } else {
                    console.log(`Please enter a role title!`)
                    return false;
                }
            }
        },
        {
            type: 'number',
            message: 'Enter Salary',
            name: 'salary',
            validate: checkInput => {
                if ()
            }
        }
    ])
    .then(name => {
        console.log('Inserting a new departments...\n');

        const insert = 'INSERT INTO department SET ?'

        connection.query(insert, {department_name: `${name.deptName}`}, (err, res) => {

                if (err) throw err;

                console.log(`${res.affectedRows} new department!\n`);
                // once the option has been inserted will need to call another prompt
            })
    })
}

module.exports = addDepartment