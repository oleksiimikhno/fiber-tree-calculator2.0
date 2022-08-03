import ExtendetHTMLElement from './extendet-elem.js';

export default class FobElement extends ExtendetHTMLElement {
    static #instances = 2;

    constructor(name) {
        super();
        this.idFob = FobElement.#instances++;
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
    
    handlerUpdateSignal(target, split) {
        let inputSignal = split.querySelector('[name="in-signal"]');

        let parent = target.closest('.split-out');
        let getOutSignalElement = parent.querySelector('.out-signal');
        inputSignal.value = getOutSignalElement.value;

        getOutSignalElement.addEventListener('change', (event) => {
            const target = event.target;
            inputSignal.value = target.value;

            inputSignal.dispatchEvent(new Event('change'));
        })
    }

    handlerUpdateSignal(target, inputSignal) {
        let parent = target.closest('.split-out');
        let getOutSignalElement = parent.querySelector('.out-signal');
        inputSignal.value = getOutSignalElement.value;

        getOutSignalElement.addEventListener('change', (event) => {
            const target = event.target;
            inputSignal.value = target.value;

            inputSignal.dispatchEvent(new Event('change'));
        })
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