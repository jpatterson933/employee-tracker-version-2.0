const inquirer = require('inquirer');
const connection = require('../../../config/connection');

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

const deleteEmployee = () => {
    inquirer.prompt ([
        {
            type: 'input',
            message: 'Enter an Employee First Name',
            name: 'firstName',
            //is there a way to make this a list that populates from the already existing roles?
            validate: checkInput => {
                if (checkInput) {
                    return true;
                } else {
                    console.log(`Please enter a valid Employee!`)
                    return false;
                }
            }            
        }
    ])
    .then(del => {
        //need to add validation that role exists
        console.log('Deleting employee...\n');
        connection.query(
          'DELETE FROM employee WHERE ?',
          {
            first_name: `${del.firstName}`,
          },
          (err, res) => {
            if (err) throw err;
            console.log(`${res.affectedRows} employee deleted!\n`);
            console.log('Type node server and press ENTER for Main Menu')
            connection.end();
          }
        );
    })
  };

  module.exports = deleteEmployee