# Employee Tracker Version 2.0

This is a basic application using inquirer and mysql.

[Video of application functionality](https://www.youtube.com/watch?v=m4oA3PaaQDo)

[![made-with-javascript](https://img.shields.io/badge/Made%20with-JavaScript-1f425f.svg)](https://www.javascript.com)

[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://GitHub.com/Naereen/StrapDown.js/graphs/commit-activity)

# Table of Contents
1. [License ](#license-information)
2. [Description](#application-description)
3. [Installation](#installation-instructions)
4. [Usage](#application-usage)
5. [Contribution Guidelines](#contribution-guidelines)
6. [Testing](#testing-instrutions)
7. [Questions](#questions)

# License Information

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

[MIT License](https://www.mit.edu/~amini/LICENSE.md) Documentation

Please refer to license documentation for any questions regarding reusing 
this software or any code within this application.

[Back to Top](#table-of-contents)

# Application Description

This Employee Tracker application is designed to help you manage departments, roles, and employees within an organization. It provides various functionalities such as adding, editing, and deleting departments, roles, and employees. The application runs through the terminal, allowing you to easily interact with the data.

## Features

- Department Management:
  - Add departments
  - Edit department details
  - Delete departments

- Role Management:
  - Add roles
  - Edit role details
  - Delete roles
  - View roles

- Employee Management:
  - Add employees
  - Edit employee details
  - Delete employees
  - View employees

## Architecture

The application is built using an object-oriented approach. It consists of the following classes:

- **Main Class:** This serves as the base class and provides common functionality for grabbing department, role, and employee data.

- **Department Class:** Extends the Main class and includes methods for menu operations specific to departments.

- **Role Class:** Extends the Main class and includes methods for menu operations specific to roles.

- **Employee Class:** Extends the Main class and includes methods for menu operations specific to employees.

The `main-menu.js` script serves as the entry point and orchestrates the execution of menu methods from each class. It calls the `menu()` method for each class (Department, Role, and Employee), which contains a switch statement to handle the desired operations.

The `mainMenu()` function in `main-menu.js` is asynchronous and runs all the `CLASS.menu()` methods. It serves as the main control flow for the application. The `mainMenu()` function is then exported and imported into `server.js`, where it is invoked and executed.

[Back to Top](#table-of-contents)

# Installation Instructions

To install, you need to have VS code, grab the repository code from the github, clone it into your pc through your terminal (gitbash preferred), open the application in VS code, open the terminal and make sure you are at the file location in the terminal. 

Next, make sure you have MY SQL workbench installed and a local root file.. Copy and paste the main.sql file located in the db folder into your mysql workbench and lightening bolt the DROP, CREATE AND USE at the top of the main.sql. Then lightening bolt the three tables department, role and employee while inside your mysql workbench.

Next, make sure you create .env file with a DB_USER, DB_PASSWORD, and the DB_NAME. DB_NAME should be 'employee_db' which can be found in /db/main.sql

Next, run an  [![Npm](https://badgen.net/badge/icon/npm?icon=npm&label)](https://https://npmjs.com/) install to gather all required files. Type in `node server` in the terminal or `npm run start` to start the application.

[Back to Top](#table-of-contents)

# Application Usage

The usage is for an employee to create and track employees, departments and roles for those employees. Very simple but effective tool.

[Back to Top](#table-of-contents)

# Contribution Guidelines

If you would like to contribute and increase the effectiveness of this application, look at the errors written below and future goals, and you can contribute following those guidelines. Please do not copy this code for your homework assignment as it is very easy to catch cheaters now a days. Refactor and make it your own. That is how you learn. 

Some future things would be like tracking labor costs yearly. This would not involve any type of clock in or time management system, but would simply break down the salaries of current employees. 

[Back to Top](#table-of-contents)

# Testing Instrutions

There are no tests yet built for this application. They will be built once main classes are finalized. (clearly not test driven development -__- )

[Back to Top](#table-of-contents)

# Questions

If you have any questions that have not been answered, please send me an email: jpatterson933@ucla.edu

[![JavaScript](https://img.shields.io/badge/--F7DF1E?logo=javascript&logoColor=000)](https://www.javascript.com/)
[![Visual Studio Code](https://img.shields.io/badge/--007ACC?logo=visual%20studio%20code&logoColor=ffffff)](https://code.visualstudio.com/)
[![GitHub](https://img.shields.io/badge/--181717?logo=github&logoColor=ffffff)](https://github.com/)
## Checkout My GitHub!


### [jpatterson933](https://github.com/jpatterson933)
### [GitHub Repository](https://github.com/jpatterson933/employee-tracker-version-2.0)
## Known Issues

There are several known issues and other basic functions. The user has to type node server to return to the main menu. See issues tab for further details and most up to date issues.

[Back to Top](#table-of-contents)