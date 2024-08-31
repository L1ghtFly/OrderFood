function toggleDropdown(dropdownId, event) {
    event.stopPropagation(); // Предотвратить всплытие события к родительским элементам

    var dropdown = document.getElementById(dropdownId);
    var iconId = dropdownId + 'Icon';
    var icon = document.getElementById(iconId);
    var isActive = dropdown.style.display === 'block';
    var isNestedDropdown = dropdown.closest('.main-dropdown-content') !== null;

    // Закрытие всех других выпадающих меню
    document.querySelectorAll('.dropdown-content').forEach(function(otherDropdown) {
        let otherIconId = otherDropdown.id + 'Icon';
        let otherIcon = document.getElementById(otherIconId);
        if (!otherDropdown.contains(dropdown) && otherDropdown !== dropdown) {
            otherDropdown.style.display = 'none';
            if (otherIcon && otherIconId !== iconId) {
                otherIcon.classList.remove('rotate-icon');
            }
        }
    });

    // Переключаем видимость выбранного дропдауна
    dropdown.style.display = isActive ? 'none' : 'block';
    if (icon) {
        icon.classList.toggle('rotate-icon', !isActive);
    }
}


function addContainerToOrder() {
    var containerItem = "Контейнер для основных (одноразовый) пластиковый";
    var containerPrice = 0.50;
    var orderList = document.getElementById("orderList");
    var existingEntry = document.getElementById("containerOrderEntry");

    if (!existingEntry) {
        existingEntry = document.createElement("li");
        existingEntry.id = "containerOrderEntry";
        existingEntry.textContent = `${containerItem} x 1 = ${containerPrice.toFixed(2)} руб.`;
        orderList.appendChild(existingEntry);
    } else {
        var parts = existingEntry.textContent.split(" x ");
        var count = parseInt(parts[1].split(" = ")[0]);
        if (isNaN(count)) {
            console.error("Некорректное значение количества");
            return;
        }
        count++;
        existingEntry.textContent = `${containerItem} x ${count} = ${(count * containerPrice).toFixed(2)} руб.`;
    }

    updateTotalPrice();
}


var deliveryType = "local";  // Начальное значение, соответствует отмеченной радиокнопке


document.addEventListener('DOMContentLoaded', function() {
    var localDelivery = document.getElementById('localDelivery');
    var addressInfo = document.querySelector('.addressInfo');
    var paymentMethodDisplay = document.getElementById('paymentMethodDisplay');
    var paymentMethod = document.getElementById('paymentMethod');

    document.querySelectorAll('input[name="delivery"]').forEach(function(radio) {
        radio.addEventListener('change', function() {
            if (localDelivery.checked) {
                addressInfo.style.display = 'block';
                paymentMethod.textContent = "Оплата на месте";
                paymentMethodDisplay.style.display = 'block';
            } else {
                addressInfo.style.display = 'none';
                paymentMethod.textContent = "Оплата наличными";
                paymentMethodDisplay.style.display = 'block';
            }
        });
    });

    // Установить начальное состояние в зависимости от текущего выбора доставки
    if (localDelivery.checked) {
        paymentMethod.textContent = "Оплата на месте";
        paymentMethodDisplay.style.display = 'block';
    } else {
        paymentMethod.textContent = "Оплата наличными";
        paymentMethodDisplay.style.display = 'block';
    }
    addressInfo.style.display = localDelivery.checked ? 'block' : 'none';
});


