import { similarOffers } from './generate-offers.js';
// import { renderSimilarOffers } from './rendering-similar-offers.js';
import './form-validation.js';
import './map.js';
import './price-slider.js';
import './ad-form-message.js';
import './ad-form-error-message.js';

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

// export { showMessage };





// renderSimilarOffers(similarOffers);
// console.log(similarOffers)

