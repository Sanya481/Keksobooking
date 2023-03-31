// /**
//  * @description Заполнение блока с типом жилья в обьявлении (простой вариант)
//  * @param {Object} userAdvert - одно обьявление с данными о нём
//  * @param {HTMLElement} housingType - тип жилья
//  */
// const chooseTypeOfHousing = (userAdvert, housingType) => {
//   switch (userAdvert) {
//     case 'flat':
//       housingType.textContent = 'Квартира';
//       break;
//     case 'bungalow':
//       housingType.textContent = 'Бунгало';
//       break;
//     case 'house':
//       housingType.textContent = 'Дом';
//       break;
//     case 'palace':
//       housingType.textContent = 'Дворец';
//       break;
//     case 'hotel':
//       housingType.textContent = 'Отель';
//       break;
//   }
// };

/**
 * Для простоты заполнения обяьвления, записали тип жилья по ключам в обьекте
 */
const TYPES_OF_HOUSING = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};


/**
 * @description Создание фотографий на основе данных из исходного массива
 * @param {HTMLElement} element - блок кода в котором ищем нужный элемент
 * @param {Array} photos - фотографии жилья
 */
const createPhotos = (element, photos) => {
  // Блок с фотками
  const popupPhotosList = element.querySelector('.popup__photos');
  // Используем единственнный элемент в шаблоне, как пример изображения
  const popupPhoto = popupPhotosList.querySelector('.popup__photo');

  // Если ВООБЩЕ нет фоток в обьявлении - очищаем блок с фотками
  if (!photos) {
    popupPhotosList.innerHTML = '';

    // Если есть фотка, но только одна - берём её src
  } else if (photos.length === 1) {
    popupPhoto.src = photos[0];

    // offer.offer.photos.length > 1
  } else {
    // Массив с фотками
    const offerPhotos = photos;

    // Очистили блок для фоток
    popupPhotosList.innerHTML = '';

    // Проходимся по массиву
    offerPhotos.forEach((photo) => {
      // Склонировали шаблон
      const popupPhotoTemplate = popupPhoto.cloneNode();
      // Добавили адрес для каждой фотки
      popupPhotoTemplate.src = photo;

      // Добавили в блок фоток сами фотки
      popupPhotosList.append(popupPhotoTemplate);
    });
  }
};

/**
 * @description Добавление преимуществ на основе данных из исходного массива
 * @param {HTMLElement} element - блок кода в котором ищем нужный элемент
 * @param {Array} features - преимущества жилья
 */
const addFeatureType = (element, features) => {
  // Список преимуществ
  const offerFeaturesList = element.querySelector('.popup__features');
  // Все преимущества
  const offerFeatureItems = offerFeaturesList.querySelectorAll('.popup__feature');

  // Если преимущества ВООБЩЕ есть то...
  if (features) {
    // В списке преимуществ у шаблона ищем нужные нам преимущества
    // Метод массива some() позволяет узнать, есть ли в массиве хотя бы один элемент, удовлетворяющий условию в функции-колбэке
    offerFeatureItems.forEach((featureItem) => {
      const isFeatureExist = features.some((feature) =>
        featureItem.classList.contains(`popup__feature--${feature}`)
      );

      // Если ни одно преимущество не найдено - удаляем список
      if (!isFeatureExist) {
        featureItem.remove();
      }
    });
  }
};

/**
 * @description Проверка на наличие данных для заполнения
 * @param {HTMLElement} card - блок в котором ищем элемент
 * @param {Array} dataAdvert - массив с исходными данными
 * @param {string} selector - класс элемента, который хотим заполнить данными
 */
const checkExistData = (card, dataAdvert, selector) => {
  const element = card.querySelector(selector);

  if (dataAdvert) {
    element.textContent = dataAdvert;
  } else {
    element.remove();
  }
};


/**
 * @description Генерация разметки похожего объявления на основе исходных данных
 * @param {Object} advert - обьект с данными (одно обьявление)
 * @returns {HTMLElement} - html разметка обьявления (article)
 */
const renderSimilarOffers = (advert) => {

  // Блок для вставки
  // const mapCanvas = document.querySelector('#map-canvas');

  // Шаблон карточки обьявления
  const cardTemplate = document.querySelector('#card')
    .content.querySelector('.popup');

  // Пустой фрагмент для складирования данных
  // const documentFragment = document.createDocumentFragment();

  // const offerCard = cardTemplate.cloneNode(true);

  // advert - обьявление
  // userOffers.forEach((advert) => {

  // Карточка товара
  const offerCard = cardTemplate.cloneNode(true);

  // Название обьявления
  checkExistData(offerCard, advert.offer.title, '.popup__title');

  // Адрес жилья
  checkExistData(offerCard, advert.offer.address, '.popup__text.popup__text--address');

  // Аватарка пользователя
  const popupAvatar = offerCard.querySelector('.popup__avatar');
  if (advert.author.avatar) {
    popupAvatar.src = advert.author.avatar;
  } else {
    popupAvatar.remove();
  }

  checkExistData(offerCard, advert.author.avatar, '.popup__avatar');

  // Описание жилья
  checkExistData(offerCard, advert.offer.description, '.popup__description');

  // Тип жилья
  checkExistData(offerCard, TYPES_OF_HOUSING[advert.offer.type], '.popup__type');


  // Цена на жильё
  const offerPrice = offerCard.querySelector('.popup__text.popup__text--price');
  if (advert.offer.price) {
    offerPrice.textContent = `${advert.offer.price} ₽/ночь`;
  } else {
    offerPrice.remove();
  }

  // capacity - вместимость
  const offerCapacity = offerCard.querySelector('.popup__text.popup__text--capacity');
  if (advert.offer.rooms && advert.offer.guests) {
    offerCapacity.textContent = `${advert.offer.rooms} комнаты для ${advert.offer.guests} гостей`;
  } else {
    offerCapacity.remove();
  }

  // Время заезда/выезда
  const offerTime = offerCard.querySelector('.popup__text.popup__text--time');
  if (advert.offer.checkin && advert.offer.checkout) {
    offerTime.textContent = `Заезд после ${advert.offer.checkin}, выезд до ${advert.offer.checkout}`;
  } else {
    offerTime.remove();
  }

  // Добавление фотографий
  createPhotos(offerCard, advert.offer.photos);

  // Добавление преимуществ
  addFeatureType(offerCard, advert.offer.features);

  // Положили карточки в фрагмент
  // documentFragment.append(offerCard);

  // });

  return offerCard;

  // Отрисовали на странице
  // mapCanvas.append(documentFragment);

};

export { renderSimilarOffers };
