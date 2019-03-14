import {getRandomBoolean, getRandomValue, getRandomValues, getRandomInteger} from "./randomizes";
import {Color, Day} from '../constants';
import moment from 'moment';

/** Список заголовков */
const titles = [`Изучить теорию`, `Сделать домашку`, `Пройти интенсив на соточку`];

/** Список хэштегов */
const hashtags = [`homework`, `theory`, `practice`, `intensive`, `keks`];

/** Список доступных цветов */
const colors = Object.values(Color);

/** Список дней */
const days = Object.values(Day);

export const getRandomTitle = () =>
  getRandomValue(titles);

export const getRandomDate = () =>
  moment().add(getRandomInteger(0, 14) - 7, `d`);

export const getRandomTags = () =>
  getRandomValues(hashtags, getRandomInteger(0, 3));

export const getRandomPicture = () =>
  `//picsum.photos/100/100?r=${Math.random()}`;

export const getRandomColor = () =>
  getRandomValue(colors);

export const getRandomDays = () =>
  new Set(days.filter(() => getRandomBoolean()));

export const getRandomFavorite = () => getRandomBoolean();

export const getRandomDone = () => getRandomBoolean();

