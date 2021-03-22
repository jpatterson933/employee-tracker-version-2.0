const inquirer = require('inquirer');
const connection = require('../../../config/connection');

let empId = [];
let empDisplay = [];

const viewEmp = async () => {
    const departmentName = connection.query('SELECT * FROM employee', (err, res) => {
        if (err) throw err;
        res.forEach(({ employee_id, first_name }) => {
            empId.push(employee_id)
            empDisplay.push(`-- ${first_name} : ${employee_id} --`)
        })
    });
};

viewEmp();

const deleteEmployee = () => {
    inquirer.prompt ([
        {
            type: 'list',
            message: `${empDisplay}`,
            name: 'emp',
            choices: empId    
        }
    ])
    .then(del => {
        //need to add validation that role exists
        console.log('Deleting employee...\n');
        connection.query(
          'DELETE FROM employee WHERE ?',
          {
            employee_id: `${del.emp}`,
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