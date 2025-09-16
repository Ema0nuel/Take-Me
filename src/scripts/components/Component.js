export class Component {
    constructor(props = {}) {
        this.props = props;
        this.state = {};
        this.element = null;
    }

    setState(newState) {
        this.state = { ...this.state, ...newState };
        this.update();
    }

    createElement(template) {
        const wrapper = document.createElement('div');
        wrapper.innerHTML = template.trim();
        return wrapper.firstElementChild;
    }

    render() {
        return this.createElement('<div></div>');
    }

    mount(container) {
        this.element = this.render();
        container.appendChild(this.element);
        this.afterMount?.();
    }

    update() {
        const newElement = this.render();
        if (this.element && this.element.parentNode) {
            this.element.parentNode.replaceChild(newElement, this.element);
            this.element = newElement;
            this.afterMount?.();
        }
    }

    unmount() {
        this.beforeUnmount?.();
        this.element?.remove();
        this.element = null;
    }

    afterMount() { }
    beforeUnmount() { }
}