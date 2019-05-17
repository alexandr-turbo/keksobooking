'use strict'

var HOUSE_COUNT = 8;
var advertsArray = [];
var buttons = [];
var fragment = document.createDocumentFragment();
var mapPins = document.querySelector('.map__pins');
var avatars = ['img/avatars/user01.png', 'img/avatars/user02.png', 'img/avatars/user03.png', 'img/avatars/user04.png', 'img/avatars/user05.png', 'img/avatars/user06.png', 'img/avatars/user07.png', 'img/avatars/user08.png'];
var titles = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var types = ['palace', 'flat', 'house', 'bungalo'];
var checkins = ['12:00', '13:00', '14:00'];
var checkouts = ['12:00', '13:00', '14:00'];
var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var descriptions = [];
var photosContainer = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

/**
 * Функция, генерирующая случайное значение в диапазоне от min до max
 * @param {number} min Минимальное значение
 * @param {number} max Максимальное значение
 * @return {number} Случайное число в диапазоне от min до max
 */
function getRandomInteger(min, max) {
  return Math.floor(min + Math.random() * (max + 1 - min));
}

/**
 * Функция, перемешивающая массив
 * @param {array} arr Массив
 * @return {array} Перемешанный массив
 */
function shuffleArray(arr){
  var randomNumber, shuffledValue;
  var shuffledArr = [];
	for (var i = 0; i < arr.length; i++) {
    shuffledArr.push(arr[i]);
    randomNumber = Math.floor(Math.random()*(i + 1));
		shuffledValue = shuffledArr[randomNumber];
		shuffledArr[randomNumber] = shuffledArr[i];
    shuffledArr[i] = shuffledValue;
  }
  return shuffledArr;
}

/**
 * Функция, создающая массив случайной длины и наполняющая его случайными значениями из другого массива
 * @param {array} arr Массив
 * @return {array} Массив, наполненный случайными значениями из другого массива
 */
function getRandomArray(arr){
  var randomizedArray = [];
  for (var m = 0; m < arr.length; m++){
    if (Math.random() >= 0.5){
      randomizedArray.push(arr[m]);
    }
  }
  return randomizedArray;
}

/**
 * Функция, возвращающая случайное значение из массива
 * @param {array} arr Массив
 * @return {value} Случайное значение
 */
function getRandomArrayValue(arr) {
  var randomizedValue = Math.floor(Math.random() * arr.length);
  return arr[randomizedValue];
}

/**
 * Функция, возвращающая индекс элемента randomizedValue в массиве arr
 * @param {array} arr Массив
 * @param {number} randomizedValue Число
 * @return {number} Индекс числа в массиве arr
 */
function getIndex(arr, randomizedValue) {
  return arr.indexOf(randomizedValue);
}

/**
 * Функция создания домов
 */
function createHouses() {
  for (var j = 0; j < HOUSE_COUNT; j++) {
    var avatarRandomValue = getRandomArrayValue(avatars);
    var avatarRandomValueIndex = getIndex(avatars, avatarRandomValue);
    var titleRandomValue = getRandomArrayValue(titles);
    var titleRandomValueIndex = getIndex(titles, titleRandomValue);
    var randomX = getRandomInteger(300, 900);
    var randomY = getRandomInteger(150, 500);

    advertsArray[j] = {
      author:
      {
        avatar: avatarRandomValue
      },
      offer:
      {
        title: titleRandomValue,
        address: randomX + ', ' + randomY,
        price: getRandomInteger(1000, 1000000),
        type: getRandomArrayValue(types),
        rooms: getRandomInteger(1, 5),
        guests: getRandomInteger(1, 10),
        checkin: getRandomArrayValue(checkins),
        checkout: getRandomArrayValue(checkouts),
        features: getRandomArray(shuffleArray(features)),
        description: descriptions,
        photos: shuffleArray(photosContainer)
      },
      location:
      {
        x: randomX,
        y: randomY
      }
    }
    avatars.splice(avatarRandomValueIndex, 1);
    titles.splice(titleRandomValueIndex, 1);
  }
}

