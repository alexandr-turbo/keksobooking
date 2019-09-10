(function () {
  'use strict';

/**
 * Функция валидации заголовка объявления
 */
function validateTitle () {
  var titleInput = document.getElementById('title');
  titleInput.setAttribute('maxlength', 100);
  titleInput.setAttribute('minlength', 30);
  titleInput.setAttribute('required', 'required');
  titleInput.setAttribute('type', 'text');
  titleInput.addEventListener('invalid', function (evt) {
    if (titleInput.validity.tooShort) {
      titleInput.setCustomValidity('Имя должно состоять минимум из 30 символов');
    } else if (titleInput.validity.tooLong) {
      titleInput.setCustomValidity('Имя не должно превышать 100 символов');
    } else if (titleInput.validity.valueMissing) {
      titleInput.setCustomValidity('Обязательное поле');
    } else {
      titleInput.setCustomValidity('');
    }
  });
}

/**
 * Функция валидации соответствия минимальной и
 * максимальной цены за ночь типу жилья
 */
function validatePrice () {
var priceInput = document.getElementById('price');
var typeSelection = document.getElementById('type');
if (typeSelection.value == 'flat') {
  priceInput.setAttribute('min', 1000);
}
typeSelection.onchange = function() {
  switch (typeSelection.value) {
    case 'bungalo':
        priceInput.setAttribute('min', 0);
    case 'flat':
        priceInput.setAttribute('min', 1000);
    case 'house':
        priceInput.setAttribute('min', 5000);
    case 'palace':
        priceInput.setAttribute('min', 10000);
  }
};
priceInput.setAttribute('max', 1000000);
priceInput.setAttribute('required', 'required');
priceInput.setAttribute('type', 'number');
}

/**
 * Функция проверки соответствия количества 
 * комнат количеству гостей
 */
function validateRoomsGuests () {
  var roomNumber = document.getElementById('room_number');
  var capacitySelection = document.getElementById('capacity');
  var op = capacitySelection.getElementsByTagName("option");
  var object = {
    ['1']: ['1'],
    ['2']: ['1', '2'],
    ['3']: ['1', '2', '3'],
    ['100']: ['0']
  }
  
  if (roomNumber.value == op[2].value) {
    op[0].disabled = true;
    op[1].disabled = true;
    op[2].disabled = false;
    op[3].disabled = true;
  }
  
  roomNumber.onchange = function() {
    for (var n = 0; n < op.length; n++) {
        op[n].disabled = true;
    }
    for (var item of op) {
      if (object[roomNumber.value].includes(item.value)) {
        item.disabled = false;
      }
    }
    }
  };

/**
* Функция соответствия времени заезда 
* времени выезда и наоборот
*/
function validateTimeInTimeOut () {
  var timeIn = document.getElementById('timein');
  var timeOut = document.getElementById('timeout');

  makeTimeInTimeOutAccordance(timeIn, timeOut);
  makeTimeInTimeOutAccordance(timeOut, timeIn);

  };

function makeTimeInTimeOutAccordance (first, second) {
  first.onchange = function() {
    second.value = first.value;
  }
}

/**
 * Функция, делающая поля неативными
 */
function makeInactiveFields () {
  for (var i = 0; i<inputFieldsArray.length; i++) {
    inputFieldsArray[i].setAttribute('disabled', 'disabled');
  }
}

/**
 * Функция, устанавливающая координаты главной метки
 * в поле адреса в неактивном состоянии
 */
function setMainPinCoordinatesInInactiveState () {
var inactivePinPosition =  (activeZoneMaxX + activeZoneMinX)/2 + ', ' + (activeZoneMaxY + activeZoneMinY)/2;
document.getElementById('address').setAttribute('placeholder', inactivePinPosition);
document.getElementById('address').setAttribute('disabled', 'disabled');
}

validateTitle();
validatePrice();
validateTimeInTimeOut();
validateRoomsGuests();
makeInactiveFields();
setMainPinCoordinatesInInactiveState();
})();