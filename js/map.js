'use strict'

var HOUSE_COUNT = 8;
var author = [];
var offer = [];

var avatars = ['img/avatars/user01.png', 'img/avatars/user02.png', 'img/avatars/user03.png', 'img/avatars/user04.png', 'img/avatars/user05.png', 'img/avatars/user06.png', 'img/avatars/user07.png', 'img/avatars/user08.png'];
var titles = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var types = ['palace', 'flat', 'house', 'bungalo'];
var checkins = ['12:00', '13:00', '14:00'];
var checkouts = ['12:00', '13:00', '14:00'];
var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var descriptions = ['\n'];
var photosContainer = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

var b, c;
function randomValue(arr) {

  if (arr == avatars) {
    b = Math.floor(Math.random() * arr.length);
    return arr[b];
  } else if (arr == titles) {
    c = Math.floor(Math.random() * arr.length);
    return arr[c];
  } else {
    return arr[Math.floor(Math.random() * arr.length)]
  }
}

// var a;
// function randomValue(arr) {
//   a = Math.floor(Math.random() * arr.length);
//   console.log(a);
//   return arr[a];
// }

// function randomIndex(arr, a) {
//   //console.log(arr.indexOf(a));
//   return arr.indexOf(a);
// }

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

var objectsArray = [];

function createHouses() {
  for (var j = 0; j < HOUSE_COUNT; j++) {
    //var avatarRandomValue = randomValue(avatars);
    //var avatarRandomValueIndex = avatars.indexOf(avatarRandomValue);
    //var titleRandomValue = randomValue(titles);
    //var titleRandomValueIndex = titles.indexOf(titleRandomValue);
    var randomX = randomInteger(300, 900);
    var randomY = randomInteger(150, 500);

    objectsArray[j] = {
      author:
      {
        //avatar: avatarRandomValue
        avatar: randomValue(avatars)
      },
      offer:
      {
        //title: titleRandomValue,
        title: randomValue(titles),
        address: randomX + ', ' + randomY,
        price: randomInteger(1000, 1000000),
        type: randomValue(types),
        rooms: randomInteger(1, 5),
        guests: randomInteger(1, 10),
        checkin: randomValue(checkins),
        checkout: randomValue(checkouts),
        features: randomFeatures(shuffle(features)),
        description: '\n',
        photos: shuffle(photosContainer)
      },
      location:
      {
        x: randomX,
        y: randomY
      }
    }
    // avatars.splice(randomIndex(avatars), 1);
    // titles.splice(randomIndex(titles), 1);
    avatars.splice(b, 1);
    titles.splice(c, 1);
    // console.log(objectsArray[j].author.avatar, objectsArray[j].offer.title, objectsArray[j].offer.address, objectsArray[j].offer.price, objectsArray[j].offer.type, objectsArray[j].offer.rooms, objectsArray[j].offer.guests, objectsArray[j].offer.checkin, objectsArray[j].offer.checkout, objectsArray[j].offer.features, objectsArray[j].offer.photos)
  }
return objectsArray;
}

function makeElementVisible(cssClass) {
  document.querySelector(cssClass).classList.remove('map--faded');
}

//createHouses();
console.log(createHouses());
makeElementVisible('.map');
//console.log(objectsArray[0].author.avatar);

// console.log(document.querySelector('button'));

// var div2 = document.querySelector('button').cloneNode(true);
// //div2.cloneNode(true);
// // document.querySelector('img');
// div2.setAttribute('style', 'backgroundColor: brown');
// console.log(div2);

// var div3 = document.querySelector('button').cloneNode(true);
// //div2.cloneNode(true);
// // document.querySelector('img');
// div3.setAttribute('style', 'backgroundColor: orange');
// console.log(div3);
// console.log(objectsArray[0].location.x)






var buttons = [];
function createButtons() {


 for (var n=0; n<HOUSE_COUNT; n++){

  buttons[n] = document.querySelector('button.map__pin--main').cloneNode(true);
  buttons[n].setAttribute('style', 'left: ' + objectsArray[n].location.x + 'px; top:' + objectsArray[n].location.y + 'px;');
  buttons[n].setAttribute('img', 'img/avatars/user01.png');
 }
// for (var m=0; m<HOUSE_COUNT; m++) {
//     //buttons[m] = document.querySelector('img').cloneNode(true);
//     buttons[m].setAttribute('src', objectsArray[m].author.avatar + '');
//     console.log(objectsArray[m].author.avatar);
//   }

  console.log(buttons);

  // }
  //return buttons;
  // buttons[0] = document.querySelector('img').cloneNode(true);
  // buttons[0].setAttribute('src', 'img/avatars/user01.png')
}

  createButtons();

  // var div2 = document.querySelector('buttons[0]').cloneNode(true);
  // buttons[0].setAttribute('style', 'left: ' + objectsArray[0].location.x + ' px; top: ' + objectsArray[0].y + ' px;');
  // buttons[1].setAttribute('style', 'backgroundColor: brown');

  // style="left: {{location.x}}px; top: {{location.y}}px;"
  // <img src="{{author.avatar}}" width="40" height="40" draggable="false">
  // var renderWizard = function (wizard) {
  //   var wizardElement = similarWizardTemplate.cloneNode(true);
  //   wizardElement.querySelector('.setup-similar-label').textContent = wizard.name + ' ' + wizard.surname;
  //   wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  //   wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
  //   return wizardElement;
  // };


  // var fragment = document.createDocumentFragment();
  // function buttonInsert(arr) {
  //   for (var i = 0; i < HOUSE_COUNT; i++) {
  //     fragment.appendChild(arr[i]);
  //   }
  // }
  // buttonInsert(buttons);
  // var similarButton = document.querySelector('.map__pins');
  // similarButton.appendChild(fragment);
