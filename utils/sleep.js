// a sleep function used in testing suites
const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}
module.exports = sleep;