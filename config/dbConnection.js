const { Client } = require("pg");

const connnectionString =process.env.CONNECTION_STRING

const client = new Client({
  connectionString: connnectionString,
});

module.exports = client;