export default class SearchInput {
  constructor(form, processNews, newsApi, cardList) {
    this.processNews = processNews;
    this.newsApi = newsApi;
    this.cardList = cardList;
    this.form = form;
    this.input = form.querySelector('input');
    this.setEventListener();
  }

  formValidate() {

  }

  setEventListener() {
    this.form.addEventListener('submit', (event) => {
      event.preventDefault();
      this.runSearch();
    });
  }

  runSearch() {
    localStorage.setItem('request', this.input.value); // ????????? //
    this.processNews(this.input.value, this.newsApi, this.cardList);
  }

}
