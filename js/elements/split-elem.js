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
        this.calcSignal();
    }

    _addEventListeners() {
        this.addEventListener('click', this.createSplit);
        // this.addEventListener('click', this.hiddenLine);
    }

    createSplit(event) {
        const target = event.target;

        if (target.matches('.create-split')) {
            let line;
            let split = document.createElement('split-element');
            split.classList.add('row', 'split');
            split.id = `split-${this.idSplit}`; 
            
            // this.style.marginBottom ='150px'
            
            this.style.marginTop ='70px'
            split.style.transform = `translate(10px, 10px)`

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

        
            line = new LeaderLine(target, split);
            line.setOptions({startSocket: 'right', endSocket: 'left'});
    
            const watchMoveThisSplit = this.parentElement.addEventListener('mousemove', AnimEvent.add(function() {
                    line.position();
            }), false);
        }
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

                i++;
            }
        } else {
            result = incoming.value - objSplit[type][fiber];

            arrayOutcomingSignal.forEach(item => {
                item.value = result.toFixed(2);
            });
        }
    }
}

  customElements.define('split-element', SplitElement);