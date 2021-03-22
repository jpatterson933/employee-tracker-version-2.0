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
viewDept();

const deleteDepartment = () => {
    inquirer.prompt ([
        {
            type: 'list',
            message: `${deptDisplay}`,
            name: 'department',
            choices: departmentId       
        }
    ])
    .then(del => {


        //need to add validation that department exists
        console.log('Deleting department...\n');
        connection.query(
          'DELETE FROM department WHERE ?',
          {
            department_id: `${del.department}`,
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