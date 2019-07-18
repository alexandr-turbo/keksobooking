'use strict'
/**
 * Функция наполнения карточки объявления
 * @param {object} advertItem Элемент массива
 * @return {object} Наполненная карточка объявления
 */
function fillAdvert (advertItem) {
  var mapCardTemplate = document.querySelector('template').content.querySelector('article.map__card').cloneNode(true);
  mapCardTemplate.querySelector('h3').textContent = advertItem.offer.title;
  mapCardTemplate.querySelector('p').querySelector('small').textContent = advertItem.offer.address;
  mapCardTemplate.querySelector('p.popup__price').textContent = advertItem.offer.price + '$' + '/ночь.';
  var typeOfHouse = '';
  if (advertItem.offer.type == 'flat') {
    typeOfHouse = 'Квартира';
  } else if (advertItem.offer.type == 'bungalo') {
    typeOfHouse = 'Бунгало';
  } else if (advertItem.offer.type == 'house') {
    typeOfHouse = 'Дом';
  } else if (advertItem.offer.type == 'palace') {
    typeOfHouse = 'Дворец';
  }
  mapCardTemplate.querySelector('h4').textContent = typeOfHouse;
  mapCardTemplate.querySelectorAll('p')[2].textContent = advertItem.offer.rooms + ' комнаты для ' + advertItem.offer.guests + ' гостей';
  mapCardTemplate.querySelectorAll('p')[3].textContent = 'Заезд после ' + advertItem.offer.checkin + ', выезд до ' + advertItem.offer.checkout;
  for (var i = 0; i<advertItem.offer.features.length; i++) {
    mapCardTemplate.querySelector('ul.popup__features').querySelector('li.feature').parentNode.removeChild(mapCardTemplate.querySelector('li.feature'));
  }
  mapCardTemplate.querySelector('ul.popup__pictures').querySelector('img').setAttribute('src', advertItem.offer.photos[0]);
  mapCardTemplate.querySelector('ul.popup__pictures').querySelector('img').setAttribute('width', '70');
  for (var i = 1; i<advertItem.offer.photos.length; i++) {
    var newImage = mapCardTemplate.querySelector('ul.popup__pictures').querySelector('img').cloneNode(true);
    newImage.setAttribute('src', advertItem.offer.photos[i]);
    mapCardTemplate.querySelector('ul.popup__pictures').querySelector('li').appendChild(newImage);
  }
  mapCardTemplate.querySelector('img.popup__avatar').setAttribute('src', advertItem.author.avatar);
  return mapCardTemplate;
}
