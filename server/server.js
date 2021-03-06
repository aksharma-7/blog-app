const express = require("express");
require("dotenv").config();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require('passport');
const path = require("path");
const users = require("./routes/api/users");


const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const MONGO_URI = process.env.MONGO_URI;

mongoose
.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('Successfully connected to DB'))
.catch(err => console.log(err.message))

mongoose.set("useFindAndModify", false);
mongoose.Promise = global.Promise;



app.use(passport.initialize());
require('./middleware/passport')(passport);
app.use("/api/users", users);
app.use("/api/posts/", require("./routes/api/posts"));

if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
}


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is up and running on ${PORT}`);
});