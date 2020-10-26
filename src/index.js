import './style.css';
import { openErrorBlock, togglePreloader, openMainMenu } from './js/utils/index';
import MainApi from './js/api/MainApi';
import NewsApi from './js/api/NewsApi';
import Header from './js/components/Header';
import PopupLogin from './js/components/PopupLogin';
import PopupAuth from './js/components/PopupAuth';
import PopupRegDone from './js/components/PopupRegDone';
import FormValidator from './js/components/FormValidator';

import {
  groupForm,
  resultsBtn,
  regBtn,
  mobileMenuButton,
  menu,
  cardContainer,
  results,
  config,
  fromDateFormated,
  groupInput,
  NOT_FOUND_MESSAGES,
  notFound,
  showArticles,
  toDateFormated,
} from './js/constants/index';
import NewsCard from './js/components/NewsCard';

const template = document.querySelector('#task-template');

const main = async () => {
  /** инициализация классов */
  const mainApi = new MainApi(config);
  const header = new Header();
  const formValidator = new FormValidator();

  // Функции
  function validateInput(event) {
    formValidator.handlerInputForm(event);
  }

  function validateSubmit(event) {
    return formValidator.checkForm(event);
  }

  function createLoginPopup(...arg) {
    return new PopupLogin(...arg);
  }

  function createRegDonePopup(...arg) {
    return new PopupRegDone(...arg);
  }

  /** устанавливает юзера */
  if (localStorage.getItem('token')) {
    await mainApi.getUserData()
      .then((res) => {
        localStorage.setItem('userData', JSON.stringify(res));
        header.render({ isLoggedIn: true, userName: res.data.user.name });
      })
      .catch(() => {
        localStorage.setItem('userData', '');
        header.render({ isLoggedIn: false, userName: '' });
      });
  } else {
    localStorage.setItem('userData', '');
    header.render({ isLoggedIn: false, userName: '' });
  }

  const popupAuth = new PopupAuth(
    header.render,
    mainApi,
    validateInput,
    validateSubmit,
    createLoginPopup,
    createRegDonePopup,
  );

  function openPopupAuth(e) {
    popupAuth.open(e);
  }

  // Окно входа
  const popupLogin = new PopupLogin(
    header.render,
    mainApi,
    validateInput,
    validateSubmit,
    openPopupAuth,
  );
  const popupRegDone = new PopupRegDone(
    header.render,
    mainApi,
    validateInput,
    validateSubmit,
    createLoginPopup,
    openPopupAuth,
  );

  let pagination = 1;

  const startPopup = async () => {
    if (localStorage.getItem('userData')) {
      /*      const { _id } = JSON.parse(localStorage.getItem('userData')).data.user; */
      await mainApi.logout()
        .then(() => {
          header.render({ isLoggedIn: false, userName: '' });
          localStorage.setItem('userData', '');
          localStorage.setItem('token', '');
          cardContainer.textContent = '';
          results.classList.remove('results_active');
          document.location.href = './';
        })
        .catch((err) => err.message);
      return;
    }

    menu.classList.remove('menu_is-opened');
    popupLogin.open();
  };

  // обработчик кнопки "искать". функция поиска новостей
  const startSearch = async (e) => {
    e.preventDefault();
    togglePreloader(true);
    const newsApi = new NewsApi({
      keyword: groupInput.value,
      dateFrom: fromDateFormated,
      dateTo: toDateFormated,
    });
    results.classList.remove('results_active');

    notFound.classList.remove('not-found_active');

    resultsBtn.classList.remove('results__btn_active');
    cardContainer.textContent = '';

    newsApi.getNews(pagination)
      .then((res) => {
        if (res.articles.length === 0) {
          openErrorBlock(
            notFound,
            NOT_FOUND_MESSAGES.title,
            NOT_FOUND_MESSAGES.description,
          );
          togglePreloader(false);
          return;
        }
        if (res.articles.length >= showArticles) resultsBtn.classList.add('results__btn_active');
        res.articles.forEach((card) => {
          const newsCard = new NewsCard(card, groupInput.value, template).create();
          cardContainer.appendChild(newsCard);
        });
        results.classList.add('results_active');
      })
      .catch(() => {
        openErrorBlock(
          notFound,
          NOT_FOUND_MESSAGES.title,
          NOT_FOUND_MESSAGES.description,
        );
        togglePreloader(false);
      });

    setTimeout(() => {
      togglePreloader(false);
    }, 1000);
  };

  // обработчик кнопки "Показать еще". функция поиска новостей
  const resultsBtnHandler = () => {
    pagination += 1;
    const newsApi = new NewsApi({
      keyword: groupInput.value,
      dateFrom: fromDateFormated,
      dateTo: toDateFormated,
    });
    newsApi.getNews(pagination)
      .then((res) => {
        if (res.articles < showArticles) {
          resultsBtn.classList.remove('results__btn_active');
        }
        res.articles.forEach((card) => {
          const newsCard = new NewsCard(card, groupInput.value, template).create();
          cardContainer.appendChild(newsCard);
        });
        return res.articles;
      })
      .catch(() => {
        openErrorBlock(
          notFound,
          NOT_FOUND_MESSAGES.title,
          NOT_FOUND_MESSAGES.description,
        );
        togglePreloader();
      });
  };

  /** Вызовы функций */
  /** установка слушателей форм */
  regBtn.addEventListener('click', startPopup);
  popupLogin.setEventListeners();
  popupAuth.setEventListeners();
  popupRegDone.setEventListeners();
  mobileMenuButton.addEventListener('click', openMainMenu);
  groupForm.addEventListener('submit', (e) => startSearch(e));
  resultsBtn.addEventListener('click', resultsBtnHandler);
};
main();

// В этих файлах делаются запросы к API, проверка
// localStorage, создание экземпляров классов,
// необходимых для первоначальной отрисовки страницы, добавление обработчиков.
