const inquirer = require('inquirer');
const connection = require('../config/connection');

class Menu {
    constructor(){

    }

    async menu(){
        try{
            const { menu } = await inquirer.prompt([
                {
                    type: 'list',
                    message: 'Main Menu',
                    name: 'menu',
                    choices: ['Departments', 'Employee Roles', 'Employees', 'Exit']
                }
            ]);

            return menu;

        } catch (err){
            console.log(err);
        }
    }

}

module.exports = Menu;