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
    const inputs = document.querySelectorAll(".registration-form .write");
  
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            const label = this.nextElementSibling;
            if (this.value !== '') {
                label.classList.add('label-top');
            } else {
                label.classList.remove('label-top');
            }
        });
  
        input.addEventListener('focus', function() {
            const label = this.nextElementSibling;
            if (this.value !== '') {
                label.classList.add('label-top');
            }
        });
  
        input.addEventListener('blur', function() {
            const label = this.nextElementSibling;
            if (this.value === '') {
                label.classList.remove('label-top');
            }
        });
    });
});

document.addEventListener("DOMContentLoaded", function() {
    const phoneInput = document.getElementById('phone');

    phoneInput.addEventListener('input', function() {
        let numbers = this.value.replace(/\D/g, ''); // Remove all non-digits
        let char = {0:'+', 3:' ', 5:' ', 8:' '}; // Positions to insert specific characters
        this.value = '+375'; // Start with +375

        for (let i = 0; i < numbers.length; i++) {
            if (i > 2) { // Start formatting after +375
                this.value += (char[i] ? char[i] : '') + numbers[i];
            }
        }
    });
});
let tg = window.Telegram.WebApp;
tg.sendData()