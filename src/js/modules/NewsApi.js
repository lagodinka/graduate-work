export default class NewsAPI {
  constructor(apiUrl, apiKey) {
    this.apiUrl = apiUrl;
    this.apiKey = apiKey;
  };

  getNews(request, from, to) {
    const url = `${this.apiUrl}` +
          `q=${request}&` +
          `from=${from}&` +
          `to=${to}&` +
          `language=ru&` +
          `pageSize=100&` +
          `apiKey=${this.apiKey}`;

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
