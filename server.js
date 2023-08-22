const express = require("express");
const dotenv = require("dotenv").config();
const errorHandler = require('./middleware/errorHandle')
const client = require("./config/dbConnection");
const app = express();

// hello

const port = process.env.PORT || 8081;

client.connect();
app.use(express.json());

app.use('/api/contacts', require('./routes/contactRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server is listening at ${port}`) 
});
