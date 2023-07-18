const path = require("path");

const express = require("express");
require("dotenv").config();
const cors = require("cors")

const errorHandling = require("./middleware/errorHandling");
const APIError = require("./utils/APIError");

// db
require("./db/connect");

// routes
const mounter = require('./routes');

const app = express();

// cors => allow other domains to access your routes
app.use(cors());
app.options('*', cors()); // include before other routes

// middleware
app.use(express.urlencoded({ extended: false, limit: "20kb" }));
app.use(express.json({ limit: "20kb" }));
app.use(`/`, express.static(path.join(__dirname, './uploads')));

// routes
mounter(app);

app.all('*', (req, res, next) => {
    next(new APIError(`Can't Find This Route ${req.originalUrl}!!`, 404))
});

// Glopal Error Handling Middleware In Express
app.use(errorHandling);

// listing server 
const port = process.env.PORT || 3000
const server = app.listen(port, () => {
    console.log(`URL: http://localhost:${port}`);
    console.log(`The Server Running In Port ${port}`);
});

// Any error can happen out express.
// Handling Asynchronous
process.on("unhandledRejection", (err) => {
    console.log({
        unhandledRejection: true,
        nameError: `${err.name} `,
        message: `${err.message}`,
        stack: `${err.stack}`
    });
    server.close(() => {
        console.log("Server Shut Down....");
        process.exit(1);
    });
});

// Handling synchronous exciption
process.on("uncaughtException", (err) => {
    console.log({
        unhandlingException: true,
        nameError: `${err.name} `,
        message: `${err.message}`,
        stack: `${err.stack}`
    });
});