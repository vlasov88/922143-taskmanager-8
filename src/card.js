import {COLORS} from './constants';

/**
 * Карточка с задачей
 * @param {string} text        текст карточки
 * @param {string} color       цвет полоски
 * @param {Set} days           дни для повторения
 * @param {Array} hashtags     хэштеги
 * @param {boolean} isDeadline признак того что задача просрочена
 * @param {boolean} isEdit     признак редактирования
 */
export default function Card(
    {
      text = ``,
      color = COLORS[0],
      days = new Set(),
      hashtags = [],
      isDeadline = false
    } = {}) {
  this.id = Card.index++;
  this.text = text;
  this.color = color;
  this.days = days;
  this.hashtags = hashtags;
  this.isDeadline = isDeadline;
}
Card.index = 1;
