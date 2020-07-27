export default class CommitCard {
  constructor(date, imageLink, author, email, text) {
    this.date = date;
    this.imageLink = imageLink;
    this.author = author;
    this.email = email;
    this.text = text;
  }

  create() {
    const commitCard = document.createElement('div');
    commitCard.classList.add('commit-card');
    commitCard.innerHTML = `<p class="commit-card__date">${this.date}</p>
    <div class="commit-card__profile">
      <img src="${this.imageLink}" alt="аватар" class="commit-card__avatar">
      <div class="commit-card__info">
        <p class="subtitle commit-card__author">${this.author}</p>
        <p class="commit-card__email">${this.email}</p>
      </div>
    </div>
        <p class="commit-card__comment">${this.text}</p>`;
    return commitCard;
  }
}
