import { showAlertMessage } from './util.js';
import { setInactiveStateFilter } from './forms-state.js';
import { setActiveStateFilter, setActiveStateForm } from './forms-state.js';

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
      onSuccess(data);

      //  Загрузка и успешная инициализация карты переводит страницу в активное состояние
      setActiveStateFilter();
      setActiveStateForm();

      // document.querySelector('.map__filters').addEventListener('click', (evt) => {
      // console.log(evt.target)
      // })

      console.log(data)

    })
    .catch(() => {
      // Блокируем фильтрацию, если не загрузились данные с сервера
      setInactiveStateFilter();
      // Показываем сообщение
      showAlertMessage('Не удалось загрузить данные с сервера');

      /*  ошибка загрузки данных влияет на отображение меток и их фильтрацию, но не влияет на отправку формы. Даже если данные для меток не загрузились, возможность выбрать адрес на карте и отправить форму сохраняется. */
      setActiveStateForm();
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
    'https://25.javascript.pages.academy/keksobooking',
    {
      method: 'POST',
      body: formData,
    },
  )
    .then((response) => {
      if (response.ok) {
        // возвращение формы в исходное состояние при успешной отправке
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
