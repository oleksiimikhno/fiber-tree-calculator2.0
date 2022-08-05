import ExtendetHTMLElement from './extendet-elem.js';

export default class FobElement extends ExtendetHTMLElement {
    constructor() {
        super();
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
        super.onDraggableElement(this);
    }

    _addEventListeners() {
        this.querySelector('.draggable').addEventListener('mousemove', this.updateSplitLinePosition);
        this.querySelector('.fob-edit').addEventListener('click', this.handlerEditNameFob);
        this.addEventListener('click', this.hiddenInput);
    }

    _removeEventListeners() {
        this.querySelector('.draggable').removeEventListener('mousemove', this.updateSplitLinePosition);
        this.querySelector('.fob-edit').removeEventListener('click', this.handlerEditNameFob);
    }

    handlerEditNameFob() {
        const fob = this.closest('.fob'),
              input = fob.querySelector('.input-fob-name'),
              fobName = fob.querySelector('.fob-name');

        input.classList.toggle('hidden');
        fobName.classList.toggle('hidden');

        input.focus();

        input.addEventListener('input', () => {
            fobName.textContent = input.value;
        })

        input.addEventListener('keydown', (event) => {
            if (event.code === 'NumpadEnter' || event.code === 'Enter') {
                input.classList.toggle('hidden');
                fobName.classList.toggle('hidden');
            }
        })

    }

    hiddenInput(event) {
        const target = event.target;

        if (!target.matches('.fob-edit') && !target.matches('.input-fob-name')) {
            this.querySelector('.input-fob-name').classList.add('hidden');
            this.querySelector('.fob-name').classList.remove('hidden');
        }
    }

    updateSplitLinePosition(event) {
        const fob = event.target.closest('.fob');
        fob.querySelector('.grid-field').dispatchEvent(new Event('mousemove'));
    }

    handlerFobPosition(newFob) {
        const fob = this.closest('.fob')

        const getSplitPosition = super.getTranslateXY(fob);

        const position = getSplitPosition, 
            widthThisFob = fob.offsetWidth + 40;

        newFob.style.transform = `translate(${position.translateX + widthThisFob}px, ${position.translateY}px)`;
    }
}

customElements.define('fob-element', FobElement);