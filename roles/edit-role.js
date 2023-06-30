const inquirer = require('inquirer');
const connection = require('../config/connection');


const editRole = () => {
    try {
        inquirer
            .prompt([
                {
                    type: 'confirm',
                    message: 'Are you sure you want to edit a role?',
                    name: 'edit'
                },
                {
                    type: 'list',
                    message: 'Please enter a Role you would like to edit',
                    name: 'oldTitle',
                    choices: this.roles,
                    validate: checkInput => checkInput ? true : (console.log('Please enter a role name!'), false)
                },
                {
                    type: 'input',
                    message: 'Enter new role title',
                    name: 'newTitle',
                    validate: checkInput => checkInput ? true : (console.log('Please enter a department name!'), false)
                },
                {
                    type: 'number',
                    message: 'Enter new salary',
                    name: 'newSal',
                    validate: checkInput => checkInput ? true : (console.log('Please enter a role salary!'), false)
                }
            ])
            .then(({ oldTitle, newTitle, newSal }) => {
                try {
                    console.log('Updating Role Name...\n');
                    const query = 'UPDATE role SET ? WHERE ?';
                    connection.query(query,
                        [
                            {
                                title: `${newTitle}`,
                                salary: `${newSal}`
                            },
                            {
                                title: `${oldTitle}`
                            }
                        ],
                        (err, res) => {
                            try {
                                console.log(`${res.affectedRows} roles updated!\n`);
                                this.menu();
                            } catch (err) {
                                console.log(err);
                            };
                        }
                    );
                } catch (err) {
                    console.log(err);
                };
            });
    } catch (err) {
        console.log(err);
    };
};

module.exports = editRole