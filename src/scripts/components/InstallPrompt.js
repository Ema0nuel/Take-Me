export default class InstallPrompt {
    constructor() {
        this.deferredPrompt = null;
        this.banner = null;
        this.hasShown = false;
        this.initialize();
    }

    initialize() {
        // Don't show if already installed
        if (window.matchMedia('(display-mode: standalone)').matches ||
            navigator.standalone) {
            return;
        }

        // Handle iOS
        if (this.isIOS()) {
            // Show iOS install instructions after a short delay
            setTimeout(() => {
                if (!this.hasShown) {
                    this.showIOSInstallBanner();
                    this.hasShown = true;
                }
            }, 1000);
            return;
        }

        // Handle Android/Desktop PWA install
        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault();
            this.deferredPrompt = e;

            // Only show on mobile devices
            if (this.isMobileDevice() && !this.hasShown) {
                this.showInstallBanner();
                this.hasShown = true;
            }
        });
    }

    isIOS() {
        return [
            'iPad Simulator',
            'iPhone Simulator',
            'iPod Simulator',
            'iPad',
            'iPhone',
            'iPod'
        ].includes(navigator.platform)
            || (navigator.userAgent.includes("Mac") && "ontouchend" in document);
    }

    isMobileDevice() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
            || window.innerWidth <= 768;
    }

    showIOSInstallBanner() {
        const banner = document.createElement('div');
        banner.className = 'install-banner';
        banner.innerHTML = `
            <div class="install-banner-content ios-install">
                <div class="install-banner-text">
                    <strong>Install Take Me Notes</strong>
                    <span>
                        Tap <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style="display: inline-block; vertical-align: middle;">
                            <path d="M12 2L19 9H15V19H9V9H5L12 2Z"/>
                        </svg> 
                        then "Add to Home Screen"
                    </span>
                </div>
                <button class="dismiss-button">Got it</button>
            </div>
        `;

        banner.querySelector('.dismiss-button').addEventListener('click', () => {
            banner.classList.remove('show');
            setTimeout(() => banner.remove(), 300);
        });

        document.body.appendChild(banner);
        setTimeout(() => banner.classList.add('show'), 100);
    }
}