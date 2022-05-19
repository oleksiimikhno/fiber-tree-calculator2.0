export default class SplitElement extends HTMLElement { // просто добавьте "default"
    constructor(name) {
        super();
        this.name = name;
    }

    class() {
        console.log(123);
    }
  }

  customElements.define("split-element", SplitElement);