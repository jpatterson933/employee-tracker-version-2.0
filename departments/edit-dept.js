const inquirer = require('inquirer');
const connection = require('../config/connection');
const deleteDepartment = require('./del-dep');

let deptDisplay = [];
//this is our view department funciton which will be used to populate the user choices when the select which department to delete
const viewDept = async () => {
    const departmentName = connection.query('SELECT * FROM department', (err, res) => {
        if (err) throw err;
        res.forEach(({ department_id, department_name }) => {
            deptDisplay.push(`( ${department_name} )`)
        })
    });
};

viewDept();

//this is our edit department funciton
const editDepartment = () => {

    inquirer
        .prompt([
            {
                type: 'input',
                message: `Current Departments \n ${deptDisplay}\n Please Enter a Department name`,
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
                    console.log(`${res.affectedRows} department updated!\n`);
                    //do i need to call my delete function?
                    console.log('Type node server and press ENTER for Main Menu')
                    connection.end();
                }
            );

            // logs the actual query being run
            // console.log(query.sql); --I do not need this now
            //-----------------------------------
        })
}

module.exports = editDepartment