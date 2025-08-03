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

    // Learn card focus animation
    const sleepContainer = document.querySelector('.learn-container .learn-card.sleep')?.closest('.learn-container');
    const allContainers = document.querySelectorAll('.learn-container');
    const topRow = document.querySelector('.learn-top-row');
    const sleepBgSquare = document.getElementById('sleep-bg-square');
    const sleepLessons = document.getElementById('sleep-lessons-container');
    if (sleepContainer) {
        sleepContainer.addEventListener('click', function(e) {
            e.preventDefault();
            const isFocused = sleepContainer.classList.contains('sleep-focus');
            if (!isFocused) {
                allContainers.forEach(c => {
                    if (c !== sleepContainer) {
                        c.classList.add('shrink');
                        c.classList.remove('sleep-focus');
                    } else {
                        c.classList.add('sleep-focus');
                        c.classList.remove('shrink');
                        c.classList.add('hide-vertical-bar');
                    }
                });
                if (topRow) {
                    topRow.classList.add('shrink');
                }
                if (sleepBgSquare) {
                    sleepBgSquare.classList.add('active');
                }
                if (sleepLessons) {
                    sleepLessons.classList.add('active');
                }
            } else {
                allContainers.forEach(c => {
                    c.classList.remove('shrink', 'sleep-focus', 'hide-vertical-bar');
                });
                if (topRow) {
                    topRow.classList.remove('shrink');
                }
                if (sleepBgSquare) {
                    sleepBgSquare.classList.remove('active');
                }
                if (sleepLessons) {
                    sleepLessons.classList.remove('active');
                }
            }
        });
    }

    // Sleep lessons focus effect with infinite scroll and click-to-focus
    const sleepLessonsContainer = document.getElementById('sleep-lessons-container');
    let sleepLessonsList = Array.from(document.querySelectorAll('#sleep-lessons-container .sleep-lesson'));
    let focusIdx = Math.floor(sleepLessonsList.length / 2);

    function updateSleepLessonFocus(idx) {
        sleepLessonsList.forEach((lesson, i) => {
            lesson.classList.remove('focus', 'side-1', 'side-2-top', 'side-2-bottom');
            if (i === idx) {
                lesson.classList.add('focus');
            } else if (Math.abs(i - idx) === 1 || Math.abs(i - idx) === sleepLessonsList.length - 1) {
                lesson.classList.add('side-1');
            } else if (i - idx === -2 || (idx - i === sleepLessonsList.length - 2)) {
                lesson.classList.add('side-2-top');
            } else if (i - idx === 2 || (i - idx === -(sleepLessonsList.length - 2))) {
                lesson.classList.add('side-2-bottom');
            }
        });
        focusIdx = idx;
        // Scroll the focused lesson into view
        sleepLessonsList[idx].scrollIntoView({behavior: 'smooth', block: 'center'});
    }

    function wrapIndex(idx) {
        const len = sleepLessonsList.length;
        return ((idx % len) + len) % len;
    }

    // Click to focus on a lesson
    sleepLessonsList.forEach((lesson, i) => {
        lesson.addEventListener('click', function(e) {
            updateSleepLessonFocus(i);
        });
    });

    // Infinite scroll: when scrolling past top/bottom, wrap to other side
    if (sleepLessonsContainer) {
        let scrollTimeout;
        sleepLessonsContainer.addEventListener('scroll', function() {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                // Find the lesson closest to the center of the container
                const containerRect = sleepLessonsContainer.getBoundingClientRect();
                let minDist = Infinity;
                let closestIdx = focusIdx;
                sleepLessonsList.forEach((lesson, i) => {
                    const rect = lesson.getBoundingClientRect();
                    const lessonCenter = rect.top + rect.height / 2;
                    const containerCenter = containerRect.top + containerRect.height / 2;
                    const dist = Math.abs(lessonCenter - containerCenter);
                    if (dist < minDist) {
                        minDist = dist;
                        closestIdx = i;
                    }
                });
                updateSleepLessonFocus(closestIdx);
            }, 120);
        });
    }

    // Set initial focus to the middle lesson
    if (sleepLessonsList.length > 0) {
        updateSleepLessonFocus(focusIdx);
    }

        // Sleep lessons focus effect
    function updateSleepLessonFocus(focusIdx) {
        const lessons = document.querySelectorAll('#sleep-lessons-container .sleep-lesson');
        lessons.forEach((lesson, i) => {
            lesson.classList.remove('focus', 'side-1', 'side-2-top', 'side-2-bottom', 'side-3-top', 'side-3-bottom', 'side-4-top', 'side-4-bottom');
            if (i === focusIdx) {
                lesson.classList.add('focus');
            } else if (Math.abs(i - focusIdx) === 1) {
                lesson.classList.add('side-1');
            } else if (i - focusIdx === -2) {
                lesson.classList.add('side-2-top');
            } else if (i - focusIdx === 2) {
                lesson.classList.add('side-2-bottom');
            } else if (i - focusIdx === -3) {
                lesson.classList.add('side-3-top');
            } else if (i - focusIdx === 3) {
                lesson.classList.add('side-3-bottom');
            } else if (i - focusIdx === -4) {
                lesson.classList.add('side-4-top');
            } else if (i - focusIdx === 4) {
                lesson.classList.add('side-4-bottom');
            }
        });
    }

    fetch('/api/completed_lessons')
    .then(res => res.json())
    .then(completed => {
        completed.forEach(id => {
            const lesson = document.querySelector(`.sleep-lesson[data-lesson-id="${id}"]`);
            if (lesson) {
                lesson.classList.add('lesson-completed');
            }
        });
    });
});