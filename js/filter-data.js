const body = document.body;

/**
 * Выбор типа жилья
 */
const housingType = document.querySelector('#housing-type');

/**
 * Выбор цены жилья
 */
const housingPrice = document.querySelector('#housing-price');

/**
 * Выбор количества комнат
 */
const housingRooms = document.querySelector('#housing-rooms');

/**
 * Выбор количества гостей
 */
const housingGuests = document.querySelector('#housing-guests');

/**
 * Диапазон цен на жилье
 */
const ADVERT_PRICE = {
  low: 10000,
  high: 50000,
};

/**
 * Время показа плашки сообщения об отсутствии похожих обьявлений
 */
const NOT_FOUND_OFFERS_SHOW_TIME = 3000;

/**
* @description Фильтрация по типу жилья
* @param {object} advert - обьявление
* @returns {boolean}
*/
const filterHousingByType = (advert) => {
  if (housingType.value === 'any') {
    return advert;
  }

  return housingType.value === advert.offer.type;
};

/**
* @description Фильтрация по цене
* @param {object} advert - обьявление
* @returns {boolean}
*/
const filterHousingByPrice = (advert) => {
  switch (housingPrice.value) {
    case 'any': {
      return advert;
    }
    case 'middle': {
      return advert.offer.price > ADVERT_PRICE.low && advert.offer.price < ADVERT_PRICE.high;
    }
    case 'low': {
      return advert.offer.price <= ADVERT_PRICE.low;
    }
    case 'high': {
      return advert.offer.price >= ADVERT_PRICE.high;
    }
  }
};

/**
* @description Фильтрация по количеству комнат
* @param {object} advert - обьявление
* @returns {boolean}
*/
const filterHousingByQuantityRooms = (advert) => {
  switch (housingRooms.value) {
    case 'any': {
      return advert;
    }
    case '1': {
      return advert.offer.rooms === 1;
    }
    case '2': {
      return advert.offer.rooms === 2;
    }
    case '3': {
      return advert.offer.rooms === 3;
    }
  }
};

/**
 * @description Фильтрация по количеству гостей
 * @param {object} advert - обьявление
 * @returns {boolean}
 */
const filterHousingByQuantityGuests = (advert) => {
  switch (housingGuests.value) {
    case 'any': {
      return advert;
    }
    case '2': {
      return advert.offer.guests === 2;
    }
    case '1': {
      return advert.offer.guests === 1;
    }
    case '0': {
      return advert.offer.guests === 0;
    }
  }
};

/**
 * @description Фильтрация по наличию удобств
 * @param {object} advert - обьявление
 * @returns {boolean}
 */
const checkedFeatures = (advert) => {
  // Пустой массив для складирования 'удобств' в виде строк
  const features = [];

  // Ищем все выбранные пользователем преимущества
  const housingFeatures = document.querySelector('#housing-features')
    .querySelectorAll('input[name="features"]:checked');

  // Сразу проверяем , если пользователь ничего не выбрал - ничего не фильтруем
  if (housingFeatures.length === 0) {
    return true;
  }

  // Все выбранные преимущества складываем в пустой массив - features
  housingFeatures.forEach((feature) => {
    features.push(feature.value);
  });

  // Если у обьявления есть преимущества
  if (advert.offer.features) {
    return features.every((feature) => advert.offer.features.includes(feature));
  }
  return false;
};

/**
 * При отсутствии обьявлений при изменении фильтра - показываем сообщение
 */
const showNotFoundOffersMessage = () => {
  const divEl = document.createElement('div');
  divEl.classList.add('no-simmilar-offers');
  divEl.textContent = 'Подходящих обьявлений не найдено. Попробуйте изменить фильтры поиска';
  body.append(divEl);

  setTimeout(() => {
    divEl.remove();
  }, NOT_FOUND_OFFERS_SHOW_TIME);
};

/* Метод массива .filter() позволяет получить новый массив, отфильтровав элементы с помощью переданной колбэк-функции. Колбэк-функция будет вызвана для каждого элемента массива и по результату функции примет решение включать этот элемент в новый массив или нет. */

/**
 * @description Фильтрация обьявлений
 * @param {Array} offers - массив с обьявлениями
 * @returns {Array} - фильтрованный массив
 */
const filterOffers = (offers) => {
  // Скопировали полученный массив данных
  const copyOffers = offers.slice();
  const filterTypeHousingAdverts = copyOffers.filter((advert) => filterHousingByType(advert));
  const filterPriceAdverts = filterTypeHousingAdverts.filter((advert) => filterHousingByPrice(advert));
  const filterQuantityRooms = filterPriceAdverts.filter((advert) => filterHousingByQuantityRooms(advert));
  const filterQuantityGuests = filterQuantityRooms.filter((advert) => filterHousingByQuantityGuests(advert));
  const filterFeatures = filterQuantityGuests.filter((advert) => checkedFeatures(advert));

  if (filterFeatures.length === 0) {
    showNotFoundOffersMessage();
  }

  return filterFeatures;
};

export { filterOffers };
