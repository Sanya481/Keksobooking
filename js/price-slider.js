/**
 * Слайдер
 */
const adFormPriceSlider = document.querySelector('.ad-form__slider');

/**
 * Поле для ввода цены
 */
const priceField = document.querySelector('#price');

/**
 * Выбор типа жилья (select)
 */
// const housingType = document.querySelector('#type');

// Создание слайдера
noUiSlider.create(adFormPriceSlider, {
  start: 0,
  range: {
    'min': 0,
    'max': 100000
  },
  connect: 'lower',
  step: 1,
  format: {
    /* Метод .format.to() нужен для форматирования значения из слайдера и вывода его где-либо */
    to: function (value) {
      if (Number.isInteger(value)) {
        return value;
      }
      return value.toFixed(0);
    },
    /* Метод .format.from() нужен для форматирования значения для слайдера. Этот метод должен строго возвращать число, поэтому используем parseFloat(), и достаточно. */
    from: function (value) {
      return parseFloat(value);
    }
  }
});

// Изменение цены при помощи ползунка
adFormPriceSlider.noUiSlider.on('update', () => {
  // Получим актуальное значение слайдера с помощью метода .get() и запишем его в свойство value поля ввода.
  priceField.value = adFormPriceSlider.noUiSlider.get();
});

// Изменение положения ползунка при вводе цены с помощью клавиатуры
priceField.addEventListener('change', (evt) => {
  adFormPriceSlider.noUiSlider.set(evt.target.value);
});

/* Можно исключить валидацию этим способом - просто выставлять минимальную цену автоматически (но тогда будет непонятно, что к чему) */

/**
 * @description Изменение типа жилья и цены в зависимости от типа жилья
 * @param {string} type - выбранный тип жилья
 */
// const chooseHousingType = (type) => {
//   switch (type) {
//     case 'bungalow': {
//       adFormPriceSlider.noUiSlider.updateOptions({
//         range: {
//           'min': 0,
//           'max': 100000
//         },
//         start: 0,
//       });
//       break;
//     }
//     case 'flat': {
//       adFormPriceSlider.noUiSlider.updateOptions({
//         range: {
//           'min': 1000,
//           'max': 100000
//         },
//       });
//       break;
//     }
//     case 'hotel': {
//       adFormPriceSlider.noUiSlider.updateOptions({
//         range: {
//           'min': 3000,
//           'max': 100000
//         },
//       });
//       break;
//     }
//     case 'house': {
//       adFormPriceSlider.noUiSlider.updateOptions({
//         range: {
//           'min': 5000,
//           'max': 100000
//         },
//       });
//       break;
//     }
//     case 'palace': {
//       adFormPriceSlider.noUiSlider.updateOptions({
//         range: {
//           'min': 10000,
//           'max': 100000
//         },
//       });
//       break;
//     }
//   }
// };

// housingType.addEventListener('change', (evt) => {
//   chooseHousingType(evt.target.value);
// });


