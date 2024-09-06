

document.addEventListener("DOMContentLoaded", function() {
    const registrationForm = document.getElementById('registrationForm');

    registrationForm.addEventListener('submit', async function(event) {
        event.preventDefault();

        const name = document.getElementById('name').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const termsChecked = document.querySelector('.custom-checkbox').checked;

        if (name && phone && termsChecked && phone.startsWith('+375') && email) {
            let data = {
                name: name,
                phone: phone,
            };

            try {
                const response = await fetch('/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });

                const responseData = await response.json();

                if (response.ok) {
                    console.log("Регистрация прошла успешно:", responseData);
                    window.location.href = "menu.html"; // Перенаправление пользователя после успешной регистрации.
                } else {
                    throw new Error(responseData.message || "Ошибка регистрации");
                }
            } catch (error) {
                console.error("Ошибка при отправке данных:", error.message);
                alert("Ошибка при регистрации: " + error.message);
            }
        } else {
            alert("Пожалуйста, заполните все поля и примите условия!");
        }
    });


    document.querySelectorAll(".registration-form .write").forEach(input => {
        input.addEventListener('input', () => manageLabel(input));
        input.addEventListener('focus', () => manageLabel(input));
        input.addEventListener('blur', () => manageLabel(input));
    });

    function manageLabel(input) {
        const label = input.nextElementSibling;
        if (input.value !== '') {
            label.classList.add('label-top');
        } else {
            label.classList.remove('label-top');
        }
    }

       // Phone input formatting for Belarus phone numbers
       const phoneInput = document.getElementById('phone');

       // Инициализируем поле ввода начальным значением +375
   
       phoneInput.addEventListener('input', function() {
           // Удаляем все нецифровые символы и пробелы
           let numbers = this.value.replace(/[^\d]/g, '');
           
           // Начинаем с +375 только если номер ещё не содержит эти цифры
           if (!numbers.startsWith('375')) {
               numbers = '375' + numbers;
           }
           
           // Устанавливаем начальное значение и очищаем оставшуюся часть ввода
           this.value = '+375';
           let formattedNumber = '';
           
           // Начинаем форматирование с четвертой цифры
           for (let i = 3; i < numbers.length; i++) {
               // Словарь для вставки пробелов на нужных позициях
               let char = {3:' ', 5:' ', 8:' '};
               formattedNumber += (char[i] ? char[i] : '') + numbers[i];
           }
   
           // Обновляем значение поля ввода
           this.value += formattedNumber;
       });
});

