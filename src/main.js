import makeFilter from './make-filter';
import makeTask from './make-task';
import Card from './card';
import {COLORS, DAYS} from './common';

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
 * Добавить элемент карточки с задачей
 * @param {Card} card карточка
 */
const addTaskCard = (card) => {
  cardsContainer.insertAdjacentHTML(`beforeend`, makeTask(card));
};

/**
 * Добавляет указанное количество копий случайно созданной карточки с задачей
 * @param {number} count число задач для добавления
 */
const addRandomTaskCards = (count) => {

  const color = COLORS[rand(0, COLORS.length - 1)];
  const days = new Set().add(DAYS[rand(0, DAYS.length - 1)]);
  const hashtags = [`hashtag1`, `hashtag2`];
  const isDeadline = rand(1, 2) % 2 === 0;

  for (let i = 0; i < count; i++) {
    addTaskCard(new Card(`Card N${Card.index}`, color, days, hashtags, isDeadline));
  }

};

/**
 * Обработчик смены фильтра
 */
const filterHandler = () => {
  cardsContainer.innerHTML = ``;
  addRandomTaskCards(rand(1, 8));
};

/**
 * Генератор случайного числа
 * @param {number} min минимальное значение
 * @param {number} max максимальное значение
 * @return {number} случайное число из интервала
 */
const rand = (min, max) => Math.floor(min + Math.random() * (max + 1 - min));


filterContainer.addEventListener(`change`, filterHandler);
addFilter(`ALL`, 15, true);
addFilter(`OVERDUE`, 0);
addFilter(`TODAY`, 0);
addFilter(`FAVORITES`, 7);
addFilter(`Repeating`, 2);
addFilter(`Tags`, 6);
addFilter(`ARCHIVE`, 115);

addRandomTaskCards(7);
