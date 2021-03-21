const inquirer = require('inquirer');
const connection = require('../../../config/connection');

//this function allows for us to view all of our
const viewRoles = () => {
    connection.query('SELECT * FROM role', (err, res) => {
        if (err) throw err;
        //deconstruct
        res.forEach(({ role_id, title, salary}) => {
            console.log(`${role_id} | ${title} | ${salary}`);
        });
        console.log('-----------------------------------');
    });
};

module.exports = viewRoles
