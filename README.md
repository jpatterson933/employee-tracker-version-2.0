# Employee Tracker Version 2.0

This is a basic application using inquirer and mysql.

[Video of application functionality](https://www.youtube.com/watch?v=m4oA3PaaQDo)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

[![Maintenance](https://img.shields.io/badge/Maintained%3F-no-red.svg)](https://bitbucket.org/lbesson/ansi-colors)

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

This employee tracker will allow you to add departments, edit departments, delete departments, add roles, edit roles, delete roles, view roles, add employees, edit employees, delete employees, and view employees. The application is run through the terminal. Roles can be assigned to specific departments and roles can be assigned to specific employees. If the user deletes a dartments, it removes all roels and employees associated with it.

[Back to Top](#table-of-contents)

# Installation Instructions

To install, you need to have VS code, grab the repository code from the github, clone it into your pc through your terminal (gitbashed preferred), open the application in VS code, open the terminal and make sure you are at the file location in the terminal. 

Next, make sure you have MY SQL workbench installed and a local root file.. Copy and paste the main.sql file located in the db folder into your mysql workbench and lightening bolt the DROP, CREATE AND USE at the top of the main.sql. Then lightening bolt the three tables department, role and employee while inside your mysql workbench.

Next, make sure you update the .env file. DB_USER is the name of your connection in your workbench. DB_PASSWORD is the password associated with that connection. If you do not know how to set this up, the application may not fully run for you.

Next, run an npm install to gather all required files. Type in node server in the termainl and the application should run.

[Back to Top](#table-of-contents)

# Application Usage

This application has a basic usage to create an in depth employee tracking roster. 

[Back to Top](#table-of-contents)

# Contribution Guidelines

If you would like to contribute and increase the effectiveness of this application, look at the errors written below and future goals, and you can contribute following those guidelines.

[Back to Top](#table-of-contents)

# Testing Instrutions

There are no testing instructions. If you would lke to create tests for the application, I will approve all pull requests.

[Back to Top](#table-of-contents)

# Questions

If you have any questions that have not been answered, please send me an email: jpatterson933@ucla.edu

## Checkout My GitHub!

[Back to Top](#table-of-contents)

### [jpatterson933](https://github.com/jpatterson933)
### [Live Application](NA)
### [GitHub Repository](https://github.com/jpatterson933/employee-tracker-version-2.0)

## Known Issues

There are several known issues and other basic functions. The user has to consistently type in node server which makes the use of this application null. The user cannot view employees by departments or roles meaing the functionality of this application is very very basic. Those are things that can be improved upon going forward.
