// public/js/auth/register/script.js
const wrapper = document.querySelector('.wrapper.register-wrapper');
const loginLink = document.querySelector('.login-link');

if (loginLink && wrapper) {
    loginLink.onclick = (e) => {
        e.preventDefault();
        wrapper.classList.remove('active');
        setTimeout(() => {
            window.location.href = "/login";
        }, 1000); // Espera a que termine la animación
    };
}