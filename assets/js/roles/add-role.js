const inquirer = require('inquirer');
const connection = require('../../../config/connection');

let departmentId = [];
let deptName = [];

const viewDept = async () => {
    const departmentName = connection.query('SELECT * FROM department', (err, res) => {
        if (err) throw err;
        res.forEach(({ department_id, department_name }) => {
            departmentId.push(department_id)
            deptName.push(department_name)
        })
    });
};
viewDept();
const addRole = () => {
    
    //tells us which department choices we have
    console.log(departmentId)
    console.log(deptName)
    
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
        {
            type: 'list',
            message: 'Which Department does this role belong to?',
            name: 'department',
            choices: departmentId
        }
    ])
    .then(role => {
        console.log('Inserting a new role...\n');

        const insert = 'INSERT INTO role SET ?'

        connection.query(insert, 
            {
                title: `${role.title}`,
                salary: `${role.salary}`,
                department_id: `${role.department}`
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