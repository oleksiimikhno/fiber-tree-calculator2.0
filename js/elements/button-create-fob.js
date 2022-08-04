import FobElement from './fob-elem.js';

export default class ButtonCreateFob extends FobElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this._render();
        this._addEventListeners();
    }

    disconnectedCallback() {
        super.handlerRemoveElement(+this.dataset.lineId, 'fob');
        this._removeEventListeners();
    }

    _render() {
    }

    _addEventListeners() {
        this.addEventListener('click', this.handlerCreateFob);
        this.addEventListener('click', this.handlerRemoveFob);
    }

    _removeEventListeners() {
        this.removeEventListener('click', this.handlerCreateFob);
        this.removeEventListener('click', this.handlerRemoveFob);
    }

    handlerCreateFob(event) {
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
            super.handlerFobPosition(newFob); 

            const fob = this.closest('.fob');

            this.line = super.createLine(fob, target, newFob.querySelector('[name="in-signal"]'));

            super.onDraggableElement(newFob);
            super.handlerForceUpdateSignal(target, newFob);

            super.onChangeRemoveButton(this, 'fob');
        }
    }

    handlerRemoveFob(event) {
        const target = event.target;

        if (target.matches('.remove-fob')) {
            const id = +target.dataset.lineId

            super.onChangeRemoveButton(target, 'fob')
            super.handlerRemoveElement(id, 'fob');
        }
    }
}

customElements.define('button-create-fob', ButtonCreateFob);