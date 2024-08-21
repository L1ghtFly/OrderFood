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


let tg = window.Telegram.WebApp;
