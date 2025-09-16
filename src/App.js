import { Component } from './scripts/components/Component';
import { Router } from './scripts/utils/Router';
import { HomeView } from './scripts/views/home';
import { NotesView } from './scripts/views/notes';
// import { SettingsView } from './scripts/views/settings';
import { NoteDetailView } from './scripts/views/NoteDetails';
import { InstallButton } from './scripts/components/InstallButton'

// ...existing imports...

export class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentView: null
        };
        this.router = new Router({
            '#/': { component: HomeView, title: 'Take Me | Home' },
            '#/notes': { component: NotesView, title: 'Take Me | Notes' },
            '#/notes/:id': { component: NoteDetailView, title: 'Take Me | Note Detail' },
        });
        this.installButton = new InstallButton();
    }

    render() {
        return this.createElement(/* html */`
            <div class="app-container">
                <main id="main-content">
                    <div id="view-container"></div>
                </main>
                ${this.installButton.render()?.outerHTML || ''}
            </div>
        `);
    }

    afterMount() {
        const viewContainer = this.element.querySelector('#view-container');
        this.router.init(viewContainer);
        this.installButton.afterMount();
    }

    beforeUnmount() {
        this.installButton.beforeUnmount();
    }
}

export default App