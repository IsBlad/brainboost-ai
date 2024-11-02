// List of words for the game
let currentIndex = 0;
let timeRemaining = 60;
let timerInterval;
let score = 0;

// Arrays to store words based on user actions
const correctWords = [];
const passedWords = [];

// Preload audio files when the game starts
const audio = new Audio(); // Single audio object
const audioFiles = {
    correct: 'static/sounds/correct.mp3', 
    pass: 'static/sounds/pass.mp3',
    timer: 'static/sounds/timer.mp3',
    finish: 'static/sounds/finished.mp3'
};

// Preload audio files without playing
function preloadAudio() {
    Object.keys(audioFiles).forEach(type => {
        const preloadAudio = new Audio(audioFiles[type]);
        preloadAudio.load(); // Preload each audio file
    });
}

// Play sound by setting src and ensuring playback
function playSound(type) {
    const src = audioFiles[type];
    if (!src) return;

    audio.src = src;         // Set source
    audio.currentTime = 0;   // Reset time
    audio.play().catch(error => console.error(`Error playing sound ${type}:`, error));
}

function adjustFontSize() {
    const wordElement = document.querySelector('.word');
    const fontSize = Math.min(window.innerWidth, window.innerHeight) * 0.08;
    wordElement.style.fontSize = `${fontSize}px`;
}

function checkOrientation() {
    if (window.innerHeight > window.innerWidth) {
        // Show a warning message to rotate the device
        document.getElementById("rotate-notice").style.display = "flex"; // Show the notice
    } else {
        document.getElementById("rotate-notice").style.display = "none"; // Hide the notice
    }
}

// Shuffle function using the Fisher-Yates (Knuth) algorithm
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
}

// Start the game and initialize the game page
function startGame() {
    // Shuffle words array before starting the game
    shuffleArray(words);
    
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
    clearInterval(timerInterval);  // Ensure previous intervals are cleared
    timerInterval = setInterval(updateTimer, 1000);

    // Adjust font size for the first word
    adjustFontSize();
}

function nextWord(action) {
    if (action === 'correct') {
        score++;
        correctWords.push(words[currentIndex]);
        playSound('correct');  
    } else if (action === 'pass') {
        passedWords.push(words[currentIndex]);
        playSound('pass');   
    }

    currentIndex = (currentIndex + 1) % words.length;

    if (currentIndex === 0) {
        endGame();
    } else {
        document.getElementById("wordText").innerText = words[currentIndex];
    }
}

// Function to update the timer every second
function updateTimer() {
    timeRemaining--;
    let minutes = Math.floor(timeRemaining / 60);
    let seconds = timeRemaining % 60;
    document.getElementById("timer").innerText = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

    if (timeRemaining <= 10 && timeRemaining > 0) {
        playSound('timer');  
    }

    if (timeRemaining === 0) {
        endGame();
    }
}

// Function to end the game and show the end page with the score
function endGame() {
    clearInterval(timerInterval);
    playSound('finish');     
    document.querySelector(".container").style.display = "none";
    document.getElementById("endPage").style.display = "flex";

    document.getElementById("finalScore").innerText = `Score: ${score}`;
    displayResults();
}

// Function to display the results on the end page
function displayResults() {
    const correctList = document.getElementById("correctWords");
    const passedList = document.getElementById("passedWords");

    correctList.innerHTML = '';
    passedList.innerHTML = '';

    correctWords.forEach(word => {
        const li = document.createElement("li");
        li.innerText = word;
        li.style.color = "green";
        correctList.appendChild(li);
    });

    passedWords.forEach(word => {
        const li = document.createElement("li");
        li.innerText = word;
        li.style.color = "red";
        passedList.appendChild(li);
    });
}

// Function to restart the game
function restartGame() {
    startGame();
}

// Consolidated window load events
window.onload = function() {
    preloadAudio();       
    startGame();
    adjustFontSize();
    checkOrientation();
};

window.onresize = function() {
    adjustFontSize();
    checkOrientation();
};