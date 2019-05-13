'use strict'

var HOUSE_COUNT = 8;
var similarHouseTemplate;
var adsArray = [];
var buttons = [];
var avatars = ['img/avatars/user01.png', 'img/avatars/user02.png', 'img/avatars/user03.png', 'img/avatars/user04.png', 'img/avatars/user05.png', 'img/avatars/user06.png', 'img/avatars/user07.png', 'img/avatars/user08.png'];
var titles = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var types = ['palace', 'flat', 'house', 'bungalo'];
var checkins = ['12:00', '13:00', '14:00'];
var checkouts = ['12:00', '13:00', '14:00'];
var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var descriptions = [];
var photosContainer = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

function randomInteger(min, max) {
  var rand = min + Math.random() * (max + 1 - min);
  rand = Math.floor(rand);
  return rand;
}

function shuffleArray(arr){
	var randomNumber, shuffledValue;
	for (var i = arr.length - 1; i > 0; i--) {
		randomNumber = Math.floor(Math.random()*(i + 1));
		shuffledValue = arr[randomNumber];
		arr[randomNumber] = arr[i];
		arr[i] = shuffledValue;
	}
	return arr;
}

function randomArrays(arr){
  var randomizedArray = [];
  for (var m = 0; m < arr.length; m++){
    if (Math.random() >= 0.5){
      randomizedArray.push(arr[m]);
    }
  }
  return randomizedArray;
}

function randomArrayValue(arr) {
  var randomizedValue = Math.floor(Math.random() * arr.length);
  return arr[randomizedValue];
}

function getIndex(arr, randomizedValue) {
  return arr.indexOf(randomizedValue);
}

function createHouses() {
  for (var j = 0; j < HOUSE_COUNT; j++) {
    var avatarRandomValue = randomArrayValue(avatars);
    var avatarRandomValueIndex = getIndex(avatars, avatarRandomValue);
    var titleRandomValue = randomArrayValue(titles);
    var titleRandomValueIndex = getIndex(titles, titleRandomValue);
    var randomX = randomInteger(300, 900);
    var randomY = randomInteger(150, 500);

    adsArray[j] = {
      author:
      {
        avatar: avatarRandomValue
      },
      offer:
      {
        title: titleRandomValue,
        address: randomX + ', ' + randomY,
        price: randomInteger(1000, 1000000),
        type: randomArrayValue(types),
        rooms: randomInteger(1, 5),
        guests: randomInteger(1, 10),
        checkin: randomArrayValue(checkins),
        checkout: randomArrayValue(checkouts),
        features: randomArrays(shuffleArray(features)),
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


function makeElementVisible(selectorClass, removeClass) {
  document.querySelector(selectorClass).classList.remove(removeClass);
}

createHouses();
makeElementVisible('.map', 'map--faded');

function createButtons() {
  for (var n=0; n<HOUSE_COUNT; n++){
    buttons[n] = document.querySelector('button.map__pin--main').cloneNode(true);
    var width = buttons[n].querySelector('img').getAttribute('width');
    var height = buttons[n].querySelector('img').getAttribute('height');
    buttons[n].setAttribute('style', 'left: ' + (adsArray[n].location.x - width/2) + 'px; top:' + (adsArray[n].location.y - height) + 'px;');
    buttons[n].querySelector('img').setAttribute('src', adsArray[n].author.avatar);
 }
}
createButtons();

var fragment = document.createDocumentFragment();
function buttonsInsert(arr) {
  for (var i = 0; i < HOUSE_COUNT; i++) {
    fragment.appendChild(arr[i]);
  }
}
buttonsInsert(buttons);
var similarButton = document.querySelector('.map__pins');
similarButton.appendChild(fragment);

function adsFilling (arr) {
for (var a = 0; a < arr.length; a++) {
  similarHouseTemplate = document.querySelector('template').content.querySelector('article.map__card').cloneNode(true);

similarHouseTemplate.querySelector('h3').textContent = arr[a].offer.title;

similarHouseTemplate.querySelector('p.popup__price').textContent = arr[a].offer.price + '$' + '/ночь.';

similarHouseTemplate.querySelector('p').querySelector('small').textContent = arr[a].offer.address;

var typeOfHouse = '';
if (arr[a].offer.type == 'flat') {
  typeOfHouse = 'Квартира';
} else if (arr[a].offer.type == 'bungalo') {
  typeOfHouse = 'Бунгало';
} else if (arr[a].offer.type == 'house') {
  typeOfHouse = 'Дом';
} else if (arr[a].offer.type == 'palace') {
  typeOfHouse = 'Дворец';
}
similarHouseTemplate.querySelector('h4').textContent = typeOfHouse;

similarHouseTemplate.querySelectorAll('p')[2].textContent = arr[a].offer.rooms + ' комнаты для ' + arr[0].offer.guests + ' гостей';

similarHouseTemplate.querySelectorAll('p')[3].textContent = 'Заезд после ' + arr[a].offer.checkin + ', выезд до ' + arr[0].offer.checkout;


for (var i = 0; i<arr[a].offer.features.length; i++) {
  similarHouseTemplate.querySelector('ul.popup__features').querySelector('li.feature').parentNode.removeChild(similarHouseTemplate.querySelector('li.feature'));
}

  similarHouseTemplate.querySelector('ul.popup__pictures').querySelector('img').setAttribute('src', arr[a].offer.photos[0]);
  similarHouseTemplate.querySelector('ul.popup__pictures').querySelector('img').setAttribute('width', '70');
for (var i = 1; i<arr[a].offer.photos.length; i++) {
  var newImage = similarHouseTemplate.querySelector('ul.popup__pictures').querySelector('img').cloneNode(true);
  newImage.setAttribute('src', arr[a].offer.photos[i]);
  similarHouseTemplate.querySelector('ul.popup__pictures').querySelector('li').appendChild(newImage);
}

similarHouseTemplate.querySelector('img.popup__avatar').setAttribute('src', arr[a].author.avatar);
}
return arr;
}
adsFilling(adsArray);
var insertMarker = document.querySelector('.map__filters-container');
document.querySelector('.map').insertBefore(similarHouseTemplate, insertMarker);
