import { Component } from '../components/Component';
import { Navbar } from '../components/Navbar';
import { fetchCurrentDate, fetchCurrentTime } from '../utils/formatDate';
import { createNewNotes } from '../utils/Notes';

export class NotesView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            note: {
                title: '',
                content: ''
            },
            mode: 'edit' // or 'view'
        };
    }

    render() {
        return this.createElement(/* html */`
            <div class="notes-view overflow-hidden h-screen">
                <header class="notes-header">
                    <button class="back-btn" aria-label="Go back">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path d="M19 12H5M12 19l-7-7 7-7" stroke-width="2" stroke-linecap="round"/>
                        </svg>
                    </button>
                    <div class="header-actions">
                        ${this.state.mode === 'edit' ? /* html */`
                            <button class="save-btn">Done</button>
                        ` : /* html */`
                            <button class="edit-btn">Edit</button>
                        `}
                    </div>
                </header>

                <main class="notes-content">
                    ${this.state.mode === 'edit' ? /* html */`
                        <input type="text" 
                               class="note-title-input" 
                               placeholder="Note title"
                               value="${this.state.note.title}"
                        />
                        <div class="editor-container">
                            <textarea class="note-content-input" 
                                      placeholder="Start writing..."
                            >${this.state.note.content}</textarea>
                        </div>
                    ` : /* html */`
                        <h1 class="note-title">${this.state.note.title || 'Untitled'}</h1>
                        <div class="note-content">${this.state.note.content}</div>
                    `}
                </main>

                ${new Navbar({ currentPath: '#/notes' }).render().outerHTML}
            </div>
        `);
    }

    afterMount() {
        // Handle back button
        const backBtn = this.element.querySelector('.back-btn');
        backBtn?.addEventListener('click', () => {
            window.history.back();
        });

        // Handle mode switching
        const saveBtn = this.element.querySelector('.save-btn');
        const editBtn = this.element.querySelector('.edit-btn');
        const titleInput = this.element.querySelector('.note-title-input')
        const contentInput = this.element.querySelector('.note-content-input')

        saveBtn?.addEventListener('click', () => {

            if (titleInput.value.trim() && contentInput.value.trim()) {
                const formData = {
                    id: crypto.randomUUID(),
                    title: titleInput.value.trim(),
                    content: contentInput.value.trim(),
                    date: fetchCurrentDate(),
                    time: fetchCurrentTime(),
                }

                createNewNotes(formData)
                this.setState({
                    note: {
                        title: titleInput.value,
                        content: contentInput.value,
                    }
                })
                window.location.hash = `#/notes/${formData.id}`
                this.setState({ mode: 'view' });
            }
        });

        editBtn?.addEventListener('click', () => {
            this.setState({ mode: 'edit' });
        });

        // Auto-focus title if empty
        if (!this.state.note.title) {
            titleInput?.focus();
        }
    }
}