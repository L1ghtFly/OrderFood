function toggleDropdown(id, event) {
    event.stopPropagation(); // Предотвратить всплытие события к родительским элементам

    // Получаем элемент, который был активирован
    var targetDropdown = document.getElementById(id);
    
    // Если активированный элемент - основное меню
    if (targetDropdown.classList.contains('main-dropdown-content')) {
        var mainDropdowns = document.querySelectorAll('.main-dropdown-content');
        
        // Закрываем все основные дропдауны, кроме активированного
        for (var i = 0; i < mainDropdowns.length; i++) {
            if (mainDropdowns[i] !== targetDropdown) {
                mainDropdowns[i].style.display = 'none';
            }
        }
    }

    // Переключаем видимость выбранного дропдауна
    targetDropdown.style.display = targetDropdown.style.display === 'block' ? 'none' : 'block';
}


function increaseCount(id) {
    let countElement = document.getElementById(id);
    let count = parseInt(countElement.textContent);
    if (count < 10) { // Увеличиваем значение только если оно меньше 10
        countElement.textContent = count + 1;
    }
}

function decreaseCount(id) {
    let countElement = document.getElementById(id);
    let count = parseInt(countElement.textContent);
    if (count > 0) {
        countElement.textContent = count - 1;
    }
}



function toggleDropdown(dropdownId, event) {
    event.stopPropagation(); // Предотвратить всплытие события к родительским элементам

    // Получаем активированный дропдаун и его иконку
    var dropdown = document.getElementById(dropdownId);
    var iconId = dropdownId + 'Icon';
    var icon = document.getElementById(iconId);

    var isNestedDropdown = dropdown.closest('.main-dropdown-content') !== null;
    var isActive = dropdown.style.display === 'block';

    // Закрытие всех невложенных дропдаунов, кроме текущего активного или его родителя
    document.querySelectorAll('.dropdown-content').forEach(function(otherDropdown) {
        let otherIconId = otherDropdown.id + 'Icon';
        let otherIcon = document.getElementById(otherIconId);
        if (!otherDropdown.contains(dropdown) && otherDropdown !== dropdown) {
            otherDropdown.style.display = 'none';
            if (otherIcon) {
                otherIcon.classList.remove('rotate-icon');
            }
        }
    });

    // Переключаем видимость выбранного дропдауна
    if (!isActive) {
        dropdown.style.display = 'block';
        icon.classList.add('rotate-icon'); // Добавляем анимацию при открытии
    } else if (!isNestedDropdown) {
        dropdown.style.display = 'none';
        icon.classList.remove('rotate-icon');
    }
}

// Добавляем обработчик клика вне выпадающего меню для его закрытия
document.addEventListener('click', function(event) {
    // Находим все выпадающие списки
    var dropdowns = document.querySelectorAll('.dropdown-content');
    dropdowns.forEach(function(dropdown) {
        var iconId = dropdown.id + 'Icon'; // Получаем ID иконки на основе ID выпадающего списка
        var icon = document.getElementById(iconId);

        if (dropdown.style.display === 'block' && !dropdown.contains(event.target) && !dropdown.previousElementSibling.contains(event.target)) {
            dropdown.style.display = 'none';
            if (icon) {
                icon.classList.remove('rotate-icon'); // Убираем класс, отвечающий за анимацию
            }
        }
    });
});


function increaseCount(itemId) {
    var countElement = document.getElementById(itemId);
    var currentCount = parseInt(countElement.textContent);

    if (currentCount >= 10) {
        return;
    }

    currentCount += 1;
    countElement.textContent = currentCount;

    var itemElement = countElement.closest('.item');
    var itemName = itemElement.textContent.split('/')[0].trim();
    var itemPrice = parseFloat(itemElement.textContent.split('/')[1].split('-')[0].trim());

    var orderList = document.getElementById('orderList');
    var listItem = document.getElementById(itemId + '_order');

    if (listItem) {
        listItem.textContent = itemName + ' x ' + currentCount + ' = ' + (currentCount * itemPrice).toFixed(2) + ' руб.';
    } else {
        listItem = document.createElement('li');
        listItem.id = itemId + '_order';
        listItem.textContent = itemName + ' x 1 = ' + itemPrice.toFixed(2) + ' руб.';
        orderList.appendChild(listItem);
    }

    // Обновляем количество контейнеров для салатов, если это салат
    if (itemElement.dataset.category === 'salad') {
        updateSaladContainers();
    }

    updateTotalPrice();
}

