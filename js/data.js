'use strict'

var HOUSE_COUNT = 8;
// var advertsArray = [];
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
var activeZoneMinX = 300;
var activeZoneMaxX = 900;
var activeZoneMinY = 150;
var activeZoneMaxY = 500;
var topBorder = 0;
var rightBorder = 1560;
var bottomBorder = 750;
var leftBorder = 360;

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
 * Функция генерации случайного контента для массива объявлений
 */
// function createHouses() {
//   var generetedAdvertsArray = [];
//   for (var j = 0; j < HOUSE_COUNT; j++) {
//     var avatarRandomValue = getRandomArrayValue(avatars);
//     var avatarRandomValueIndex = getIndex(avatars, avatarRandomValue);
//     var titleRandomValue = getRandomArrayValue(titles);
//     var titleRandomValueIndex = getIndex(titles, titleRandomValue);
//     var randomX = getRandomInteger(300, 900);
//     var randomY = getRandomInteger(150, 500);

//     generetedAdvertsArray[j] = {
//       author:
//       {
//         avatar: avatarRandomValue
//       },
//       offer:
//       {
//         title: titleRandomValue,
//         address: (randomX) + ', ' + (randomY),
//         price: getRandomInteger(1000, 1000000),
//         type: getRandomArrayValue(types),
//         rooms: getRandomInteger(1, 5),
//         guests: getRandomInteger(1, 10),
//         checkin: getRandomArrayValue(checkins),
//         checkout: getRandomArrayValue(checkouts),
//         features: getRandomArray(shuffleArray(features)),
//         description: descriptions,
//         photos: shuffleArray(photosContainer)
//       },
//       location:
//       {
//         x: randomX,
//         y: randomY
//       }
//     }
//     avatars.splice(avatarRandomValueIndex, 1);
//     titles.splice(titleRandomValueIndex, 1);
//   }
//   return generetedAdvertsArray;
// }
// var advertsArray = createHouses();

/**
 * Функция, удаляющая класс у блока
 * @param {class} selectorClass Блок
 * @param {class} removeClass Удаляемый класс
 */
function makeElementVisible(selectorClass, removeClass) {
  document.querySelector(selectorClass).classList.remove(removeClass);
}


var mainPin = document.querySelector('.map__pin--main');
mainPin.addEventListener('mousedown', function(evt) {
  var limits = {
    top: topBorder + activeZoneMinY,
    right: rightBorder,
    bottom: topBorder + activeZoneMaxY,
    left: leftBorder
  };
  makeElementVisible('.map', 'map--faded');
  makeElementVisible('.notice__form', 'notice__form--disabled');
  for (var i = 0; i<inputFieldsArray.length; i++) {
    inputFieldsArray[i].removeAttribute('disabled');
  }
  window.map.buttonsInsert(buttons);
  mapPins.appendChild(fragment);
  var advertPin = document.querySelectorAll('.map__pin:not(.map__pin--main)');
  for (var n = 0; n < Object.keys(downloadedAdverts).length; n++) {
    advertPin[n].addEventListener('click', window.backend.openCard(n), false);
    advertPin[n].addEventListener('click', window.backend.closeCard(n), false); 
  }
  var startCoords = {
    x: evt.clientX,
    y: evt.clientY
  };
  var onMouseMove = function(moveEvt) {
    moveEvt.preventDefault();
  var shift = {
    x: startCoords.x - moveEvt.clientX,
    y: startCoords.y - moveEvt.clientY
  };
  if (mainPin.offsetLeft > 0 && mainPin.offsetLeft < 1200 && mainPin.offsetTop > 150 && mainPin.offsetTop < 500) {
    mainPin.style.left = (mainPin.offsetLeft - shift.x) + 'px';
    mainPin.style.top = (mainPin.offsetTop - shift.y) + 'px';
  } 
  else if (mainPin.offsetLeft <= 0) {
    mainPin.style.left = (0 - shift.x) + 'px';
    mainPin.style.top = (mainPin.offsetTop - shift.y) + 'px';
  } 
  else if (mainPin.offsetLeft >= 1200) {
    mainPin.style.left = (1200 - shift.x) + 'px';
    mainPin.style.top = (mainPin.offsetTop - shift.y) + 'px';
  }
  else if (mainPin.offsetTop <= 150) {
    mainPin.style.left = (mainPin.offsetLeft - shift.x) + 'px';
    mainPin.style.top = (150 - shift.y) + 'px';
  }
  else if (mainPin.offsetTop >= 500) {
    mainPin.style.left = (mainPin.offsetLeft - shift.x) + 'px';
    mainPin.style.top = (500 - shift.y) + 'px';
  };
    startCoords = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    }
      //console.log(mainPin.offsetLeft + '   ' + mainPin.offsetTop);
  };
  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
    document.removeEventListener('mousemove', changeCoordinatesInInput);
  }
  var changeCoordinatesInInput = function() {
    var activePinPosition = (mainPin.style.left) + ', ' + (mainPin.style.top);
    document.getElementById('address').setAttribute('placeholder', activePinPosition);
};
  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
  document.addEventListener('mousemove', changeCoordinatesInInput);
});

// createHouses();

var inputFieldsArray = document.querySelector('.notice__form').querySelectorAll('fieldset');

var form = document.querySelector('.notice__form');
  form.addEventListener('submit', function (evt) {
    window.upload(new FormData(form), function (response) {
    });
    evt.preventDefault();
  });
// console.log(Object.keys(downloadedAdverts).length);