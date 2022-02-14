const express = require("express");

// Import modular routers for /notes
const notesRouter = require("./notes");

const app = express();

app.get('/something', (req, res) => res.json('hi'))

app.use("/api", notesRouter);

module.exports = app;