const fs = require("fs");
const util = require("util");
const { v4: uuidv4 } = require('uuid')

const readasync = util.promisify(fs.readFile);
const writeasync = util.promisify(fs.writeFile)

class Notes {
    read() {
        return readasync("db/db.json", "utf8")
    }

    write(note) {
        return writeasync("db/db.json", JSON.stringify(note))
    }

    getNotes() {
        return this.read().then(rawNotes => {
            var parsedNotes = [];
            try {
                parsedNotes = parsedNotes.concat(JSON.parse(rawNotes))
            } catch (error) {
                parsedNotes = [];
            }

           return parsedNotes 
        })
    }

    addNote(note) {
        if(!note.title || !note.text) {
            throw new Error("Note cannot be blank")
        }

        const newNote = {
            title: note.title, 
            text: note.text, 
            id: uuidv4()}

        return this.getNotes().then(oldNotes => [...oldNotes, newNote]).then(UpdatedNotes => this.write(UpdatedNotes)).then(() => newNote)
    }

    removeNote(id){
        return this.getNotes().then((notes) => notes.filter((note) => note.id !== id)).then(filteredArray => this.write(filteredArray));
    }
}

module.exports = new Notes();