function updateSaladContainers() {
    var saladElements = document.querySelectorAll('.item[data-category="salad"]');
    var totalSalads = 0;
    saladElements.forEach(function(element) {
        var count = parseInt(element.querySelector('span').textContent);
        totalSalads += count;
    });

    var containerElement = document.getElementById('contCount1');
    containerElement.textContent = totalSalads; // Обновляем количество контейнеров

    // Добавляем или обновляем контейнер в заказ
    var orderList = document.getElementById('orderList');
    var containerListItem = document.getElementById('contCount1_order');
    var containerPrice = 0.40; // Цена за один контейнер

    if (containerListItem) {
        containerListItem.textContent = 'Контейнер для салата x ' + totalSalads + ' = ' + (totalSalads * containerPrice).toFixed(2) + ' руб.';
    } else {
        containerListItem = document.createElement('li');
        containerListItem.id = 'contCount1_order';
        containerListItem.textContent = 'Контейнер для салата x ' + totalSalads + ' = ' + (totalSalads * containerPrice).toFixed(2) + ' руб.';
        orderList.appendChild(containerListItem);
    }
    // Обновляем итоговую сумму
    updateTotalPrice();
}



    



function decreaseCount(itemId) {
    var countElement = document.getElementById(itemId);
    var currentCount = parseInt(countElement.textContent);
    if (currentCount > 0) {
        countElement.textContent = currentCount - 1;
        var itemElement = countElement.closest('.item');
        var itemName = itemElement.textContent.split('/')[0].trim();
        var itemPrice = parseFloat(itemElement.textContent.split('/')[1].split('-')[0].trim());
        var listItem = document.getElementById(itemId + '_order');

        if (currentCount - 1 === 0) {
            listItem.parentNode.removeChild(listItem);
        } else {
            listItem.textContent = itemName + ' x ' + (currentCount - 1) + ' = ' + ((currentCount - 1) * itemPrice).toFixed(2) + ' руб.';
        }

        updateTotalPrice();
    }
}

function updateTotalPrice() {
    var totalPrice = 0;
    var listItems = document.querySelectorAll('#orderList li');
    listItems.forEach(function(item) {
        var price = parseFloat(item.textContent.split('=')[1].split('руб')[0].trim());
        totalPrice += price;
    });
    document.getElementById('totalPrice').textContent = totalPrice.toFixed(2);
}


function submitOrder() {
    var deliveryMethod = document.querySelector('input[name="delivery"]:checked').value;
    var orderItems = [];

    document.querySelectorAll('#orderList li').forEach(function(item) {
        orderItems.push(item.textContent);
    });

    var totalPrice = document.getElementById('totalPrice').textContent;

    // Вывод подтверждения заказа
    alert("Ваш заказ:\n" + orderItems.join('\n') + 
          "\nИтого: " + totalPrice + " руб." +
          "\nСпособ получения: " + (deliveryMethod === "local" ? "На месте" : "Доставка"));

    // Здесь может быть код для отправки данных на сервер или обработка данных заказа
}
document.querySelectorAll('input[name="delivery"]').forEach(input => {
    input.addEventListener('change', function() {
        var additionalInfo = document.getElementById('additionalInfo');
        if (this.value === 'delivery') {
            additionalInfo.style.display = 'block';
        } else {
            additionalInfo.style.display = 'none';
        }
    });
});


ymaps.ready(initMaps);

function initMaps() {
    initMapWithMarker();
    initMapWithCircle();
}

function initMapWithMarker() {
    var myMap = new ymaps.Map("mapWithMarker", {
        center: [53.928842, 27.680948], // Координаты для центра карты
        zoom: 14
    });

    var myPlacemark = new ymaps.Placemark([53.928842, 27.680948], {
        hintContent: 'Парк Высоких Технологий',
        balloonContent: 'улица Академика Купревича, 1к3'
    });

    myMap.geoObjects.add(myPlacemark);
}

function initMapWithCircle() {
    var myMap = new ymaps.Map("mapWithCircle", {
        center: [53.928842, 27.680948], // Координаты для центра карты
        zoom: 14
    });

    var myCircle = new ymaps.Circle([
        [53.928842, 27.680948], // Центр круга
        3000 // Радиус в метрах
    ], {}, {
        fillColor: '#00FF00',   // Цвет заливки круга
        fillOpacity: 0.3,       // Прозрачность заливки
        strokeColor: '#0000FF', // Цвет обводки
        strokeOpacity: 0.8,     // Прозрачность обводки
        strokeWidth: 3          // Толщина обводки
    });

    myMap.geoObjects.add(myCircle);
}


document.addEventListener('DOMContentLoaded', function() {
    var localDelivery = document.getElementById('localDelivery');
    var addressInfo = document.querySelector('.addressInfo');

    document.querySelectorAll('input[name="delivery"]').forEach(function(radio) {
        radio.addEventListener('change', function() {
            if (localDelivery.checked) {
                addressInfo.style.display = 'block';
            } else {
                addressInfo.style.display = 'none';
            }
        });
    });

    // Установить начальное состояние
    addressInfo.style.display = localDelivery.checked ? 'block' : 'none';
});


let tg = window.Telegram.WebApp;