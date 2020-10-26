//  Класс, отвечающий за логику работы шапки сайта.
// Его конструктор принимает объект опций.
// В опциях передайте цвет шапки, так как на разных страницах он может быть разный.

import '../../blocks/header/header.css';
import { menuSaved, logoutIcon, userNameLogout } from '../constants/index';

export default class Header {
// при вызове перерисовывает шапку в
// зависимости от переданного аргумента —
// объекта props. У этого объекта есть два обязательных свойства:
  render = (props) => {
    // isLoggedIn — залогинен ли пользователь;
    // userName — имя, которое отображается в шапке залогиненного пользователя.

    const { isLoggedIn, userName } = props;

    if (isLoggedIn) {
      userNameLogout.textContent = userName;
      if (menuSaved) menuSaved.classList.remove('menu__item_is-opened');
      logoutIcon.classList.add('header__logout-icon_is-active');
    } else {
      userNameLogout.textContent = 'Авторизоваться';
      if (menuSaved) menuSaved.classList.add('menu__item_is-opened');
      logoutIcon.classList.remove('header__logout-icon_is-active');
    }
  };
}
