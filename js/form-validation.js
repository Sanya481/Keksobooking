import { resetMapData, closeBalloon } from './map.js';
import { resetSliderPrice } from './price-slider.js';
import { showAlertMessage } from './util.js';
import { sendDataToServer } from './server-api.js';
import { cleanImagesAdvertForm } from './add-photo-to-form.js';

// https://morioh.com/p/7c5a96c13053 - подсказки ниже взял с этого сайта

/* !При добавлении библиотеки Pristine, к форме, которую мы собираемся валидировать, добавляется атрибут novalidate со значением true; это отключит проверку HTML формы по умолчанию */

/* !Чтобы проверить форму с помощью PristineJS, нам нужно вызвать новый экземпляр; экземпляр имеет три аргумента; элемент формы, который вы хотите проверить, необязательный объект конфигурации и логическое значение для проверки в реальном времени со значением по умолчанию true. Если параметр, переданный для проверки в реальном времени (третий аргумент), имеет значение false, проверки полей будут выполняться только при отправке формы; в противном случае проверка будет происходить при вводе значений в поле. */
// const pristine = new Pristine(formElement, config, live);

/* !Метод addValidator принимает четыре параметра: имя проверки, функцию со значением поля для проверки, переданным в качестве аргумента, сообщение проверки и уровень приоритета проверки (если на одно поле добавляется много проверок). */

/* !PristineJS дает вам возможность перезаписывать сообщения об ошибках по умолчанию для указанных полей с помощью атрибута data-pristine-validation_tag-message, при этом настраиваемое сообщение передается в качестве значения атрибута: */
// data-pristine-required-message="Поле обязательно для заполнения"

/**
 * Форма для добавления обьявления
 */
const formPlacingAd = document.querySelector('.ad-form');

/**
 * Заголовок объявления
 */
// const titleField = document.querySelector('#title');

/**
 * Выбор типа жилья (select)
 */
const housingType = document.querySelector('#type');

/**
 * Поле ввода цены за жилье
 */
const pricePerNight = document.querySelector('#price');

/**
 * Количество комнат
 */
const roomNumber = document.querySelector('#room_number');

/**
 * Количество гостей
 */
const capacity = document.querySelector('#capacity');

/**
 * Поле «Время заезда»
 */
const checkInTime = document.querySelector('#timein');

/**
 * Поле «Время выезда»
 */
const checkOutTime = document.querySelector('#timeout');

/**
 * кнопка «Опубликовать»
 */
const adFormSubmit = document.querySelector('.ad-form__submit');

// Максимальная цена за ночь
const PRICE_MAX_FOR_NIGHT = 100000;

// Для удобства создал прайс лист для типов жилья
const priceHousingType = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000,
};

// Допустимые варианты выбора количества гостей - при выборе количества комнат
// соотношение количества комнат и гостей
const RATIO_OF_ROOMS_AND_GUESTS = {
  '1': ['1'],
  '2': ['1', '2'],
  '3': ['1', '2', '3'],
  '100': ['0'],
};


/**
 * @description Возврат карты/основной метки в начальное состояние
 */
const onResetData = () => {
  resetMapData();
  resetSliderPrice();

  // Удаление изображений с формы
  cleanImagesAdvertForm();
};

/**
 * @description На время выполнения запроса к серверу кнопка «Опубликовать» блокируется
 */
const blockSubmitBtn = () => {
  adFormSubmit.disabled = true;
  adFormSubmit.textContent = 'Публикую...';
};

/**
 * @description Разблокируем кнопку «Опубликовать» при успешной олтправке формы
 */
const unblockSubmitBtn = () => {
  adFormSubmit.disabled = false;
  adFormSubmit.textContent = 'Опубликовать';
};

/**
 * @description Очистка формы (удаление данных введенных пользователем )
 */
