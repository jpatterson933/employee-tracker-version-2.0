const inquirer = require('inquirer');
const connection = require('../../../config/connection');

const addDepartment = () => {
    inquirer.prompt ([
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

        connection.query(insert, {department_name: `${name.deptName}`}, (err, res) => {

                if (err) throw err;

                console.log(`${res.affectedRows} new department!\n`);
                console.log('Type node server and press ENTER for main menu!')
                connection.end()
                // once the option has been inserted will need to call another prompt
            })
    })
}

module.exports = addDepartment