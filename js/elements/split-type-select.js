import objSplit from '../split-table-info/table.js';


export default class SplitTypeElement extends HTMLElement {
    constructor(name) {
        super();
        this.selects;
        // this.objSplit = require('../split-table-info/table.js');
    }

    connectedCallback() {
        this._render();
        this._addEventListeners();
    }

    disconnectedCallback() {
        this._removeEventListeners();
        this.removeOptions();
    }

    _render() {
        this.createSelectSplit();
    }

    _addEventListeners() {
        this.addEventListener('change', this.changeSplitData)
        // this.addEventListener('change', this.changeSplitType);
        // this.addEventListener('click', this.hiddenLine);
    }

    createSelectSplit() {
        let arrayOption = [];
        const selectFrag = document.createDocumentFragment();
        // let getOptions = (nameOption = false) => (nameOption) ? Object.keys(objSplit[nameOption]) : Object.keys(objSplit);

        for (let i = 0; i < 2; i++) {
            let select = document.createElement('select');
            
            if (i == 0) {
                select.classList.add('select-type');
                arrayOption = this.getOptions();

                select.append(this.createOptions(arrayOption));
            } else {
                select.classList.add('select-fiber');
                arrayOption = this.getOptions('FBT');
                
                select.append(this.createOptions(arrayOption));
            }

            selectFrag.appendChild(select);
        }

        this.append(selectFrag);
    }

    getOptions(nameOption = false) {
        return (nameOption) ? Object.keys(objSplit[nameOption]) : Object.keys(objSplit);;
    }

    createOptions(options) {
        const optionFrag = document.createDocumentFragment();

        [...options].forEach((name)  =>  { 
            let option = document.createElement('option');
            option.value = name;
            option.textContent = name;
    
            optionFrag.append(option);
        });

        return optionFrag;
    }

    removeOptions(element) {
        element.innerHTML = '';
    }

    changeSplitData(event) {
        this.getOptions()
        const target = event.target;
        
        if (target.classList.contains('select-type')) {
            let fiberElement = this.querySelector('.select-fiber'); 
            this.removeOptions(fiberElement);

            let arrayOption = this.getOptions(target.value);
            fiberElement.append(this.createOptions(arrayOption));
        }

        if (target.classList.contains('select-fiber')) {
            console.log('select-fiber');
        }
        
    }
}

customElements.define('split-type-select', SplitTypeElement);