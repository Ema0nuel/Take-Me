import Toastify from 'toastify-js';
import { icons } from '../utils/icon';

export default class NetworkStatus {
    constructor() {
        this.initialize();
        // Check initial status
        this.updateOnlineStatus(navigator.onLine);
    }

    initialize() {
        window.addEventListener('online', () => this.updateOnlineStatus(true));
        window.addEventListener('offline', () => this.updateOnlineStatus(false));
    }

    updateOnlineStatus(isOnline) {
        const icon = isOnline ? icons.wifiOn : icons.wifiOff;

        Toastify({
            node: this.createToastElement(isOnline, icon),
            duration: 3000,
            gravity: "top",
            position: "right",
            stopOnFocus: true,
            className: "network-status-toast",
            style: {
                background: "rgba(255, 255, 255, 0.95)",
                backdropFilter: "blur(10px)",
                color: "#000",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                padding: "12px 24px",
                borderRadius: "8px"
            }
        }).showToast();
    }

    createToastElement(isOnline, icon) {
        const div = document.createElement('div');
        div.style.display = 'flex';
        div.style.alignItems = 'center';
        div.style.gap = '8px';
        div.innerHTML = `
            <span style="color: ${isOnline ? '#4CAF50' : '#F44336'}">${icon}</span>
            <span>${isOnline ? 'Back online' : 'You are offline'}</span>
        `;
        return div;
    }
}