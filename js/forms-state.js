// Форма для размещения объявления
const formPlacingAd = document.querySelector('.ad-form');
// Все интерактивные поля формы для размещения объявления
// const formPlacingAdElement = formPlacingAd.querySelectorAll('fieldset');

// Форма c фильтрами
const mapFilterForm = document.querySelector('.map__filters');
// Все интерактивные поля форма c фильтрами
// const mapFilterFormSelect = mapFilterForm.querySelectorAll('select');
// const mapFilterFormFieldset = mapFilterForm.querySelectorAll('fieldset');


//  ======================= Вариант 1

// /**
//  * @description Приведение формы для размещения объявления в неактивное состояние
//  */
// const setInactiveStateForm = () => {
//   formPlacingAd.classList.add('ad-form--disabled');

//   formPlacingAdElement.forEach((fieldset) => {
//     fieldset.setAttribute('disabled', '');
//   });
// };

// /**
//  *@description Приведение формы для размещения объявления в aктивное состояние
//  */
// const setActiveStateForm = () => {
//   formPlacingAd.classList.remove('ad-form--disabled');

//   formPlacingAdElement.forEach((fieldset) => {
//     fieldset.removeAttribute('disabled', '');
//   });
// };

// /**
//  * @description Приведение фильтра объявлений в неактивное состояние
//  */
// const setInactiveStateFilter = () => {
//   mapFilterForm.classList.add('ad-form--disabled');

//   mapFilterFormSelect.forEach((select) => {
//     select.setAttribute('disabled', '');
//   });

//   mapFilterFormFieldset.forEach((fieldset) => {
//     fieldset.setAttribute('disabled', '');
//   });
// };


// /**
//  *@description Приведение фильтра объявлений в aктивное состояние
//  */
// const setActiveStateFilter = () => {
//   mapFilterForm.classList.remove('ad-form--disabled');

//   mapFilterFormFieldset.forEach((select) => {
//     select.removeAttribute('disabled', '');
//   });

//   mapFilterFormFieldset.forEach((fieldset) => {
//     fieldset.removeAttribute('disabled', '');
//   });
// };


//  ======================= Вариант 2 (короче)

/**
 * @description Приведение формы и её дочерних элементов в неактивное состояние
 * @param {HTMLElement} form - Форма
 */
const inactiveState = (form) => {
  form.classList.add('ad-form--disabled');
  form.children.forEach((element) => element.setAttribute('disabled', ''));
};

/**
 * @description Приведение формы и её дочерних элементов в активное состояние
 * @param {HTMLElement} form - Форма
 */
const activeState = (form) => {
  form.classList.remove('ad-form--disabled');
  form.children.forEach((element) => element.removeAttribute('disabled', ''));
};

/**
 * @description Приведение формы для размещения объявления в неактивное состояние
 */
const setInactiveStateForm = () => { inactiveState(formPlacingAd); };

/**
 *@description Приведение формы для размещения объявления в aктивное состояние
 */
const setActiveStateForm = () => { activeState(formPlacingAd); };

/**
 * @description Приведение фильтра объявлений в неактивное состояние
 */
const setInactiveStateFilter = () => { inactiveState(mapFilterForm); };

/**
 *@description Приведение фильтра объявлений в aктивное состояние
 */
const setActiveStateFilter = () => { activeState(mapFilterForm); };

// !Заблокировался ли слайдер?


export { setInactiveStateForm, setActiveStateForm, setInactiveStateFilter, setActiveStateFilter };
