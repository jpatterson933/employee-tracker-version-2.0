const inquirer = require('inquirer');
const connection = require('../config/connection');

//this function allows for us to view all of our
const viewRoles = () => {
    connection.query('SELECT * FROM role', (err, res) => {
        if (err) throw err;
        //deconstruct
        res.forEach(({ role_id, title, salary, department_id}) => {
            console.log(`Role ID : ${role_id} | Title : ${title} | Salary : ${salary} | Department ID : ${department_id}`);
        });
        console.log('-----------------------------------');
        console.log('Type node server and press ENTER for Main Menu')
        connection.end();
    });
};

module.exports = viewRoles
