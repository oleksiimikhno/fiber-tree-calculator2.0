export default class SplitTypeElement extends HTMLElement {
    constructor(name) {
        super();
        this.selects = this.querySelectorAll('select');
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
        // this.calcSignal();
    }

    _addEventListeners() {

        this.selects.forEach(select => {
            select.addEventListener('change', this.changeSplitData);
        })
        // this.addEventListener('change', this.changeSplitType);
        // this.addEventListener('click', this.hiddenLine);
    }

    changeSplitData(event) {
        const target = event.target;

        if (target.classList.contains('select-type')) {
            console.log('select-type');
        }

        if (target.classList.contains('select-fiber')) {
            console.log('select-fiber');
        }
        
    }
}

  customElements.define('split-type', SplitTypeElement);