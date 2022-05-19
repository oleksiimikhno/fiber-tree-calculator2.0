const id = 1;

export default class FobElement extends HTMLElement {
    constructor(name) {
        super();
        this.dataset.fobId = id;
        console.log(`Create element FOB ${this.dataset.fobId++}`);
    }

    connectCallback() {
        console.log('Fob element in DOM');
        this._render();
        this._addEventListeners();
    }

    disconnectedCallback() {
        console.log('remove fob element');
        this._removeEventListeners();
    }


  }

  customElements.define("fob-element", FobElement);