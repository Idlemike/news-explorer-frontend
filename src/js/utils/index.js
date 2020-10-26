import {
  preloader,
  errorTitle,
  errorDescription,
  menu,
  mobileMenuButton,
  overlay,
  logoutIcon,
  headerTitle,
} from '../constants';

const openMainMenu = () => {
  if (menu.classList.contains('menu_is-opened')) {
    menu.classList.remove('menu_is-opened');
    mobileMenuButton.style.backgroundImage = 'url(./src/images/menu.svg)';
    overlay.classList.remove('overlay_is-opened');
  } else {
    menu.classList.add('menu_is-opened');
    mobileMenuButton.style.backgroundImage = 'url(./src/images/close-mid.svg)';
    overlay.classList.add('overlay_is-opened');
  }
};

const openArticlesMenu = () => {
  if (menu.classList.contains('menu_is-opened')) {
    menu.classList.remove('menu_is-opened');
    mobileMenuButton.style.backgroundImage = 'url(./src/images/icons/menu-black.svg)';
    overlay.classList.remove('overlay_is-opened');
    headerTitle.classList.add('header__title_theme_white');
    logoutIcon.setAttribute('src', './src/images/icons/logout.svg');
  } else {
    menu.classList.add('menu_is-opened');
    mobileMenuButton.style.backgroundImage = 'url(./src/images/icons/close-mid.svg)';
    overlay.classList.add('overlay_is-opened');
    logoutIcon.setAttribute('src', './src/images/icons/logout-white.svg');
    headerTitle.classList.remove('header__title_theme_white');
  }
};

const togglePreloader = (value) => (value === true ? preloader.classList.add('preloader_active') : preloader.classList.remove('preloader_active'));

const openErrorBlock = (node, titleMessage, descriptionMessage) => {
  node.classList.add('not-found_active');
  errorTitle.textContent = titleMessage;
  errorDescription.textContent = descriptionMessage;
};

const getUserData = () => localStorage.getItem('userData');

export {
  openErrorBlock, openMainMenu, openArticlesMenu, getUserData, togglePreloader,
};
