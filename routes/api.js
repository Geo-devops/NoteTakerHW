const router = require("express").Router();
const Notes = require("../db/Notes")

router.get("/notes", function(req, res) {
    Notes.getNotes().then((notes) => res.json(notes)).catch(err => res.status(500).json(err))
});
router.post("/notes", (req, res) => {
    Notes.addNote(req.body).then((notes) => res.json(notes)).catch(err => res.status(500).json(err))

});
router.delete("/notes/:id", (req, res) => {
    Notes.removeNote(req.params.id).then((notes) => res.json(notes)).catch(err => res.status(500).json(err))
});

module.exports = router
