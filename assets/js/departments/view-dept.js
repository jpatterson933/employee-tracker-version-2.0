const inquirer = require('inquirer');
const connection = require('../../../config/connection');
const mainMenu = require('../main-menu');

//this function allows for us to view all of our
const viewDepartments = () => {
    connection.query('SELECT * FROM department', (err, res) => {
        if (err) throw err;
        res.forEach(({ department_id, department_name}) => {
            console.log(`${department_id} | ${department_name}`);
        });
        console.log('-----------------------------------');
        console.log('Type CTRL + C to exit!')
        // connection.end();
    });
};

module.exports = viewDepartments
