const inquirer = require('inquirer');
const connection = require('../../../config/connection');

const deleteRole = () => {
    inquirer.prompt ([
        {
            type: 'input',
            message: 'Enter a Role',
            name: 'role',
            //is there a way to make this a list that populates from the already existing roles?
            validate: checkInput => {
                if (checkInput) {
                    return true;
                } else {
                    console.log(`Please enter a valid Role!`)
                    return false;
                }
            }            
        }
    ])
    .then(del => {
        //need to add validation that role exists
        console.log('Deleting role...\n');
        connection.query(
          'DELETE FROM role WHERE ?',
          {
            title: `${del.role}`,
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