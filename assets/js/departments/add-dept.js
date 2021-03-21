const inquirer = require('inquirer');
const connection = require('../../../config/connection');

const createDepartment = () => {
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
        connection.query('INSERT INTO department SET ?',
            {
            department_name: `${name.deptName}`,
            },
            (err, res) => {
                if (err) throw err;
                console.log(`${res.affectedRows} new department!\n`);
                // Call updateProduct AFTER the INSERT completes
          
        })
    })
}

module.exports = createDepartment