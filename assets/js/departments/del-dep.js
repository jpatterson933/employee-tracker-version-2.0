const inquirer = require('inquirer');
const connection = require('../../../config/connection');

const deleteDepartment = () => {
    inquirer.prompt ([
        {
            type: 'input',
            message: 'Enter a Department',
            name: 'department',
            //is there a way to make this a list that populates from the already existing departments?
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
    .then(del => {


        //need to add validation that department exists
        console.log('Deleting department...\n');
        connection.query(
          'DELETE FROM department WHERE ?',
          {
            department_name: `${del.department}`,
          },
          (err, res) => {
            if (err) throw err;
            console.log(`${res.affectedRows} departments deleted!\n`);
            console.log('Type node server and press ENTER for Main Menu')
            connection.end();
          }
        );
    })
  };

  module.exports = deleteDepartment