export default class FobElement extends HTMLElement {
    constructor(name) {
        super();
        // this.count++;
        // this.dataset.fobId = count;
        // console.log(`Create element FOB ${this.dataset.fobId++}`);
        // this.firstSplit = 
        this.mouseDownOnThis = false;
    }

    connectedCallback() {
        console.log('Fob element in DOM');
        this._render();
        this._addEventListeners();
    }

    disconnectedCallback() {
        console.log('remove fob element');
        this._removeEventListeners();
    }

    _render() {
        this.drag = new PlainDraggable(this, {
            handle: this.querySelector('.draggable'),
            // onMove: function() { line.position(); },
            // onMoveStart: function() { line.dash = {animation: true}; },
            // onDragEnd: function() { line.dash = false; },
            // handle: true,
            zIndex: 1
          });

          console.log(this.line);
    }

    _addEventListeners() {
        let ww = this.addEventListener('click', this.createFob);
        console.log('ww: ', ww);
        console.log(this.arrayLine);
    }

    createFob(event) {
        const target = event.target;
        
        if (target.matches('.create-fob')) {
            let fob = document.createElement('fob-element'),
                fobHead = document.createElement('div');

            fob.classList.add('fob');
            fobHead.classList.add('fob-head', 'draggable');
            fobHead.textContent = 'Drag This 2';
            fob.append(fobHead);
            

            let firstSplit = document.createElement('split-element');
            firstSplit.classList.add('row', 'split');
            // firstSplit.id = `#split-${i}`;
                

            field.append(fob);
            
            firstSplit.innerHTML  = 
                `<div class="row split-selected">
                    <select class="select-type">
                        <option value="FBT">FBT</option>
                        <option value="PLC">PLC</option>
                    </select>
                    <select class="select-fiber">
                        <option value="5_95">5/95</option>
                        <option value="10_90">10/90</option>
                        <option value="15_85">15/85</option>
                    </select>
                </div>
                <div class="vertical-center"><input class="in-split" name="in-signal" value="0"></div>
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

            fob.insertAdjacentElement('beforeend', firstSplit);

            let line ;
            new PlainDraggable(fob, {
                handle: fob.querySelector('.draggable'),
                onMove: function() { line.position(); },
                zIndex: 1
            });
        
            line = new LeaderLine(target, fob.querySelector('[name="in-signal"]'));

            const watchMoveThisFob = field.addEventListener('mousemove', AnimEvent.add(function() {
                line.position();}), false);
        }
    }
  }

  customElements.define("fob-element", FobElement);