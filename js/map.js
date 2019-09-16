(function () {
'use strict'

/**
 * Функция вставки меток на карту
 * @param {array} arr Массив
 */
function buttonsInsert(arr) {
  for (var i = 0; i < window.backend.downloadedAdverts.length; i++) {
    fragment.appendChild(arr[i]);
  }
}

window.map = {
  buttonsInsert: buttonsInsert
};

})();