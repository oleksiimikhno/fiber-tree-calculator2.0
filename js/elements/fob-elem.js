export default class FobElement extends HTMLElement {
    constructor(name) {
        super();
        // this.count++;
        // this.dataset.fobId = count;
        // console.log(`Create element FOB ${this.dataset.fobId++}`);
    }

    connectedCallback() {
        console.log('Fob element in DOM');
        // this._render();
        this._addEventListeners();
    }

    disconnectedCallback() {
        console.log('remove fob element');
        this._removeEventListeners();
    }

    _addEventListeners() {
        this.addEventListener('click', this.createFob);
    }

    createFob(event) {
        const target = event.target;
        
        if (target.matches('.create-fob')) {
            let fob = document.createElement('fob-element')

            this.append(fob)
        }
        // console.log('event: ', this.event.target);
        // let target = event.target
        // console.log('event: ', target.matches('.create-split'));
        console.log(`exitButton was clicked! ${this.id}`);
    } 


  }

  customElements.define("fob-element", FobElement);