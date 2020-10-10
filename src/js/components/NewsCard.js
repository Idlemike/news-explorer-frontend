'use strict';
import BaseComponent from '../../js/components/BaseComponent';
import { template } from '../constants/index'

// Класс карточки новости.
export default class NewsCard extends BaseComponent{
  card = '.card';
  cardImage = '.card__image';
  cardFlagIcon = '.card__flag-icon';
  cardDate = '.card__date';
  cardTitle = '.card__title';
  cardText = '.card__text';
  cardSource = '.card__source';
  cardDeleteIcon = '.card__delete-icon';
  constructor(title, image, date, text, source, userInfoId,  idOwner) {
    super();
    this.title = title;
    this.image = image;
    this.date = date;
    this.text = text;
    this.source = source;
    this.userInfoId = userInfoId;
    this.idOwner = idOwner;
  }
  // отвечает за отрисовку иконки карточки. У этой иконки три состояния: иконка незалогиненного пользователя, активная иконка залогиненного, неактивная иконка залогиненного.
  renderIcon = () => {
  
  };
  // Создаёт элемент карточки и возвращает его
  create = () => {
    this._view = this.template.cloneNode(true).children[0];
    this._view.querySelector('.card__title').textContent = this.title;
    this._view.querySelector('.card__text').textContent = this.text;
    this._view.querySelector('.card__date').textContent = this.date;
    this._view.querySelector('.card__source').textContent = this.source;
    this._view.querySelector(this.cardImage).style.backgroundImage = `url(${this.image})`;
    this._view.setAttribute('id', this.idName);
    this._view.setAttribute('dataIdOwner', this.idOwner);
    
    if (userLogon) {
      if (this.idOwner === this.userInfoId) {
      this._view.querySelector(this.cardDeleteIcon).addEventListener('click', this._delClickHandler);
      this._view.querySelector(this.cardDeleteIcon).classList.add('card__delete-icon_show');
    }}
    
/*    if (this.hasLike) {
      this._view.querySelector(this.placeCardLikeIcon).classList.add(this.placeCardLikeIconLiked)
    }
    this._view.querySelector(this.placeCardLikeIcon).addEventListener('click', this._like);
    this._view.querySelector(this.placeCardImage).addEventListener('click', (event) => this.openPicturePopup(event), true);*/
    return this._view
  };
  
  // Удаляет элемент карточки
  _delClickHandler = (event) => {
    if (window.confirm("Вы действительно хотите удалить эту карточку?")) {
      this.cardId = event.target.closest('.card').id;
      this._api.deleteCard(this.cardId).then(() => {
        this._view.querySelector(this.cardDeleteIcon).removeEventListener('click', this._delClickHandler);
       /* this._view.querySelector(this.placeCardLikeIcon).removeEventListener('click', this._like);*/
        this._view.querySelector(this.cardImage).removeEventListener('click', (event) => this.openPicturePopup(event), true);
        return this._view.remove();
        
      }).catch(err => console.log(err))
    }
  }
}
