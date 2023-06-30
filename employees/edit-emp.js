const inquirer = require('inquirer');
const connection = require('../config/connection');


const editEmployee = () => {
    inquirer.prompt([
        {
            type: 'input',
            message: 'Please enter an Employee you would like to edit',
            name: 'oldName',
            validate: checkInput => {
                if (checkInput) {
                    return true;
                } else {
                    console.log(`Please enter an employee name!`)
                    return false;
                }
            },
        },
        {
            type: 'input',
            message: 'Enter New Employee First Name',
            name: 'firstName',
            validate: checkInput => {
                if (checkInput) {
                    return true;
                } else {
                    console.log(`Please enter their first name!`)
                    return false;
                }
            }
        },
        {
            type: 'input',
            message: 'Enter New Employee Last Name',
            name: 'lastName',
            validate: checkInput => {
                if (checkInput) {
                    return true;
                } else {
                    console.log('Please enter their last name!')
                    return false;
                }
            }
        }
        //need to add a prompt that allows you to change the users role
    ])
        .then(edit => {
            //---------------------------------

            console.log('Updating Employee Name...\n');
            const query = connection.query(
                `UPDATE employee SET ? WHERE ?`,
                [
                    {
                        first_name: `${edit.firstName}`,
                        last_name: `${edit.lastName}`
                    },
                    {
                        first_name: `${edit.oldName}`
                    }
                ],
                (err, res) => {
                    if (err) throw err;
                    console.log(`${res.affectedRows} employees updated!\n`);
                    //do i need to call my delete function?
                    console.log('Type node server and press ENTER for Main Menu')
                    connection.end();
                }
            );

        })
}

module.exports = editEmployee