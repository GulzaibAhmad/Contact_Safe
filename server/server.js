const express = require("express");
const dotenv = require("dotenv").config();
const errorHandler = require('./middleware/errorHandle')
const client = require("./config/dbConnection");
const cors = require('cors');
const app = express();

const port = process.env.PORT || 8081;

client.connect();
app.use(express.json());

app.use(cors("*"));

app.use('/api/contacts', require('./routes/contactRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server is listening at ${port}`) 
});
