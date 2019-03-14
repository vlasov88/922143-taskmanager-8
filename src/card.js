import {Color} from './constants';

/**
 * Карточка с задачей
 * @param {string} title       заголовок карточки
 * @param {Date} dueDate       дата запланированного выполнения
 * @param {Set} tags           список хэштегов
 * @param {string} picture     URL до картинки
 * @param {string} color       цвет полоски
 * @param {Set} repeatingDays  дни для повторения
 * @param {boolean} isFavorite добавлена ли задача в избранное.
 * @param {boolean} isDone     выполнена ли задача.
 */
export default function Card({
  title = ``,
  dueDate,
  tags = ``,
  picture,
  color = Color.BLACK,
  repeatingDays = new Set(),
  isFavorite = false,
  isDone = false
} = {}) {
  this.title = title;
  this.dueDate = dueDate;
  this.tags = tags;
  this.picture = picture;
  this.color = color;
  this.repeatingDays = repeatingDays;
  this.isFavorite = isFavorite;
  this.isDone = isDone;
}

