import { screenReader } from './screenReader';
import { Splash } from '../components/Splash';
import { NoteDetailView } from '../views/NoteDetails';


export class Router {
    constructor(routes = {}) {
        this.routes = routes;
        this.currentComponent = null;
        this.container = null;
    }

    init(container) {
        this.container = container;
        window.addEventListener('hashchange', () => this.handleRoute());
        this.handleRoute();
    }

    handleRoute() {
        const hash = window.location.hash || '#/';
        let route = this.routes[hash];

        // Dynamic route matching for note details
        if (!route) {
            // Check for pattern: #/notes/:id
            const noteDetailMatch = hash.match(/^#\/notes\/(.+)$/);
            if (noteDetailMatch && this.routes['#/notes/:id']) {
                route = this.routes['#/notes/:id'];
            } else {
                route = this.routes['#/'];
            }
        }

        if (!route) return;

        if (this.currentComponent) {
            this.currentComponent.unmount();
        }
        this.container.innerHTML = '';

        // Pass props if needed (like noteId)
        if (hash.startsWith('#/notes/') && route.component === NoteDetailView) {
            const noteId = hash.split('/')[2];
            this.currentComponent = new route.component({ noteId });
        } else {
            this.currentComponent = new route.component();
        }
        this.currentComponent.mount(this.container);

        document.title = route.title || '';
    }

    navigate(hash) {
        window.location.hash = hash;
    }
}