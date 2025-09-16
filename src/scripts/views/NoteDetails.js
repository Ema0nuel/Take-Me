import { Component } from "../components/Component";
import { fetchCurrentDate, fetchCurrentTime } from "../utils/formatDate";
import { fetchNotes, createNewNotes, renderNoteDetails } from "../utils/Notes";

export class NoteDetailView extends Component {
    constructor(props) {
        super(props);
        this.noteId = props?.noteId || window.location.hash.split('/')[2];
        const notes = fetchNotes();
        const note = notes.find(n => n.id === this.noteId);
        this.state = {
            note,
            mode: 'view'
        };
        this.handleInput = this.handleInput.bind(this);
    }

    render() {
        if (!this.state.note) {
            return this.createElement(`
                <div class="note-detail-view loading">
                    <div class="loading-spinner"></div>
                </div>
            `);
        }

        return this.createElement(/* html */`
            <div class="note-detail-view">
                <header class="note-header">
                    <button class="back-button" aria-label="Go back">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path d="M19 12H5M12 19l-7-7 7-7" stroke-width="2" stroke-linecap="round"/>
                        </svg>
                    </button>
                    <button class="btn delete-button" aria-label="Delete note">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" stroke-width="2"/>
                        </svg>
                    </button>
                    <button class="edit-toggle-btn header-actions ${this.state.mode === 'edit' ? 'save-btn' : ' edit-btn'}">
                        ${this.state.mode === 'edit' ? 'Save' : 'Edit'}
                    </button>
                </header>
                <main class="note-content">
                    ${this.state.mode === 'edit' ? /* html */`
                        <input type="text"
                               class="note-title-input"
                               value="${this.state.note.title}"
                               placeholder="Note title"
                        />
                        <textarea class="note-content-input"
                                  placeholder="Start writing...">${this.state.note.content}</textarea>
                    ` : /* html */`
                        <h1 class="note-title">${this.state.note.title}</h1>
                        <div class="note-content">${this.state.note.content}</div>
                    `}
                </main>
            </div>
        `);
    }

    afterMount() {
        // Back button
        const backBtn = this.element.querySelector('.back-button');
        backBtn?.addEventListener('click', () => window.history.back());

        // Delete button
        const deleteBtn = this.element.querySelector('.delete-button');
        deleteBtn?.addEventListener('click', () => this.handleDelete());

        // Edit/Save toggle
        const editToggleBtn = this.element.querySelector('.edit-toggle-btn');
        editToggleBtn?.addEventListener('click', () => {
            if (this.state.mode === 'edit') {
                this.handleSave();
            } else {
                this.setState({ mode: 'edit' });
            }
        });

        // Input Fields
        const titleInput = this.element.querySelector('.note-title-input');

        // Input listeners (only in edit mode)
        if (this.state.mode === 'edit') {
            titleInput.focus()
        }
    }

    beforeUnmount() { }

    handleInput(e) {
        const titleInput = this.element.querySelector('.note-title-input');
        const bodyInput = this.element.querySelector('.note-content-input');
        this.setState({
            note: {
                ...this.state.note,
                title: titleInput?.value || '',
                content: bodyInput?.value || ''
            }
        });
    }

    handleSave() {
        const notes = fetchNotes();
        const titleInput = this.element.querySelector('.note-title-input');
        const bodyInput = this.element.querySelector('.note-content-input');

        if (titleInput.value.trim() && bodyInput.value.trim()) {
            const idx = notes.findIndex(note => note.id === this.noteId);
            if (idx !== -1) {
                notes[idx] = {
                    ...notes[idx],
                    title: titleInput.value.trim(),
                    content: bodyInput.value.trim(),
                    date: fetchCurrentDate(),
                    time: fetchCurrentTime(),
                };
                this.setState({ note: notes[idx] });
            }
            localStorage.setItem('take-me-notes-storage', JSON.stringify(notes));
            this.setState({ mode: 'view' });
        }
    }

    handleDelete() {
        let notes = fetchNotes();
        notes = notes.filter(n => n.id !== this.noteId);
        localStorage.setItem('take-me-notes-storage', JSON.stringify(notes));
        window.location.hash = '#/';
    }
}