// Обработчик для закрытия всех выпадающих меню, когда клик произошел вне их области
document.addEventListener('click', function(event) {
    var dropdowns = document.querySelectorAll('.dropdown-content');
    dropdowns.forEach(function(dropdown) {
        var iconId = dropdown.id + 'Icon'; // Получаем ID иконки на основе ID выпадающего списка
        var icon = document.getElementById(iconId);

        // Проверка условий закрытия: выпадающее меню открыто и клик произошел вне его области и вне области кнопки, которая его контролирует
        if (dropdown.style.display === 'block' && !dropdown.contains(event.target) && !dropdown.previousElementSibling.contains(event.target)) {
            dropdown.style.display = 'none';
            if (icon) {
                icon.classList.remove('rotate-icon'); // Убираем класс, отвечающий за анимацию
            }
        }
    });
    
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

    
    // Обработка нажатия на кнопки "Выбрать"
    if (event.target.id === 'selectDeliveryButton') {
        // Считывание и сохранение данных адреса доставки
        var address = document.getElementById('address').value;
        var entry = document.getElementById('entry').value;
        var comments = document.getElementById('comments').value;

        // Сохранение данных в localStorage или подготовка к отправке на сервер
        localStorage.setItem('deliveryAddress', JSON.stringify({ address, entry, comments }));

        // Закрываем форму
        document.getElementById('additionalInfo').style.display = 'none';
        console.log('Данные доставки сохранены:', { address, entry, comments });
    }

    if (event.target.id === 'selectOnSiteButton') {
        // Простое закрытие формы без сохранения данных
        console.log('Выбрано на месте');
        document.querySelector('.addressInfo').style.display = 'none';
    }
});





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
    var containerPrice = 0.50; // Цена за один контейнер

    if (containerListItem) {
        containerListItem.textContent = 'Контейнер для салата x ' + totalSalads + ' = ' + (totalSalads * containerPrice).toFixed(2) + ' руб.';
    } else {
        containerListItem = document.createElement('li');
        containerListItem.id = 'contCount1_order';
        containerListItem.textContent = 'Контейнер для салата x ' + totalSalads + ' = ' + (totalSalads * containerPrice).toFixed(2) + ' руб.';
        orderList.appendChild(containerListItem);
    }
    // Обновляем итоговую сумму
    calculateTotal();
}
function updateSoupContainers() {
    var soupElements = document.querySelectorAll('.item[data-category="soup"]');
    var totalSoups = 0;
    soupElements.forEach(function(element) {
        var count = parseInt(element.querySelector('span').textContent);
        totalSoups += count;
    });

    var containerElement = document.getElementById('contCount2');
    containerElement.textContent = totalSoups; // Обновляем количество контейнеров для супа

    var orderList = document.getElementById('orderList');
    var containerListItem = document.getElementById('contCount2_order');
    var containerPrice = 0.50; // Цена за один контейнер для супа

    if (containerListItem) {
        containerListItem.textContent = 'Контейнер для супа x ' + totalSoups + ' = ' + (totalSoups * containerPrice).toFixed(2) + ' руб.';
    } else {
        containerListItem = document.createElement('li');
        containerListItem.id = 'contCount2_order';
        containerListItem.textContent = 'Контейнер для супа x ' + totalSoups + ' = ' + (totalSoups * containerPrice).toFixed(2) + ' руб.';
        orderList.appendChild(containerListItem);
    }
    calculateTotal();
}


function increaseCount(itemId) {
    var countElement = document.getElementById(itemId);
    var currentCount = parseInt(countElement.textContent);

    if (currentCount >= 10) {
        return;
    }

    currentCount++;
    countElement.textContent = currentCount;

    // Показать дополнительный контейнер, если это первый инкремент
    if (currentCount === 1) {
        var itemElement = countElement.closest('.dropdown');
        var nextDropdown = itemElement.nextElementSibling;
        if (nextDropdown && nextDropdown.classList.contains('dropdown-content')) {
            nextDropdown.style.display = 'block';
        }
    }

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

    if (itemElement.dataset.category === 'salad') {
        updateSaladContainers();
    } else if (itemElement.dataset.category === 'soup') {
        updateSoupContainers();
    }
    calculateTotal();
}

function decreaseCount(itemId) {
    var countElement = document.getElementById(itemId);
    var currentCount = parseInt(countElement.textContent);

    if (currentCount > 0) {
        currentCount--;
        countElement.textContent = currentCount;

        // Скрываем дополнительный контейнер, если количество равно нулю
        if (currentCount === 0) {
            var itemElement = countElement.closest('.dropdown');
            var nextDropdown = itemElement.nextElementSibling;
            if (nextDropdown && nextDropdown.classList.contains('dropdown-content')) {
                nextDropdown.style.display = 'none';
            }
        }

        var itemName = itemElement.textContent.split('/')[0].trim();
        var itemPrice = parseFloat(itemElement.textContent.split('/')[1].split('-')[0].trim());
        var listItem = document.getElementById(itemId + '_order');

        if (currentCount === 0) {
            listItem.parentNode.removeChild(listItem);
        } else {
            listItem.textContent = itemName + ' x ' + currentCount + ' = ' + (currentCount * itemPrice).toFixed(2) + ' руб.';
        }
        if (itemElement.dataset.category === 'salad') {
            updateSaladContainers();
        } else if (itemElement.dataset.category === 'soup') {
            updateSoupContainers();
        }
        calculateTotal();
    }
}



