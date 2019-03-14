import Card from '../card';
import {getRandomTitle, getRandomDate, getRandomTags, getRandomPicture, getRandomColor, getRandomDays, getRandomFavorite, getRandomDone} from './data-card';

/**
 * Получить карточку с задачей
 * @param {number} id идентификатор
 * @return {Card} карточка с задачей
 */
export const getCard = (id) => {
  return new Card({
    id,
    title: getRandomTitle(),
    dueDate: getRandomDate(),
    tags: getRandomTags(),
    picture: getRandomPicture(),
    color: getRandomColor(),
    repeatingDays: getRandomDays(),
    isFavorite: getRandomFavorite(),
    isDone: getRandomDone()
  });
};

