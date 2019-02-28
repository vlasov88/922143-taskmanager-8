import {COLORS, DAYS} from './constants';

/**
 * Получить элемент дня для карточки задач
 * @param {string} day        день
 * @param {string} id         идентификатор карточки
 * @param {boolean} isChecked выбран ли элемент
 * @return {string} элемент дня
 */
const getTaskCardDayElement = (day, id, isChecked) =>
  `<input
    class="visually-hidden card__repeat-day-input"
    type="checkbox"
    id="repeat-${day}-${id}"
    name="repeat"
    value="${day}"
    ${isChecked ? `checked` : ``}/>
  <label class="card__repeat-day" for="repeat-${day}-${id}">${day}</label>`;

/**
 * Получить элемент цвета для карточки задач
 * @param {string} color      цвет
 * @param {string} id         идентификатор карточки
 * @param {boolean} isChecked выбран ли элемент
 * @return {string} элемент цвета
 */
const getTaskCardColorElement = (color, id, isChecked) =>
  `<input
    type="radio"
    id="color-${color}-${id}"
    class="card__color-input card__color-input--${color} visually-hidden"
    name="color"
    value="${color}"
    ${isChecked ? `checked` : ``}/>
  <label for="color-${color}-${id}" class="card__color card__color--${color}">${color}</label>`;

/**
 * Получить элемент hashtag
 * @param {string} hashtag текст хэштега без '#'
 * @return {string} элемент hashtag
 */
const getTaskCardHashtagElement = (hashtag) =>
  `<span class="card__hashtag-inner">
    <input
    type="hidden"
    name="hashtag"
    value="${hashtag}"
    class="card__hashtag-hidden-input"/>
    <button type="button" class="card__hashtag-name">#${hashtag}</button>
    <button type="button" class="card__hashtag-delete">delete</button>
  </span>`;

/**
 * Получить новый элемент карточки с задачей
 * @param {Card} card карточка с задачей
 * @return {string} элемент задачи
 */
export default (card) => {
  const colorsList = COLORS.reduce((acc, curr) => acc + getTaskCardColorElement(curr, card.id, curr === card.color), ``);
  const daysList = DAYS.reduce((acc, curr) => acc + getTaskCardDayElement(curr, card.id, card.days.has(curr)), ``);
  const hashtagList = card.hashtags.reduce((acc, curr) => acc + getTaskCardHashtagElement(curr), ``);
  const isRepeat = card.days.size > 0;
  const isEdit = false; // TODO на будующее
  // const deadline; // TODO работа с датами и временем

  return `
  <article class="card${isEdit ? `  card--edit` : ``} card--${card.color}${card.isRepeat ? ` card--repeat` : ``}${card.isDeadline ? ` card--deadline` : ``}">
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
            >${card.text}</textarea>
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
                  ${daysList}
                </div>
              </fieldset>
            </div>

            <div class="card__hashtag">
              <div class="card__hashtag-list">${hashtagList}</div>

              <label>
                <input
                  type="text"
                  class="card__hashtag-input"
                  name="hashtag-input"
                  placeholder="Type new hashtag here"
                />
              </label>
            </div>
          </div>

          <label class="card__img-wrap card__img-wrap--empty">
            <input
              type="file"
              class="card__img-input visually-hidden"
              name="img"
            />
            <img
              src="img/add-photo.svg"
              alt="task picture"
              class="card__img"
            />
          </label>

          <div class="card__colors-inner">
            <h3 class="card__colors-title">Color</h3>
            <div class="card__colors-wrap">${colorsList}</div>
          </div>
        </div>

        <div class="card__status-btns">
          <button class="card__save" type="submit">save</button>
          <button class="card__delete" type="button">delete</button>
        </div>
      </div>
    </form>
  </article>`;
};
