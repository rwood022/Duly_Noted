const { timeStamp } = require("console");
// const fs = require("fs");
const path = require("path");
const notes = require("express").Router();
const { readFile, readAndAppend, writeFile } = require("fs");

//GET route to retrieve api notes and parse to JSON
notes.get("/api/notes", (req, res) => {
    readFile("./db/db.json").then(
        (data) => res.json(JSON.parse(data))
    );
});

//GET route for specific note
notes.get("/api/notes/:id", (req, res) => {
    const noteId = req.params.note_id;
        readFile("./db/db.json")
            .then((data) => JSON.parse(data))
            .then((json) => {
                const result = json.filter((note) => note.note_id === noteId);
                return result.length > 0
                    ? res.json(result)
                    : res.json("No note with that ID");

            });
});
// POST specific note to server
notes.post("/api/notes/:id",(req, res) => {
    console.log(req.body);

    const{ title, text } = req.body;
    
        if (req.body) {
            const newNote = {
                title,
                text,
            };

            readAndAppend(newNote, "./db/db.json");
            res.json(`Note added!`);
        }   else {
            res.error("Adding note: ERROR ");
        }

});

// delete specific note
notes.delete("/api/notes/:id", (req, res) => {
    const noteId = req.params.note_id;
    readFile("./db/db.json")
        .then((data) => JSON.parse(data))
        .then((json) => {
            const result = json.filter((note) => note.note_id !== noteId);

            writeFile("./db/db.json",
            result);

            res.json(`Note ${noteId} has been removed`);
        });
});



module.exports = notes;