import "./index.css";
import {dateAgo, formatDate, dating} from "./js/utils/date-functions";
import Card from "./js/compoments/NewsCard";
import NewsCardList from "./js/compoments/NewsCardList";
import SearchInput from "./js/compoments/SearchInput";
import Switch from "./js/compoments/Switch";
import NewsAPI from "./js/modules/NewsApi";
import DataStorage from "./js/modules/DataStorage";

const form = document.querySelector('.cover__search');
const container = document.querySelector('.results__container');

// Класс Switch сделан для удобства, чтобы не писать каждый раз
// .classList.add.("unshown")
// Объектов, которым требуется этот функционал, оказалось много
const resultsSection = new Switch(document.querySelector('.results', '.section'));
const notFound = new Switch(document.querySelector('.results__not-found'));
const preloader = new Switch(document.querySelector('.results__searching'));
const resultsList = new Switch(document.querySelector('.results__result'));
const showMoreButton = new Switch(document.querySelector('.results__show-button'));


const newsCardList = new NewsCardList(container, showMoreButton);
// const newsApi = new NewsAPI('http://newsapi.org/v2/everything?', '09ffd6fceac0482dafccc74cab09ba15');
const newsApi = new NewsAPI('http://praktikum.tk/news/v2/everything?', '09ffd6fceac0482dafccc74cab09ba15');
const searchInput = new SearchInput(form, processNews, newsApi, newsCardList);
const dataStorage = new DataStorage();

resultsSection.hide();

function processNews(request, newsApi, cardList) {
  resultsSection.show();
  resultsList.hide();
  notFound.hide();
  preloader.show();
  cardList.clear();
  newsApi.getNews(request, formatDate(dateAgo(7)), formatDate(dateAgo(0)))
    .then((data) => {
      dataStorage.setData(data);
      data.articles.forEach(function(item) {
        const newsCard = makeNewsCard(item.url, item.urlToImage, dating(item.publishedAt), item.title, item.description, item.source.name);
        cardList.addCard(newsCard);
      });
      preloader.hide();
      if (data.articles.length === 0) {
        notFound.show();
        resultsSection.element.scrollIntoView(false);
      }
      else {
        resultsList.show();
        resultsList.element.scrollIntoView();
      }
      cardList.polishCards();
      cardList.drawThreeCards();
    })
    .catch((err) => {
      console.log(err);
    })
}

function makeNewsCard(url, urlToImage, publishedAt, title, description, source) {
  const newsCard = new Card(url, urlToImage, publishedAt, title, description, source);
  return newsCard;
}

showMoreButton.element.addEventListener('click', () => {

  newsCardList.drawThreeCards();
});



