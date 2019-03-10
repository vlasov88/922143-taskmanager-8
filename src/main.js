import makeFilter from './make-filter';
import makeTask from './make-task';
import Card from './card';
import {getCard} from './mock';
import {rand} from './utils';

/** Контейнер для фильтров */
const filterContainer = document.querySelector(`.main__filter`);

/** Контейнер для карточек заданий */
const cardsContainer = document.querySelector(`.board__tasks`);

/**
 * Добавить новый элемент фильтра
 * @param {string} caption    название
 * @param {number} amount     количество
 * @param {boolean} isChecked true если элемент выбран
 */
const addFilter = (caption, amount, isChecked = false) => {
  filterContainer.insertAdjacentHTML(`beforeend`, makeFilter(caption, amount, isChecked));
};

/**
 * Добавить задачи
 * @param {Card} card[] список карточек задач
 */
const addTasks = (cards) => {
  cardsContainer.insertAdjacentHTML(`beforeend`, cards.reduce((acc, cur) => acc + makeTask(cur), ``));
};

/**
 * Обработчик смены фильтра
 */
const filterHandler = () => {
  cardsContainer.innerHTML = ``;
  const count = rand(1, 8);
  addTasks(Array.apply(null, Array(count)).map(() => getCard()));
};

filterContainer.addEventListener(`change`, filterHandler);
addFilter(`ALL`, 15, true);
addFilter(`OVERDUE`, 0);
addFilter(`TODAY`, 0);
addFilter(`FAVORITES`, 7);
addFilter(`Repeating`, 2);
addFilter(`Tags`, 6);
addFilter(`ARCHIVE`, 115);

addTasks(Array.apply(null, Array(7)).map(() => getCard()));

