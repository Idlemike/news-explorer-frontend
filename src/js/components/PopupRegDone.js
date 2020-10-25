import Popup from './Popup';
import {
  root,
  regDonePopupTemplate,
  navAfterReg,
  closeButtonPopupRegDone,
  mobileMenuButton,
} from '../constants/index';

export default class popupRegDone extends Popup {
  constructor(
    headerRender,
    api,
    validateInput,
    validateSubmit,
    createLoginPopup,
    openPopupAuth,
  ) {
    super();
    this.api = api;
    this.validateInput = validateInput;
    this.validateSubmit = validateSubmit;
    this.headerRender = headerRender;
    this.createLoginPopup = createLoginPopup;
    this.openPopupAuth = openPopupAuth;
  }

  /** Обработчик клика клавы */
  handleEscKey(event) {
    super.handleEscKey(event, regDonePopupTemplate);
  }

  open() {
    regDonePopupTemplate.classList.add('popup_is-opened');
    /* super.open(regDonePopupTemplate); */
    root.addEventListener('keydown', this.handleEscKey);
    mobileMenuButton.classList.add('header__button_is-hidden');
  }

  /** Обработчик клика по кнопке «CloseWindow» */
  close() {
    regDonePopupTemplate.classList.remove('popup_is-opened');
    /*    super.close(regDonePopupTemplate); */
    root.removeEventListener('keydown', this.handleEscKey);
    mobileMenuButton.classList.remove('header__button_is-hidden');
  }

  goToPopupLogin = () => {
    /*    console.log(e.target.id); */
    this.close();
    this.createLoginPopup(this.headerRender, this.api,
      this.validateInput, this.validateSubmit, this.openPopupAuth).open();
  };

  setEventListeners() {
    navAfterReg.addEventListener('click', () => this.goToPopupLogin());
    closeButtonPopupRegDone.addEventListener('click', this.close.bind(this));
  }
}
