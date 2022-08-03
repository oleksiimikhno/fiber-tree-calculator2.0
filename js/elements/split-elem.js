import ExtendetHTMLElement from './extendet-elem.js';

import objSplit from '../split-table-info/table.js';

export default class SplitElement extends ExtendetHTMLElement {
    static #instances = 2;

    constructor() {
        super();
        this.idSplit = SplitElement.#instances++;

        this.rect = this.getBoundingClientRect();
        // this.fob;
        // this.split
        // let line = 123
    }

    connectedCallback() {
        console.log(`Split element in DOM ${this.idSplit}`);
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
        setTimeout(() => this.calcSignal(), 0);
        setTimeout(() => this.onSplitPosition(this), 0);
    }

    _addEventListeners() {
        this.addEventListener('change', this.calcSignal);

        this.querySelector('[name="in-signal"]').addEventListener('change', (e) =>{
            this.calcSignal()
        });

        this.addEventListener('mousemove', this.onMovingSplit);
    }

    _removeEventListeners() {
        this.removeEventListener('change', this.calcSignal);

        this.querySelector('[name="in-signal"]').removeEventListener('change', (e) =>{
            this.calcSignal()
        });

        // this.closest('.fob').removeEventListener('mousemove', this.handlerResizeFob);
        this.removeEventListener('mousemove', this.onMovingSplit);
    }

    calcSignal() {
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

    handlerResizeFob(event, fob, split) {
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

customElements.define('split-element', SplitElement);