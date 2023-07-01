const inquirer = require('inquirer');
const connection = require('../config/connection');

class Main {
    constructor(){
        this.roleId = [];
        this.roleName = [];
        this.employees = [];
        this.departments = [];
    }

    getRoles() {
        try {
            const query = 'SELECT * FROM role';
            connection.query(query, (err, res) => {
                try {
                    this.roleId.splice(0, this.roleId.length);
                    this.roleName.splice(0, this.roleName.length);

                    res.forEach(({ role_id, title }) => {
                        this.roleId.push(role_id);
                        this.roleName.push(`-- ${title}: ${role_id} --`);
                    });

                } catch (err) {
                    console.log(err);
                };
            });
        } catch (err) {
            console.log(err);
        };
    };

    getEmployees() {
        try {
            const query = 'SELECT * FROM employee';
            connection.query(query, (err, res) => {
                try {
                    this.employees.splice(0, this.employees.length);
                    res.forEach(({ first_name }) => {
                        this.employees.push(first_name);
                    });
                } catch (err) {
                    console.log(err);
                };
            });
        } catch (err) {
            console.log(err);
        };
    };
    
    getDepartments() {
        try {
            const query = 'SELECT * FROM department';
            connection.query(query, (err, res) => {
                try {
                    this.departments.splice(0, this.departments.length); // empty the array
                    res.forEach(({ department_name }) => {
                        this.departments.push(department_name);
                    })
                } catch (err) {
                    console.log(err);
                };
            });
        } catch (err) {
            console.log(err);
        };
    };

};

module.exports = Main;