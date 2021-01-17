const express = require("express");
require("dotenv").config();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

mongoose
    .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Successfully connected to DB'))
    .catch(err => console.log(err.message))

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res)=> {
    res.send('Hello World');
});


app.post('/user', (req, res) => {
    console.log(req.body);
    res.send(req.body);
})


app.listen(PORT, () => {
    console.log(`Server is up and running on ${PORT}`);
});