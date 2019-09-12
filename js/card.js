'use strict'
/**
 * Функция наполнения карточки объявления
 * @param {object} advertItem Пин с контентом
 * @return {object} Наполненная карточка объявления
 */
function fillAdvert (advertItem) {
  var mapCardTemplate = document.querySelector('template').content.querySelector('article.map__card').cloneNode(true);
  mapCardTemplate.querySelector('h3').textContent = advertItem.offer.title;
  mapCardTemplate.querySelector('p').querySelector('small').textContent = advertItem.offer.address;
  mapCardTemplate.querySelector('p.popup__price').textContent = advertItem.offer.price + '$/ночь.';
  mapCardTemplate.querySelectorAll('p')[4].textContent = advertItem.offer.description;
  var typeOfHouse = '';
  switch (advertItem.offer.type) {
    case 'flat':
        typeOfHouse = 'Квартира';
        break;
    case 'bungalo':
        typeOfHouse = 'Бунгало';
        break;
    case 'house':
        typeOfHouse = 'Дом';
        break;
    case 'palace':
        typeOfHouse = 'Дворец';
        break;
  }
  mapCardTemplate.querySelector('h4').textContent = typeOfHouse;
  mapCardTemplate.querySelectorAll('p')[2].textContent = advertItem.offer.rooms + ' комнаты для ' + advertItem.offer.guests + ' гостей';
  mapCardTemplate.querySelectorAll('p')[3].textContent = 'Заезд после ' + advertItem.offer.checkin + ', выезд до ' + advertItem.offer.checkout;
    for (var t = 0; t < 6; t++) {
      mapCardTemplate.querySelector('ul.popup__features').querySelector('li.feature').parentNode.removeChild(mapCardTemplate.querySelector('li.feature'));
    }  
  for (var n = 0; n < advertItem.offer.features.length; n++) {
    var featuresContainer = mapCardTemplate.querySelector('ul.popup__features');
    var li = document.createElement('li');
    li.className = 'feature feature--' + advertItem.offer.features[n];
    featuresContainer.appendChild(li);
  }
  mapCardTemplate.querySelector('ul.popup__pictures').querySelector('img').setAttribute('width', '70');
  for (var i = 0; i<advertItem.offer.photos.length; i++) {
    var newImage = mapCardTemplate.querySelector('ul.popup__pictures').querySelector('img').cloneNode(true);
    newImage.setAttribute('src', advertItem.offer.photos[i]);
    mapCardTemplate.querySelector('ul.popup__pictures').querySelector('li').appendChild(newImage);
  }
  mapCardTemplate.querySelector('img.popup__avatar').setAttribute('src', advertItem.author.avatar);
  return mapCardTemplate;
}
