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
    }

    createSplit(id) {
        let split = document.createElement('split-element');
        split.classList.add('row', 'split');
        
        split.innerHTML  = 
            `<split-type-select class="row split-selected"></split-type-select>
            <div class="vertical-center"><input class="in-split" name="in-signal" value="0"></div>
            <div class="column out-split">
                <div class="split-out row" data-id="0">
                    <input class="out-signal" data-id="0" name="out-split" value="0" disabled="">
                    <button-create-split class="btn btn-split create-split"></button-create-split> 
                    <button-create-fob class="btn btn-fob create-fob"></button-create-fob>
                </div>
                <div class="split-out row" data-id="0">
                    <input class="out-signal" data-id="0" name="out-split" value="0" disabled="">
                    <button-create-split class="btn btn-split create-split"></button-create-split> 
                    <button-create-fob class="btn btn-fob create-fob"></button-create-fob>
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

    handlerForceUpdateSignal(target, element) {
        const inputSignal = element.querySelector('[name="in-signal"]');

        const parent = target.closest('.split-out');
        const getOutSignalElement = parent.querySelector('.out-signal');
        inputSignal.value = getOutSignalElement.value;

        getOutSignalElement.addEventListener('change', (event) => {
            const target = event.target;
            inputSignal.value = target.value;

            inputSignal.dispatchEvent(new Event('change'));
        })
    }

    updateLinePosition(element, line) {
        this.parentField = element.parentElement;

        const updatePositionLine = () => line.position();

        this.listener = updatePositionLine.bind(this);
        
        this.parentField.addEventListener('mousemove', this.listener, false);
    }

    handlerRemoveElement(id) {
        let array = [];

        const clearElement = (line) => {
            const nextElement = line.end;

            const checkFobElement = (nextElement.classList.contains('in-split'))
                ? nextElement.closest('.fob').remove()
                : nextElement.remove();

            this.parentField.removeEventListener('mousemove', this.listener, false);
            line.remove();
        }

        for (let i = 0; i < arrayLines.length; i++) {
            let clearElements = (arrayLines[i]._id === id) ? clearElement(arrayLines[i]) : array.push(arrayLines[i]);
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

    onChangeRemoveButton(target, targetName, iconName = 'arrow-right-line') {
        target.classList.toggle(`create-${targetName}`);
        setTimeout(() => target.classList.toggle(`remove-${targetName}`), 0);

        const hiddenButton = (targetName === 'split')
            ? target.nextElementSibling.classList.toggle('hidden')
            : target.previousElementSibling.classList.toggle('hidden');

        

        this.swapIcon(target.querySelector('use'), iconName);
    }

    swapIcon(icon, name) {
        icon.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', `icon/icon.symbol.svg#${name}`);
    }
}