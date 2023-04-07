import { isEscKeyPress } from './util.js';

const body = document.body;


/**
 * Шаблон сообщения об успешной отправке формы
 */
const successMessageTemplate = document.querySelector('#success')
  .content.querySelector('.success');

/**
* Шаблон сообщения об успешной отправке формы
*/
// const errorMessageTemplate = document.querySelector('#error')
//   .content.querySelector('.error');

/**
 * @description Закрытие попапа с помощью Escape
 * @param {KeyboardEvent} evt - нажатие клавишы
 */
const onEscKeyPress = (evt) => {
  const successMessage = document.querySelector('.success');

  if (isEscKeyPress(evt.key)) {
    successMessage.remove();

    body.classList.remove('scroll-lock');

    document.removeEventListener('keydown', onEscKeyPress);
    document.removeEventListener('click', onClickOverlay);
  }
};

/**
 * @description Закрытие попапа с помощью клика вне области попапа
 * @param {MouseEvent} evt - Клик мышью
 */
function onClickOverlay(evt) {
  const successMessage = document.querySelector('.success');
  const successContent = successMessage.querySelector('.success__message');

  const elementsClickArea = evt.composedPath().includes(successContent);

  if (!elementsClickArea) {
    successMessage.remove();

    body.classList.remove('scroll-lock');

    document.removeEventListener('keydown', onEscKeyPress);
    document.removeEventListener('click', onClickOverlay);
  }
}

/**
 * @description Показ попапа
 */
const showSuccessMessage = () => {
  const successMessage = successMessageTemplate.cloneNode(true);

  body.append(successMessage);
  body.classList.add('scroll-lock');

  document.addEventListener('keydown', onEscKeyPress);
  document.addEventListener('click', onClickOverlay);
};

export { showSuccessMessage };

