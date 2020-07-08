export default class Switch{
  constructor(element) {
    this.element = element;
  }

  show() {
    this.element.classList.remove('unshown');
  }

  hide() {
    this.element.classList.add('unshown');
  }

}
