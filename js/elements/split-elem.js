import objSplit from '../split-table-info/table.js';

let i = 1
export default class SplitElement extends HTMLElement {
    static #instances = 2;

    constructor(name) {
        super();
        this.idSplit = SplitElement.#instances++;
        this.rect = this.getBoundingClientRect();
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
        setTimeout(() => {
            this.calcSignal();
        }, 0);

        setTimeout(() => {
            const dragElem = this.querySelector('.draggable');

            if (!dragElem) return;

            this.drag = new PlainDraggable(this, {
                handle: dragElem,
                // onMove: function() { line.position(); },
                // onMoveStart: function() { line.dash = {animation: true}; },
                // onDragEnd: function() { line.dash = false; },
                // handle: true,
                
                zIndex: 1
              });
        }, 0);

        
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
            

            updateSignal(split);

            this.createLine(target, split);
            split.addEventListener('mousemove', (event) => (this.onMovingSplit(event, split)));




            let fob = split.closest('.fob');


            fob.addEventListener('mousemove', (event) => (this.onResizeFob(event, fob, split)));
            // function setPosition(thisFob) {
            
            //     function getTranslateXY(element) {
            //         const style = window.getComputedStyle(element)
            //         const matrix = new DOMMatrixReadOnly(style.transform)
            //         return {
            //             translateX: matrix.m41,
            //             translateY: matrix.m42
            //         }
            //     }

            //     let position = getTranslateXY(thisFob),
            //         widthThisFob = thisFob.offsetWidth + 40;

            //     newFob.style.transform = `translate(${position.translateX + widthThisFob}px, ${position.translateY}px)`;
            // }

            // setPosition(split)
        }

        
    }

    createDraggableElement(selectWrapper) {
        const drag = document.createElement('div');
        drag.classList.add('draggable');
        drag.textContent = '';
        selectWrapper.append(drag);
    }

    createLine(target, split) {
        let line;

        const rect = this.getBoundingClientRect()
        console.log('rect: ', rect.top);
        // const dragElem = this.querySelector('.draggable');
        // console.log('dragElem: ', dragElem);

        // if (!dragElem) return;

        // new PlainDraggable(this, {
        //     handle: dragElem,
        //     onMove: function() { line.position(); },
        //     zIndex: 1 
        // });

        line = new LeaderLine(target, split);
        line.setOptions({startSocket: 'right', endSocket: 'left'});
        line.setOptions({path: 'grid'});

        const onMoveThisSplit = this.parentElement.addEventListener('mousemove', AnimEvent.add(function() {
            line.position();
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

    onMovingSplit(event, elem) {
        let parent = elem.closest('.fob')
        let rectFob = parent.getBoundingClientRect();
        let rectSplit = elem.getBoundingClientRect();

        if ((rectFob.right - 30) < rectSplit.right) {

            parent.style.width = `${parent.offsetWidth + 10}px`
        }

        if ((rectFob.bottom - 30) < rectSplit.bottom) {

            parent.style.height = `${parent.offsetHeight + 10}px`
        }
    }

    onResizeFob(event, fob, split) {

        let rectFob = fob.getBoundingClientRect();
        let rectSplit = split.getBoundingClientRect();
        
        if ((rectFob.right - 30) < rectSplit.right) {
            

            setPosition(split, 'right');
            // parent.style.width = `${parent.offsetWidth + 10}px`
        }

        if ((rectFob.bottom - 30) < rectSplit.bottom) {
            setPosition(split, 'bottom');
            // parent.style.height = `${parent.offsetHeight + 10}px`
        }

        function setPosition(elem, translateXY) {
            let right = 10,
                bottom = 10;
            
            function getTranslateXY(element) {
                const style = window.getComputedStyle(element)
                const matrix = new DOMMatrixReadOnly(style.transform)
                return {
                    translateX: matrix.m41,
                    translateY: matrix.m42
                }
            }

            let position = getTranslateXY(elem);
                // widthThisFob = thielemsFob.offsetWidth + 40;

            function positionXY(translateXY) {
                switch(translateXY) {
                    case 'right': 
                        return `translate(${position.translateX - right}px, ${position.translateY}px)`
                    case 'bottom': 
                        return `translate(${position.translateX}px, ${position.translateY- bottom}px)`;
                }
            }

            // var draggable = new PlainDraggable(split.getElementById('target'));

            elem.style.transform = positionXY(translateXY);


            const dragElem = split.querySelector('.draggable');

            const draggable = new PlainDraggable(split, {
                handle: dragElem,
                zIndex: 1
              });

              draggable.position();
        }
    }
}

  customElements.define('split-element', SplitElement);