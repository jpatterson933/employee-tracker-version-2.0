const Main = require('../models/Main');
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
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