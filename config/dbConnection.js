const { Client } = require("pg");

const connnectionString =process.env.local.CONNECTION_STRING

const client = new Client({
  connectionString: connnectionString,
});

module.exports = client;