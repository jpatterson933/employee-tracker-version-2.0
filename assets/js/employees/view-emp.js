const inquirer = require('inquirer');
const connection = require('../../../config/connection');

//this function allows for us to view all of our
const viewEmployees = () => {
    connection.query('SELECT * FROM employee', (err, res) => {
        if (err) throw err;
        //deconstruct
        res.forEach(({ employee_id, first_name, last_name }) => {
            console.log(`${employee_id} | ${first_name} | ${last_name}`);
        });
        console.log('-----------------------------------');
        console.log('Type node server and press ENTER for Main Menu')
        connection.end();
    });
};

module.exports = viewEmployees