import { makeFilter } from './make-filter';
import Task from './task';
import { getCard } from './mock/data';
import TaskEdit from './task-edit';

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
  .map(({caption, amount, isChecked}) => makeFilter(caption, amount, isChecked)).join(``);

const generateTasks = (num = 8) => [...Array(num)]
  .forEach((_, index) => {
    const card = getCard(index);
    const task = new Task(card);
    const editTask = new TaskEdit(card);
    task.onEdit = () => {
      editTask.render();
      cardsContainer.replaceChild(editTask.element, task.element);
      task.unrender();
    };

    editTask.onSubmit = () => {
      task.render();
      cardsContainer.replaceChild(task.element, editTask.element);
      editTask.unrender();
    };
    cardsContainer.appendChild(task.render());
  });

/**
 * Обработчик смены фильтра
 */
filterContainer.addEventListener(`change`, () => {
  generateTasks();
});

renderElements(filterContainer, generateFilters());
generateTasks();

