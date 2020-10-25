// Отвечает за взаимодействие с NewsAPI
import { API_KEY } from '../constants';

export default class NewsApi {
  constructor(options) {
    Object.assign(this, options);

    this.url = `https://nomoreparties.co/news/v2/everything?q=${this.keyword}&from=${this.dateFrom}&to=${this.dateTo}&pageSize=3&sortBy=popularity&apiKey=${API_KEY}`;

    /* this.url = `https://newsapi.org/v2/everything?q=${this.keyword}&from=${this.dateFrom}&to=${this.dateTo}&pageSize=3&sortBy=popularity&apiKey=${API_KEY}`; */
  }

    // возвращает список новостей на основе запроса.
    getNews = (pagination) => fetch(`${this.url}&page=${pagination}`, {
      method: 'GET',
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error('Ошибка');
      })
      .catch((err) => {
        throw new Error(err.message);
      });
}

/* обработку ответа и обязательный блок .catch(), бросающий ошибку
 дальше с помощью Promise.reject или throw. Также
 классы MainApi и NewsApi не должны взаимодействовать с DOM напрямую из своих методов. */
