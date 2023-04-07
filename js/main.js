// import { similarOffers } from './generate-offers.js';
// import { renderSimilarOffers } from './rendering-similar-offers.js';
import './form-validation.js';
import './map.js';
import './price-slider.js';
import './ad-form-message.js';
import './ad-form-error-message.js';
import './server-api.js';
import './filter-data.js';
import './add-photo-to-form.js';
import { setInactiveStateFilter, setInactiveStateForm } from './forms-state.js';
// import { getDataFromServer } from './server-api.js';
import { loadMap } from './map.js';
import { setUserFormSubmit } from './form-validation.js';
import { showSuccessMessage } from './ad-form-message.js';
import { showErrorMessage } from './ad-form-error-message.js';

// Интерфейс

// При открытии страница находится в неактивном состоянии:
setInactiveStateForm();
setInactiveStateFilter();

// Загрузка карты
// !!! Отрисовка и добавление меток, активация формы и фильтрации происходит после загрузки карты
loadMap();

// Отправка формы
setUserFormSubmit(showSuccessMessage, showErrorMessage);
