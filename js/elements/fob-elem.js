export default class FobElement extends HTMLElement {
    static #instances = 2;

    constructor(name) {
        super();
        this.idFob = FobElement.#instances++;
        this.rect = this.getBoundingClientRect();
        // this.count++;
        // this.dataset.fobId = count;
        // console.log(`Create element FOB ${this.dataset.fobId++}`);
        // this.firstSplit = 
        // this.mouseDownOnThis = false;
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
        // createFirstSplit();
    }

    _addEventListeners() {
        this.addEventListener('click', this.createFob);
    }
 
    createFob(event) {
        const target = event.target;
        
        if (target.matches('.create-fob')) {

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

                    // let fob = newFob(this.idFob);
            
                    function createFirstSplit() {
                        let split = document.createElement('split-element');
                        split.classList.add('row', 'split');
                        
                        split.innerHTML  = 
                            `<split-type-select class="row split-selected"></split-type-select>
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

                        return split;
                    }

                    let split = createFirstSplit();

        
                    fobGrid.insertAdjacentElement('beforeend', split);

                    return fobElem;
            }

            function createLine(targetnewFob) {
                let line;
                new PlainDraggable(newFob, {
                    handle: newFob.querySelector('.draggable'),
                    onMove: function() { line.position(); },
                    zIndex: 1
                });
            
                line = new LeaderLine(target, targetnewFob);
                line.setOptions({startSocket: 'right', endSocket: 'left'});
    
                const updatePisitionThisFob = field.addEventListener('mousemove', AnimEvent.add(function() {
                    line.position();
                }), false);

            }

            function setPosition(thisFob) {
            
                function getTranslateXY(element) {
                    const style = window.getComputedStyle(element)
                    const matrix = new DOMMatrixReadOnly(style.transform)
                    return {
                        translateX: matrix.m41,
                        translateY: matrix.m42
                    }
                }

                let position = getTranslateXY(thisFob),
                    widthThisFob = thisFob.offsetWidth + 40;

                newFob.style.transform = `translate(${position.translateX + widthThisFob}px, ${position.translateY}px)`;
            }

            function updateSignal(inputSignal) {
                let parent = target.closest('.split-out');
                let getOutSignalElement = parent.querySelector('.out-signal');
                inputSignal.value = getOutSignalElement.value;
    
                getOutSignalElement.addEventListener('change', (event) => {
                    const target = event.target;
                    inputSignal.value = target.value;
    
                    inputSignal.dispatchEvent(new Event('change'));
                })
            }

            let newFob = createNewFob(this.idFob);
            let incomongElem = newFob.querySelector('[name="in-signal"]');
            
            field.append(newFob);
            setPosition(this);
            createLine(incomongElem);
            updateSignal(incomongElem);
        }
    }
}

customElements.define('fob-element', FobElement);