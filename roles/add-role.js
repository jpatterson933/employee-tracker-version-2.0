const inquirer = require('inquirer');
// const connection = require('../../../config/connection');
const connection = require('../config/connection');


let departmentId = [];
let deptDisplay = [];

const viewDept = async () => {
    const departmentName = connection.query('SELECT * FROM department', (err, res) => {
        if (err) throw err;
        res.forEach(({ department_id, department_name }) => {
            departmentId.push(department_id)
            deptDisplay.push(`-- ${department_name} : ${department_id} --`)
        })
    });
};
viewDept();
const addRole = () => {
    try {
        inquirer.prompt([
            {
                type: 'input',
                message: 'Please enter a Role Title',
                name: 'title',
                validate: checkInput => checkInput ? true : (console.log('Please enter a role title'), false)
            },
            {
                type: 'number',
                message: 'Enter Salary',
                name: 'salary',
                validate: checkInput => checkInput ? true : (console.log('Please enter a valid role title!'), false)
            },
            {
                type: 'list',
                message: `Department Info -- ${deptDisplay} --`,
                name: 'department',
                choices: departmentId
            }
        ])
            .then(({ title, salary, department }) => {
                try {
                    console.log('Inserting a new role...\n');
                    const query = 'INSERT INTO role SET ?';
                    connection.query(query,
                        {
                            title: `${title}`,
                            salary: `${salary}`,
                            department_id: `${department}`
                        },
                        (err, res) => {
                            try {
                                console.log(`${res.affectedRows} new role!\n`);
                                inquirer.prompt([
                                    {
                                        type: 'confirm',
                                        message: 'Would you like to add another role?',
                                        name: 'add'
                                    }
                                ])
                                    .then(({ add }) => {
                                        if (!add) {
                                            this.menu();
                                        } else if (add) {
                                            addRole();
                                        };
                                    });
                            } catch (err) {
                                console.log(err);
                            };
                        });
                } catch (err) {
                    console.log(err);
                };
            });
    } catch (err) {
        console.log(err);
    };
};

module.exports = addRole