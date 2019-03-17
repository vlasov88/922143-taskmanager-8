/**
 * Генератор случайного числа
 * @param {number} min минимальное значение
 * @param {number} max максимальное значение
 * @return {number} случайное число из интервала
 */
export const getRandomInteger = (min, max) => Math.floor(min + Math.random() * (max + 1 - min));

export const getRandomBoolean = (chance = 0.5) => Math.random() < chance;

export const getRandomValue = (arr) =>
  arr[Math.floor(Math.random() * arr.length)];

export const getRandomValues = (arr, num = 1) =>
  Array.from({length: num}, () => getRandomValue(arr));

