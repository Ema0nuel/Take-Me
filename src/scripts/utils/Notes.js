export function fetchNotes() {
    return JSON.parse(localStorage.getItem('take-me-notes-storage')) || []
}


export function createNewNotes(noteData) {
    const notes = fetchNotes()
    const note = noteData
    notes.push(note)

    localStorage.setItem('take-me-notes-storage', JSON.stringify(notes))
}

export function renderNoteDetails(noteId) {

}