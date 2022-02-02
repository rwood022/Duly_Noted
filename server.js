const express = require('express');
const fs = require("fs");
const path = require('path');
const api = require('./routes/notes');
// const api = require("notes");


const PORT = process.env.PORT || 3001;
const app = express();

// parsing JSON and urlencoded
app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.use("/api", api);

app.use(express.static("public"));

// GET route homepage
app.get("*", (req, res) => {
// res.sendFile("index.html", {root: "public"});
    res.sendFile(path.join(__dirname, "public/index.html"))
});

// GET route notes page
app.get("/notes", (req, res) => {
    // res.sendFile("index.html", {root: "public"});

    res.sendFile(path.join(__dirname, "public/notes.html"))
});


app.listen(PORT, () => 
    console.log(`App listening at http://localhost:${PORT}`)
);

