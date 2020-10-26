import Popup from './Popup';
import {
  root,
  formReg,
  popupAuthClose,
  signUpPopupTemplate,
  inputAuthEmail,
  inputAuthPassword,
  inputAuthName,
  navRegToLogin,
  popupSubmitButtonAuth,
  mobileMenuButton,
  overlay,
} from '../constants/index';
import { openMainMenu } from '../utils';

export default class popupAuth extends Popup {
  constructor(
    headerRender,
    api,
    validateInput,
    validateSubmit,
    createLoginPopup,
    createRegDonePopup,
  ) {
    super();
    this.headerRender = headerRender;
    this.api = api;
    this.validateInput = validateInput;
    this.validateSubmit = validateSubmit;
    this.createLoginPopup = createLoginPopup;
    this.createRegDonePopup = createRegDonePopup;
  }

  /** Обработчик клика клавы */
  handleEscKey(event) {
    super.handleEscKey(event, signUpPopupTemplate);
  }

  /** Обработчик клика по кнопке «CloseWindow» */
  close() {
    signUpPopupTemplate.classList.remove('popup_is-opened');
    /*  super.close(signUpPopupTemplate); */
    root.removeEventListener('keydown', this.handleEscKey);
    formReg.reset();
    inputAuthEmail.textContent = '';
    inputAuthPassword.textContent = '';
    inputAuthName.textContent = '';
    mobileMenuButton.classList.remove('header__button_is-hidden');
    openMainMenu();
    overlay.classList.remove('overlay_is-opened');
  }

  /**   Обработчик клика по кнопке «Зарегестрировать» */
  open() {
    signUpPopupTemplate.classList.add('popup_is-opened');
    /* super.open(signUpPopupTemplate); */
    inputAuthEmail.focus();
    root.addEventListener('keydown', this.handleEscKey);
    mobileMenuButton.classList.add('header__button_is-hidden');
  }

  _openRegDonePopup = () => {
    this.createRegDonePopup(this.headerRender, this.api,
      this.validateInput, this.validateSubmit, this.createLoginPopup, this.open).open();
  };

  goToPopupLogin = () => {
    /*    console.log(e.target.id); */
    this.close();
    this.createLoginPopup(this.headerRender, this.api,
      this.validateInput, this.validateSubmit, this.open).open();
  };

  /** пострегистрация */
  userAuth = (res) => {
    /*   localStorage.setItem('userData', JSON.stringify(res)); */
    // сохраняем токен
    localStorage.setItem('token', res.data.token);
    formReg.reset();
    popupSubmitButtonAuth.textContent = 'Зарегестрироваться';
    signUpPopupTemplate.classList.remove('popup_is-opened');
    popupSubmitButtonAuth.classList.remove('popup__button_valid');
    popupSubmitButtonAuth.classList.add('popup__button_invalid');
    popupSubmitButtonAuth.setAttribute('disabled', 'disabled');
    this._openRegDonePopup();
  };

  /** обработчик submit Редактирует */
  handleSubmitAuth = (event) => {
    event.preventDefault();

    if (this.validateSubmit(event)) {
      popupSubmitButtonAuth.textContent = 'Загрузка...';

      this.email = formReg.elements.email;
      this.password = formReg.elements.password;
      this.name = formReg.elements.name;
      //= ============================================
      // отправляем запрос на сервер
      this.api.signUp(this.email, this.password, this.name)
        .then((res) => this.userAuth(res))
        .catch((err) => this.setServerError(err.message));
    }
  };

  setEventListeners() {
    navRegToLogin.addEventListener('click', () => this.goToPopupLogin());
    popupAuthClose.addEventListener('click', this.close.bind(this));
    formReg.addEventListener('input', (event) => this.validateInput(event), true);
    formReg.addEventListener('submit', this.handleSubmitAuth);
  }
}
