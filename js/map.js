(function () {
'use strict'

/**
 * Функция вставки меток на карту
 * @param {array} arr Массив
 */
function buttonsInsert(arr) {
  for (var i = 0; i < 10; i++) {
    fragment.appendChild(arr[i]);
  }
}

// /**
//  * Функция открытия карточки объявления
//  */
// function openCard(n){
//   return function (e) {
//     var filledAdvertCard = fillAdvert(advertsArray[n]);
//     var mapFiltersContainer = document.querySelector('.map__filters-container');
//     if (!document.querySelector('.map__card')) {
//     document.querySelector('.map').insertBefore(filledAdvertCard, mapFiltersContainer);
//     }
//   };
// }

// /**
//  * Функция закрытия карточки объявления
//  */
// function closeCard(n){
// return function (e) {
//   var setupClose = document.querySelector('.popup__close');
//   setupClose.onclick = function() {
//     var xz = document.querySelector('.map__card');
//     xz.parentNode.removeChild(xz);
//     };
//   };
// }

window.map = {
  buttonsInsert: buttonsInsert,
  // openCard: openCard,
  // closeCard: closeCard
};

})();