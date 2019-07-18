

/**
 * Функция валидации заголовка объявления
 */
(function () {
  'use strict';
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
})();

/**
 * Функция валидации соответствия минимальной и
 * максимальной цены за ночь типу жилья
 */
(function () {
  'use strict';
var priceInput = document.getElementById('price');
var typeSelection = document.getElementById('type');
if (typeSelection.value == 'flat') {
  priceInput.setAttribute('min', 1000);
}
typeSelection.onchange = function() {
if (typeSelection.value == 'bungalo') {
  priceInput.setAttribute('min', 0);
} else if (typeSelection.value == 'flat') {
  priceInput.setAttribute('min', 1000);
} else if (typeSelection.value == 'house') {
  priceInput.setAttribute('min', 5000);
} else if (typeSelection.value == 'palace') {
  priceInput.setAttribute('min', 10000);
}
};
priceInput.setAttribute('max', 1000000);
priceInput.setAttribute('required', 'required');
priceInput.setAttribute('type', 'number');
})();

/**
 * Функция валидации соответствия минимальной и
 * максимальной цены за ночь типу жилья
 */
(function () {
  'use strict';
var roomNumber = document.getElementById('room_number');
var capacitySelection = document.getElementById('capacity');
var op = capacitySelection.getElementsByTagName("option");
  var op2 = roomNumber.getElementsByTagName("option");
  
if (roomNumber.value == op[2].value) {
  op[0].disabled = true;
  op[1].disabled = true;
  op[2].disabled = false;
  op[3].disabled = true;
}
roomNumber.onchange = function() {
if (roomNumber.value == op[2].value) {
  op[0].disabled = true;
  op[1].disabled = true;
  op[2].disabled = false;
  op[3].disabled = true;
} else if (roomNumber.value == op[1].value) {
  op[0].disabled = true;
  op[1].disabled = false;
  op[2].disabled = false;
  op[3].disabled = true;
} else if (roomNumber.value == op[0].value) {
  op[0].disabled = false;
  op[1].disabled = false;
  op[2].disabled = false;
  op[3].disabled = true;
} else if (roomNumber.value == 100) {
  op[0].disabled = true;
  op[1].disabled = true;
  op[2].disabled = true;
  op[3].disabled = false;
} 
};
})();

/**
 * Функция, делающая поля неативными
 */
(function () {
  'use strict';
  for (var i = 0; i<array.length; i++) {
    array[i].setAttribute('disabled', 'disabled');
  }
})();

/**
 * Функция, устанавливающая координаты главное метки
 * в поле адреса в неактивном состоянии
 */
(function () {
  'use strict';
var inactivePinPosition =  (activeZoneMaxX + activeZoneMinX)/2 + ', ' + (activeZoneMaxY + activeZoneMinY)/2;
document.getElementById('address').setAttribute('placeholder', inactivePinPosition);
})();
