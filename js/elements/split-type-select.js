import objSplit from '../split-table-info/table.js';


export default class SplitTypeSelectElement extends HTMLElement {
    constructor() {
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
        const arraySelectName = ['type', 'fiber']
        const selectFrag = document.createDocumentFragment();

        for (let i = 0; i < arraySelectName.length; i++) {
            let select = document.createElement('select');
            select.classList.add(`select-${arraySelectName[i]}`);
        
            let type = (i == 0) ? '' : 'FBT';
            arrayOption = this.getOptions(type);
            select.append(this.createOptions(arrayOption));

            this.setAttributeSelected(`${arraySelectName[i]}`, arrayOption[0]);

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

    setAttributeSelected(name, value) {
        this.parentNode.setAttribute(name, value);
    }

    changeSplitData(event) {
        const target = event.target;
        
        if (target.classList.contains('select-type')) {
            let fiberElement = this.querySelector('.select-fiber'); 
            this.removeOptions(fiberElement);

            let arrayOption = this.getOptions(target.value);
            fiberElement.append(this.createOptions(arrayOption));

            this.setAttributeSelected("type", target.value);
        }

        if (target.classList.contains('select-fiber')) {
            this.setAttributeSelected("fiber", target.value);
            console.log('select-fiber');
        }
    }
}

customElements.define('split-type-select', SplitTypeSelectElement);