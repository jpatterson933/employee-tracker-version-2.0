// require('iconv-lite').encodingExists('foo')
const mysql = require('mysql2');
require('dotenv').config()

const connection = require('../config/connection');

const Main = require('../models/Main');

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

// beforeEach(() => {
//     mysql.createConnection({
//         host: 'localhost',
//         // Your port, if not 3306
//         port: 3306,
//         // we grab our stored variables from .env file
//         user: process.env.DB_USER,
//         password: process.env.DB_PASSWORD,
//         database: process.env.DB_NAME,
//       });
//       console.log("setting up database connection")
// })

afterEach(() => {
    console.log("closing database connection")
    connection.end();
})
describe("Testing Main model build", () => {
    
    // surely there is a better way to do this, but solves this error for now
    /* ReferenceError: You are trying to `import` a file after the Jest environment has been torn down. From __tests__/Main.test.js. */
    afterEach(async () => {
        await sleep(2000);
    })
    test("Can instantiate Main model instance", async () => {
            const model = await new Main();
            expect(typeof(model)).toBe("object");
    });


})

describe("testing getRoles() method", () => {
    test("expect the roleId and roleName arrays to fille up", async () => {
        const model = await new Main();
        
    })
})