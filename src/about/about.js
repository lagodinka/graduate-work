import "./about.css";
import GithubAPI from '../js/modules/GithubApi';
import CommitCard from '../js/compoments/CommitCard';
import CommitCardList from '../js/compoments/CommitCardList';
import {dating} from '../js/utils/date-functions';

const commitContainer = document.querySelector('.carousel');
const commits = new GithubAPI;
const commitList = new CommitCardList(commitContainer);

commits.getCommits()
.then((data) => {
  console.log(data);
  data.forEach(function(item, ind) {
    const commitCard = new CommitCard(dating(item.commit.committer.date), item.author.avatar_url, item.commit.committer.name,
      item.commit.committer.email, item.commit.message);
    commitList.render(commitCard);
  });
  const scr1 = document.createElement('script');
  scr1.setAttribute('src', 'https://unpkg.com/flickity@2/dist/flickity.pkgd.min.js');
  document.querySelector('body').appendChild(scr1);
})
.catch((err) => {
  console.log(err);
})
