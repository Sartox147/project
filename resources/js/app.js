document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuButton = document.querySelector('button[class*="md:hidden"]');
    const navLinks = document.querySelector('div[class*="hidden md:flex"]');
    
    mobileMenuButton.addEventListener('click', function() {
        navLinks.classList.toggle('hidden');
    });
});