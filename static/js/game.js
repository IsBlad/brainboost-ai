// List of words for the game
let currentIndex = 0;
let timeRemaining = 60;
let timerInterval;
let score = 0;

// Arrays to store words based on user actions
const correctWords = [];
const passedWords = [];

function adjustFontSize() {
    const wordElement = document.querySelector('.word');
    
    // Increase this percentage to make text larger
    const fontSize = Math.max(Math.min(window.innerWidth, window.innerHeight) * 0.1, 30); // 10% of the smallest dimension, minimum font size of 30px
    wordElement.style.fontSize = `${fontSize}px`;
}

// Add event listeners
document.addEventListener('DOMContentLoaded', function() {
    adjustFontSize(); // Initial fit
    window.addEventListener('resize', adjustFontSize); // Refit on resize
});

// Start the game and initialize the game page
function startGame() {
    // Show game page and hide end page
    document.querySelector(".container").style.display = "flex";
    document.getElementById("endPage").style.display = "none";

    // Reset variables
    timeRemaining = 60;
    score = 0;
    currentIndex = 0;

    // Clear previous words
    correctWords.length = 0;
    passedWords.length = 0;

    // Display the first word and reset the timer display
    document.getElementById("wordText").innerText = words[currentIndex];
    document.getElementById("timer").innerText = "1:00";

    // Start the countdown timer
    timerInterval = setInterval(updateTimer, 1000);

    // Adjust the font size for the first word
    adjustFontSize();
}

// Function to change to the next word
function nextWord(action) {
    if (action === 'correct') {
        score++; // Increment score if "Correct" is clicked
        correctWords.push(words[currentIndex]); // Store the correct word
    } else if (action === 'pass') {
        passedWords.push(words[currentIndex]); // Store the passed word
    }

    // Move to the next word in the array
    currentIndex = (currentIndex + 1) % words.length;

    // Check if we've gone through all the words
    if (currentIndex === 0) {
        endGame(); // End the game if all words have been displayed
    } else {
        document.getElementById("wordText").innerText = words[currentIndex]; // Display next word
    }
}

// Function to update the timer every second
function updateTimer() {
    timeRemaining--;
    let minutes = Math.floor(timeRemaining / 60);
    let seconds = timeRemaining % 60;
    document.getElementById("timer").innerText = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

    if (timeRemaining <= 0) {
        endGame(); // End the game when time runs out
    }
}

// Function to end the game and show the end page with the score
function endGame() {
    clearInterval(timerInterval); // Stop the timer
    document.querySelector(".container").style.display = "none"; // Hide game container
    document.getElementById("endPage").style.display = "flex"; // Show end page

    // Display the final score
    document.getElementById("finalScore").innerText = `Score: ${score}`;

    // Display the words in the end page
    displayResults();
}

// Function to display the results on the end page
function displayResults() {
    const correctList = document.getElementById("correctWords");
    const passedList = document.getElementById("passedWords");

    // Clear previous results
    correctList.innerHTML = '';
    passedList.innerHTML = '';

    // Create list items for correct words
    correctWords.forEach(word => {
        const li = document.createElement("li");
        li.innerText = word;
        li.style.color = "green"; // Set color for correct words
        correctList.appendChild(li);
    });

    // Create list items for passed words
    passedWords.forEach(word => {
        const li = document.createElement("li");
        li.innerText = word;
        li.style.color = "red"; // Set color for passed words
        passedList.appendChild(li);
    });
}

// Function to restart the game
function restartGame() {
    startGame(); // Start a new game
}

// Initialize the game when the page loads
window.onload = function() {
    startGame();       // Start the game
    adjustFontSize();  // Adjust font size on load
};

function checkOrientation() {
    if (window.innerHeight > window.innerWidth) {
        // Show a warning message to rotate the device
        document.getElementById("rotate-notice").style.display = "flex"; // Show the notice
    } else {
        document.getElementById("rotate-notice").style.display = "none"; // Hide the notice
    }
}

// Add event listeners
window.addEventListener("resize", checkOrientation);
window.addEventListener("orientationchange", checkOrientation);

// Call the function on load
window.onload = checkOrientation;

function adjustFontSize() {
    const wordElement = document.querySelector('.word');
    const fontSize = Math.min(window.innerWidth, window.innerHeight) * 0.08; // 8% of the smallest dimension
    wordElement.style.fontSize = `${fontSize}px`;
}

window.onresize = adjustFontSize;