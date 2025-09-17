import './assets/css/style.css';
import './assets/css/custom.css';
import App from './App.js';
import NetworkStatus from './scripts/components/NetworkStatus';
import NotificationManager from './scripts/components/Notification';
import InstallPrompt from './scripts/components/InstallPrompt';

// Initialize install prompt
const installPrompt = new InstallPrompt();

// Initialize network status monitoring
const networkStatus = new NetworkStatus();

// Register service worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', async () => {
    try {
      const registration = await navigator.serviceWorker.register('/service-worker.js');
      console.log('ServiceWorker registration successful');

      // Request notification permission after service worker is ready
      await NotificationManager.requestPermission();
    } catch (error) {
      console.error('ServiceWorker registration failed:', error);
    }
  });
}

// Example of sending a notification
document.getElementById('notify-btn')?.addEventListener('click', () => {
  NotificationManager.sendNotification('Hello!', {
    body: 'This is a test notification'
  });
});

// Register service worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js', {
      type: 'module'
    })
      .then(registration => {
        console.log('SW registered:', registration);
      })
      .catch(error => {
        console.log('SW registration failed:', error);
      });
  });
}

class AppContainer {
  constructor() {
    this.app = null;
    this.root = document.getElementById('app');
    this.currentModuleId = null;
  }

  mount(ModuleClass = App) {
    this.unmount();
    this.app = new ModuleClass();
    this.app.mount(this.root);
    this.currentModuleId = ModuleClass.id;
  }

  unmount() {
    if (this.app) {
      this.app.beforeUnmount();
      this.root.innerHTML = '';
      this.app = null;
    }
  }
}

const container = new AppContainer();
container.mount();

// if (import.meta.hot) {
//   // Clear module cache on hot update
//   import.meta.hot.dispose(() => {
//     container.unmount();
//   });

//   import.meta.hot.accept('./App', async (newModule) => {
//     if (newModule) {
//       // Force reload the module
//       const module = await import('./App?t=' + Date.now());
//       container.mount(module.default);
//     } else {
//       // Fallback to current module
//       container.mount();
//     }
//   });
// }