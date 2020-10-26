import { mainApi } from '../constants/index';

export default class ArticlesNewsCard {
  card = '.card';

  cardImage = '.card__image';

  cardFlagIcon = '.card__flag-icon';

  cardDate = '.card__date';

  cardTitle = '.card__title';

  cardText = '.card__text';

  cardSource = '.card__source';

  cardKeywordTitle = '.card__keyword-title';

  constructor(data, template) {
    this.data = data;
    this.template = template;
  }

  deleteCard = () => {
    mainApi.removeArticle(this.data._id)
      .then(() => {
        this._view.parentNode.removeChild(this._view);
      })
      .catch((err) => err.message);
  };

  goToSource = (e) => {
    if (e.target.classList.contains('card__keyword-title')
      || e.target.classList.contains('card__tooltip-remove')
      || e.target.classList.contains('card__keyword-container')
      || e.target.classList.contains('card__delete-icon')) return;
    window.open(this.data.link, '_blank');
  };

  hideTooltip = () => {
    this.tooltipRemove.classList.add('popup_is-hidden');
  };

  showTooltip = () => {
    this.tooltipRemove.classList.remove('popup_is-hidden');
  };

  // Создаёт элемент карточки и возвращает его
  create = () => {
    this._view = this.template.content.cloneNode(true);
    this._view.querySelector(this.cardTitle).textContent = this.data.title;
    this._view.querySelector(this.cardText).textContent = this.data.text;
    this._view.querySelector(this.cardDate).textContent = this.data.date;
    this._view.querySelector(this.cardSource).textContent = this.data.source;
    this._view.querySelector(this.cardSource).setAttribute('href', this.data.link);
    this._view.querySelector(this.cardKeywordTitle).textContent = this.data.keyword;
    if (this.data.image) this._view.querySelector(this.cardImage).style.backgroundImage = `url(${this.data.image})`;
    this._view.addEventListener('click', this.goToSource);
    this.tooltipRemove = this._view.querySelector('.card__tooltip-remove');
    this.trashBusket = this._view.querySelector('.card__delete-icon');
    this.trashBusket.addEventListener('click', this.deleteCard);
    this.trashBusket.addEventListener('mouseover', this.showTooltip);
    this.trashBusket.addEventListener('mouseout', this.hideTooltip);
    return this._view;
  };
}
