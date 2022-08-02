import ExtendetHTMLElement from './extendet-elem.js';

export default class ButtonCreateElement extends ExtendetHTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this._render();
        this._addEventListeners();
    }

    disconnectedCallback() {
        this._removeEventListeners();
    }

    _render() {
        this.appendSVG();
    }

    _addEventListeners() {
        this.addEventListener('click', this.handlerCreateSplit);
        this.addEventListener('click', this.handlerRemoveSplit);
        
    }

    _removeEventListeners() {
        this.removeEventListener('click', this.handlerCreateSplit);
        this.removeEventListener('click', this.handlerRemoveSplit);
    }

    appendSVG () {
        this.insertAdjacentHTML('afterbegin','<svg class="icon icon-out"><use xlink:href="icon/icon.symbol.svg#add-fill"></use></svg>')
    }

    handlerCreateSplit(event) {
        const target = event.target;

        if (target.matches('.create-split')) {
            const split = super.createSplit();
            const selectWrapper = split.querySelector('.split-selected');

            const prevSplit = this.closest('.split');
            prevSplit.insertAdjacentElement('afterend', split);
            prevSplit.createDraggableElement(selectWrapper);
            prevSplit.handlerUpdateSignal(this, split);

            const fob = split.closest('.fob');

            const position = super.getTranslateXY(this.closest('.split'));
            split.style.transform = `translate(${position.translateX + 200}px, ${position.translateY}px)`;

            fob.addEventListener('mousemove', (event) => (this.onResizeFob(event, fob, split)));

            this.line = super.createLine(fob, this, split, 'coral');

            super.onChangeRemoveButton(this, 'subtract-line');
        }

    }

    handlerRemoveSplit(event) {
        const target = event.target;

        if (target.matches('.remove-split')) {
            const id = +target.dataset.lineId

            super.onChangeRemoveButton(target, 'add-fill')
            super.handlerRemoveElement(id);
        }
    }

    createDraggableElement(selectWrapper) {
        const drag = document.createElement('div');
        drag.classList.add('draggable');
        drag.textContent = '';
        selectWrapper.append(drag);
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

    onResizeFob(event, fob, split) {

        let rectFob = fob.getBoundingClientRect();
        let rectSplit = split.getBoundingClientRect();

        if ((rectFob.right - 30) < rectSplit.right) {
            super.onSetPosition(split, 'right', this.line);
            
            this.onSplitPosition(split);
        }

        if ((rectFob.bottom - 30) < rectSplit.bottom) {
            super.onSetPosition(split, 'bottom', this.line);
            this.onSplitPosition(split);
        }
    }

    onSplitPosition(split) {
        const dragElem = split.querySelector('.draggable');

        if (!dragElem) return;

        const draggable = super.onDraggableElement(split);

        draggable.position();
    }
}

customElements.define('button-create-element', ButtonCreateElement);