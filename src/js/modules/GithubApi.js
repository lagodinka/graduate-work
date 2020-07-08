export default class GithubAPI {

  getCommits() {
    const url = `https://api.github.com/repos/lagodinka/graduate-work/commits`;

    return fetch(url)
            .then((res) => {
              if (res.ok) return res.json();
              else return Promise.reject(`Ошибка: ${res.status}. Но Вы не отчаивайтесь.`);
            })
            .catch((err) => {
              console.log(err);
              return Promise.reject(err);
            })
  }
}
