

export default class ExtendetHTMLElement extends HTMLElement {
    constructor(name) {
        super();
        this.elementLine;
        this.rect = this.getBoundingClientRect();
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
        this.addEventListener('click', this.createFob);
        this.querySelector('.draggable').addEventListener('mousemove', this.updateSplitLinePosition);
    }

    onDraggableElement(element) {
        const draggable = new PlainDraggable(element, {
            handle: element.querySelector('.draggable'),
            zIndex: 1
        });

        return draggable;
    }

    createLine(prevElement, target, newElement, color = '#3197fd', startSocket = 'auto') {
        let line = new LeaderLine(target, newElement);
        line.setOptions({startSocket: startSocket, endSocket: 'left'});
        line.setOptions({path: 'grid'});
        line.setOptions({color: color});

        const updateLinePosition = prevElement.parentElement.addEventListener('mousemove', AnimEvent.add(function() {
            line.position()
        }), false);

        return line;
    }

    getTranslateXY(element) {
        const style = window.getComputedStyle(element)
        const matrix = new DOMMatrixReadOnly(style.transform)
        return {
            translateX: matrix.m41,
            translateY: matrix.m42
        }
    }
    

    // createLine(targetnewFob) {
    //     let line;
    //     let drag = new PlainDraggable(newFob, {
    //         handle: newFob.querySelector('.draggable'),
    //         onMove: function() { line.position(); },
    //         zIndex: 1
    //     });
    
    //     line = new LeaderLine(target, targetnewFob);
    //     line.setOptions({startSocket: 'right', endSocket: 'left'});
    //     line.setOptions({color: '#3197fd'});

    //     const updatePisitionThisFob = field.addEventListener('mousemove', AnimEvent.add(function() {
    //         line.position();
    //     }), false);

    // }

}