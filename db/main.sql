DROP DATABASE IF EXISTS employee_DB;
CREATE database employee_DB;

USE employee_DB;

CREATE TABLE department (
    department_id INT AUTO_INCREMENT,
    department_name VARCHAR(30),
    PRIMARY KEY (department_id)
);

SELECT * FROM department;

INSERT INTO department (department_name)
VALUES('Front of House');

CREATE TABLE role (
    role_id INT AUTO_INCREMENT,   
    title VARCHAR(30),       
    salary DECIMAL,          
    PRIMARY KEY (role_id),
    CONSTRAINT
    FOREIGN KEY department_id (role_id)
		REFERENCES department (department_id)
		ON DELETE CASCADE
);

INSERT INTO role (title, salary)
VALUES ('Manager', 123000.30);

SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employee;

CREATE TABLE employee (
    employee_id INT AUTO_INCREMENT,
    first_name VARCHAR(30),         
    last_name VARCHAR(30), 
    PRIMARY KEY (employee_id),
    CONSTRAINT
    FOREIGN KEY role_id (employee_id)
		REFERENCES role(role_id)
		ON DELETE CASCADE
);
