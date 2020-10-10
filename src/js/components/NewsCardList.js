'use strict';

//  Класс списка карточек новостей. Конструктор принимает массив карточек, которые должны быть в списке при первой отрисовке.
import BaseComponent from "./BaseComponent";
import { cardContainer } from '../constants'

export default class NewsCardList extends BaseComponent {
  
  constructor(createCard, api) {
    super();
    this._view = cardContainer;
    this._createCard = createCard;
    this.api = api;
  }
  
  /** Отрисовывает карточки при первоначальной загрузке*/
  render(array, userInfoId) {
    this.array = array;
    this.array.forEach((value) => {
   /*   this.likesArr = value["likes"];
      this.hasLike = this.checkLike(this.likesArr, userInfoId);*/
      this.newCard = this.addCard(value["name"], value["link"], value["likes"].length, value["_id"], value["owner"]["_id"], this.hasLike, userInfoId)
    });
  }
  
  //  отвечает за отрисовку лоудера;
  renderLoader = () => {
  
  };
  // принимает объект ошибки и показывает ошибку в интерфейсе;
  renderError = () => {
  
  };
  // отвечает за функциональность кнопки «Показать ещё»;
  showMore = () => {
  
  };
  
  /** добавляет элемент карточки в контейнер*/
  addCard(name, link, likes, idName, idOwner, hasLike, userInfoId) {
    this.newCard = this._createCard(this.template, name, link, likes, idName, idOwner, hasLike, this.api, userInfoId, this.openPicturePopup).create();
    this._view.append(this.newCard);
  };
}
