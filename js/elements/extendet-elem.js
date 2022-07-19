

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
        console.log(this.prevElement);
        console.log(123);
        this.prevElement.removeEventListener('mousemove', AnimEvent.add(() => line.position()), false);
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

        this.updateLinePosition(this.prevElement, line);

        return line;
    }

    updateLinePosition(element, line) {
        console.log('element: ', element);
        element.addEventListener('mousemove', AnimEvent.add(() => line.position()), false);
    }

    removeLine(line) {
        line.remove();
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