const inquirer = require('inquirer');
const connection = require('../../../config/connection');
const viewDepartments = require('../departments/view-dept')

const addRole = () => {
    //add departments as choices

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
                if (checkInput) {
                    return true;
                } else {
                    console.log(`Please enter a valid role title!`)
                    return false;
                }
            }
        },
    ])
    .then(role => {
        console.log('Inserting a new role...\n');

        const insert = 'INSERT INTO role SET ?'

        connection.query(insert, 
            {
                title: `${role.title}`,
                salary: `${role.salary}`
            },
                (err, res) => {

                if (err) throw err;

                console.log(`${res.affectedRows} new role!\n`);
                // once the option has been inserted will need to call another prompt
                console.log('Type node server and press ENTER for Main Menu')
                connection.end();
            })
    })
}

module.exports = addRole