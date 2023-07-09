const Main = require('../models/Main');
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
describe("Testing Main model build", () => {

    afterEach(async () => {
        await sleep(2000);
    })
    test("Can instantiate Main model instance", async () => {
        
        const model = await new Main();
        expect(typeof(model)).toBe("object");
    });

})