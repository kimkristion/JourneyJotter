const inputBar = document.querySelector('#input-bar');

const placeHolderText = [
    'Where did you go on your last trip?',
    'Where can you never go back to?',
    'What is your favorite yearly trip?',
    "What's the most adventurous destination you've ever visited?",
    'If you could teleport to any place in the world right now, where would it be?',
    "What's your dream destination for a romantic getaway?",
    "What's your go-to travel playlist or book for long journeys?", 
];

let currentIndex = 0;
let currentText = '';
let charIndex = 0;

function typeText() {
    if (charIndex < placeHolderText[currentIndex].length) {
        currentText += placeHolderText[currentIndex][charIndex];
        inputBar.placeholder = currentText;
        charIndex++;
        setTimeout(typeText, 50); // Type the next character after a short delay
    } else {
        setTimeout(eraseText, 2000); // Wait for 2 seconds before erasing
    }
}

function eraseText() {
    if (currentText.length > 0) {
        currentText = currentText.slice(0, -1);
        inputBar.placeholder = currentText;
        setTimeout(eraseText, 50); // Erase the next character after a short delay
    } else {
        currentIndex = (currentIndex + 1) % placeHolderText.length;
        charIndex = 0;
        setTimeout(typeText, 3000); // Wait for 3 seconds before typing the next message
    }
}

document.addEventListener("DOMContentLoaded", (event) => {
    setTimeout(typeText, 0); // Start typing the first message immediately
});

const hamburger = document.querySelector('#hamburger');
const navList = document.querySelector('#nav-list');
let navListVisible = true; // Initially set to true for larger screens

function toggleNav() {
    if (window.innerWidth <= 992) {
        if (!navListVisible) {
            navList.style.display = 'flex';
            navListVisible = true;
        } else {
            navList.style.display = 'none';
            navListVisible = false;
        }
    }
}

function reset() {
    if (window.innerWidth > 992) {
        navList.style.display = 'flex';
        navListVisible = true;
    } else {
        navList.style.display = 'none';
        navListVisible = false;
    }
}


hamburger.addEventListener('click', toggleNav);
window.addEventListener('resize', reset);

// Call reset function on page load to set the initial state
reset();
