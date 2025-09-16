import { Component } from './Component';
import LOGO from '../../assets/images/logo.svg';

export class Splash extends Component {
    constructor() {
        super();
        this.state = {
            visible: true,
            loading: true
        };
        this.onFinish = null;
    }

    render() {
        return this.createElement(/* html */`
            <div class="splash-screen ${this.state.visible ? 'visible' : 'hidden'}">
                <div class="splash-content">
                    <div class="logo-container">
                        <img src="${LOGO}" alt="Take Me Logo" class="app-logo" />
                    </div>
                    <div class="brand-text">
                        <h1 class="app-title">Take Me</h1>
                        <p class="app-subtitle">Your thoughts, captured.</p>
                    </div>
                    ${this.state.loading ? /* html */`
                        <div class="loading-indicator">
                            <div class="loading-bar"></div>
                        </div>
                    ` : ''}
                </div>
            </div>
        `);
    }

    afterMount() {
        // Simulate loading
        setTimeout(() => {
            this.setState({ loading: false });
        }, 1500);

        // Hide splash screen and notify completion
        setTimeout(() => {
            this.setState({ visible: false });
            if (typeof this.onFinish === 'function') {
                this.onFinish();
            }
        }, 2000);
    }
}