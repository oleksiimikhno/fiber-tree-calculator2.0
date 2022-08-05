import ExtendetHTMLElement from './extendet-elem.js';

export default class FobElement extends ExtendetHTMLElement {
    constructor() {
        super();
        this.rect = this.getBoundingClientRect();
    }

    connectedCallback() {
        this._render();
        this._addEventListeners();
    }

    disconnectedCallback() {
        this._removeEventListeners();
    }

    _render() {
        super.onDraggableElement(this);
    }

    _addEventListeners() {
        this.querySelector('.draggable').addEventListener('mousemove', this.updateSplitLinePosition);
    }

    _removeEventListeners() {
        this.querySelector('.draggable').removeEventListener('mousemove', this.updateSplitLinePosition);
    }

    updateSplitLinePosition(event) {
        const fob = event.target.closest('.fob');
        fob.querySelector('.grid-field').dispatchEvent(new Event('mousemove'));
    }

    handlerFobPosition(newFob) {
        const fob = this.closest('.fob')

        const getSplitPosition = super.getTranslateXY(fob);

        const position = getSplitPosition, 
            widthThisFob = fob.offsetWidth + 40;

        newFob.style.transform = `translate(${position.translateX + widthThisFob}px, ${position.translateY}px)`;
    }
}

customElements.define('fob-element', FobElement);