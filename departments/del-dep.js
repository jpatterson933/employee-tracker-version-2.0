const inquirer = require('inquirer');
const connection = require('../config/connection');

let departmentId = [];
let deptDisplay = [];
//this is our view department funciton which will be used to populate the user choices when the select which department to delete
const viewDept = async () => {
    const departmentName = connection.query('SELECT * FROM department', (err, res) => {
        if (err) throw err;
        res.forEach(({ department_id, department_name }) => {
            departmentId.push(department_id)
            deptDisplay.push(`( ${department_name} --> ${department_id} )`)
        })
    });
};

viewDept();
//this is our delete department function
const deleteDepartment = () => {
    inquirer.prompt ([
        {
            type: 'list',
            message: `(Department Name --> ID) \n ${deptDisplay}`,
            name: 'department',
            choices: departmentId       
        }
    ])
    .then(del => {
        //lets user know that the department is being deleted
        console.log('Deleting department...\n');
        connection.query(
          'DELETE FROM department WHERE ?',
          {
            department_id: `${del.department}`,
          },
          (err, res) => {
            if (err) throw err;
            console.log(`${res.affectedRows} departments deleted!\n`);
            inquirer.prompt ([
              {
                  type: 'confirm',
                  message: 'Would you like to add another department?',
                  name: 'del'
              }
          ])
          .then(choice => {
              if (!choice.del) {
                connection.end()
                console.log('Type node server and press ENTER for main menu!')
              } else if (choice.del) {
                //note when the user deletes a department and wnats to delete another one
                  //it will not remove the department from the display when the funciton is rerun
                deleteDepartment();
                return;
              }   
          })
          }
        );
    })
  };

  module.exports = deleteDepartment