const clearForm = () => {
  // Для очистки полей формы достаточно дописать в обработчик событий submit этот метод
  formPlacingAd.reset();

  // Возврат карты/основной метки в начальное состояние
  resetMapData();

  // Закрытие описания балуна (при очистке и отправке формы), если оно открыто
  closeBalloon();

  // Сброс цены к значениям по умолчанию
  resetSliderPrice();

  // Удаление изображений с формы
  cleanImagesAdvertForm();
};

/* Для вывода сообщения, нужно добавить дополнительную разметку для показа сообщения об ошибке в HTML документ */
const pristine = new Pristine(formPlacingAd, {
  // Класс для общего блока с ошибкой
  classTo: 'text__group',
  // Класс, если поле не валидно (добавляется общему блоку)
  errorClass: 'is-invalid',
  // Класс, если поле валидно (добавляется общему блоку)
  successClass: 'is-valid',
  // Класс родительского элемента, к которому добавляется текстовый элемент ошибки
  errorTextParent: 'text__group',
  // Тег для обертки сообщения о конкретной ошибке
  errorTextTag: 'p',
  // Класс для обертки сообщения о конкретной ошибке
  errorTextClass: 'error-text'
});

/**
 * @description Изменение типа жилья и цены в зависимости от типа жилья
 * @param {string} type - выбранный тип жилья
 */
const chooseHousingType = (type) => {
  switch (type) {
    case 'bungalow': {
      pricePerNight.placeholder = 0;
      pricePerNight.min = priceHousingType.bungalow;
      break;
    }
    case 'flat': {
      pricePerNight.placeholder = (priceHousingType.flat).toLocaleString();
      pricePerNight.min = priceHousingType.flat;
      break;
    }
    case 'hotel': {
      pricePerNight.placeholder = (priceHousingType.hotel).toLocaleString();
      pricePerNight.min = priceHousingType.hotel;
      break;
    }
    case 'house': {
      pricePerNight.placeholder = (priceHousingType.house).toLocaleString();
      pricePerNight.min = priceHousingType.house;
      break;
    }
    case 'palace': {
      pricePerNight.placeholder = (priceHousingType.palace).toLocaleString();
      pricePerNight.min = priceHousingType.palace;
      break;
    }
  }
};

// Выставление минимальной цены и плейсхолдера в зависимости от типа жилья при загрузке страницы
chooseHousingType(housingType.value);

/**
 * @description Обработчик на изменение типа жилья
 * @param {Event} evt - изменение типа жилья
 */
const onChangePriceForHousingType = (evt) => {
  const selectedType = evt.target.value;
  pricePerNight.placeholder = (priceHousingType[selectedType]).toLocaleString();
  pricePerNight.min = priceHousingType[selectedType];

  housingType.querySelectorAll('option').forEach((item) => {
    item.removeAttribute('selected', '');
  });

  housingType.querySelector(`[value="${selectedType}"]`).setAttribute('selected', '');
};

/**
 * @description  Заголовок объявления:
    Обязательное текстовое поле;
    Минимальная длина — 10 символов;
    Максимальная длина — 100 символов.
 * @param {string} value - вводимое пользователем значение
 * @returns {boolean}
 */
// const validateNickname = (value) => value.length >= 10 && value.length <= 100;

/**
 * @description Проверка на минимальную и максимальную сумму
 *  Обязательное поле;
    Числовое поле;
    Максимальное значение — 100000.
 * @param {string} value - вводимое пользователем значение
 * @returns {boolean}
 */
const validatePrice = (value) => value > priceHousingType[housingType.value] && value < PRICE_MAX_FOR_NIGHT;

// Синхронизация полей - количество гостей и количества комнат, чтобы при изменении одного поля, подхватывалось(проверялось) и другое
const onCapacityChange = () => {
  pristine.validate(roomNumber);
};

/**
 * @description Ограничения на допустимые варианты выбора количества гостей - при выборе количества комнат
 *  1 комната — «для 1 гостя»;
    2 комнаты — «для 2 гостей» или «для 1 гостя»;
    3 комнаты — «для 3 гостей», «для 2 гостей» или «для 1 гостя»;
    100 комнат — «не для гостей».
 * @returns {boolean}
 */
