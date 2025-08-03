document.addEventListener('DOMContentLoaded', function() {
    // Dropdown menu logic for settings
    const settings = document.getElementById('settings');
    const dropdown = document.getElementById('dropdown-menu');
    document.addEventListener('click', function(e) {
        if (settings && settings.contains(e.target)) {
            dropdown.classList.toggle('show');
        } else if (dropdown && !dropdown.contains(e.target)) {
            dropdown.classList.remove('show');
        }
    });

    // Button feedback logic
    const responseBox = document.querySelector('.response');
    const btnCorrect = document.getElementById('btn-correct');
    const btnWrong = document.getElementById('btn-wrong');
    const rightArrowContainer = document.querySelector('.right-arrow-container');
    

    // Hide right arrow initially
    if (rightArrowContainer) {
        rightArrowContainer.style.display = "none";
    }

    let answered = false;
    let transitioned = false;

    btnCorrect.onclick = function() {
        responseBox.textContent = "Correct! Consistency in your sleep and wake times is more important for quality sleep than just the total hours.";
        btnCorrect.style.background = "#77C821";
        btnCorrect.style.color = "#fff";
        btnWrong.style.background = "#f3f3fa";
        btnWrong.style.color = "#222";
        if (!answered && rightArrowContainer) {
            rightArrowContainer.style.display = "";
            answered = true;
        }
    };
    btnWrong.onclick = function() {
        responseBox.textContent = "Not quite! While sleep duration matters, being consistent with your sleep schedule has a bigger impact on sleep quality.";
        btnWrong.style.background = "#FF5F5F";
        btnWrong.style.color = "#fff";
        btnCorrect.style.background = "#f3f3fa";
        btnCorrect.style.color = "#222";
        if (!answered && rightArrowContainer) {
            rightArrowContainer.style.display = "";
            answered = true;
        }
    };

    // Transition on right arrow click
    if (rightArrowContainer) {
        rightArrowContainer.addEventListener('click', function() {
            if (!transitioned) {
                transitioned = true;

                // Fade out the question and buttons
                const questionDiv = document.querySelector('#container > div:nth-child(3)');
                const buttonContainer = document.querySelector('.button-container');
                if (questionDiv) questionDiv.style.transition = "opacity 0.5s"; 
                if (buttonContainer) buttonContainer.style.transition = "opacity 0.5s";
                if (questionDiv) questionDiv.style.opacity = 0;
                if (buttonContainer) buttonContainer.style.opacity = 0;

                // After transition, hide them and update response
                setTimeout(function() {
                    if (questionDiv) questionDiv.style.display = "none";
                    if (buttonContainer) buttonContainer.style.display = "none";
                    if (responseBox) {
                        responseBox.innerHTML = "💡Fact 1: Your brain has a biological clock (called the suprachiasmatic nucleus) that likes predictability.<br>💤Fact 2: Sleeping at wildly different times (e.g., 11pm one night, 3am the next) causes \"social jetlag\" — like giving yourself mild jetlag without flying.<br>🌅Fact 3: A consistent wake-up time trains your body to fall asleep more easily and feel more refreshed in the morning.";
                    }
                    // Change the arrow to "Next" state (optional)
                    rightArrowContainer.classList.add('next-ready');
                }, 500);
            } else {
                fetch('/api/complete_lesson', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ lesson_id: 'sleep-consistency' }) // Use your unique lesson id here
                })
                .then(response => response.json())
                .then(data => {
                    // Optionally handle the response
                    console.log(data);
                });
                // On second click, go to /learn
                window.location.href = "/learn";
            }
        });
    }
});
