'use strict';
// function postResult() {
// var xhr = new XMLHttpRequest();
// var URL = 'https://reqres.in/api/users';
// xhr.open('POST', URL);
// xhr.send(data);
// }
// postResult();
// console.log(xhr.status);

// (function () {
//     var URL = 'https://js.dump.academy/keksobooking';
//     window.upload = function (data, onLoad, onError) {
//         var xhr = new XMLHttpRequest();
//         xhr.responseType = 'json';
//         xhr.addEventListener('load', function () {
//             onLoad(xhr.response);
//         });
//         xhr.open('POST', URL);
//         xhr.send(data);
//     };
// })();
var downloadedAdverts;
(function (onLoad, onError) {
var URL = 'https://js.dump.academy/keksobooking/data';
var xhr = new XMLHttpRequest();
xhr.addEventListener('load', function () {
  downloadedAdverts = JSON.parse(xhr.responseText);
  console.log(downloadedAdverts);

  var typeOfHouse = document.getElementById('housing-type');
  
    var houses = []; 
    for (var y=0; y<downloadedAdverts.length; y++) {
      houses.push(downloadedAdverts[y].offer.type);
    }
    console.log(houses);
    typeOfHouse.onchange = function() {
    for (var x = 0; x<downloadedAdverts.length; x++) {
        buttons[x].className = 'map__pin';
    }
    console.log(typeOfHouse.value);
    
    var filteredHouses = houses.filter(function(num) {
      return num === typeOfHouse.value;
    });
    for (var z = 0; z<downloadedAdverts.length; z++) {
      if (houses[z] != typeOfHouse.value) {
        buttons[z].className = 'map__pin--disabled';
      } 
      if (typeOfHouse.value == 'any') {
        buttons[z].className = 'map__pin';
      }
    }
    console.log(filteredHouses);
  }


/**
 * Функция открытия карточки объявления
 */
function openCard(n){
  return function (e) {
    var filledAdvertCard = fillAdvert(downloadedAdverts[n]);
    var mapFiltersContainer = document.querySelector('.map__filters-container');
    if (!document.querySelector('.map__card')) {
    document.querySelector('.map').insertBefore(filledAdvertCard, mapFiltersContainer);
    }
  };
}

/**
 * Функция закрытия карточки объявления
 */
function closeCard(n){
return function (e) {
  var setupClose = document.querySelector('.popup__close');
  setupClose.onclick = function() {
    var xz = document.querySelector('.map__card');
    xz.parentNode.removeChild(xz);
    };
  };
}

for (var n=0; n<Object.keys(downloadedAdverts).length; n++){
  buttons[n] = document.querySelector('template').content.querySelector('button.map__pin').cloneNode(true);
  buttons[n].setAttribute('style', 'left: ' + (downloadedAdverts[n].location.x ) + 'px; top:' + (downloadedAdverts[n].location.y) + 'px;');
  buttons[n].querySelector('img').setAttribute('src', downloadedAdverts[n].author.avatar);
}

window.backend = {
  openCard: openCard,
  closeCard: closeCard
};

});

xhr.open('GET', URL);
xhr.send();

})();

// (function () {
//   var onLoad = function (data) {
//     console.log(data);
//   };
//   var onError = function (message) {
//     console.log(message);
//   }
// })();