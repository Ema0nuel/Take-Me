import { Component } from '../components/Component';
import { Navbar } from '../components/Navbar';
import { fetchNotes, renderNoteDetails } from '../utils/Notes';

export class HomeView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            recentNotes: fetchNotes() // We'll populate this later
        };
    }

    render() {
        return this.createElement(/* html */`
            <div class="home-view overflow-auto h-screen">
                <header class="express-header">
                    <h1 class="header-title">Notes</h1>
                    <a href="#/notes" aria-label="Notes" class="new-note-btn" aria-label="Create new note">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path d="M12 5v14M5 12h14" stroke-width="2" stroke-linecap="round"/>
                        </svg>
                    </a>
                </header>

                <main class="notes-container">
                    <h2 class="section-title">Recent Notes</h2>
                    <div class="notes-grid">
                        ${this.state.recentNotes.length ?
                this.state.recentNotes.map(note => this.renderNoteCard(note)).join('') :
                this.renderEmptyState()
            }
                    </div>
                </main>

                ${new Navbar().render().outerHTML}
            </div>
        `);
    }

    renderNoteCard(note) {
        return /* html */`
            <div class="note-card" data-note-id="${note.id}">
                <div class="flex flex-col ">
                    <h3 class="note-title">${note.title}</h3>
                    <p class="note-preview">${note.content.substring(0, 99)}${note.content.length > 100 ? '...' : ''}</p>
                    <div class="note-meta">
                        <span class="note-date text-gray-400 font-thin">${note.date}</span>
                    </div>
                </div>
                <button class="delete-note" aria-label="Delete note">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" stroke-width="2"/>
                    </svg>
                </button>
            </div>
        `;
    }

    renderEmptyState() {
        return /* html */`
            <div class="empty-state">
                <p>No notes yet</p>
            </div>
        `;
    }

    afterMount() {
        // Handle note card clicks
        this.element.addEventListener('click', (e) => {
            const noteCard = e.target.closest('.note-card');
            const deleteBtn = e.target.closest('.delete-note');

            if (deleteBtn) {
                e.stopPropagation();
                const noteId = noteCard.dataset.noteId;
                console.log(noteId);
                this.handleDeleteNote(noteId);
            } else if (noteCard) {
                const noteId = noteCard.dataset.noteId;
                this.handleNoteClick(noteId);
            }
        });
    }

    handleNoteClick(noteId) {
        renderNoteDetails(noteId)
        window.location.hash = `#/notes/${noteId}`;
    }

    handleDeleteNote(noteId) {
        let notes = fetchNotes();
        notes = notes.filter(n => n.id !== noteId);
        localStorage.setItem('take-me-notes-storage', JSON.stringify(notes));
        this.setState({ recentNotes: fetchNotes() })
    }
}