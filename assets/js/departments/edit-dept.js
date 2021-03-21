const inquirer = require('inquirer');
const connection = require('../../../config/connection');
const deleteDepartment = require('./del-dep');

const editDepartment = () => {
    inquirer.prompt ([
        {
            type: 'input',
            message: 'Please enter Department you would like to edit',
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
    .then(edit => {
        //---------------------------------

        console.log('Updating Department Name...\n');
    const query = connection.query(
        `UPDATE department SET ? WHERE ?`,
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
        console.log(`${res.affectedRows} products updated!\n`);
            //do i need to call my delete function?
        }
    );

    // logs the actual query being run
    console.log(query.sql);
//-----------------------------------
    })
}

module.exports = editDepartment