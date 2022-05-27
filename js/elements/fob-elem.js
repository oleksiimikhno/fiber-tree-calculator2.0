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

            function newFob(id) {
                let fobElem = document.createElement('fob-element'),
                    fobHead = document.createElement('div');

                    fobElem.classList.add('fob');
                    fobHead.classList.add('fob-head', 'draggable');
                    fobHead.textContent = `Drag This ${id}`;
                    fobElem.append(fobHead);

                    // let fob = newFob(this.idFob);
            
                    function createFirstSplit() {
                        let split = document.createElement('split-element');
                        split.classList.add('row', 'split');
                        
                        split.innerHTML  = 
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

                        return split;
                    }

                    let split = createFirstSplit();

        
                    fobElem.insertAdjacentElement('beforeend', split);

                    return fobElem;
            }

            function createLine() {
                let line;
                new PlainDraggable(fob, {
                    handle: fob.querySelector('.draggable'),
                    onMove: function() { line.position(); },
                    zIndex: 1
                });
            
                line = new LeaderLine(target, fob.querySelector('[name="in-signal"]'));
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

                fob.style.transform = `translate(${position.translateX + widthThisFob}px, ${position.translateY}px)`;
            }

            let fob = newFob(this.idFob);
            field.append(fob);
            setPosition(this);
            createLine();
        }
    }
  }

  customElements.define("fob-element", FobElement);