export default class Card {
  constructor(link, imageLink, date, title, text, source) {
    this.link = link;
    this.imageLink = imageLink;
    this.date = date;
    this.title = title;
    this.text = text;
    this.source = source;
  }

  create() {
    const newsCard = document.createElement('div');
    newsCard.innerHTML = `<a href="${this.link}" class="results__link" target="_blank">
    <div class="news-card">
      <img src="${this.imageLink}" alt="Изображение к новости" onError="this.src='https://hexcolor16.com/d7d7d7-200x200.png';" class="news-card__image">
      <div class="news-card__text-content">
        <p class="news-card__date">${this.date}</p>
        <h3 class="subtitle">${this.title}</h3>
        <p class="news-card__text">${this.text}</p>
        <p class="news-card__source">${this.source}</p>
      </div>
    </div>
  </a>`;
  return newsCard;
  }
}
