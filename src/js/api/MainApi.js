/* import getUserToken from '../utils/index'; */
//  Отвечает за взаимодействие с написанным вами Node.js API.
// Конструктор этого класса принимает опции, необходимые для инициализации работы с API.

export default class MainApi {
  constructor(config) {
    this.url = config.url;
    this.headers = config.headers;
  }

  // регистрирует нового пользователя;
  signUp = async (email, password, name) => {
    this.response = await fetch(`${this.url}/signup`, {
      method: 'POST',
      cache: 'no-cache',
      headers: this.headers,
      body: JSON.stringify({ name: name.value, email: email.value, password: password.value }),
    });
    if (this.response.ok) {
      return this.response.json();
    }
    return Promise.reject(this.response.status, this.response.message);
  };

  // аутентифицирует пользователя на основе почты и пароля;
  signIn = async (email, password) => {
    this.response = await fetch(`${this.url}/signin`, {
      method: 'POST',
      /*    mode: 'no-cors', */
      cache: 'no-cache',
      headers: this.headers,
      body: JSON.stringify({ email: email.value, password: password.value }),

    });
    if (this.response.ok) {
      return this.response.json();
    }
    return Promise.reject(this.response.status, this.response.message);
  };

  logout = async () => {
    this.response = await fetch(`${this.url}/users/me`, {
      method: 'GET',
      cache: 'no-cache',
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    });
    if (this.response.ok) {
      return this.response.json();
    }
    return Promise.reject(this.response.status, this.response.message);
  };

  // возвращает информацию о пользователе;
  getUserData = async () => {
    this.response = await fetch(`${this.url}/users/me`, {
      method: 'GET',
      credentials: 'include',
      cache: 'no-cache',
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    });
    if (this.response.ok) {
      return this.response.json();
    }
    return Promise.reject(this.response.status, this.response.message);
  };

  // забирает все статьи;
  getArticles = async () => {
    this.response = await fetch(`${this.url}/articles`, {
      method: 'GET',
      credentials: 'include',
      cache: 'no-cache',
      headers: this.headers,
    });
    if (this.response.ok) {
      return this.response.json();
    }
    return Promise.reject(this.response.status, this.response.message);
  };

  // создаёт статью;
  createArticle = async (data) => {
    this.response = await fetch(`${this.url}/articles`, {
      method: 'POST',
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (this.response.ok) {
      return this.response.json();
    }
    return Promise.reject(this.response.status, this.response.message);
  };

  // удаляет статью.
  removeArticle = async (cardId) => {
    this.cardId = cardId;
    this.response = await fetch(`${this.url}/articles/${this.cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    });
    if (this.response.ok) {
      return this.response.json();
    }
    return Promise.reject(this.response.status, this.response.message);
  };
}

// Каждый из методов этих классов возвращает промис, содержит в себе обработку ответа
// и обязательный блок .catch(), бросающий ошибку дальше с помощью Promise.reject или
// throw. Также классы MainApi и NewsApi не должны взаимодействовать с DOM напрямую
// из своих методов.
