/** Список дней для карточек задач */
const DAYS = [`mo`, `tu`, `we`, `th`, `fr`, `sa`, `su`];

/** Список цветов для карточек задач */
const COLORS = [`black`, `yellow`, `blue`, `green`, `pink`];

/**
 * Добавить новый элемент фильтра
 * @param {string} caption    название 
 * @param {number} amount     количество
 * @param {boolean} isChecked true если элемент выбран
 */
const addFilter = (caption, amount, isChecked = false) => {
    const filterContainer = document.getElementsByClassName('main__filter')[0];
    filterContainer.insertAdjacentHTML(`beforeend`,
    `<input type="radio" id="filter-${caption.toLowerCase()}" class="filter__input visually-hidden" onchange="filterSelected()"
    name="filter"${isChecked ? " checked" : ""}${amount === 0 ? " disabled" : ""}/>
    <label for="filter-${caption.toLowerCase()}" class="filter__label">${caption}<span
    class="filter__all-count"> ${amount}</span></label>`);
}

/**
 * Получить элмент дня для карточки задач
 * @param {string} day        день
 * @param {string} id         идентификатор карточки
 * @param {boolean} isChecked выбран ли элемент
 */
const getTaskCardDayElement = (day, id, isChecked) =>
`<input
  class="visually-hidden card__repeat-day-input"
  type="checkbox"
  id="repeat-${day}-${id}"
  name="repeat"
  value="${day}"
  ${isChecked ? "checked" : ""}
/>
<label class="card__repeat-day" for="repeat-${day}-${id}">${day}</label>`;

/**
 * Получить элемент цвета для карточки задач
 * @param {string} color      цвет
 * @param {string} id         идентификатор карточки
 * @param {boolean} isChecked выбран ли элемент
 */
const getTaskCardColorElement = (color, id, isChecked) =>
`<input
  type="radio"
  id="color-${color}-${id}"
  class="card__color-input card__color-input--${color} visually-hidden"
  name="color"
  value="${color}"
  ${isChecked ? "checked" : ""}
/>
<label for="color-${color}-${id}" class="card__color card__color--${color}">${color}</label>`;

/**
 * Получить элемент hashtag
 * @param {string} hashtag текст хэштега без '#'
 */
const getTaskCardHashtagElement = (hashtag) => 
`<span class="card__hashtag-inner">
<input
  type="hidden"
  name="hashtag"
  value="${hashtag}"
  class="card__hashtag-hidden-input"
/>
<button type="button" class="card__hashtag-name">#${hashtag}</button>
<button type="button" class="card__hashtag-delete">delete</button>
</span>`;

/**
 * Добавить элемент карточки с задачей
 * @param {Card} card карточка
 */
const addTaskCard = (card) => {
    const colorsList = COLORS.reduce((acc, curr) => acc + getTaskCardColorElement(curr, card.id, curr === card.color), ``);
    const daysList = DAYS.reduce((acc, curr) => acc + getTaskCardDayElement(curr, card.id, card.days.has(curr)), ``);
    const hashtagList = card.hashtags.reduce((acc, curr) => acc + getTaskCardHashtagElement(curr), ``);
    const isRepeat = card.days.size > 0;
    const isEdit = false; // TODO на будующее
    //const deadline; // TODO работа с датами и временем

    const cardsContainer = document.getElementsByClassName(`board__tasks`)[0];
    cardsContainer.insertAdjacentHTML(`beforeend`,
    `<article class="card${isEdit ? "  card--edit" : ""} card--${card.color}${card.isRepeat ? " card--repeat" : ""}${card.isDeadline ? " card--deadline":""}">
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
                repeat:<span class="card__repeat-status">${isRepeat ? "yes" : "no"}</span>
              </button>

              <fieldset class="card__repeat-days"${isRepeat ? " disabled" : ""}>
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
  </article>`
  );
}

/**
 * Карточка с задачей
 * @param {string} text        текст карточки
 * @param {string} color       цвет полоски
 * @param {Set} days           дни для повторения
 * @param {Array} hashtags     хэштеги
 * @param {boolean} isDeadline признак того что задача просрочена
 * @param {boolean} isEdit     признак редак
 */
function Card(text = ``, color = COLORS[0], days = new Set(), hashtags = [], isDeadline = false) {
  this.id = Card.index++;
  this.text = text;
  this.color = color;
  this.days = days;
  this.hashtags = hashtags;
  this.isDeadline = isDeadline;
}
Card.index = 1;

/**
 * Добавляет указанное количество копий случайно созданной карточки с задачей
 * @param {number} count число задач для добавления
 */
const addRandomTaskCards = (count) => {

  const color = COLORS[rand(0, COLORS.length - 1)];
  const days = new Set().add(DAYS[rand(0, DAYS.length - 1)]);
  const hashtags = [`hashtag1`, `hashtag2`];
  const isDeadline = rand(1, 2) % 2 === 0;
  
  for(let i = 0; i < count; i++) {
    addTaskCard(new Card(`Card N${Card.index}`, color, days, hashtags, isDeadline));
  }

};

/**
 * Обработчик смены фильтра
 * @param {Event} evt событие выбора фильтра
 */
const filterSelected = (evt) => {
  const cardsContainer = document.getElementsByClassName(`board__tasks`)[0];
  cardsContainer.innerHTML = ``;
  addRandomTaskCards(rand(1, 8));
}

/**
 * Генератор случайного числа
 * @param {number} min минимальное значение
 * @param {number} max максимальное значение
 */
const rand = (min, max) => Math.floor(min + Math.random() * (max + 1 - min));

const main = () => {
  addFilter(`ALL`, 15, true);
  addFilter(`OVERDUE`, 0);
  addFilter(`TODAY`, 0);
  addFilter(`FAVORITES`, 7);
  addFilter(`Repeating`, 2);
  addFilter(`Tags`, 6);
  addFilter(`ARCHIVE`, 115);

  addRandomTaskCards(7);
}

main();