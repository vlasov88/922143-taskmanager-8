import { Color, Day } from './constants';
import moment from 'moment';
import {createElement} from './create-element';

export default class Task {

  constructor(card) {
    this._card = card;
    this._element = null;
    this._onEditButtonClick = this._onEditButtonClick.bind(this);
  }

  /**
   * Получить новый элемент карточки с задачей
   * @return {string} элемент задачи
   */
  get template() {
    const isRepeat = this._checkIsRepeat();
    return `
      <article class="card card--${this._card.color}${isRepeat ? ` card--repeat` : ``}${this._card.dueDate && this._card.dueDate.isBefore(moment()) ? ` card--deadline` : ``}">
        <form class="card__form" method="get">
          <div class="card__inner">
            <div class="card__control">
              <button type="button" class="card__btn card__btn--edit">edit</button>
              <button type="button" class="card__btn card__btn--archive">archive</button>
              <buttontype="button"class="card__btn card__btn--favorites card__btn--disabled">favorites</button>
            </div>

            <div class="card__color-bar">
              <svg class="card__color-bar-wave" width="100%" height="10">
                <use xlink:href="#wave"></use>
              </svg>
            </div>

            <div class="card__textarea-wrap">
              <label>
                <textarea
                  class="card__text"
                  placeholder="Start typing your text here..."
                  name="text"
                >${this._card.title}</textarea>
              </label>
            </div>

            <div class="card__settings">
              <div class="card__details">
                <div class="card__dates">
                  <button class="card__date-deadline-toggle" type="button">
                    date: <span class="card__date-status">no</span>
                  </button>

                  <fieldset class="card__date-deadline" disabled>
                    <label class="card__input-deadline-wrap">
                      <input
                        class="card__date"
                        type="text"
                        placeholder="23 September"
                        name="date"
                      />
                    </label>
                    <label class="card__input-deadline-wrap">
                      <input
                        class="card__time"
                        type="text"
                        placeholder="11:15 PM"
                        name="time"
                      />
                    </label>
                  </fieldset>

                  <button class="card__repeat-toggle" type="button">
                    repeat:<span class="card__repeat-status">${isRepeat ? `yes` : `no`}</span>
                  </button>

                  <fieldset class="card__repeat-days"${isRepeat ? ` disabled` : ``}>
                    <div class="card__repeat-days-inner">
                      ${this._getDaysList()}
                    </div>
                  </fieldset>
                </div>

                <div class="card__hashtag">
                  <div class="card__hashtag-list">${this._getHashtagList()}</div>
                </div>
              </div>

              <label class="card__img-wrap${this._card.picture ? `` : ` card__img-wrap--empty`}">
                <input
                  type="file"
                  class="card__img-input visually-hidden"
                  name="img"
                />
                <img
                  src="${this._card.picture || `img/add-photo.svg`}"
                  alt="task picture"
                  class="card__img"
                />
              </label>

          </div>
        </form>
      </article>`.trim();
  }

  set onEdit(fn) {
    this._onEdit = fn;
  }

  get element() {
    return this._element;
  }

  render() {
    this._element = createElement(this.template);
    this._bind();
    return this._element;
  }

  unrender() {
    this._unbind();
    this._element = null;
  }

  _bind() {
    this._element.querySelector(`.card__btn--edit`)
    .addEventListener(`click`, this._onEditButtonClick);
  }

  _unbind() {
    // Удаление обработчиков
    this._element.querySelector(`.card__btn--edit`)
    .removeEventListener(`click`, this._onEditButtonClick);
  }

  _onEditButtonClick() {
    typeof this._onEdit === `function` && this._onEdit();
  }

  _getColorsList() {
    return Object.values(Color)
      .reduce((acc, curr) => acc + Task._getColorTemplate(curr, this._card.id, curr === this._card.color), ``);
  }

  _getDaysList() {
    return Object.values(Day)
      .reduce((acc, curr) => acc + Task._getDayTemplate(curr, this._card.id, this._card.repeatingDays.has(curr)), ``);
  }

  _getHashtagList() {
    return this._card.tags.reduce((acc, curr) => acc + Task._getHashtagTemplate(curr), ``);
  }

  _checkIsRepeat() {
    return this._card.repeatingDays.size > 0;
  }

  /**
   * Получить элемент дня для карточки задач
   * @param {string} day        день
   * @param {string} id         идентификатор карточки
   * @param {boolean} isChecked выбран ли элемент
   * @return {string} элемент дня
   */
  static _getDayTemplate(day, id, isChecked) {
    return `<input
        class="visually-hidden card__repeat-day-input"
        type="checkbox"
        id="repeat-${day}-${id}"
        name="repeat"
        value="${day}"
        ${isChecked ? `checked` : ``}/>
      <label class="card__repeat-day" for="repeat-${day}-${id}">${day}</label>`;
  }

  /**
   * Получить элемент цвета для карточки задач
   * @param {string} color      цвет
   * @param {string} id         идентификатор карточки
   * @param {boolean} isChecked выбран ли элемент
   * @return {string} элемент цвета
   */
  static _getColorTemplate(color, id, isChecked) {
    return `<input
        type="radio"
        id="color-${color}-${id}"
        class="card__color-input card__color-input--${color} visually-hidden"
        name="color"
        value="${color}"
        ${isChecked ? `checked` : ``}/>
      <label for="color-${color}-${id}" class="card__color card__color--${color}">${color}</label>`;
  }

  /**
   * Получить элемент hashtag
   * @param {string} hashtag текст хэштега без '#'
   * @return {string} элемент hashtag
   */
  static _getHashtagTemplate(hashtag) {
    return `<span class="card__hashtag-inner">
        <input
        type="hidden"
        name="hashtag"
        value="${hashtag}"
        class="card__hashtag-hidden-input"/>
        <button type="button" class="card__hashtag-name">#${hashtag}</button>
        <button type="button" class="card__hashtag-delete">delete</button>
      </span>`;
  }

}

