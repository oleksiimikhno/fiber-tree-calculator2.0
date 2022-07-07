import objSplit from '../split-table-info/table.js';

export default class SplitElement extends HTMLElement {
    static #instances = 2;

    constructor(name) {
        super();
        this.idSplit = SplitElement.#instances++;
        this.rect = this.getBoundingClientRect();
        this.splitLine;
        // this.i = i;
        // this.count++;
        // this.dataset.fobId = count;
        // console.log(`Create element FOB ${this.dataset.fobId++}`);
        // setTimeout(() => {
        //     this.createSplit();
        // }, 1);
    }

    connectedCallback() {
        console.log(`Split element in DOM ${this.idSplit}`);
        this._render();
        this._addEventListeners();
    }

    disconnectedCallback() {
        console.log('remove Split element');
        this._removeEventListeners();
    }

    static get observedAttributes() {
        return ['type', 'fiber'];
    }
    
    attributeChangedCallback(name, oldValue, newValue) {
        // console.log('newValue: ', newValue);
        // console.log('oldValue: ', oldValue);
        // console.log('name: ', name);
        this._render();
    }

    _render() {
        setTimeout(() => this.calcSignal(), 0);
        setTimeout(() => this.onSplitPosition(this), 0);
    }

    _addEventListeners() {
        this.addEventListener('click', this.createSplit);
        this.addEventListener('change', this.calcSignal);
        // this.querySelector('[name="in-signal"]').addEventListener('change', this.calcSignal);
        this.querySelector('[name="in-signal"]').addEventListener('change', (e) =>{
            this.calcSignal()
        });
    }

    createSplit(event) {
        const target = event.target;

        if (target.matches('.create-split')) {
            let split = document.createElement('split-element');
            split.classList.add('row', 'split');
            split.id = `split-${this.idSplit}`;

            split.innerHTML = 
                `<split-type-select class="row split-selected"></split-type-select>
                <div class="vertical-center"><input id="in-signal" class="in-split" name="in-signal" value="0"></div>
                <div class="column out-split">
                    <div class="split-out row" data-id="0">
                        <input class="out-signal" data-id="0" name="out-split" value="0" disabled="">
                        <button class="btn-split create-split">+</button>
                        <svg class="icon icon-out green create-fob"><use xlink:href="icon/icon.symbol.svg#arrow-right-line"></use></svg>
                    </div>
                    <div class="split-out row" data-id="0">
                        <input class="out-signal" data-id="0" name="out-split" value="0" disabled="">
                        <button class="btn-split create-split">+</button>
                        <svg class="icon icon-out green create-fob"><use xlink:href="icon/icon.symbol.svg#arrow-right-line"></use></svg>
                    </div>
                </div>`;
            this.insertAdjacentElement('afterend', split);

            function updateSignal(split) {
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

            const selectWrapper = split.querySelector('.split-selected');
            this.createDraggableElement(selectWrapper);

            split.addEventListener('mousemove', (event) => (this.onMovingSplit(event, split)));


            const position = this.getTranslateXY(target.closest('.split'));
            split.style.transform = `translate(${position.translateX + 200}px, ${position.translateY}px)`;

            let fob = split.closest('.fob');
            fob.addEventListener('mousemove', (event) => (this.onResizeFob(event, fob, split)));

            updateSignal(split);
            this.createLine(target, split);
        }
    }

    createDraggableElement(selectWrapper) {
        const drag = document.createElement('div');
        drag.classList.add('draggable');
        drag.textContent = '';
        selectWrapper.append(drag);
    }

    createLine(target, split) {
        let line = new LeaderLine(target, split);
        this.splitLine = line;
        line.setOptions({startSocket: 'auto', endSocket: 'left'});
        line.setOptions({path: 'grid'});

        const onMoveThisSplit = this.parentElement.addEventListener('mousemove', AnimEvent.add(function() {
            line.position()
        }), false);
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
        const getSplitPosition =  this.getTranslateXY(split);

        if ((rectFob.right - 30) < rectSplit.right) {
            setPosition('right');
            this.onSplitPosition(split);
            this.splitLine.position();


            // AnimEvent.add(function() {this.splitLine.position()});
        }

        if ((rectFob.bottom - 30) < rectSplit.bottom) {
            setPosition('bottom');
            this.onSplitPosition(split);
            this.splitLine.position();
            // AnimEvent.add(function() {this.splitLine.position()});
        }

        function setPosition(translateXY) {
            let space = 10;

            function setPositionXY(translateXY) {
                let position = getSplitPosition;

                switch(translateXY) {
                    case 'right': 
                        return `translate(${position.translateX - space}px, ${position.translateY}px)`
                    case 'bottom': 
                        return `translate(${position.translateX}px, ${position.translateY- space}px)`;
                }
            }

            split.style.transform = setPositionXY(translateXY);
        }
        
    }

    onSplitPosition(split) {
        const dragElem = split.querySelector('.draggable');

        if (!dragElem) return;

        const draggable = new PlainDraggable(split, {
            handle: dragElem,
            zIndex: 1
        });

        draggable.position();
    }

    getTranslateXY(element) {
        const style = window.getComputedStyle(element)
        const matrix = new DOMMatrixReadOnly(style.transform)
        return {
            translateX: matrix.m41,
            translateY: matrix.m42
        }
    }
}

  customElements.define('split-element', SplitElement);