//require our connection to our mysql
const connection = require('./config/connection')
const mainMenu = require('./assets/js/main-menu')

mainMenu();

// const queryAllDepartments = () => {
//     connection.query('SELECT * FROM department', (err, res) => {
//       if (err) throw err;
//       res.forEach(({ department_id, department_name}) => {
//         console.log(`${department_id} | ${department_name}`);
//       });
//       console.log('-----------------------------------');
//     });
//   };

// queryAllDepartments();