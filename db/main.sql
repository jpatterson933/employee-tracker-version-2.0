DROP DATABASE IF EXISTS employee_DB;
CREATE database employee_DB;

USE employee_DB;

CREATE TABLE department (
    department_id INT AUTO_INCREMENT,
    department_name VARCHAR(30),
    PRIMARY KEY (department_id)
);

CREATE TABLE role (
    role_id INT AUTO_INCREMENT,   
    title VARCHAR(30),       
    salary DECIMAL(10,2),          
    PRIMARY KEY (role_id),
	department_id INT,
    CONSTRAINT dept
		FOREIGN KEY (department_id)
        REFERENCES department (department_id)
        ON DELETE CASCADE
);

CREATE TABLE employee (
    employee_id INT AUTO_INCREMENT,
    first_name VARCHAR(30),         
    last_name VARCHAR(30), 
    PRIMARY KEY (employee_id),
    role_id INT,
    manager_id INT
);