const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: "ana123ana",
  host: "localhost",
  port: "5432",
  database: "cidappdb",
});

module.exports = pool;
