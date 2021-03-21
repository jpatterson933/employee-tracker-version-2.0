const inquirer = require('inquirer');
const connection = require('../../../config/connection');

//this function allows for us to view all of our departments
const viewDepartments = () => {
    connection.query('SELECT * FROM department', (err, res) => {
        if (err) throw err;
        res.forEach(({ department_id, department_name}) => {
            console.log(`${department_id} | ${department_name}`);
        });
        console.log('-----------------------------------');
    });
};

module.exports = viewDepartments
