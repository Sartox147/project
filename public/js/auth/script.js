document.addEventListener('DOMContentLoaded', function() {
    const wrapper = document.querySelector('.wrapper');
    const loginLink = document.querySelector('.login-link');
    const registerLink = document.querySelector('.register-link');
    
    // Solo aplicar la animación si estamos en la página correcta
    if (window.location.pathname === '/login') {
        wrapper.classList.add('active');
    } else if (window.location.pathname === '/register') {
        wrapper.classList.add('active-register');
    }
    
    // Manejar transición entre login/registro
    if (registerLink) {
        registerLink.addEventListener('click', (e) => {
            e.preventDefault();
            wrapper.classList.add('active-register');
            window.history.pushState({}, '', '/register');
        });
    }
    
    if (loginLink) {
        loginLink.addEventListener('click', (e) => {
            e.preventDefault();
            wrapper.classList.remove('active-register');
            window.history.pushState({}, '', '/login');
        });
    }
    
    // Animaciones
    const animations = document.querySelectorAll('.animation');
    animations.forEach(animation => {
        const delay = animation.style.getPropertyValue('--i');
        animation.style.animationDelay = delay * 20 + 's';
    });
    
    // Manejo de errores
    const inputs = document.querySelectorAll('.input-box input');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentNode.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (this.value === '') {
                this.parentNode.classList.remove('focused');
            }
        });
        
        // Mantener el estado focused si hay valor
        if (input.value !== '') {
            input.parentNode.classList.add('focused');
        }
    });
});