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
  const popupPhotosList = element.querySelector('.popup__photos');
  const popupPhoto = popupPhotosList.querySelector('.popup__photo');

  if (photos.length === 0) {
    popupPhotosList.innerHTML = '';

  } else if (photos.length === 1) {
    popupPhoto.src = photos[0];

    // offer.offer.photos.length > 1
  } else {
    const offerPhotos = photos;

    popupPhotosList.innerHTML = '';

    offerPhotos.forEach((photo) => {
      const popupPhotoTemplate = popupPhoto.cloneNode();
      popupPhotoTemplate.src = photo;

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
  const offerFeaturesList = element.querySelector('.popup__features');
  const offerFeatureItems = offerFeaturesList.querySelectorAll('.popup__feature');

  offerFeatureItems.forEach((featureItem) => {
    const isFeatureExist = features.some((feature) =>
      featureItem.classList.contains(`popup__feature--${feature}`)
    );

    if (!isFeatureExist) {
      featureItem.remove();
    }
  });
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
 * @description Генерация разметки похожих объявлений на основе исходных данных
 * @param {Array} userOffers - массив с исходными данными
 */
const renderSimilarOffers = (userOffers) => {

  // Блок для вставки
  const mapCanvas = document.querySelector('#map-canvas');

  // Шаблон карточки обьявления
  const cardTemplate = document.querySelector('#card')
    .content.querySelector('.popup');

  // Пустой фрагмент для складирования данных
  const documentFragment = document.createDocumentFragment();

  // advert - обьявление
  userOffers.forEach((advert) => {

    // Карточка товара
    const offerCard = cardTemplate.cloneNode(true);


    // Название обьявления
    checkExistData(offerCard, advert.offer.title, '.popup__title');

    // Адрес жилья
    checkExistData(offerCard, advert.offer.address, '.popup__text.popup__text--address');

    // Аватарка пользователя
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
    documentFragment.append(offerCard);
  });

  // Отрисовали на странице
  mapCanvas.append(documentFragment);

};

export {renderSimilarOffers};
