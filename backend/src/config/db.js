const mysql = require("mysql2");
require("dotenv").config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,       
  user: process.env.DB_USER,        
  password: process.env.DB_PASSWORD,  
  database: process.env.DB_NAME,    
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Confirm the database connection
pool.getConnection((err, connection) => {
  if (err) {
    console.error("Database connection failed:", err.message);
  } else {
    console.log("Database connection successful.");
    connection.release();
  }
});

module.exports = pool.promise();
