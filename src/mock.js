import {Color, Day} from './constants';
import {rand} from './utils';
import moment from 'moment';
import Card from './card';

/** Список заголовков */
const titles = [`Изучить теорию`, `Сделать домашку`, `Пройти интенсив на соточку`];

/** Список хэштегов */
const hashtags = [`homework`, `theory`, `practice`, `intensive`, `keks`];

/** Путь сервиса для картинок */
const picUrl = `http://picsum.photos/100/100?r=`;

/** Список доступных цветов */
const colors = Object.values(Color);

/** Список дней */
const daysList = Object.values(Day);

/**
 * Получить карточку с задачей
 */
export const getCard = () => {
  const repeatingDays = new Set();
  daysList.forEach((day) => {
    if (rand(0, 1)) {
      repeatingDays.add(day);
    }
  });
  return new Card({
    title: titles[rand(0, titles.length - 1)],
    dueDate: moment().add(rand(0, 14) - 7, `d`),
    tags: Array.apply(null, Array(rand(0, 3)))
      .map(() => hashtags[rand(0, hashtags.length - 1)]),
    picture: `${picUrl}${Math.random()}`,
    color: colors[rand(0, colors.length - 1)],
    repeatingDays,
    isFavorite: !!rand(0, 1),
    isDone: !!rand(0, 1)
  });
};

