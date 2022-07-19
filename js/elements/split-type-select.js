import objSplit from '../split-table-info/table.js';

export default class SplitTypeSelectElement extends HTMLElement {
    constructor() {
        super();
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
        this.addEventListener('change', this.changeSplitData);
    }

    _removeEventListeners() {
        this.removeEventListener('change', this.changeSplitData);
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

    changeSplitData(event) {
        const target = event.target;
        
        if (target.classList.contains('select-type')) {
            let fiberElement = this.querySelector('.select-fiber'); 
            this.removeOptions(fiberElement);

            let arrayOption = this.getOptions(target.value);
            fiberElement.append(this.createOptions(arrayOption));
            
            this.setAttributeSelected('type', target.value);
            this.setAttributeSelected('fiber', Object.entries(objSplit[target.value])[0][0]);
        }

        if (target.classList.contains('select-fiber')) {
            this.setAttributeSelected('fiber', target.value);
        }
    }

    setAttributeSelected(name, value) {
        this.parentNode.setAttribute(name, value);
    }
}

customElements.define('split-type-select', SplitTypeSelectElement);