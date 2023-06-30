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
  inquirer
    .prompt([
      {
        type: 'confirm',
        message: 'Are you sure you want to remove role?',
        name: 'delete'
      },
      {
        type: 'list',
        message: 'Please choose a role to delete',
        name: 'role',
        choices: this.roles
      }
    ])
    .then(({ role }) => {
      try {
        //need to add validation that role exists
        console.log('Deleting role...\n');
        const query = 'DELETE FROM role WHERE ?';
        connection.query(query,
          {
            role_id: `${role}`,
          },
          (err, res) => {
            try {
              console.log(`${res.affectedRows} roles deleted!\n`);
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
};

module.exports = deleteRole