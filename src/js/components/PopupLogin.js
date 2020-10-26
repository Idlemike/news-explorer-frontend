import Popup from './Popup';
import {
  inputLoginEmail,
  inputLoginPassword,
  signinPopupTemplate,
  root,
  popupLoginClose,
  buttonSubmitLogin,
  formLogin,
  navLoginToReg,
  mobileMenuButton,
  overlay,
} from '../constants/index';
import { openMainMenu } from '../utils';

export default class popupLogin extends Popup {
  constructor(
    headerRender,
    api,
    validateInput,
    validateSubmit,
    openPopupAuth,
  ) {
    super();
    this.api = api;
    this.validateInput = validateInput;
    this.validateSubmit = validateSubmit;
    this.headerRender = headerRender;
    this.openPopupAuth = openPopupAuth;
  }

  /** Обработчик клика клавы */
  handleEscKey(event) {
    super.handleEscKey(event, signinPopupTemplate);
  }

  /** Обработчик клика по кнопке «CloseEditWindow» */
  close() {
    signinPopupTemplate.classList.remove('popup_is-opened');
    /* super.close(signinPopupTemplate); */
    root.removeEventListener('keydown', this.handleEscKey);
    formLogin.reset();
    inputLoginEmail.textContent = '';
    inputLoginPassword.textContent = '';
    mobileMenuButton.classList.remove('header__button_is-hidden');
    openMainMenu();
    overlay.classList.remove('overlay_is-opened');
  }

  /**   Обработчик клика по кнопке «Login» */
  open() {
    signinPopupTemplate.classList.add('popup_is-opened');
    /*    super.open(signinPopupTemplate); */
    inputLoginEmail.focus();
    root.addEventListener('keydown', this.handleEscKey);
    mobileMenuButton.classList.add('header__button_is-hidden');
  }

  /** смена userInfo */
  changeUserInfo = (res) => {
    this.name = res.data.userDev.name;
    this.headerRender({ isLoggedIn: true, userName: this.name });
    localStorage.setItem('userData', JSON.stringify(res));
    // сохраняем токен
    localStorage.setItem('token', res.data.token);
    formLogin.reset();
    buttonSubmitLogin.textContent = 'Войти';
    signinPopupTemplate.classList.remove('popup_is-opened');
    buttonSubmitLogin.classList.remove('popup__button_valid');
    buttonSubmitLogin.classList.add('popup__button_invalid');
    buttonSubmitLogin.setAttribute('disabled', 'disabled');
    openMainMenu();
    overlay.classList.remove('overlay_is-opened');
  };

  /** обработчик submit Редактирует профиль */
  handleSubmitLogin = (event) => {
    event.preventDefault();

    if (this.validateSubmit(event)) {
      buttonSubmitLogin.textContent = 'Загрузка...';

      this.email = formLogin.elements.email;
      this.password = formLogin.elements.password;
      //= ============================================
      // отправляем запрос на сервер
      this.api.signIn(this.email, this.password)
        .then((res) => this.changeUserInfo(res))
        .catch((err) => this.setServerError(err.message));
    }
  };

  goToPopupAuth = () => {
    /*    console.log(e.target.id); */
    this.close();
    this.openPopupAuth();
  };

  setEventListeners() {
    popupLoginClose.addEventListener('click', this.close.bind(this));
    navLoginToReg.addEventListener('click', () => this.goToPopupAuth());
    formLogin.addEventListener('input', (event) => this.validateInput(event), true);
    formLogin.addEventListener('submit', this.handleSubmitLogin);
  }
}
