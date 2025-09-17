import { Component } from '../components/Component';
import { Navbar } from '../components/Navbar';
import { fetchCurrentDate, fetchCurrentTime } from '../utils/formatDate';
import { createNewNotes } from '../utils/Notes';
import NotificationManager from '../components/Notification';

export class NotesView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            note: {
                title: '',
                content: ''
            },
            mode: 'edit'
        };
    }

    render() {
        return this.createElement(/* html */`
            <div class="notes-view app-container">
                <header class="notes-header">
                    <div class="header-inner">
                        <button class="back-btn" aria-label="Go back">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path d="M19 12H5M12 19l-7-7 7-7" stroke-width="2" stroke-linecap="round"/>
                            </svg>
                        </button>
                        <span class="header-title">New Note</span>
                        <div class="header-actions">
                            <button class="save-btn btn-primary">Save</button>
                        </div>
                    </div>
                </header>
                <main class="notes-content pt-24 pb-24">
                    <div class="note-form-card">
                        <input type="text" 
                               class="note-title-input"
                               maxlength="80"
                               placeholder="Title your note..."
                               value="${this.state.note.title}" />
                        <textarea class="note-content-input"
                                  rows="20"
                                  maxlength="2000"
                                  placeholder="Start writing your thoughts here...">${this.state.note.content}</textarea>
                    </div>
                </main>
                ${new Navbar({ currentPath: '#/notes' }).render().outerHTML}
            </div>
        `);
    }

    afterMount() {
        const backBtn = this.element.querySelector('.back-btn');
        const saveBtn = this.element.querySelector('.save-btn');
        const titleInput = this.element.querySelector('.note-title-input');
        const contentInput = this.element.querySelector('.note-content-input');

        backBtn?.addEventListener('click', () => window.history.back());

        saveBtn?.addEventListener('click', async () => {
            if (titleInput.value.trim() && contentInput.value.trim()) {
                const formData = {
                    id: crypto.randomUUID(),
                    title: titleInput.value.trim(),
                    content: contentInput.value.trim(),
                    date: fetchCurrentDate(),
                    time: fetchCurrentTime(),
                };
                createNewNotes(formData);
                this.setState({ note: { title: '', content: '' } });
                await NotificationManager.notifyNoteCreated(formData.title);
                window.location.hash = `#/notes/${formData.id}`;
            }
        });

        titleInput?.focus();
    }
}