const validateRoomNumber = () => RATIO_OF_ROOMS_AND_GUESTS[roomNumber.value].includes(capacity.value);

/**
 * @description Вывод сообщения об ошибке
 * @returns {string}
 */
const getRoomNumberErrorMessage = () => {
  switch (roomNumber.value) {
    case '1': {
      return '1 комната — «для 1 гостя»';
    }
    case '2': {
      return '2 комнаты — «для 2 гостей» или «для 1 гостя»';
    }
    case '3': {
      return '3 комнаты — «для 3 гостей», «для 2 гостей» или «для 1 гостя»';
    }
    case '100': {
      return '100 комнат — «не для гостей»';
    }
  }
};

/**
 * При изменении времени заезда, меняется время выезда
 */
const onTimeinChange = () => {
  if (checkInTime.value !== checkOutTime.value) {
    checkOutTime.value = checkInTime.value;
  }
};

/**
 * При изменении времени выезда, меняется время заезда
 */
const onTimeOutChange = () => {
  if (checkInTime.value !== checkOutTime.value) {
    checkInTime.value = checkOutTime.value;
  }
};

// Реализовал с помощью атрибутов в HTML
// pristine.addValidator(titleField, validateNickname, 'От 10 до 100');

// Если ни сделать сообщение отдельной функцией, то переменная не будет подставляться - х/з, как это работает, но я потратил на это пол дня
/* Вместо простой строчки с текстом в этот раз мы передаём функцию, которая этот текст генерирует. Так тоже можно! Это удобно, когда у вас текст ошибки вариативный и зависит от каких-то условий, как у нас. */
const showPriceValidationError = () => `Цена должна быть ни меньше ${priceHousingType[housingType.value]} рублей и не больше ${PRICE_MAX_FOR_NIGHT.toLocaleString()} рублей. (Минимальная цена зависит от типа жилья!)`;
pristine.addValidator(pricePerNight, validatePrice, showPriceValidationError);

pristine.addValidator(roomNumber, validateRoomNumber, getRoomNumberErrorMessage);
pristine.addValidator(capacity, validateRoomNumber, getRoomNumberErrorMessage);

// Добавил обработчик на изменение типа жилья
housingType.addEventListener('change', onChangePriceForHousingType);

// Обработчик изменения выбора количества гостей, чтобы последовывательность изменений не была важна
capacity.addEventListener('change', onCapacityChange);

// Изменение времени заезда
checkInTime.addEventListener('change', onTimeinChange);

// Изменение времени выезда
checkOutTime.addEventListener('change', onTimeOutChange);

/**
 * @description Подписка на событие формы - Отправить. !!! Основная функция - Валидация формы. Если форма валидна - выполняем какое то действие - в нашем случае отправка данных на сервер
 * @param {Function} onSuccess - Функция открытия сообщения об успешной отправке формы и очистке формы (действия, которые нужно выполнить после успешной отправки формы)
 * @param {Function} onError - Функция открытия сообщения об НЕуспешной отправке формы
 */
const setUserFormSubmit = (onSuccess, onError) => {
  formPlacingAd.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const isValid = pristine.validate();

    if (isValid) {
      blockSubmitBtn();
      const formData = new FormData(evt.target);

      // Отправка данных на сервер
      sendDataToServer(
        () => {
          // Если отправка данных прошла успешно, показывается соответствующее сообщение
          onSuccess();

          // возвращение формы в исходное состояние при успешной отправке
          clearForm();
          unblockSubmitBtn();
        },
        () => {
          showAlertMessage('Не удалось отправить форму. Попробуйте пожалуйста ещё раз');
          unblockSubmitBtn();
        },
        formData
      );
    } else {
      // !!! Если форма не вылидна, показывается соответствующее сообщение
      onError();
    }
  });
};

// Обработчки на событие reset
formPlacingAd.addEventListener('reset', onResetData);

export { setUserFormSubmit };