function updateOrderList(countElement, currentCount) {
    var itemElement = countElement.closest('.item');
    var itemName = itemElement.textContent.split('/')[0].trim();
    var itemPrice = parseFloat(itemElement.textContent.split('/')[1].split('-')[0].trim());
    var orderList = document.getElementById('orderList');
    var listItem = document.getElementById(countElement.id + '_order');

    if (listItem) {
        listItem.textContent = itemName + ' x ' + currentCount + ' = ' + (currentCount * itemPrice).toFixed(2) + ' руб.';
    } else {
        listItem = document.createElement('li');
        listItem.id = countElement.id + '_order';
        listItem.textContent = itemName + ' x 1 = ' + itemPrice.toFixed(2) + ' руб.';
        orderList.appendChild(listItem);
    }
    updateTotalPrice(); // Обновляем итоговую сумму заказа
}




let containers = [];  // Массив для хранения всех контейнеров

function addContainer(type = 'container') {
    let containerPrice = type === 'container' ? 0.50 : 0.00; // Пакет бесплатно, контейнер стоит 0.50 руб.
    let newContainerId = 'cont' + (containers.length + 1);

    if (containers.length > 0 && containers[containers.length - 1].dishes.length === 0 && containers[containers.length - 1].type === type) {
        alert("Завершите заполнение текущего контейнера перед добавлением нового!");
        return;
    }

    containers.push({ id: newContainerId, type: type, dishes: [], price: containerPrice });
    updateOrderSummary();
    alert(`Новый ${type === 'container' ? 'контейнер' : 'пакет'} добавлен!`);
}

function addToContainer(dishId, dishName, price) {
    if (containers.length === 0) {
        alert("Сначала создайте контейнер!");
        return;
    }
    
    let currentContainer = containers[containers.length - 1];
    let dish = currentContainer.dishes.find(d => d.id === dishId);
    
    // Подсчитываем общее количество блюд в контейнере
    let totalDishes = currentContainer.dishes.reduce((acc, curr) => acc + curr.count, 0);

    if (dish) {
        if (totalDishes >= 3) {
            alert("В одном контейнере может быть не более трех блюд!");
            return;
        }
        dish.count++;
    } else {
        if (totalDishes >= 3) {
            alert("В одном контейнере может быть не более трех блюд!");
            return;
        }
        currentContainer.dishes.push({ id: dishId, name: dishName, price, count: 1 });
    }

    updateOrderSummary();
}


// Функция для удаления контейнера по ID
function removeContainer(containerId) {
    containers = containers.filter(c => c.id !== containerId);
    updateOrderSummary();
    calculateTotal();
}

function updateOrderSummary() {
    const summary = document.getElementById("orderSummary");
    let ul = document.getElementById("orderList");

    if (!ul) {
        ul = document.createElement("ul");
        ul.id = "orderList";
        summary.appendChild(ul);
    }

    const containerItems = ul.querySelectorAll('.container-item');
    containerItems.forEach(item => item.remove());

    containers.forEach((container, index) => {
        const li = document.createElement("li");
        li.id = `container-${container.id}`;
        li.className = 'container-item';
        li.textContent = `${container.type === 'container' ? 'Контейнер' : 'Пакет'} ${index + 1} (${container.price.toFixed(2)}): `;

        container.dishes.forEach(dish => {
            li.textContent += `${dish.name} (${dish.count}x), `;
        });

        const removeButton = document.createElement("button");
        // Установка текста и класса для кнопки, включая иконку
        removeButton.innerHTML = '<i class="fas fa-trash-alt"></i>';
        removeButton.className = 'remove-button';
        removeButton.onclick = function() { removeContainer(container.id); };
        
        li.appendChild(removeButton);
        ul.appendChild(li);
    });

    calculateTotal();
}



