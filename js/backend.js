'use strict';


(function (onLoad, onError) {
var downloadedAdverts;
var URL = 'https://js.dump.academy/keksobooking/data';
var xhr = new XMLHttpRequest();
xhr.addEventListener('load', function () {
  downloadedAdverts = JSON.parse(xhr.responseText);
  console.log(downloadedAdverts); // не забыть убрать

  var typeOfHouse = document.getElementById('housing-type');
  
    var houses = []; 
    for (var y=0; y<downloadedAdverts.length; y++) {
      houses.push(downloadedAdverts[y].offer.type);
    }
    console.log(houses); // не забыть убрать
    typeOfHouse.onchange = function() {
    for (var x = 0; x<downloadedAdverts.length; x++) {
        buttons[x].className = 'map__pin';
    }
    console.log(typeOfHouse.value); // не забыть убрать
    
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
    console.log(filteredHouses); // не забыть убрать
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
    var mapCard = document.querySelector('.map__card');
    mapCard.parentNode.removeChild(mapCard);
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
  closeCard: closeCard,
  downloadedAdverts: downloadedAdverts
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