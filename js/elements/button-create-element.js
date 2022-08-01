import ExtendetHTMLElement from './extendet-elem.js';

export default class ButtonCreateElement extends HTMLElement {
    constructor() {
        super();
        console.log(123);
    }

    connectedCallback() {
        console.log(333);
        this._render();
        this._addEventListeners();
    }

    disconnectedCallback() {
        this._removeEventListeners();
        
    }

    _render() {
        console.log(this);
        this.appendSVG()
    }

    _addEventListeners() {
    }

    _removeEventListeners() {
    }

    appendSVG () {
        this.append('<svg class="icon icon-out"><use xlink:href="icon/icon.symbol.svg#add-fill"></use></svg>')
    }
}

customElements.define('button-create-element', ButtonCreateElement);