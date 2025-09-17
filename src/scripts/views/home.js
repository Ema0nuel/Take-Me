import { Component } from '../components/Component';
import { Navbar } from '../components/Navbar';
import { fetchNotes, renderNoteDetails } from '../utils/Notes';
import NotificationManager from '../components/Notification';

export class HomeView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            recentNotes: fetchNotes() // We'll populate this later
        };
        this.handleNoteClick = this.handleNoteClick.bind(this);
    }

    render() {
        return this.createElement(/* html */`
            <div class="home-view app-container">
                <header class="express-header">
                    <div class="header-inner">
                        <h1 class="header-title">Notes</h1>
                        <a href="#/notes" class="new-note-btn" aria-label="Create new note">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path d="M12 5v14M5 12h14" stroke-width="2" stroke-linecap="round"/>
                            </svg>
                        </a>
                    </div>
                </header>
                <main class="notes-container mt-24 pb-24">
                    <h2 class="section-title">Recent Notes</h2>
                    <div class="notes-grid">
                        ${this.state.recentNotes.length ?
                this.state.recentNotes.map(note => this.renderNoteCard(note)).join('') :
                this.renderEmptyState()
            }
                    </div>
                </main>
                ${new Navbar({ currentPath: '#/' }).render().outerHTML}
            </div>
        `);
    }

    renderNoteCard(note) {
        return /* html */`
            <div class="note-card" data-note-id="${note.id}" role="button" tabindex="0">
                <div class="note-card-content">
                    <div class="note-card-main">
                        <h3 class="note-title">${note.title}</h3>
                        <p class="note-preview">${note.content}</p>
                    </div>
                    <button class="delete-note" aria-label="Delete note" data-note-id="${note.id}">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" stroke-width="2"/>
                        </svg>
                    </button>
                </div>
                <div class="note-meta">
                    <span class="note-date">${note.date}</span>
                    <span class="note-time">${note.time}</span>
                </div>
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
        this.element.querySelectorAll('.note-card').forEach(card => {
            // Handle click events
            card.addEventListener('click', (e) => {
                if (e.target.closest('.delete-note')) {
                    e.stopPropagation();
                    const noteId = e.target.closest('.delete-note').dataset.noteId;
                    this.handleDeleteNote(noteId);
                } else {
                    const noteId = card.dataset.noteId;
                    this.handleNoteClick(noteId);
                }
            });

            // Handle keyboard events for accessibility
            card.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    const noteId = card.dataset.noteId;
                    this.handleNoteClick(noteId);
                }
            });
        });

        // Add touch feedback
        this.element.addEventListener('touchstart', () => { }, { passive: true });
    }

    handleNoteClick(noteId) {
        window.location.hash = `#/notes/${noteId}`;
    }

    async handleDeleteNote(noteId) {
        let notes = fetchNotes();
        notes = notes.filter(n => n.id !== noteId);
        localStorage.setItem('take-me-notes-storage', JSON.stringify(notes));
        this.setState({ recentNotes: fetchNotes() })
        await NotificationManager.notifyNoteDeleted();
    }
}