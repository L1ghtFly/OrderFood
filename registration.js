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
        event.preventDefault(); // Prevent default form submission
        
        const name = document.getElementById('name').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const termsChecked = document.querySelector('.custom-checkbox').checked; // Check if terms are accepted

        // Validate form data
        if (name && phone && termsChecked) {
            // Check if phone input starts with '+375'
            if(phone.startsWith('+375')) {
                // Create data object for sending
                let data = {
                    name: name,
                    phone: phone
                };
                
                // Convert data to JSON string if needed
                let jsonData = JSON.stringify(data);

                // Check if Telegram WebApp API is available and use sendData method
                if (window.Telegram && window.Telegram.WebApp) {
                    window.Telegram.WebApp.sendData(jsonData);
                    // Redirect to menu.html or handle the next part of your process
                    window.location.href = "menu.html";
                } else {
                    alert("Ошибка доступа к Telegram WebApp API.");
                }
            } else {
                alert("Номер телефона должен начинаться с '+375'");
            }
        } else {
            alert("Пожалуйста, заполните все поля и примите условия!");
        }
    });

    // Input format and label management
    const inputs = document.querySelectorAll(".registration-form .write");
    inputs.forEach(input => {
        function manageLabels() {
            const label = input.nextElementSibling;
            if (input.value !== '') {
                label.classList.add('label-top');
            } else {
                label.classList.remove('label-top');
            }
        }

        input.addEventListener('input', manageLabels);
        input.addEventListener('focus', manageLabels);
        input.addEventListener('blur', manageLabels);
    });

    // Phone input formatting for Belarus phone numbers
    const phoneInput = document.getElementById('phone');
    phoneInput.addEventListener('input', function() {
        let numbers = this.value.replace(/\D/g, ''); // Remove all non-digits
        let char = {3:' ', 5:' ', 8:' '}; // Positions to insert spaces
        this.value = '+375'; // Start with +375

        for (let i = 0; i < numbers.length; i++) {
            if (i > 2) { // Start formatting after +375
                this.value += (char[i] ? char[i] : '') + numbers[i];
            }
        }
    });
});


tg.sendData()