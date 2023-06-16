// require('dotenv').config();
// const { Pool } = require('pg');

// const {DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE, DB_PORT} = process.env;


// const isLocal = DB_HOST === 'localhost';

// let config; 
// if (isLocal) {
// 	require('dotenv').config();
// 	config = {
// 	  user: DB_USER,
// 	  password:DB_PASSWORD,
// 	  host: DB_HOST,
// 	  port: DB_PORT,
// 	  database: DB_DATABASE
// 	};
//   } else {
// 	// Use the configuration for Render or other hosting services
// 	config = {
// 	  user: process.env.your_db_user,
// 	  password: process.env.your_db_password,
// 	  host: process.env.your_db_host,
// 	  port: process.env.your_db_port,
// 	  database: process.env.your_db_name, 
// 	  ssl: {
// 		rejectUnauthorized: false
// 	  }
// 	};
//   }
  
//   const pool = new Pool(config);

// console.log(config)
// pool.connect().then(() => {
// 	console.log("Database connection established.")
// }).catch( e => {
// 	throw new Error(e);
// })

// module.exports = pool;


const { Pool } = require('pg');
require('dotenv').config();

const isLocal = process.env.DB_HOST === 'localhost';

let config;
if (isLocal) {
  config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE,
  };
} else {
  config = {
	  connectionString: process.env.DATABASE_URL,
	  ssl: {
		rejectUnauthorized: false
	  }
	};
}

console.log(config);
const pool = new Pool(config);

pool.connect()
  .then(() => {
    console.log('Database connection established.');
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });

module.exports = pool;

