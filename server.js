const express = require('express');
const fs = require("fs");
const path = require('path');
const api = require('./routes');


const PORT = process.env.PORT || 3001;
const app = express();

// parsing JSON and urlencoded
app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.use("/api", api);

app.use(express.static("public"));

// app.get("/api/notes", (req, res) => {
//     console.log("call?")
//     fs.readFile("./db/db.json", "utf8", function(error, data){
//         if(error){console.log(error)} 
//         else{
//             var notes = JSON.parse(data)
//             res.json( notes )
//         }
//     })
// })

// GET route notes page
app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/notes.html"))
});

// GET route homepage
// app.get("*", (req, res) => {
//     console.log("hewwo")
//     res.sendFile(path.join(__dirname, "./public/index.html"))
// });

app.listen(PORT, () => 
    console.log(`App listening at http://localhost:${PORT}`)
);

