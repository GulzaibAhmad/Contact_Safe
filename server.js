const express = require("express");
const dotenv = require("dotenv").config();
const errorHandler = require('./middleware/errorHandle')
const app = express();

const port = process.env.PORT || 8081;

app.use(express.json())
app.use('/api/contacts', require('./routes/routes'));
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server is listening at ${port}`);
});
