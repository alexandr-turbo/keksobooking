'use strict'
var b, c;
function randomizer(arr) {

  if (arr == avatarContainer) {
    b = Math.floor(Math.random() * arr.length);
    return arr[b];
  } else if (arr == titleContainer) {
    c = Math.floor(Math.random() * arr.length);
    return arr[c];
  } else {
    return arr[Math.floor(Math.random() * arr.length)]
  }

}

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

var author = [];
var offer = [];
var address = [];
var price = [];
var type = [];
var rooms = [];
var guests = [];
var checkin = [];
var checkout = [];
var features = [];
var description = [];
var photos = [];

var avatarContainer = ['img/avatars/user01.png', 'img/avatars/user02.png', 'img/avatars/user03.png', 'img/avatars/user04.png', 'img/avatars/user05.png', 'img/avatars/user06.png', 'img/avatars/user07.png', 'img/avatars/user08.png'];
var titleContainer = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
// var addressContainer = [];
// var priceContainer = [];
var typeContainer = ['palace', 'flat', 'house', 'bungalo'];
// var roomsContainer = [];
// var guestsContainer = [];
var checkinContainer = ['12:00', '13:00', '14:00'];
var checkoutContainer = ['12:00', '13:00', '14:00'];
var featuresContainer = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var featuresContainerRandomizer = randomInteger(1, 6);
var descriptionContainer = ['\n'];
var photosContainer = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
for (var j = 0; j < 8; j++) {
  author[j] =
  {
    avatar: randomizer(avatarContainer)
  };
  location[j] =
  {
    x: randomInteger(300, 900),
    y: randomInteger(150, 500)
  };
  offer[j] =
  {
    title: randomizer(titleContainer),
    address: location[j],
    price: randomInteger(1000, 1000000),
    type: randomizer(typeContainer),
    rooms: randomInteger(1, 5),
    guests: randomInteger(1, 10),
    checkin: randomizer(checkinContainer),
    checkout: randomizer(checkoutContainer),
    features: randomFeatures(shuffle(featuresContainer)),
    // description:
    photos: shuffle(photosContainer)
  };
  avatarContainer.splice(b,1);
  titleContainer.splice(c,1);
  //console.log(offer[j].features);
  console.log(author[j].avatar, offer[j].title, offer[j].address, offer[j].price, offer[j].type, offer[j].rooms, offer[j].guests, offer[j].checkin, offer[j].checkout, offer[j].features, offer[j].photos);
}
