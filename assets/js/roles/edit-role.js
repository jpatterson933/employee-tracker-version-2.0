const inquirer = require('inquirer');
const connection = require('../../../config/connection');


const editRole = () => {
    inquirer.prompt ([
        {
            type: 'input',
            message: 'Please enter a Role you would like to edit',
            name: 'oldTitle',
            validate: checkInput => {
                if (checkInput) {
                    return true;
                } else {
                    console.log(`Please enter a role name!`)
                    return false;
                }
            },
        },
        {
            type: 'input',
            message: 'Enter new role title',
            name: 'newTitle',
            validate: checkInput => {
                if (checkInput) {
                    return true;
                } else {
                    console.log(`Please enter a department name!`)
                    return false;
                }
            }
        },
        {
            type: 'number',
            message: 'Enter new salary',
            name: 'newSal',
            validate: checkInput => {
                if (checkInput) {
                    return true;
                } else {
                    console.log('Please enter a role salary!')
                    return false;
                }
            }
        }
    ])
    .then(edit => {
        //---------------------------------

        console.log('Updating Role Name...\n');
    const query = connection.query(
        `UPDATE role SET ? WHERE ?`,
        [
        {
            title: `${edit.newTitle}`,
            salary: `${edit.newSal}`
        },
        {
            title: `${edit.oldTitle}`
        }
        ],
        (err, res) => {
        if (err) throw err;
        console.log(`${res.affectedRows} roles updated!\n`);
        console.log('Type node server and press ENTER for Main Menu')
        connection.end();
            //do i need to call my delete function?
        }
    );

    // logs the actual query being run
    console.log(query.sql);
//-----------------------------------
    })
}

module.exports = editRole