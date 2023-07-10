const connection = require('../config/connection')
const Department = require('../models/Department');
const sleep = require('../utils/sleep');

afterAll(() => {
    console.log("closing database connection");
    connection.end();
})


describe("Create Department class and test methods", () => {
    afterEach(async () => {
        await sleep(2000);
    });
    
    test("Create instance of Department class", () => {
        const model = new Department();
        expect(typeof (model)).toBe("object");
    });
});