import { makeFilter } from './make-filter';
import { makeTask } from './make-task';
import { getCard } from './mock/data';

/** Контейнер для фильтров */
const filterContainer = document.querySelector(`.main__filter`);

/** Контейнер для карточек заданий */
const cardsContainer = document.querySelector(`.board__tasks`);

const renderElements = (container, element) => {
  container.innerHTML = element;
};

const generateFilters = () => [
    { caption: `ALL`, amount: 15, isChecked: true },
    { caption: `OVERDUE`, amount: 0 },
    { caption: `TODAY`, amount: 0 },
    { caption: `FAVORITES`, amount: 7 },
    { caption: `Repeating`, amount: 2 },
    { caption: `Tags`, amount: 6 },
    { caption: `ARCHIVE`, amount: 115 }
  ]
  .map(({ caption, amount, isChecked }) => makeFilter(caption, amount, isChecked)).join(``);

const generateTasks = (num = 8) => [...Array(num)]
  .map((value, index) => getCard(index))
  .map(makeTask)
  .join(``);

/**
 * Обработчик смены фильтра
 */
filterContainer.addEventListener(`change`, () => {
  renderElements(cardsContainer, generateTasks());
});

renderElements(filterContainer, generateFilters());
renderElements(cardsContainer, generateTasks());

