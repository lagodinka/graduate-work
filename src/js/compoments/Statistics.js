import {dateAgo, formatDate} from "../utils/date-functions";

export default class Statistics{
  constructor(searchData) {
    this.searchData = searchData;
    this.titleCount = [];
    this.textCount = [];
    this.totalCount = [];
    this.percents = [];
  }

  countMentionsDayAgo(request, n) {
    let titleCounter = 0;
    let textCounter = 0;
    let regex = new RegExp(request, 'gim');
    this.searchData.articles.forEach(function(article){
      if (article.publishedAt.slice(0,10) == formatDate(dateAgo(n))) {
        if (article.title != null) {
          if (article.title.match(regex) != null) titleCounter += article.title.match(regex).length;
        };
        if (article.description != null) {
          if (article.description.match(regex) != null) textCounter += article.description.match(regex).length;
        };
      }
    });
    return [titleCounter, textCounter];
  }

  countAll(request) {
    for (let n=7; n>0; n--) {
      this.titleCount.push(this.countMentionsDayAgo(request, n)[0]);
      this.textCount.push(this.countMentionsDayAgo(request, n)[1]);
      this.totalCount.push(this.titleCount[7-n]+this.textCount[7-n]);
    }
  }

  countTitles() {
    return this.titleCount.reduce(function(sum,item){
      return sum + item;
    })
  }

  countPercents() {
    let sum = this.totalCount.reduce(function(sum,item){
      return sum + item;
    });
    if (sum == 0) this.percents = this.totalCount;
    else this.percents = this.totalCount.map(function(item) {return item/sum*100});
  }
}
