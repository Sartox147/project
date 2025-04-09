// public/js/auth/login/script.js
const wrapper = document.querySelector('.wrapper.login-wrapper');
const registerLink = document.querySelector('.register-link');

if (registerLink && wrapper) {
    registerLink.onclick = (e) => {
        e.preventDefault();
        wrapper.classList.add('active');
        setTimeout(() => {
            window.location.href = "/register";
        }, 1000); // Espera a que termine la animación
    };
}