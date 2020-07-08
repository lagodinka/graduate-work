export default class CommitCardList{
  constructor(container) {
    this.container = container;
  }

  render(card) {
    // this.container.appendChild(card.create());
    this.container.insertBefore(card.create(), this.container.firstChild);

  }
}
