const inquirer = require('inquirer');
const connection = require('../config/connection');

let roleId = [];
let roleDisplay = [];

const viewRole = async () => {
  const roleName = connection.query('SELECT * FROM role', (err, res) => {
      if (err) throw err;
      res.forEach(({ role_id, title }) => {
          roleId.push(role_id)
          roleDisplay.push(`-- ${title}: ${role_id} --`)
      })
  });
};
viewRole()

const deleteRole = () => {
    inquirer.prompt ([
        {
            type: 'list',
            message: `${roleDisplay}`,
            name: 'role',
            choices: roleId            
        }
    ])
    .then(del => {
        //need to add validation that role exists
        console.log('Deleting role...\n');
        connection.query(
          'DELETE FROM role WHERE ?',
          {
            role_id: `${del.role}`,
          },
          (err, res) => {
            if (err) throw err;
            console.log(`${res.affectedRows} roles deleted!\n`);
            console.log('Type node server and press ENTER for Main Menu')
            connection.end();
          }
        );
    })
  };

  module.exports = deleteRole