export default class SplitTypeElement extends HTMLElement {
    constructor(name) {
        super();
    }

    connectedCallback() {
        console.log(`Type element in DOM`);
        this._render();
        this._addEventListeners();
    }

    disconnectedCallback() {
        console.log('remove Type element');
        this._removeEventListeners();
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

        }
        
    }
}

  customElements.define("split-type-element", SplitTypeElement);