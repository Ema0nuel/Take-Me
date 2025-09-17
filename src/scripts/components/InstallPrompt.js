export default class InstallPrompt {
    constructor() {
        this.deferredPrompt = null;
        this.banner = null;
        this.initialize();
    }

    initialize() {
        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault();
            this.deferredPrompt = e;
            this.showInstallBanner();
        });
    }

    createBanner() {
        const banner = document.createElement('div');
        banner.className = 'install-banner';
        banner.innerHTML = `
            <div class="install-banner-content">
                <div class="install-banner-text">
                    <span class="text-black-color">Install Take Me Notes</span>
                    <span>on your mobile</span>
                </div>
                <div class="install-banner-buttons">
                    <button class="install-button">Install</button>
                    <button class="dismiss-button">Not now</button>
                </div>
            </div>
        `;

        banner.querySelector('.install-button').addEventListener('click', () => this.installApp());
        banner.querySelector('.dismiss-button').addEventListener('click', () => this.dismissBanner());

        return banner;
    }

    showInstallBanner() {
        if (this.banner) return;

        this.banner = this.createBanner();
        document.body.appendChild(this.banner);

        // Animate banner in
        setTimeout(() => {
            this.banner.classList.add('show');
        }, 100);
    }

    dismissBanner() {
        if (!this.banner) return;

        this.banner.classList.remove('show');
        setTimeout(() => {
            this.banner.remove();
            this.banner = null;
        }, 300);
    }

    async installApp() {
        if (!this.deferredPrompt) return;

        this.deferredPrompt.prompt();
        const { outcome } = await this.deferredPrompt.userChoice;

        console.log(`User response to the install prompt: ${outcome}`);
        this.deferredPrompt = null;
        this.dismissBanner();
    }
}