import { setActiveStateForm, setActiveStateFilter } from './forms-state.js';
// import { similarOffers } from './generate-offers.js';
import { renderSimilarOffers } from './rendering-similar-offers.js';

/**
 * Блок для добавления карты
 */
const mapCanvas = document.querySelector('#map-canvas');

/**
 * Поле для ввода адреса (координат)
 */
const coordinatesField = document.querySelector('#address');

/**
 * Кнопка - очистить форму
 */
// const adFormReset = document.querySelector('.ad-form__reset');

// Координаты центра Токио
const COORDINATES_CENTER_TOKYO = {
  lat: 35.68948,
  lng: 139.69170,
};

// Приближение карты
const MAP_ZOOM = 9;

const map = L.map(mapCanvas)
  .on('load', () => {

    setActiveStateForm();
    setActiveStateFilter();

    coordinatesField.value = `${COORDINATES_CENTER_TOKYO.lat}, ${COORDINATES_CENTER_TOKYO.lng}`;
    // console.log(evt.target._loaded)
  })
  .setView({
    lat: COORDINATES_CENTER_TOKYO.lat,
    lng: COORDINATES_CENTER_TOKYO.lng,
  }, MAP_ZOOM);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);


const mainPinIcon = L.icon({
  iconUrl: '../img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const mainPinMarker = L.marker(
  {
    lat: 35.68948,
    lng: 139.69170,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

mainPinMarker.addTo(map);

// https://learn.javascript.ru/number

// Отбрасываем числа после запятой
/* Умножить и разделить. (1-ый способ)
- Более точный (не округляет)
Например, чтобы округлить число до пятого знака после запятой, мы можем умножить число на 10000, вызвать функцию округления и разделить обратно.
*/

/* Метод toFixed(n) (2-ой способ)

 !!!! Округляет число до n знаков после запятой и возвращает строковое представление результата.
*/

// Добавил обработчик события moveend, которое означает, что пользователь закончил передвигать метку
// Запись координат в поле адреса
mainPinMarker.on('moveend', (evt) => {
  // С помощью деструктуризации вытащили нужные нам ключи у обьекта
  const { lat, lng } = evt.target.getLatLng();

  // Умножить и разделить. (1-ый способ)
  coordinatesField.value = `${Math.floor((lat * 100000)) / 100000}, ${Math.floor((lng * 100000)) / 100000}`;

  // Метод toFixed(n) (2-ой способ)
  // coordinatesField.value = `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
});

// Создание похожих меток (иконка похожих меток у всех одна и та же)
const similarIcon = L.icon({
  iconUrl: '../img/pin.svg',
  iconSize: [42, 42],
  iconAnchor: [21, 42],
});

// Создание 'слоя' и его добавление на карту
const markerGroup = L.layerGroup().addTo(map);

/**
 * @description Создание метки и её попапа(балуна) на карте
 * @param {Object} advertisement - одно обьявление (advertisement - обьявление/реклама)
 */
const createMarkers = (advertisement) => {
  const marker = L.marker(
    {
      lat: advertisement.location.lat,
      lng: advertisement.location.lng,
    },
    {
      icon: similarIcon,
    }
  );

  marker
    .addTo(markerGroup)
    .bindPopup(renderSimilarOffers(advertisement));
};

// advert - одно обьявление
// similarOffers.forEach((advert) => {
//   createMarkers(advert);
// });

/**
 * @description Закрытие описания балуна (при очистке и отправке формы), если оно открыто
 */
const closeBalloon = () => {
  const baloonContainer = document.querySelector('.leaflet-pane.leaflet-popup-pane');

  const openBaloons = Array.from(baloonContainer.children);

  // Такое условие тоже сработает
  // if (openBaloons.length) {
  if (openBaloons.length !== 0) {
    openBaloons.forEach((baloon) => {
      baloon.remove();
    });
  }
};

/**
 * @description Возврат карты/основной метки в начальное состояние
 */
const resetMapData = () => {
  // Возвращаем метку на первоночальное место
  mainPinMarker.setLatLng({
    lat: COORDINATES_CENTER_TOKYO.lat,
    lng: COORDINATES_CENTER_TOKYO.lng,
  });

  // coordinatesField.value = `${COORDINATES_CENTER_TOKYO.lat}, ${COORDINATES_CENTER_TOKYO.lng}`;
  coordinatesField.defaultValue = `${COORDINATES_CENTER_TOKYO.lat}, ${COORDINATES_CENTER_TOKYO.lng}`;
  // console.log(`${COORDINATES_CENTER_TOKYO.lat}, ${COORDINATES_CENTER_TOKYO.lng}`)
  // console.log(coordinatesField.value)

  // Возвращаем карту на первоночальное место
  map.setView({
    lat: COORDINATES_CENTER_TOKYO.lat,
    lng: COORDINATES_CENTER_TOKYO.lng,
  }, MAP_ZOOM);

  closeBalloon();
};


/**
 * Форма для добавления обьявления
 */
// const formPlacingAd = document.querySelector('.ad-form');

// formPlacingAd.addEventListener('reset', onResetData);


// Добавление обработчика на кнопку reset у формы
// adFormReset.addEventListener('click', onResetData);

export { resetMapData, closeBalloon , createMarkers};
