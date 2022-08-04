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
                const fob = document.createElement('fob-element');

                    fob.classList.add('fob');

                    fob.innerHTML = `
                    <div class="fob-head draggable">Fob #${id}</div>
                    <div class="grid-field"></div>`;
        
                    fob.querySelector('.grid-field').insertAdjacentElement('beforeend', split);

                    return fob;
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