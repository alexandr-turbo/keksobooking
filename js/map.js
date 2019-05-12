'use strict'

var HOUSE_COUNT = 8;
var author = [];
var offer = [];
var objectsArray = [];
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

function shuffle(arr){
	var k, temp;
	for(var l = arr.length - 1; l > 0; l--){
		k = Math.floor(Math.random()*(l + 1));
		temp = arr[k];
		arr[k] = arr[l];
		arr[l] = temp;
	}
	return arr;
}

function randomFeatures(arr){
  var arr2 = [];
  for (var m = 0; m < arr.length; m++){
    if (Math.random() >= 0.5){
      arr2.push(arr[m]);
    }
  }
  return arr2;
}

function randomValue(arr) {
  var a;
    a = Math.floor(Math.random() * arr.length);
    return arr[a];
}

function randomIndex(arr, a) {
  return arr.indexOf(a);
}

function createHouses() {
  for (var j = 0; j < HOUSE_COUNT; j++) {
    var avatarRandomValue = randomValue(avatars);
    var avatarRandomValueIndex = avatars.indexOf(avatarRandomValue);
    var titleRandomValue = randomValue(titles);
    var titleRandomValueIndex = titles.indexOf(titleRandomValue);
    var randomX = randomInteger(300, 900);
    var randomY = randomInteger(150, 500);

    objectsArray[j] = {
      author:
      {
        avatar: avatarRandomValue
      },
      offer:
      {
        title: titleRandomValue,
        address: randomX + ', ' + randomY,
        price: randomInteger(1000, 1000000),
        type: randomValue(types),
        rooms: randomInteger(1, 5),
        guests: randomInteger(1, 10),
        checkin: randomValue(checkins),
        checkout: randomValue(checkouts),
        features: randomFeatures(shuffle(features)),
        description: descriptions,
        photos: shuffle(photosContainer)
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
return objectsArray;
}

function makeElementVisible(cssClass) {
  document.querySelector(cssClass).classList.remove('map--faded');
}

createHouses();
makeElementVisible('.map');

function createButtons() {
  for (var n=0; n<HOUSE_COUNT; n++){
    buttons[n] = document.querySelector('button.map__pin--main').cloneNode(true);
    var width = buttons[n].querySelector('img').getAttribute('width');
    var height = buttons[n].querySelector('img').getAttribute('height');
    buttons[n].setAttribute('style', 'left: ' + (objectsArray[n].location.x - width/2) + 'px; top:' + (objectsArray[n].location.y - height) + 'px;');
    buttons[n].querySelector('img').setAttribute('src', objectsArray[n].author.avatar);
 }
}
createButtons();

var fragment = document.createDocumentFragment();
function buttonInsert(arr) {
  for (var i = 0; i < HOUSE_COUNT; i++) {
    fragment.appendChild(arr[i]);
  }
}
buttonInsert(buttons);
var similarButton = document.querySelector('.map__pins');
similarButton.appendChild(fragment);

for (var a = 0; a < objectsArray.length; a++) {
  var similarHouseTemplate = document.querySelector('template').content.querySelector('article.map__card').cloneNode(true);

similarHouseTemplate.querySelector('h3').textContent = objectsArray[a].offer.title;

similarHouseTemplate.querySelector('p.popup__price').textContent = objectsArray[a].offer.price + '$' + '/ночь.';

similarHouseTemplate.querySelector('p').querySelector('small').textContent = objectsArray[a].offer.address;

if (objectsArray[a].offer.type == 'flat') {
  similarHouseTemplate.querySelector('h4').textContent = 'Квартира';
} else if (objectsArray[a].offer.type == 'bungalo') {
  similarHouseTemplate.querySelector('h4').textContent = 'Бунгало';
} else if (objectsArray[a].offer.type == 'house') {
  similarHouseTemplate.querySelector('h4').textContent = 'Дом';
} else if (objectsArray[a].offer.type == 'palace') {
  similarHouseTemplate.querySelector('h4').textContent = 'Дворец';
}

similarHouseTemplate.querySelectorAll('p')[2].textContent = objectsArray[a].offer.rooms + ' комнаты для ' + objectsArray[0].offer.guests + ' гостей';

similarHouseTemplate.querySelectorAll('p')[3].textContent = 'Заезд после ' + objectsArray[a].offer.checkin + ', выезд до ' + objectsArray[0].offer.checkout;

for (var i = 0; i<objectsArray[a].offer.features.length; i++) {
  similarHouseTemplate.querySelector('ul.popup__features').querySelector('li.feature').parentNode.removeChild(similarHouseTemplate.querySelector('li.feature'));
}

  similarHouseTemplate.querySelector('ul.popup__pictures').querySelector('img').setAttribute('src', objectsArray[a].offer.photos[0]);
  similarHouseTemplate.querySelector('ul.popup__pictures').querySelector('img').setAttribute('width', '70');
for (var i = 1; i<objectsArray[a].offer.photos.length; i++) {
  var newImage = similarHouseTemplate.querySelector('ul.popup__pictures').querySelector('img').cloneNode(true);
  newImage.setAttribute('src', objectsArray[a].offer.photos[i]);
  similarHouseTemplate.querySelector('ul.popup__pictures').querySelector('li').appendChild(newImage);
}

similarHouseTemplate.querySelector('img.popup__avatar').setAttribute('src', objectsArray[a].author.avatar);
}
var insertMarker = document.querySelector('.map__filters-container');
document.querySelector('.map').insertBefore(similarHouseTemplate, insertMarker);
