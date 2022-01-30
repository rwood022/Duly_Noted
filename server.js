const express = require('express');
const path = require('path');
const api = require("./public/index.js");


const PORT = process.env.PORT || 3002;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extend: true }));
app.use("/api", api);

app.use(express.static("public"));

app.get("/notes", (req, res) =>
res.sendFile(path.join(__dirname, "/Develop/public/notes.html"))
);

app.get("*", (req, res) =>
    res.sendFile(path.join(__dirname, "/public/index.html"))
);

app.listen(PORT, () => 
    console.log(`App listening at http://localhost:${PORT}`)
);

