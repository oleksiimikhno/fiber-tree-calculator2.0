let arrayLines = [];

export default class ExtendetHTMLElement extends HTMLElement {
    constructor() {
        super();
        this.line;
        this.prevElement;
    }

    connectedCallback() {
        this._render();
        this._addEventListeners();
    }

    disconnectedCallback() {
        this._removeEventListeners();
    }

    _render() {
    }

    _addEventListeners() {
    }

    _removeEventListeners() {
        console.log('qwe');
        // this.prevElement.removeEventListener('mousemove', AnimEvent.add(() => line.position()), false);
    }

    createSplit() {
        let split = document.createElement('split-element');
        split.classList.add('row', 'split');
        
        split.innerHTML  = 
            `<split-type-select class="row split-selected"></split-type-select>
            <div class="vertical-center"><input class="in-split" name="in-signal" value="0"></div>
            <div class="column out-split">
                <div class="split-out row" data-id="0">
                    <input class="out-signal" data-id="0" name="out-split" value="0" disabled="">
                    <button class="btn btn-split create-split">
                        <svg class="icon icon-out"><use xlink:href="icon/icon.symbol.svg#add-fill"></use></svg>
                    </button> 
                    <button class="btn create-fob">
                        <svg class="icon icon-out green"><use xlink:href="icon/icon.symbol.svg#arrow-right-line"></use></svg>
                    </button>
                </div>
                <div class="split-out row" data-id="0">
                    <input class="out-signal" data-id="0" name="out-split" value="0" disabled="">
                    <button class="btn btn-split create-split">
                        <svg class="icon icon-out"><use xlink:href="icon/icon.symbol.svg#add-fill"></use></svg>
                    </button>
                    <button class="btn create-fob">
                        <svg class="icon icon-out green"><use xlink:href="icon/icon.symbol.svg#arrow-right-line"></use></svg>
                    </button>
                </div>
            </div>`;

        return split;
    }

    onDraggableElement(element) {
        const draggable = new PlainDraggable(element, {
            handle: element.querySelector('.draggable'),
            zIndex: 1
        });

        return draggable;
    }

    createLine(prevElement, target, newElement, color = '#3197fd', startSocket = 'auto') {
        this.prevElement = prevElement.parentElement;

        const line = new LeaderLine(target, newElement);
        line.setOptions({startSocket: startSocket, endSocket: 'left'});
        line.setOptions({path: 'grid'});
        line.setOptions({color: color});

        target.dataset.lineId = line._id;

        arrayLines.push(line);

        this.updateLinePosition(this.prevElement, line);

        return line;
    }

    updateLinePosition(element, line) {
        element.parentElement.addEventListener('mousemove', AnimEvent.add(() => line.position()), false);
    }

    onRemoveLine(id) {
        let array = [];

        for (let i = 0; i < arrayLines.length; i++) {
            (arrayLines[i]._id === id) ? arrayLines[i].remove() : array.push(arrayLines[i]);
        }

        arrayLines = array;
    }

    onSetPosition(element, positionElem = 'right', line, space = 10) {
        const getItemPosition =  this.getTranslateXY(element);

        function setPositionXY() {
            let position = getItemPosition;

            switch(positionElem) {
                case 'right': 
                    return `translate(${position.translateX - space}px, ${position.translateY}px)`
                case 'bottom': 
                    return `translate(${position.translateX}px, ${position.translateY - space}px)`;
            }
        }

        element.style.transform = setPositionXY();
    }  

    getTranslateXY(element) {
        const style = window.getComputedStyle(element)
        const matrix = new DOMMatrixReadOnly(style.transform)
        return {
            translateX: matrix.m41,
            translateY: matrix.m42
        }
    }

    swapIcon(icon, name) {
        icon.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', `icon/icon.symbol.svg#${name}`);
    }
}