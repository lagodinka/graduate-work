import "./analytics.css";
import {dateAgo, formatDate} from "../js/utils/date-functions";
import Statistics from "../js/compoments/Statistics";
import DataStorage from "../js/modules/DataStorage";

const requestIs = document.querySelector('.request__request');
const requestFoundLastWeek = document.querySelector('.request__week');
const requestMentionedInTitles = document.querySelector('.request__titles');
const allBars = document.querySelectorAll('.analytics__bar');
const weekLabels = document.querySelectorAll('.analytics__day');
const weekDays = ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'];

const dataStorage = new DataStorage();
const request = dataStorage.getRequest();
const searchData = dataStorage.getData();
const statistics = new Statistics(searchData);

// Эти строчки делают всю статистическую работу
statistics.countAll(request);
statistics.countPercents();

// Заполнение текста и чисел над таблицей
requestIs.textContent = `Вы спросили: "${request}"`;
requestFoundLastWeek.textContent = searchData.totalResults;
requestMentionedInTitles.textContent = statistics.countTitles();

// Нумерация дней недели
weekLabels.forEach(function(day, index) {
  let thatDate = dateAgo(7 - index).getDate();
  let thatDay = weekDays[dateAgo(7 - index).getDay()];
  day.textContent = thatDate + ', ' + thatDay;
});

allBars.forEach(function(day, index){
  day.style.width = `${statistics.percents[index]}%`;
  day.style.setProperty('--final-width', statistics.percents[index] + '%');
  day.textContent = statistics.totalCount[index];
});


// Выпендрёж
const analyticsWatch = document.querySelector('.analytics__title');
const header = document.querySelector('.header');
analyticsWatch.scrollIntoView();
//setTimeout(() => {header.scrollIntoView()}, 2000);

