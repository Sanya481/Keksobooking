import { getRandomInclusiveInt, getRandomInclusiveNumber, getRandomArrayElement, getRandomArrayElements, getRandomArrayPart } from './util.js';

// Количество предложений
const OFFER_COUNT = 10;

// Стоимость
const OFFER_MIN_PRICE = 500;
const OFFER_MAX_PRICE = 5000;

// Колчество комнат
const ROOM_MIN_COUNT = 1;
const ROOM_MAX_COUNT = 8;

// Количество гостей, которое можно разместить
const GUESTS_MIN_COUNT = 1;
const GUESTS_MAX_COUNT = 20;

// Местоположение в виде географических координат - широта
const ADRESS_MIN_LATITUDE = 35;
const ADRESS_MAX_LATITUDE = 38;

// Местоположение в виде географических координат - долгота
const ADDRESS_MIN_LONGITUDE = 135;
const ADDRESS_MAX_LONGITUDE = 141;

// Количество знаков после плавающей точки у числа
const DECIMAL_PLACES_COUNT = 5;

const LOCATION = {
  LAT: getRandomInclusiveNumber(ADRESS_MIN_LATITUDE, ADRESS_MAX_LATITUDE, DECIMAL_PLACES_COUNT),
  LNG: getRandomInclusiveNumber(ADDRESS_MIN_LONGITUDE, ADDRESS_MAX_LONGITUDE, DECIMAL_PLACES_COUNT),
};

// Заголовок предложения
const OFFER_TITLE = [
  'Чёткая хата',
  'Небольшая лавочка в парке',
  'Уютное гнездышко для молодоженов',
  'Тихая квартирка недалеко от метро',
  'Стандартная квартира в центре',
  'Императорский дворец в центре Токио',
  'Сарайчик в деревне',
  'Будка, как у Шарика',
  'Дом в Простоквашино с коровой',
  'Шалашик на дереве на Бали, когда все за#бали',
  'Словно яхта миллионера',
  'Ковры на стене с соседями в ковре',
  'Многоэтажка старых веков',
];

// Описание помещения
const OFFER_DESCRIPTIONS = [
  'Светлое и просторное помещение',
  'Локанично и стильно',
  'Отличный вариант для путешественников с питомцами',
  'Ярко и оригинально',
  'Великолепная квартира-студия',
  'Гнездышко для молодоженов',
  'Квартира для студентов',
  'Для многодетной семьи',
  'Для одиночек с животными',
];

const OFFER_PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];

// Тип предлагаемого жилья
const OFFER_TYPES = ['palace', 'flat', 'house', 'bungalow', 'hotel'];

// Время заселения/выселения
const OFFER_CHECKINS = ['12:00', '13:00', '14:00'];
const OFFER_CHECKOUTS = ['12:00', '13:00', '14:00'];

// Удобства
const OFFER_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

/**
 * @description Функция добавляет 0 в начало значения, если значение меньше 10
 * @returns {string}
 */
const createAvatarIndex = () => {
  const avatarIndex = getRandomInclusiveInt(1, 10);
  return avatarIndex < 10 ? `img/avatars/user0${avatarIndex}.png` : `img/avatars/user${avatarIndex}.png`;
};


/**
 * @description Функция для генерации обьекта c информацией о предложении
 * @returns {Object}
 */
const makeOffer = () => ({
  title: OFFER_TITLE[getRandomInclusiveInt(0, OFFER_TITLE.length)],
  address: `${LOCATION.LAT}, ${LOCATION.LNG}`,
  price: getRandomInclusiveInt(OFFER_MIN_PRICE, OFFER_MAX_PRICE),
  type: getRandomArrayElement(OFFER_TYPES),
  rooms: getRandomInclusiveInt(ROOM_MIN_COUNT, ROOM_MAX_COUNT),
  guests: getRandomInclusiveInt(GUESTS_MIN_COUNT, GUESTS_MAX_COUNT),
  checkin: getRandomArrayElement(OFFER_CHECKINS),
  checkout: getRandomArrayElement(OFFER_CHECKOUTS),
  features: getRandomArrayPart(OFFER_FEATURES),
  description: OFFER_DESCRIPTIONS[getRandomInclusiveInt(0, OFFER_DESCRIPTIONS.length)],
  photos: getRandomArrayElements(OFFER_PHOTOS),
});


/**
 * @description Функция для генерации данных об одном похожем обьявлении
 * @returns {Object}
 */
const makeSimilarOffer = () => ({
  author: { avatar: createAvatarIndex() },
  offer: makeOffer(),
  location: {
    lat: getRandomInclusiveNumber(ADRESS_MIN_LATITUDE, ADRESS_MAX_LATITUDE, DECIMAL_PLACES_COUNT),
    lng: getRandomInclusiveNumber(ADDRESS_MIN_LONGITUDE, ADDRESS_MAX_LONGITUDE, DECIMAL_PLACES_COUNT),
  },
});

// Cоздание массива из 10 сгенерированных JS-объектов. Каждый объект массива — описание похожего объявления неподалёку.
const similarOffers = Array.from({ length: OFFER_COUNT }, makeSimilarOffer);

export { similarOffers };
