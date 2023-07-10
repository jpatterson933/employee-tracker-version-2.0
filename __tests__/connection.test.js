const mysql = require('mysql2');

// set up and mock the mysql2 connection
jest.mock('mysql2', () => {
    const mConnection = {
        connect: jest.fn(),
        query: jest.fn(),
        end: jest.fn(),
    };
    return{
        createConnection: jest.fn(() => mConnection),
    };
});

describe("Testing our database connection variables", () => {

    test('creates and connects to the database correct', () => {

        const connection = require('../config/connection');
        
        // check that createConnection was called with correct variables
        expect(mysql.createConnection).toHaveBeenCalledWith({
            host: 'localhost',
            port: 3306,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
        });

        expect(connection.connect).toHaveBeenCalled();
    });
});