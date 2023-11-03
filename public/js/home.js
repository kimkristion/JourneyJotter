const inputBar = document.querySelector('#input-bar');

const placeHolderText = [
    'Where did you go on your last trip?',
    'Where can you never go back to?',
    'What is your favorite yearly trip?'
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
