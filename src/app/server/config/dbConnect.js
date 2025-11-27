require("dotenv").config();
const knex = require("knex");

const dbConfig = {
  client: "mysql2",
  connection: process.env.DATABASE_URL,
};

// Initialize Knex with the configuration
const database = knex(dbConfig);

// Test the connection
database
  .raw("SELECT 1")
  .then(() => {
    console.log("MySQL connected successfully via Knex!");
  })
  .catch((err) => {
    console.error("Error connecting to MySQL via Knex:", err.message);

    // Handle specific errors
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      console.error("Database connection was closed.");
    } else if (err.code === "ER_CON_COUNT_ERROR") {
      console.error("Database has too many connections.");
    } else if (err.code === "ECONNREFUSED") {
      console.error(
        "Database connection was refused. Check host, port, and firewall."
      );
    }
  });

module.exports = database;
