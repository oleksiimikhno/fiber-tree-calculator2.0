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
        console.log('remove Split element');
        console.log("removed",this.innerHTML)
        console.log('this.line: ', this.line);
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
        this.addEventListener('click', this.onCreateSplit);
        this.addEventListener('change', this.calcSignal);
        this.addEventListener('click', this.removeSplit);
        // this.querySelector('[name="in-signal"]').addEventListener('change', this.calcSignal);
        this.querySelector('[name="in-signal"]').addEventListener('change', (e) =>{
            this.calcSignal()
        });


       
    }

    _removeEventListeners() {
        console.log('_removeEventListeners: ');
        
        this.removeEventListener('click', this.onCreateSplit);
        this.removeEventListener('change', this.calcSignal);
        this.querySelector('[name="in-signal"]').removeEventListener('change', (e) =>{
            this.calcSignal()
        });
        // this.parentElement.removeEventListener('mousemove', AnimEvent.add(() => this.line.position()), false);

        // this.split.removeEventListener('mousemove', (event) => (this.onMovingSplit(event, this.split)));
    }

    onCreateSplit(event) {
        const target = event.target;

        if (target.matches('.create-split')) {
            const split = super.createSplit()
            this.insertAdjacentElement('afterend', split);

            const selectWrapper = split.querySelector('.split-selected');
            this.createDraggableElement(selectWrapper);

            split.addEventListener('mousemove', (event) => (this.onMovingSplit(event, split)));

            const position = super.getTranslateXY(target.closest('.split'));
            split.style.transform = `translate(${position.translateX + 200}px, ${position.translateY}px)`;

            let fob = split.closest('.fob');
            fob.addEventListener('mousemove', (event) => (this.onResizeFob(event, fob, split)));

            this.handlerUpdateSignal(target, split);

            this.line = super.createLine(this, target, split, 'coral');
        }
    }

    createDraggableElement(selectWrapper) {
        const drag = document.createElement('div');
        drag.classList.add('draggable');
        drag.textContent = '';
        selectWrapper.append(drag);
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

    onMovingSplit(event, split) {
        let fob = split.closest('.fob'),
            rectFob = fob.getBoundingClientRect(),
            rectSplit = split.getBoundingClientRect();

        if ((rectFob.right - 30) < rectSplit.right) {
            fob.style.width = `${fob.offsetWidth + 10}px`
        }

        if ((rectFob.bottom - 30) < rectSplit.bottom) {
            fob.style.height = `${fob.offsetHeight + 10}px`
        }
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

    removeSplit(event) {
        const target = event.target;

        if (target.matches('.icon-remove')) {
            console.log(this.line._id);
            // this.line._id.remove();
        }

       
        
    }
}

  customElements.define('split-element', SplitElement);