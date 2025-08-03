// main.js
// Basic JS for HealthLingo app (no frameworks)
document.addEventListener('DOMContentLoaded', function() {
    // Checking off tasks functionality
    function updateGoalsCompleted() {
        const completed = document.querySelectorAll('.check-circle-change.checked').length;
        document.getElementById('goals-count').textContent = completed + ' / ' + document.querySelectorAll('.check-circle-change').length;
    }
    updateGoalsCompleted();

    function updatePast5DaysCompletion() {
        let total = 0;
        let completed = 0;
        document.querySelectorAll('.daily-task').forEach(function(task) {
            const circles = task.querySelectorAll('.circles-container .check-circle, .circles-container .check-circle-change');
            for (let i = Math.max(0, circles.length - 5); i < circles.length; i++) {
                total++;
                if (circles[i].classList.contains('checked') || circles[i].classList.contains('check-circle-on')) {
                    completed++;
                }
            }
        });
        const percent = total > 0 ? Math.round((completed / total) * 100) : 0;
        document.getElementById('5-days-completion').innerHTML =
            `📈 Past 5 days completion: <span id="goals-count">${percent}%</span>`;
    }
    updatePast5DaysCompletion();

    // Update count when a daily-task is clicked
    document.querySelectorAll('.daily-task').forEach(function(task) {
        task.addEventListener('click', function(e) {
            if (e.target.closest('a, button')) return;
            const circle = task.querySelector('.check-circle-change');
            if (circle) {
                circle.classList.toggle('checked');
                updateGoalsCompleted();
                updatePast5DaysCompletion();
            }
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

    // Updates the current date
    function updateDate() {
        const now = new Date();
        const options = { weekday: 'long', month: 'long', day: 'numeric' };
        document.getElementById('current-date').textContent = now.toLocaleDateString(undefined, options);
    }
    updateDate();

    // Updates the current time
    function updateTime() {
        const now = new Date();
        let hours = now.getHours();
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12 || 12;
        document.getElementById('current-time').textContent =
            `🕒 ${hours}:${minutes} ${ampm}`;
    }
    updateTime();
    setInterval(updateTime, 1000);
});
