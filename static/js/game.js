// List of words for the game
let currentIndex = 0;
let timeRemaining = 60;
let timerInterval;
let score = 0;

// Start the game and initialize the game page
function startGame() {
    // Show game page and hide end page
    document.querySelector(".container").style.display = "flex";
    document.getElementById("endPage").style.display = "none";

    // Reset variables
    timeRemaining = 60;
    score = 0;
    currentIndex = 0;
    
    // Display the first word and reset the timer display
    document.getElementById("wordText").innerText = words[currentIndex];
    document.getElementById("timer").innerText = "1:00";
    
    // Start the countdown timer
    timerInterval = setInterval(updateTimer, 1000);
}

// Function to change to the next word
function nextWord(action) {
    if (action === 'correct') {
        score++; // Increment score if "Correct" is clicked
    }
    // Move to the next word in the array
    currentIndex = (currentIndex + 1) % words.length;
    document.getElementById("wordText").innerText = words[currentIndex];
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
}

// Function to restart the game
function restartGame() {
    startGame(); // Start a new game
}

// Initialize the game when the page loads
window.onload = startGame;
