export class ScreenReader {
    constructor() {
        this.liveRegion = this.createLiveRegion();
    }

    createLiveRegion() {
        let region = document.getElementById('sr-live');
        if (!region) {
            region = document.createElement('div');
            region.id = 'sr-live';
            region.setAttribute('aria-live', 'polite');
            region.setAttribute('aria-atomic', 'true');
            region.style.cssText = `
                position: absolute;
                left: -9999px;
                height: 1px;
                width: 1px;
                overflow: hidden;
            `;
            document.body.appendChild(region);
        }
        return region;
    }

    announce({ title, description }) {
        document.title = title || 'Take Me | Notes';
        this.liveRegion.textContent = description || title;
    }
}

export const screenReader = new ScreenReader();