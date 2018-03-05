const mysql = require('mysql');

// const connection = mysql.createConnection({
//   host: process.env.RDS_HOSTNAME || 'mysql-simplergympal1.coxka72ep9lx.us-east-2.rds.amazonaws.com',
//   user: process.env.RDS_USERNAME || '',
//   password: process.env.RDS_PASSWORD || '',
//   port: process.env.RDS_PORT || 3306,
//   database: process.env.RDS_DB_NAME || 'gympal',
// });

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  port: 3306,
  database: 'gympal',
});

connection.connect((err) => {
  if (err) {
    console.log(`error connecting: ${err}`);
  } else {
    console.log(`connected as id ${connection.threadId}`);
  }
});

module.exports.connection = connection;
