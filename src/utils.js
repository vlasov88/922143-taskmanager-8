/**
 * Генератор случайного числа
 * @param {number} min минимальное значение
 * @param {number} max максимальное значение
 * @return {number} случайное число из интервала
 */
export const rand = (min, max) => Math.floor(min + Math.random() * (max + 1 - min));
