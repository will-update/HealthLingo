// main.js
// Basic JS for HealthLingo app (no frameworks)
document.addEventListener('DOMContentLoaded', function() {
    // Checking off tasks functionality
    document.querySelectorAll('.check-circle').forEach(function(circle) {
        circle.addEventListener('click', function() {
            circle.classList.toggle('checked');
        });
    });

    // Hamburger dropdown menu logic
    const settings = document.getElementById('settings');
    const dropdown = document.getElementById('dropdown-menu');
    document.addEventListener('click', function(e) {
        if (settings.contains(e.target)) {
            dropdown.classList.toggle('show');
        } else if (!dropdown.contains(e.target)) {
            dropdown.classList.remove('show');
        }
    });
});