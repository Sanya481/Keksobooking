import { showAlertMessage } from './util.js';

// JSON -JavaScript object notation
// Преобразование JavaScript => JSON - Сериализация
// Преобразование JSON => JavaScript - Десериализация
// fetch - это функция

const API_URL = 'https://25.javascript.pages.academy/keksobooking';

/**
 * @description Получение данных от сервера
 * @param {Function} onSuccess - Функция при успешном получении данных
 */
const getDataFromServer = (onSuccess) => {
  fetch(`${API_URL}/data`)
    .then((response) => {
      // Проверяем успешность запроса и выкидываем ошибку
      if (response.ok) {
        return response.json();
      }

      throw new Error(`${response.status} ${response.statusText}`);
    })
    .then((data) => {
      const offers = data;

      offers.forEach((offer) => {
        onSuccess(offer);
      });
    })
    .catch(() => {
      showAlertMessage('Не удалось загрузить данные с сервера');
    });
};

/**
 * @description Отправка данных на сервер
 * @param {Function} onSuccess - Функция при успешной отправке
 * @param {Function} onFail - Функция при ошибке
 * @param {Object} body - данные формы в виде пар [ключ, значение]
 */
const sendDataToServer = (onSuccess, onFail, formData) => {
  fetch(
    API_URL,
    {
      method: 'POST',
      body: formData,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail('Не удалось отправить форму! Попробуйте пожалуйста ещё раз.');
      }
    })
    .catch(() => {
      onFail('Не удалось отправить форму! Попробуйте пожалуйста ещё раз.');
    });
};

export { getDataFromServer, sendDataToServer };
