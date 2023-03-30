import { isEscKeyPress } from './util.js';

const body = document.body;


/**
* Шаблон сообщения об успешной отправке формы
*/
const errorMessageTemplate = document.querySelector('#error')
  .content.querySelector('.error');


const onCloseErrorPopup = () => {
  const successMessage = document.querySelector('.error');
  const closeErrorPopupBtn = successMessage.querySelector('.error__button');

  successMessage.remove();
  body.classList.remove('scroll-lock');

  document.removeEventListener('keydown', onEscKeyPress);
  document.removeEventListener('click', onClickOverlay);
  closeErrorPopupBtn.removeEventListener('click', onCloseErrorPopup);
};

/**
 * @description Закрытие попапа с помощью Escape
 * @param {KeyboardEvent} evt - нажатие клавишы
 */
function onEscKeyPress(evt) {
  const successMessage = document.querySelector('.error');
  const closeErrorPopupBtn = successMessage.querySelector('.error__button');

  if (isEscKeyPress(evt.key)) {
    successMessage.remove();
    body.classList.remove('scroll-lock');

    document.removeEventListener('keydown', onEscKeyPress);
    document.removeEventListener('click', onClickOverlay);
    closeErrorPopupBtn.removeEventListener('click', onCloseErrorPopup);
  }
}

/**
 * @description Закрытие попапа с помощью клика вне области попапа
 * @param {MouseEvent} evt - Клик мышью
 */
function onClickOverlay(evt) {
  const successMessage = document.querySelector('.error');
  const successContent = successMessage.querySelector('.error__content');
  const closeErrorPopupBtn = successMessage.querySelector('.error__button');

  const elementsClickArea = evt.composedPath().includes(successContent);

  if (!elementsClickArea) {
    successMessage.remove();
    body.classList.remove('scroll-lock');

    document.removeEventListener('keydown', onEscKeyPress);
    document.removeEventListener('click', onClickOverlay);
    closeErrorPopupBtn.removeEventListener('click', onCloseErrorPopup);
  }
}

/**
 * @description Показ попапа
 */
const showErrorMessage = () => {
  const message = errorMessageTemplate.cloneNode(true);
  const closeErrorPopupBtn = message.querySelector('.error__button');

  body.append(message);
  body.classList.add('scroll-lock');

  document.addEventListener('keydown', onEscKeyPress);
  document.addEventListener('click', onClickOverlay);
  closeErrorPopupBtn.addEventListener('click', onCloseErrorPopup);
};

export { showErrorMessage };

