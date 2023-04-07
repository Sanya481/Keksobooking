import { setActiveStateForm, setActiveStateFilter } from './forms-state.js';
// import { similarOffers } from './generate-offers.js';
import { renderSimilarOffers } from './rendering-similar-offers.js';
import { getDataFromServer } from './server-api.js';
import { filterOffers } from './filter-data.js';
import { debounce } from './util.js';
import { showAlertMessage } from './util.js';


/**
 * Блок для добавления карты
 */
const mapCanvas = document.querySelector('#map-canvas');

/**
 * Поле для ввода адреса (координат)
 */
const coordinatesField = document.querySelector('#address');

/**
 * Форма фильтрации жилья
 */
const mapFiltersForm = document.querySelector('.map__filters');

/**
 * @description Количество показываемых обьявлений за раз
 */
const ADVERT_MAX_QUANTITY = 10;

/**
 * Кнопка - очистить форму
 */
// const adFormReset = document.querySelector('.ad-form__reset');

/**
 * Координаты центра Токио
 */
const COORDINATES_CENTER_TOKYO = {
  lat: 35.68948,
  lng: 139.69170,
};

/**
 * Размер основной метки (высота и ширина одинаковы)
 */
const MAIN_PIN_SIZE = 52;

/**
 * Размер похожих меток (высота и ширина одинаковы)
 */
const SIMILAR_ICON_SIZE = 42;

/**
 * Приближение карты
 */
const MAP_ZOOM = 12;

/**
 * Создание карты
 */
const map = L.map(mapCanvas);

/**
 * Создание главной метки
 */
const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [MAIN_PIN_SIZE, MAIN_PIN_SIZE],
  iconAnchor: [MAIN_PIN_SIZE / 2, MAIN_PIN_SIZE],
});

/**
 * Создание главной метки (расположение и опции)
 */
const mainPinMarker = L.marker(
  {
    lat: COORDINATES_CENTER_TOKYO.lat,
    lng: COORDINATES_CENTER_TOKYO.lng,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

// Добавление главной метки на карту
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

/**
* Создание похожих меток (иконка похожих меток у всех одна и та же)
*/
const similarIcon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [SIMILAR_ICON_SIZE, SIMILAR_ICON_SIZE],
  iconAnchor: [SIMILAR_ICON_SIZE / 2, SIMILAR_ICON_SIZE],
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


/* ! Метод slice возвращает новый массив, в который копирует все элементы с индекса start до end (не включая end). */

/**
 * @description Отрисовка меток и их попапов(балунов) на карте
 * @param {Array} similarOffers - массив получаемых данных с сервера
 */
const renderMarkers = (similarOffers) => {
  // Можно подробно расписать
  // const copySimilarOffers = similarOffers.slice();
  // const partOfSimilarOffers = similarOffers.slice(0, ADVERT_MAX_QUANTITY);

  similarOffers
    .slice(0, ADVERT_MAX_QUANTITY)
    .forEach((offer) => {
      createMarkers(offer);
    });
};

/**
 * @description Добавление обработчика на форму фильтрации, очистка слоев карты, вызов функции
 * @param {function} cb - функция
 */
const setMapFilters = (cb) => {
  mapFiltersForm.addEventListener('change', () => {
    // Очищаем слой(удаляем маркеры) с карты
    markerGroup.clearLayers();
    cb();
  });
};

/**
 * Загрузка карты на странице
 */
const loadMap = () => {
  map.on('load', (evt) => {
    if (evt.target._loaded) {

      // Активируем формы
      setActiveStateForm();
      setActiveStateFilter();

      // Отрисовка меток на карте
      getDataFromServer((offers) => {
        setMapFilters(debounce(
          () => renderMarkers(filterOffers(offers)),
        ));
        renderMarkers(offers);
      });

      coordinatesField.value = `${COORDINATES_CENTER_TOKYO.lat}, ${COORDINATES_CENTER_TOKYO.lng}`;
    } else {
      showAlertMessage('Карта не загрузилась! Попробуйте обновить страницу');
    }
  })
    .setView({
      lat: COORDINATES_CENTER_TOKYO.lat,
      lng: COORDINATES_CENTER_TOKYO.lng,
    }, MAP_ZOOM);
};

// Создание и добавление 'картинки' карты (улицы, дома.....)
L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);


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

  coordinatesField.defaultValue = `${COORDINATES_CENTER_TOKYO.lat}, ${COORDINATES_CENTER_TOKYO.lng}`;

  // Возвращаем карту на первоночальное место
  map.setView({
    lat: COORDINATES_CENTER_TOKYO.lat,
    lng: COORDINATES_CENTER_TOKYO.lng,
  }, MAP_ZOOM);

  closeBalloon();
};

export { resetMapData, closeBalloon, renderMarkers, loadMap };
