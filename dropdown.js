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

    // Получаем элемент, который был активирован
    var dropdown = document.getElementById(dropdownId);
    
    // Получаем ID иконки на основе ID выпадающего списка
    var iconId = dropdownId + 'Icon'; // Например: saladDropdown -> saladDropdownIcon
    var icon = document.getElementById(iconId);

    // Переключаем видимость выбранного дропдауна и анимацию иконки
    if (dropdown.style.display === 'block') {
        dropdown.style.display = 'none';
        icon.classList.remove('rotate-icon'); // Убираем анимацию при закрытии
    } else {
        dropdown.style.display = 'block';
        icon.classList.add('rotate-icon'); // Добавляем анимацию при открытии
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
    countElement.textContent = currentCount + 1;

    // Получаем название и цену блюда
    var itemElement = countElement.closest('.item');
    var itemName = itemElement.textContent.split('/')[0].trim(); // Название блюда
    var itemPrice = parseFloat(itemElement.textContent.split('/')[1].split('-')[0].trim()); // Цена блюда

    // Добавляем или обновляем элемент в заказе
    var orderList = document.getElementById('orderList');
    var listItem = document.getElementById(itemId + '_order');

    if (listItem) {
        listItem.textContent = itemName + ' x ' + (currentCount + 1) + ' = ' + ((currentCount + 1) * itemPrice).toFixed(2) + ' руб.';
    } else {
        listItem = document.createElement('li');
        listItem.id = itemId + '_order';
        listItem.textContent = itemName + ' x 1 = ' + itemPrice.toFixed(2) + ' руб.';
        orderList.appendChild(listItem);
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

let tg = window.Telegram.WebApp;
