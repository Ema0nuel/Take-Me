import { Component } from './Component';

export class InstallButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showInstallButton: false
        };
        this.deferredPrompt = null;
        this.handleInstallClick = this.handleInstallClick.bind(this);
    }

    render() {
        if (!this.state.showInstallButton) {
            return null;
        }

        return this.createElement(`
            <button class="install-button" aria-label="Install app">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M19 9l-7 7-7-7" stroke-width="2" stroke-linecap="round"/>
                </svg>
                Install App
            </button>
        `);
    }

    afterMount() {
        // Listen for beforeinstallprompt event
        window.addEventListener('beforeinstallprompt', (e) => {
            // Prevent Chrome 76+ from automatically showing the prompt
            e.preventDefault();
            // Stash the event so it can be triggered later
            this.deferredPrompt = e;
            // Show the install button
            this.setState({ showInstallButton: true });
        });

        // Add click handler to the button if it exists
        if (this.element) {
            this.element.addEventListener('click', this.handleInstallClick);
        }
    }

    async handleInstallClick() {
        if (!this.deferredPrompt) return;

        // Show the install prompt
        this.deferredPrompt.prompt();

        // Wait for the user to respond to the prompt
        const { outcome } = await this.deferredPrompt.userChoice;
        console.log(`User response to the install prompt: ${outcome}`);

        // Clear the deferredPrompt variable
        this.deferredPrompt = null;

        // Hide the button
        this.setState({ showInstallButton: false });
    }

    beforeUnmount() {
        if (this.element) {
            this.element.removeEventListener('click', this.handleInstallClick);
        }
    }
}