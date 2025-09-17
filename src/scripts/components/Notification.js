export default class NotificationManager {
    static async requestPermission() {
        if (!('Notification' in window)) {
            console.error('This browser does not support notifications');
            return;
        }

        try {
            const permission = await Notification.requestPermission();
            return permission === 'granted';
        } catch (error) {
            console.error('Error requesting notification permission:', error);
            return false;
        }
    }

    static async sendNotification(title, options = {}) {
        if (Notification.permission !== 'granted') {
            const granted = await this.requestPermission();
            if (!granted) return;
        }

        const defaultOptions = {
            icon: '/icons/icon-192x192.png',
            badge: '/icons/icon-192x192.png',
            silent: false,
            body: 'New notification from Take Me',
            tag: 'take-me-notification',
            data: {
                dateOfArrival: Date.now()
            }
        };

        const mergedOptions = { ...defaultOptions, ...options };

        if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
            const registration = await navigator.serviceWorker.ready;
            await registration.showNotification(title, mergedOptions);
        } else {
            new Notification(title, mergedOptions);
        }
    }

    static async notifyNoteCreated(noteTitle) {
        const options = {
            body: `New note created: "${noteTitle}"`,
            icon: '/icons/icon-192x192.png',
            badge: '/icons/notification-badge.png',
            vibrate: [100, 50, 100],
            tag: 'note-created',
            actions: [
                {
                    action: 'view',
                    title: 'View note'
                }
            ],
            data: {
                type: 'note-created',
                dateOfArrival: Date.now()
            }
        };

        await this.sendNotification('Note Created', options);
    }

    static async notifyNoteDeleted() {
        const options = {
            body: 'Note has been deleted',
            icon: '/icons/icon-192x192.png',
            badge: '/icons/notification-badge.png',
            vibrate: [100, 50, 100],
            tag: 'note-deleted',
            data: {
                type: 'note-deleted',
                dateOfArrival: Date.now()
            }
        };

        await this.sendNotification('Note Deleted', options);
    }

    static async notifyNoteUpdated(noteTitle) {
        const options = {
            body: `Note updated: "${noteTitle}"`,
            icon: '/icons/icon-192x192.png',
            badge: '/icons/notification-badge.png',
            vibrate: [100, 50, 100],
            tag: 'note-updated',
            actions: [
                {
                    action: 'view',
                    title: 'View note'
                }
            ],
            data: {
                type: 'note-updated',
                dateOfArrival: Date.now()
            }
        };

        await this.sendNotification('Note Updated', options);
    }
}