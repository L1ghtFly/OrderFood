let tg = window.Telegram.WebApp;
document.getElementById("registrationForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent default form submission
    // Validate form data (add your validations)
    if (document.getElementById("email").value && document.getElementById("password").value && document.getElementById("name").value) {
        // Redirect on successful form submission
        window.location.href = "menu.html";
    } else {
        alert("Пожалуйста, заполните все поля!");
    }
});

document.addEventListener("DOMContentLoaded", function() {
    const registrationForm = document.getElementById('registrationForm');

    registrationForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const name = document.getElementById('name').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const termsChecked = document.querySelector('.custom-checkbox').checked;

        if (name && phone && termsChecked && phone.startsWith('+375')) {
            let data = {
                name: name,
                phone: phone
            };

            let jsonData = JSON.stringify(data);

            if (window.Telegram && window.Telegram.WebApp) {
                window.Telegram.WebApp.sendData(jsonData);
                window.location.href = "menu.html";
            } else {
                alert("Ошибка доступа к Telegram WebApp API.");
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

    const phoneInput = document.getElementById('phone');
    phoneInput.addEventListener('input', function() {
        let rawNumbers = this.value.replace(/\D/g, '');
        this.value = formatBelarusPhone(rawNumbers);
    });

    function formatBelarusPhone(numbers) {
        const format = numbers.split('');
        if (format.length > 3) format.splice(3, 0, ' ');
        if (format.length > 6) format.splice(6, 0, ' ');
        if (format.length > 9) format.splice(9, 0, ' ');
        return '+375 ' + format.join('');
    }
});


