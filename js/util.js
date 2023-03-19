/**
 * @description Функиця проверяет, что пришло именно число, а не что-то иное
 * @param {*} value - значение
 * @returns {boolean}
 */
const isNumber = (value) => typeof value === 'number';

/**
 * @description Получаем случайное целое число из диапазона
 * @param {number} min - минимальное значение
 * @param {number} max - максимальное значение
 * @see https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random
 * @returns {number}
 */
const getRandomInclusiveInt = (min, max) => {
  if (!isNumber(min) || !isNumber(max) || Math.max(min, max) < 0) {
    return null;
  }

  min = Math.ceil(min); // Округление вверх до ближайшего большего целого
  max = Math.floor(max); // Округление вниз до ближайшего меньшего целого

  if (min < 0) {
    min = 0;
  }

  if (max < 0) {
    max = 0;
  }

  if (min === max) {
    return min;
  }

  if (min > max) {
    [min, max] = [max, min];
  }

  return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
};

/**
 * @description Получаем случайное целое число из диапазона
 * @param {number} min - минимальное значение
 * @param {number} max - максимальное значение
 * @param {number} precision - количество знаков после запятой
 * @see https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random
 * @returns {number}
 */
const getRandomInclusiveNumber = (min, max, precision) => {
  if ((typeof min !== 'number' || typeof max !== 'number') || (min < 0 && max < 0)) {
    return null;
  }

  if (min < 0) {
    min = 0;
  }

  if (max < 0) {
    max = 0;
  }

  if (min === max) {
    return min;
  }

  if (min > max) {
    [min, max] = [max, min];
  }

  return +((Math.random() * (max - min + 1)) + min).toFixed(precision); //Максимум и минимум включаются
};

/**
 * @description Функция возвращает элемент массива
 * @param {array} elements - массив
 */
const getRandomArrayElement = (elements) => elements[getRandomInclusiveInt(0, elements.length - 1)];

/**
 * @description Функция возвращает случайное значение из данных массива
 * @param {number}
 * @returns {number}
 *  */
const getRandomBoolean = () => Math.random() >= 0.5;

const getRandomArrayElements = (array) => array.filter(() => getRandomBoolean());

/**
 * @description Функция возвращает часть копии исходного массива
 * @param {array} array - массив с данными
 * @returns {array} - часть копии исходного массива
 */
const getRandomArrayPart = (array) => {
  const max = getRandomInclusiveInt(0, array.length - 1);
  const min = getRandomInclusiveInt(0, max);
  return array.slice(min, max + 1);
};

/**
 * @description Функция возвращет лидирующий ноль
 * @param {number} number
 * @returns {string}
 */
const leadingZero = (number) => String(number).padStart(2, 0);

export { getRandomInclusiveInt, getRandomInclusiveNumber, getRandomArrayElement, getRandomArrayElements, getRandomArrayPart, leadingZero };
