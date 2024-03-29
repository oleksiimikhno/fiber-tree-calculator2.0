import ExtendetHTMLElement from './extendet-elem.js';

import objSplit from '../split-table-info/table.js';

export default class SplitElement extends ExtendetHTMLElement {
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

    static get observedAttributes() {
        return ['type', 'fiber'];
    }
    
    attributeChangedCallback(name, oldValue, newValue) {
        this._render();
    }

    _render() {
        setTimeout(() => this.calcSplitSignal(), 0);
        setTimeout(() => this.handlerSplitPosition(this), 0);
    }

    _addEventListeners() {
        this.addEventListener('change', this.calcSplitSignal);
        this.querySelector('[name="in-signal"]').addEventListener('change', () => this.calcSplitSignal());
        this.addEventListener('mousemove', this.onMovingSplit);
    }

    _removeEventListeners() {
        this.removeEventListener('change', this.calcSplitSignal);
        this.querySelector('[name="in-signal"]').removeEventListener('change', () => this.calcSplitSignal());
        this.removeEventListener('mousemove', this.onMovingSplit);
    }

    calcSplitSignal() {
        let incoming = this.querySelector('.in-split'),
            arrayOutcomingSignal = this.querySelectorAll('.out-signal'),
            type = this.getAttribute('type'),
            fiber = this.getAttribute('fiber');
            
        if (objSplit[type] == undefined || objSplit[type][fiber] == undefined) return;

        let result = 0;
        if (type === 'FBT') {
            let i = 0;

            for (let splitSignal of Object.entries(objSplit[type][fiber])) {

                result = incoming.value - splitSignal[1];
                arrayOutcomingSignal[i].value = result.toFixed(2);
                arrayOutcomingSignal[i].dispatchEvent(new Event('change'));
                i++;
            }
        } else {
            result = incoming.value - objSplit[type][fiber];

            arrayOutcomingSignal.forEach(item => {
                item.value = result.toFixed(2);
                item.dispatchEvent(new Event('change'));
            });
        }
    }

    createDraggableElement(selectWrapper) {
        const drag = document.createElement('div');
        drag.classList.add('draggable');
        drag.textContent = '';
        selectWrapper.append(drag);
    }

    onMovingSplit() {
        let fob = this.closest('.fob'),
            rectFob = fob.getBoundingClientRect(),
            rectSplit = this.getBoundingClientRect();

        if ((rectFob.right - 30) < rectSplit.right) {
            fob.style.width = `${fob.offsetWidth + 10}px`
        }

        if ((rectFob.bottom - 30) < rectSplit.bottom) {
            fob.style.height = `${fob.offsetHeight + 10}px`
        }
    }

    onSplitMoveResizedFob(event, fob, split) {

        let rectFob = fob.getBoundingClientRect();
        let rectSplit = split.getBoundingClientRect();

        if ((rectFob.right - 30) < rectSplit.right) {
            super.onSetPosition(split, 'right', this.line);
            
            this.handlerSplitPosition(split);
        }

        if ((rectFob.bottom - 30) < rectSplit.bottom) {
            super.onSetPosition(split, 'bottom', this.line);
            this.handlerSplitPosition(split);
        }
    }

    handlerSplitPosition(split) {
        const dragElem = split.querySelector('.draggable');

        if (!dragElem) return null;

        const draggable = super.onDraggableElement(split);

        draggable.position();
    }
}

customElements.define('split-element', SplitElement);