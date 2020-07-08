export default class NewsCardList{
  constructor(container, showMoreButton) {
    this.container = container;
    this.showMoreButton = showMoreButton;
    this.list = [];
    this.drawn = 0;
  }

  addCard(newsCard) {
    this.list.push(newsCard);
  }

  polishCards() {
    this.list.forEach(function(item){
      if (item.text) item.text = item.text.replace(/(\<(\/?[a-z]+)>)/gi,"");
      else item.text = '';
    })
  }

  buttonCheck() {
    console.log(this.drawn);
    if (this.list.length == this.drawn) this.showMoreButton.hide();
    else this.showMoreButton.show();
  }

  drawThreeCards() {
    for(let i=0; i<3; i++) {
      if (!this.list[this.drawn]) break;
      let newsCard = this.list[this.drawn];
      this.container.appendChild(newsCard.create());
      this.drawn += 1;
    }
    this.buttonCheck();
    if (this.drawn > 3) this.showMoreButton.element.scrollIntoView(false);
  }

  clear() {
    while (this.container.firstChild) {
      this.container.removeChild(this.container.lastChild);
    }
    this.list = [];
    this.drawn = 0;
  }


}
