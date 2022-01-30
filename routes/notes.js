const { timeStamp } = require("console");

const notes = require("express").Router();

//GET route to retrieve all notes
notes.get("/", (req, res) => {
    readFromFile("./db/notes.json").then(
        (data) => res.json(JSON.parse(data))
    );
});

//GET route for specific note
notes.get("/:note_id", (req, res) => {
    const noteId = req.params.note_id;
        readFromFile("./db/notes.json")
            .then((data) => JSON.parse(data))
            .then((json) => {
                const result = json.filter((note) 
                => note.note_id === noteId);
                return result.length > 0
                    ? res.json(result)
                    : res.json("No note with that ID");

            });
});

notes.delete("/note_id", (req, res) => {
    const noteId = req.params.note_id;
    readFromFile("./db/notes.json")
        .then((data) => JSON.parse(data))
        .then((json) => {
            const result = json.filter((note)
            => note.note_id !== noteId);

            writeToFile("./db/notes.json",
            result);

            res.json(`Note ${noteId} has been removed`);
        });
});