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
 
    createFob(event) {
        const target = event.target;
        
        if (target.matches('.create-fob')) {
            const split = super.createSplit()

            function createNewFob(id) {
                let fobElem = document.createElement('fob-element'),
                    fobHead = document.createElement('div'),
                    fobGrid = document.createElement('div');

                    fobElem.classList.add('fob');
                    fobHead.classList.add('fob-head', 'draggable');
                    fobHead.textContent = `Drag This ${id}`;
                    fobElem.append(fobHead);
                    fobGrid.classList.add('grid-field');
                    fobElem.append(fobGrid);
        
                    fobGrid.insertAdjacentElement('beforeend', split);

                    return fobElem;
            }

            const newFob = createNewFob(this.idFob);
            
            field.append(newFob);
            this.handlerFobPosition(newFob);

            this.line = super.createLine(this, target, newFob.querySelector('[name="in-signal"]'));

            super.onDraggableElement(newFob);
            super.handlerForceUpdateSignal(target, newFob);
        }
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
        const getSplitPosition = super.getTranslateXY(this);

        let position = getSplitPosition, widthThisFob = this.offsetWidth + 40;

        newFob.style.transform = `translate(${position.translateX + widthThisFob}px, ${position.translateY}px)`;
    }
}

customElements.define('fob-element', FobElement);