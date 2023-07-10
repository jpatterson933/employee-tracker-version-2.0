// require('iconv-lite').encodingExists('foo')
const connection = require('../config/connection')
const mysql = require('mysql2');
require('dotenv').config()


const Main = require('../models/Main');

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));



afterAll(() => {
    console.log("closing database connection");
    connection.end();
})
describe("Testing Main model build", () => {

    // surely there is a better way to do this, but solves this error for now
    /* ReferenceError: You are trying to `import` a file after the Jest environment has been torn down. From __tests__/Main.test.js. */
    afterEach(async () => {
        await sleep(2000);
    })
    test("Can instantiate Main model instance", () => {
        const model = new Main();
        expect(typeof (model)).toBe("object");
    });



})

describe("testing getRoles() method", () => {
    test("expect the roleId and roleName to be arrays", () => {
        // use to create mock queries to further test data
        connection.query = jest
            .fn()
            .mockImplementation((query, callback) => {
                callback(null, [
                    { roleId: 1, title: 'Role 1' },
                    { roleId: 2, title: 'Role 2' }
                ])
            })
        const model = new Main();
        model.getRoles();
        expect(Array.isArray(model.roleId)).toBe(true);
        expect(Array.isArray(model.roleName)).toBe(true);
    })
})

describe("Testing getEmployees() method", () => {
    test("expect the first_name to be an array", () => {
        // create mock query
        connection.query = jest
            .fn()
            .mockImplementation((query, callback) => {
                callback(null, [
                    { first_name: "Employee1" },
                    { first_name: "Employee2" }
                ])
            })

        const model = new Main();
        model.getEmployees();
        expect(Array.isArray(model.employees)).toBe(true);
    })
})

describe("Testing getDepartments() method", () => {
    test("expect the department and departmentId to be an array", () => {
        // create mock query
        connection.query = jest
            .fn()
            .mockImplementation((query, callback) => {
                callback(null, [
                    { department_name: "Department One", department_id: 1 },
                    { department_name: "Department Two", department_id: 2 },
                ])
            })

        const model = new Main();
        model.getDepartments();
        expect(Array.isArray(model.departmentId)).toBe(true);
        expect(Array.isArray(model.departments)).toBe(true);
    })
})