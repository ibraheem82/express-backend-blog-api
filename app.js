const express = require('express');
const bodyParser = require("body-parser");
const dotenv = require('dotenv');
const morgan = require("morgan")
dotenv.config()
const connectMongodb = require("./init/mongodb")
const { authRoute } = require('./routes/')

const app = express();

// Connect database
connectMongodb();

app.use(express.json({limit: "500mb"}));
app.use(bodyParser.urlencoded({limit: "500mb", extended : true}));
app.use(morgan('dev'))

// Routes
app.use("/api/v1/auth", authRoute)

module.exports = app;