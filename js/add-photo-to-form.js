/**
 * Картинка, куда мы будем выставлять превью загруженного изображения (аватар пользователя).
 */
const avatarPreview = document.querySelector('.ad-form-header__preview')
  .querySelector('img');

/**
 * Поле ввода, с помощью которого пользователь выбирает изображение (аватар пользователя)
 */
const avatarChooserField = document.querySelector('#avatar');

/**
 * Картинка, куда мы будем выставлять превью загруженного изображения (Фотография жилья)
 */
const housingImageContainer = document.querySelector('.ad-form__photo-container');

/**
 * Поле ввода, с помощью которого пользователь выбирает изображение (Фотография жилья)
 */
const housingImageChooserField = document.querySelector('#images');

/**
 * Допустимымые расширения изображений
 */
const FILE_TYPES = ['jpg', 'jpeg', 'png'];

/**
 * Заглушка для аватара пользователя
 */
const AVATAR_PLACEHOLDER_IMG = 'img/muffin-grey.svg';

/**
 * @description Создание блока с фотографией жилья
 * @param {object} src - информация об загружаемой фотографии
 * @returns {HTMLElement} - блок с фото
 */
const createHousingImage = (src) => {
  const housingImagephotoTemplate = document.querySelector('.ad-form__photo');
  const housingImagephotoBlock = housingImagephotoTemplate.cloneNode(true);
  // Добавил знак отличия для добавленных фоток
  housingImagephotoBlock.classList.add('housing-image');

  // Создание img
  const housingImageElement = document.createElement('img');
  housingImageElement.width = 70;
  housingImageElement.height = 70;
  housingImageElement.alt = 'Фотография жилья';
  housingImageElement.src = src;

  housingImagephotoBlock.append(housingImageElement);

  return housingImagephotoBlock;
};

/**
 * @description Удаление фотки пользователя и изображений жилья после успешной отправки формы/очистки формы
 */
const cleanImagesAdvertForm = () => {
  avatarPreview.src = AVATAR_PLACEHOLDER_IMG;

  housingImageContainer.querySelectorAll('.housing-image').forEach((image) => {
    image.remove();
  });
};

/**
 * @description Изменение/добавление аватарки
 */
const onChangeAvatarImg = () => {
  const file = avatarChooserField.files[0];
  const fileName = file.name.toLowerCase();

  /* Теперь нам нужно проверить, оканчивается ли имя файла одним из допустимых расширений.
  Для этого мы с помощью метода some пройдём по массиву FILE_TYPES и для каждого элемента — допустимого расширения — проверим, оканчивается ли название файла на него. В этом нам поможет метод строки endsWith. */
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  /* Метод some возвращает булево значение, было ли совпадение, поэтому мы можем результат выполнения этого метода использовать в условии. */
  if (matches) {
    avatarPreview.src = URL.createObjectURL(file);
  }
};

/**
 * @description Изменение/добавление фотографии жилья
 */
const onChangeHousingImg = () => {
  const file = housingImageChooserField.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    housingImageContainer.append(createHousingImage(URL.createObjectURL(file)));
  }
};

// Добавление обработчика на изменение/добавление аватарки
avatarChooserField.addEventListener('change', onChangeAvatarImg);

// Добавление обработчика на изменение/добавление фотографии жилья
housingImageChooserField.addEventListener('change', onChangeHousingImg);

export { cleanImagesAdvertForm };