function calculateTotal() {
    let total = 0;

    // Пересчет стоимости блюд в контейнерах
    containers.forEach(container => {
        // Добавляем стоимость самого контейнера к общей сумме
        total += container.price;
        
        container.dishes.forEach(dish => {
            total += dish.price * dish.count;
        });
    });

    // Пересчет стоимости блюд, добавленных отдельно в список заказов
    document.querySelectorAll("#orderList li").forEach(item => {
        // Игнорировать элементы списка, связанные с контейнерами
        if (!item.classList.contains('container-item')) {
            let pricePart = item.textContent.split(' = ')[1];
            if (pricePart) {
                total += parseFloat(pricePart.replace(' руб.', ''));
            }
        }
    });

    // Обновление итоговой стоимости в DOM
    document.getElementById("totalPrice").textContent = total.toFixed(2);
}

document.addEventListener('DOMContentLoaded', function() {
    populateTimeOptions();
});

function populateTimeOptions() {
    const startTime = "09:00";
    const endTime = "13:00";
    const interval = 30; // minutes

    const timeSelect = document.getElementById('timeRange');
    let currentTime = moment(startTime, 'HH:mm');
    let endTimeMoment = moment(endTime, 'HH:mm');

    while (currentTime <= endTimeMoment) {
        let timeOption = document.createElement('option');
        let nextTime = moment(currentTime).add(interval, 'minutes');
        
        timeOption.value = currentTime.format('HH:mm') + ' - ' + nextTime.format('HH:mm');
        timeOption.text = currentTime.format('HH:mm') + ' - ' + nextTime.format('HH:mm');

        timeSelect.appendChild(timeOption);
        currentTime.add(interval, 'minutes');
    }
}
function submitOrder() {
    // Получаем выбранные значения для времени и способа оплаты
    let selectedTime = document.getElementById('timeRange').value;
    let paymentType = document.getElementById('paymentMethod').textContent;

    // Определяем тип доставки на основе способа оплаты
    let deliveryType = paymentType === "Оплата на месте" ? "На месте" : "Доставка";

    // Собираем информацию по контейнерам
    let containerDetails = containers.map(container => {
        return `Контейнер ${container.id}: ` + container.dishes.map(d => `${d.name} (${d.count}x)`).join(", ");
    }).join("\n");

    // Собираем информацию по отдельным блюдам вне контейнеров
    let otherDishesDetails = [];
    document.querySelectorAll("#orderList li:not(.container-item)").forEach(item => {
        otherDishesDetails.push(item.textContent);
    });

    // Объединяем всю информацию о заказе
    let orderDetails = [
        `Тип заказа: ${deliveryType}`,
        `Способ оплаты: ${paymentType}`,
        `Выбранное время: ${selectedTime}`,
        containerDetails,
        ...otherDishesDetails
    ].filter(detail => detail).join("\n"); // Фильтруем для удаления пустых строк и объединяем все детали в одну строку.
    
    // Показываем полную информацию заказа
    alert(`Ваш заказ:\n${orderDetails}\nИтого: ${document.getElementById("totalPrice").textContent}`);

    // Очищаем данные заказа после подтверждения
    containers = [];  // Очищаем массив контейнеров
    document.getElementById("orderList").innerHTML = '';  // Очищаем HTML списка заказов
    document.getElementById("totalPrice").textContent = '0 руб.';  // Сбрасываем итоговую сумму

    // Обновляем отображение списка заказов, если необходимо
    updateOrderSummary();
}




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

    var myPlacemark = new ymaps.Placemark([53.928560, 27.680045], {
        hintContent: 'Парк Высоких Технологий',
        balloonContent: 'улица Академика Купревича, 1к3'
    });

    myMap.geoObjects.add(myPlacemark);
}

function initMapWithCircle() {
    var myMap = new ymaps.Map("mapWithCircle", {
        center: [53.928840, 27.680945], // Координаты для центра карты
        zoom: 14
    });

    var myCircle = new ymaps.Circle([
        [53.928560, 27.680045], // Центр круга
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

