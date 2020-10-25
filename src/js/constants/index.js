import MainApi from '../api/MainApi';

// buttons
const regBtn = document.querySelector('.header__button-auth');
const resultsBtn = document.querySelector('.results__btn');
const mobileMenuButton = document.querySelector('.header__button');

// Articles/index.html
const resultsTitleQuantityArticles = document.querySelector('.results__title-quantity');
const keywordsFirstArticles = document.querySelector('#keywordsFirst');
const keywordsNextArticles = document.querySelector('#keywordsNext');
const keywordsOthersArticles = document.querySelector('#keywordsOthers');

// forms
const { formLogin } = document.forms;
const overlay = document.querySelector('.overlay');

// Cards
const template = document.querySelector('#task-template');
const cardContainer = document.querySelector('.cards');
const results = document.querySelector('.results');
const preloader = document.querySelector('.preloader');
const bookmark = document.querySelector('#bookmark');
const trash = document.querySelector('#trash');

// header
const menuSaved = document.querySelector('.menu__item_articles');
const logoutIcon = document.querySelector('.header__logout-icon');
const userNameLogout = document.querySelector('.header__button-text');
const menu = document.querySelector('.menu');
const headerTitle = document.querySelector('.header__title');

//  Popup templates
const popupContainer = document.querySelector('.popup');
const signinPopupTemplate = document.querySelector('#signin-popup');
const signUpPopupTemplate = document.querySelector('#sign-up-popup');
const regDonePopupTemplate = document.querySelector('#reg-done-popup');
const popupContent = document.querySelector('.popup__content');
const closeButton = document.querySelector('.popup__close');

// PopupLogin
const popupLoginClose = document.querySelector('.popup__close-login');
const root = document.querySelector('.page');
const buttonSubmitLogin = document.querySelector('#submitEnter');
const popupSubmitButtonLogin = document.querySelector('.popup__button_type_login');
const inputLoginEmail = document.querySelector('#enterEmail');
const inputLoginPassword = document.querySelector('#enterPassword');
const navLoginToReg = document.querySelector('#navToSignUp');

// PopuoAuth

const popupAuthClose = document.querySelector('.popup__close-reg');
const { formReg } = document.forms;
const popupContainerAuth = document.querySelector('.popup_type_reg');
const popupSubmitButtonAuth = document.querySelector('#submitReg');
const inputAuthEmail = document.querySelector('#signUpEmail');
const inputAuthPassword = document.querySelector('#signUpPassword');
const inputAuthName = document.querySelector('#signUpName');
const navRegToLogin = document.querySelector('#navToSignIn');
const closeButtonPopupRegDone = document.querySelector('.popup__close-reg-done');

// PopupAfterReg
const navAfterReg = document.querySelector('#navAfterSuccess');

// Search
const groupForm = document.querySelector('.group__form');
const groupInput = document.querySelector('.group__input');
const showArticles = 3;

// API Data
const API_KEY = '4336e88033d441409fec7db416a6cb33';
const API_URL = 'https://api.3mak.tk';
const MAIN_URL = window.location.origin;

// Errors

const errorTitle = document.querySelector('.not-found__title');
const errorDescription = document.querySelector('.not-found__text');
const notFound = document.querySelector('.not-found');
const emailEnterError = document.querySelector('#emailEnter-error');
const passwordEnterError = document.querySelector('#passwordEnterError');

// Error messages
const NOT_FOUND_MESSAGES = {
  title: 'Ничего не найдено',
  description: 'К сожалению по вашему запросу ничего не найдено',
};
const SERVER_ERROR_MESSAGES = {
  title: 'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз',
};

const errorMessages = {
  empty: 'Это обязательное поле',
  wrongLength: 'Должно быть от 2 до 30 символов',
  wrongUrl: 'Здесь должна быть ссылка',
  wrongPattern: 'Введите данные в верном формате',
};

// Date
const articlesPerPage = 3;
const toDate = new Date();
const toDateFormated = toDate.toISOString().slice(0, 10);
const fromDate = 7;
const fromDateFormated = new Date(toDate.setDate(toDate.getDate() - fromDate))
  .toISOString().slice(0, 10);

const apiData = {
  baseUrl: `${API_URL}`,
};

const config = {
  url: apiData.baseUrl,
  headers: {
    authorization: `Bearer ${localStorage.getItem('token')}`,
    'Content-Type': 'application/json',
  },
};
const mainApi = new MainApi(config);

export {
  config,
  API_KEY,
  API_URL,
  regBtn,
  template,
  formLogin,
  formReg,
  MAIN_URL,
  buttonSubmitLogin,
  popupContainer,
  signinPopupTemplate,
  signUpPopupTemplate,
  regDonePopupTemplate,
  closeButton,
  cardContainer,
  results,
  notFound,
  resultsBtn,
  errorTitle,
  errorDescription,
  preloader,
  menuSaved,
  userNameLogout,
  logoutIcon,
  mobileMenuButton,
  menu,
  NOT_FOUND_MESSAGES,
  SERVER_ERROR_MESSAGES,
  articlesPerPage,
  toDateFormated,
  fromDateFormated,
  groupForm,
  groupInput,
  popupLoginClose,
  errorMessages,
  root,
  overlay,
  popupSubmitButtonLogin,
  inputLoginEmail,
  inputLoginPassword,
  emailEnterError,
  passwordEnterError,
  navLoginToReg,
  popupAuthClose,
  popupContent,
  popupContainerAuth,
  popupSubmitButtonAuth,
  inputAuthEmail,
  inputAuthPassword,
  inputAuthName,
  navRegToLogin,
  navAfterReg,
  closeButtonPopupRegDone,
  showArticles,
  mainApi,
  bookmark,
  trash,
  resultsTitleQuantityArticles,
  keywordsFirstArticles,
  keywordsNextArticles,
  keywordsOthersArticles,
  headerTitle,
};