/**
 * Функция, удаляющая класс у блока
 * @param {class} selectorClass Блок
 * @param {class} removeClass Удаляемый класс
 */
function makeElementVisible(selectorClass, removeClass) {
  document.querySelector(selectorClass).classList.remove(removeClass);
}

/**
 * Функция, создающая метки и добавляющая изображение каждой метке
 */
function createButtons() {
  for (var n=0; n<HOUSE_COUNT; n++){
    buttons[n] = document.querySelector('template').content.querySelector('button.map__pin').cloneNode(true);
    var width = buttons[n].querySelector('img').getAttribute('width');
    var height = buttons[n].querySelector('img').getAttribute('height');
    buttons[n].setAttribute('style', 'left: ' + (advertsArray[n].location.x - width/2) + 'px; top:' + (advertsArray[n].location.y - height) + 'px;');
    buttons[n].querySelector('img').setAttribute('src', advertsArray[n].author.avatar);
 }
}

/**
 * Функция вставки меток на карту
 * @param {array} arr Массив
 */
function buttonsInsert(arr) {
  for (var i = 0; i < HOUSE_COUNT; i++) {
    fragment.appendChild(arr[i]);
  }
}

/**
 * Функция наполнения карточки объявления
 * @param {object} advertItem Элемент массива
 * @return {object} Наполненная карточка объявления
 */
function fillAdvert (advertItem) {

  var mapCardTemplate = document.querySelector('template').content.querySelector('article.map__card').cloneNode(true);

  mapCardTemplate.querySelector('h3').textContent = advertItem.offer.title;

  mapCardTemplate.querySelector('p.popup__price').textContent = advertItem.offer.price + '$' + '/ночь.';

  mapCardTemplate.querySelector('p').querySelector('small').textContent = advertItem.offer.address;

  var typeOfHouse = '';
  if (advertItem.offer.type == 'flat') {
    typeOfHouse = 'Квартира';
  } else if (advertItem.offer.type == 'bungalo') {
    typeOfHouse = 'Бунгало';
  } else if (advertItem.offer.type == 'house') {
    typeOfHouse = 'Дом';
  } else if (advertItem.offer.type == 'palace') {
    typeOfHouse = 'Дворец';
  }
  mapCardTemplate.querySelector('h4').textContent = typeOfHouse;

  mapCardTemplate.querySelectorAll('p')[2].textContent = advertItem.offer.rooms + ' комнаты для ' + advertItem.offer.guests + ' гостей';

  mapCardTemplate.querySelectorAll('p')[3].textContent = 'Заезд после ' + advertItem.offer.checkin + ', выезд до ' + advertItem.offer.checkout;

  for (var i = 0; i<advertItem.offer.features.length; i++) {
    mapCardTemplate.querySelector('ul.popup__features').querySelector('li.feature').parentNode.removeChild(mapCardTemplate.querySelector('li.feature'));
  }

  mapCardTemplate.querySelector('ul.popup__pictures').querySelector('img').setAttribute('src', advertItem.offer.photos[0]);
  mapCardTemplate.querySelector('ul.popup__pictures').querySelector('img').setAttribute('width', '70');
  for (var i = 1; i<advertItem.offer.photos.length; i++) {
    var newImage = mapCardTemplate.querySelector('ul.popup__pictures').querySelector('img').cloneNode(true);
    newImage.setAttribute('src', advertItem.offer.photos[i]);
    mapCardTemplate.querySelector('ul.popup__pictures').querySelector('li').appendChild(newImage);
  }

  mapCardTemplate.querySelector('img.popup__avatar').setAttribute('src', advertItem.author.avatar);

  return mapCardTemplate;
}

createHouses();
makeElementVisible('.map', 'map--faded');
createButtons();
buttonsInsert(buttons);

mapPins.appendChild(fragment);

var filledAdvertCard = fillAdvert(advertsArray[0]);

var mapFiltersContainer = document.querySelector('.map__filters-container');
document.querySelector('.map').insertBefore(filledAdvertCards, mapFiltersContainer);
