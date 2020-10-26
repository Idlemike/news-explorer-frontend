export default class Popup {
  /** функция закрытия попапа */
  /*  close(popup) {
    popup.classList.remove('popup_is-opened');
  } */

  /** Обработчик клика клавы */
  handleEscKey = (event, popup) => {
    if (event.key === 'Escape') {
      this.close(popup);
    }
  };

  /** функция открытия попапа */
  /*  open() {
    popup.classList.add('popup_is-opened');
  } */

  setServerError = (message) => {
    const err = document.querySelector('.server-message-error');
    if (err) err.textContent = message;
    err.classList.add('error-message_is-visible');
  };
}
