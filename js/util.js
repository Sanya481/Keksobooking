/**
 * @description Время показа плашки сообщения об ошибке
 */
const ALERT_SHOW_TIME = 5000;

/**
 * @description Функиця проверяет, что пришло именно число, а не что-то иное
 * @param {*} value - значение
 * @returns {boolean}
 */
const isNumber = (value) => typeof value === 'number';

/**
 * @description Функиця проверяет, нажали ли на клавишу Escape
 * @param {string} key - код клавиши Escape
 * @returns {boolean}
 */
const isEscKeyPress = (key) => key === 'Escape';

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

/**
 * @description Функция создания сообщения, что при загрузке данных с сервера произошла ошибка запроса
 * @param {string} message
 */
const showAlertMessage = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'fixed';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

// Функция взята из интернета и доработана
// Источник - https://www.freecodecamp.org/news/javascript-debounce-example

const debounce = (callback, timeoutDelay = 500) => {
  // Используем замыкания, чтобы id таймаута у нас навсегда приклеился
  // к возвращаемой функции с setTimeout, тогда мы его сможем перезаписывать
  let timeoutId;

  return (...rest) => {
    // Перед каждым новым вызовом удаляем предыдущий таймаут,
    // чтобы они не накапливались
    clearTimeout(timeoutId);

    // Затем устанавливаем новый таймаут с вызовом колбэка на ту же задержку
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);

    // Таким образом цикл «поставить таймаут - удалить таймаут» будет выполняться,
    // пока действие совершается чаще, чем переданная задержка timeoutDelay
  };
};

export { getRandomInclusiveInt, isEscKeyPress, getRandomInclusiveNumber, getRandomArrayElement, getRandomArrayElements, getRandomArrayPart, leadingZero, showAlertMessage, debounce };
