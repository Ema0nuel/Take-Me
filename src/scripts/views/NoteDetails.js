import { Component } from "../components/Component";
import { fetchCurrentDate, fetchCurrentTime } from "../utils/formatDate";
import { fetchNotes } from "../utils/Notes";
import { Navbar } from "../components/Navbar";
import NotificationManager from '../components/Notification';

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
            <div class="note-detail-view app-container">
                <header class="note-header">
                    <div class="header-inner">
                        <button class="back-button" aria-label="Go back">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path d="M19 12H5M12 19l-7-7 7-7" stroke-width="2" stroke-linecap="round"/>
                            </svg>
                        </button>
                        <span class="header-title">${this.state.note.title || 'Note'}</span>
                        <div class="header-actions">
                            <button class="edit-toggle-btn btn-primary">${this.state.mode === 'edit' ? 'Save' : 'Edit'}</button>
                            <button class="delete-button btn-danger" aria-label="Delete note">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" stroke-width="2"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                </header>
                <main class="note-content mt-16 pb-24">
                    <div class="note-details-card">
                        ${this.state.mode === 'edit' ? /* html */`
                            <input type="text"
                                   class="note-title-input"
                                   maxlength="80"
                                   value="${this.state.note.title}"
                                   placeholder="Edit title..." />
                            <textarea class="note-content-input"
                                      rows="20"
                                      maxlength="200000"
                                      placeholder="Edit your note...">${this.state.note.content}</textarea>
                        ` : /* html */`
                            <h1 class="note-title">${this.state.note.title}</h1>
                            <div class="note-date-time">
                                <span>${this.state.note.date}</span>
                                <span>${this.state.note.time}</span>
                            </div>
                            <div class="note-content-display">${this.state.note.content}</div>
                        `}
                    </div>
                </main>
                ${new Navbar({ currentPath: '#/notes' }).render().outerHTML}
            </div>
        `);
    }

    afterMount() {
        const backBtn = this.element.querySelector('.back-button');
        const editToggleBtn = this.element.querySelector('.edit-toggle-btn');
        const deleteBtn = this.element.querySelector('.delete-button');
        const titleInput = this.element.querySelector('.note-title-input');
        const contentInput = this.element.querySelector('.note-content-input');

        backBtn?.addEventListener('click', () => window.history.back());

        editToggleBtn?.addEventListener('click', async () => {
            if (this.state.mode === 'edit') {
                if (titleInput.value.trim() && contentInput.value.trim()) {
                    const notes = fetchNotes();
                    const idx = notes.findIndex(note => note.id === this.noteId);
                    if (idx !== -1) {
                        notes[idx] = {
                            ...notes[idx],
                            title: titleInput.value.trim(),
                            content: contentInput.value.trim(),
                            date: fetchCurrentDate(),
                            time: fetchCurrentTime(),
                        };
                        localStorage.setItem('take-me-notes-storage', JSON.stringify(notes));
                        this.setState({ note: notes[idx], mode: 'view' });
                        await NotificationManager.notifyNoteUpdated(notes[idx].title);
                    }
                }
            } else {
                this.setState({ mode: 'edit' });
            }
        });

        deleteBtn?.addEventListener('click', async () => {
            let notes = fetchNotes();
            notes = notes.filter(n => n.id !== this.noteId);
            localStorage.setItem('take-me-notes-storage', JSON.stringify(notes));
            await NotificationManager.notifyNoteDeleted();
            window.location.hash = '#/';
        });

        if (this.state.mode === 'edit') {
            titleInput?.focus();
        }
    }
}