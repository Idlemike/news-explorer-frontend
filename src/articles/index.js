import './style.css';
import Header from '../js/components/Header';
import { openArticlesMenu } from '../js/utils';
import {
  MAIN_URL,
  regBtn,
  mainApi,
  resultsTitleQuantityArticles,
  keywordsFirstArticles,
  keywordsNextArticles,
  keywordsOthersArticles,
  cardContainer,
  mobileMenuButton,
} from '../js/constants';
import ArticlesNewsCard from '../js/components/ArticlesNewsCard';

const template = document.querySelector('#task-template');
// В этих файлах делаются запросы к API, проверка
// localStorage, создание экземпляров классов,
// необходимых для первоначальной отрисовки страницы, добавление обработчиков.
const logout = () => {
  const data = JSON.parse(localStorage.getItem('userData'));
  const { _id } = data.data.user._id;
  mainApi.logout({ _id })
    .then(() => {
      localStorage.setItem('userData', '');
      window.location.assign(MAIN_URL);
    })
    .catch((err) => err.message);
};

const renderTitle = (cardsNumber) => {
  const user = JSON.parse(localStorage.getItem('userData'));
  resultsTitleQuantityArticles.textContent = `${user.data.user.name}, у вас ${cardsNumber} сохраненных статей`;
};

const renderKeywords = (cards) => {
  if (!cards.length) return;
  const keywordsSet = new Set(cards.map((x) => x.keyword));
  const keywords = [...keywordsSet];
  let keywordsMain = [];
  let keywordsOthers;
  if (keywords.length > 3) {
    keywordsMain = `${keywords[0]}, ${keywords[1]}`;
    keywords.splice(0, 2);
    keywordsOthers = keywords.length > 0 ? `${keywords.length} другим` : '';
    keywordsFirstArticles.textContent = keywordsMain;
    keywordsNextArticles.textContent = 'и';
    keywordsOthersArticles.textContent = keywordsOthers;
  } else {
    keywords.forEach((value) => keywordsMain.push(` ${value}`));
    keywordsFirstArticles.textContent = [...keywordsMain];
    keywordsNextArticles.textContent = '';
    keywordsOthersArticles.textContent = '';
  }
};

const init = async () => {
  const header = new Header();

  await mainApi.getUserData()
    .then((res) => {
      localStorage.setItem('userData', JSON.stringify(res));
      header.render({ isLoggedIn: true, userName: res.data.user.name });
    })
    .catch(() => {
      header.render({ isLoggedIn: false, userName: '' });
      localStorage.setItem('userData', '');
    });
  await mainApi.getArticles()
    .then((res) => {
      renderTitle(res.data.articles.length);
      renderKeywords(res.data.articles);
      res.data.articles.reverse().forEach((card) => {
        const newsCard = new ArticlesNewsCard(card, template).create();
        cardContainer.appendChild(newsCard);
      });
    })
    .catch((err) => err.message);

  mobileMenuButton.addEventListener('click', openArticlesMenu);
  regBtn.addEventListener('click', logout);
};
init();
