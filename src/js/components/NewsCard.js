import { mainApi } from '../constants';
import { getUserData } from '../utils';

// Класс карточки новости.
export default class NewsCard {
  card = '.card';

  cardImage = '.card__image';

  cardDate = '.card__date';

  cardTitle = '.card__title';

  cardText = '.card__text';

  cardSource = '.card__source';

  cardTooltip = '.card__tooltip';

  constructor(data, keyword, template) {
    this.data = data;
    this.keyword = keyword;
    this.template = template;
  }

  goToSource = (e) => {
    if (e.target.classList.contains('card__flag-icon card')) return;
    window.open(this.data.url, '_blank');
  };

  showTime = (date) => {
    const monthsArr = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня',
      'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря'];
    /*
    const daysArr = ['Воскресенье', 'Понедельник', 'Вторник',
    'Среда', 'Четверг', 'Пятница', 'Суббота']; */

    const dateObj = new Date(Date.parse(date));
    /*   console.log(dateObj); */

    const year = dateObj.getFullYear();
    const month = dateObj.getMonth();
    const numDay = dateObj.getDate();
    /*    const day = dateObj.getDay();
    const hour = dateObj.getHours(); */
    let minute = dateObj.getMinutes();
    let second = dateObj.getSeconds();

    if (minute < 10) minute = `0${minute}`;

    if (second < 10) second = `0${second}`;

    /*   const out = `${daysArr[day]}, ${numDay} ${monthsArr[month]
    } ${year}, ${hour}:${minute}:${second}`; */
    const out = `${numDay} ${monthsArr[month]
    }, ${year}`;
    return out;
  };

  toggleFlag = (e) => {
    e.stopPropagation();

    if (this.cardFlagIcon.classList.contains('card__flag-icon_marked')) {
      mainApi.removeArticle(this.data._id)
        .then(() => this.cardFlagIcon.classList.remove('card__flag-icon_marked'))
        .catch((err) => err.message);
    } else {
      mainApi.createArticle({
        title: this.data.title,
        text: this.data.description,
        date: this.data.publishedAt,
        source: this.data.source.name,
        link: this.data.url,
        image: this.data.urlToImage || '',
        keyword: this.keyword,
      })
        .then((res) => {
          this.data._id = res.data.article._id;
          this.cardFlagIcon.classList.add('card__flag-icon_marked');
        })
        .catch((err) => err.message);
    }
  };

  hideTooltip = () => {
    this.cardTooltip.classList.add('popup_is-hidden');
  };

  showTooltip = () => {
    if (!getUserData()) this.cardTooltip.classList.remove('popup_is-hidden');
  };

  // Создаёт элемент карточки и возвращает его
  create = () => {
    this._view = this.template.content.cloneNode(true);
    this._view.querySelector(this.cardTitle).textContent = this.data.title;
    this._view.querySelector(this.cardText).textContent = this.data.description;
    this.formatedDate = this.showTime(this.data.publishedAt);
    this._view.querySelector(this.cardDate).textContent = this.formatedDate;
    this._view.querySelector(this.cardSource).textContent = this.data.source.name;
    this._view.querySelector(this.cardSource).setAttribute('href', this.data.url);
    if (this.data.urlToImage) this._view.querySelector(this.cardImage).style.backgroundImage = `url(${this.data.urlToImage})`;
    this._view.addEventListener('click', this.goToSource);
    this.cardFlagIcon = this._view.querySelector('#card__flag-icon');
    this.cardTooltip = this._view.querySelector('#card__tooltip');
    this.cardFlagIcon.addEventListener('click', (e) => this.toggleFlag(e));
    this.cardFlagIcon.addEventListener('mouseover', this.showTooltip);
    this.cardFlagIcon.addEventListener('mouseout', this.hideTooltip);
    return this._view;
  };
}
