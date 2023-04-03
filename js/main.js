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


// import { isEscKeyPress } from './util.js';

// const body = document.body;

// const showMessage = (typeMessage) => {

//   /**
//   * Шаблон сообщения об успешной отправке формы
//   */
//   const errorMessageTemplate = document.querySelector(`#${typeMessage}`)
//     .content.querySelector(`.${typeMessage}`);

//   /**
//    * @description Закрытие попапа с помощью Escape
//    * @param {KeyboardEvent} evt - нажатие клавишы
//    */
//   const onEscKeyPress = (evt) => {
//     const successMessage = document.querySelector(`.${typeMessage}`);

//     if (isEscKeyPress(evt.key)) {
//       successMessage.remove();

//       body.classList.remove('scroll-lock');

//       document.removeEventListener('keydown', onEscKeyPress);
//       document.removeEventListener('click', onClickOverlay);
//     }
//   };

//   /**
//    * @description Закрытие попапа с помощью клика вне области попапа
//    * @param {MouseEvent} evt - Клик мышью
//    */
//   function onClickOverlay(evt) {
//     const successMessage = document.querySelector(`.${typeMessage}`);
//     const successContent = successMessage.querySelector('.error__content');

//     const elementsClickArea = evt.composedPath().includes(successContent);

//     if (!elementsClickArea) {
//       successMessage.remove();

//       body.classList.remove('scroll-lock');

//       document.removeEventListener('keydown', onEscKeyPress);
//       document.removeEventListener('click', onClickOverlay);
//     }
//   }

//   const message = errorMessageTemplate.cloneNode(true);

//   body.append(message);
//   body.classList.add('scroll-lock');

//   document.addEventListener('keydown', onEscKeyPress);
//   document.addEventListener('click', onClickOverlay);
// };

// expor { showMessage };
// renderSimilarOffers(similarOffers);
// console.log(similarOffers)
