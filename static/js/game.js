// List of words for the game
let currentIndex = 0;
let timeRemaining = 60;
let timerInterval;
let score = 0;

// Arrays to store words based on user actions
const correctWords = [];
const passedWords = [];

// Preload audio files when the game starts
const audioFiles = {
    correct: new Audio('/static/sounds/correct.mp3'),  // Update paths to match your actual audio files
    pass: new Audio('/static/sounds/pass.mp3'),
    timer: new Audio('/static/sounds/timer.mp3'),
    finish: new Audio('/static/sounds/finish.mp3')
};

// Preload all audio files
function preloadAudio() {
    Object.values(audioFiles).forEach(audio => {
        audio.load();
        // Optional: preload by playing silently
        audio.volume = 0;
        audio.play().catch(() => {});
        audio.pause();
        audio.volume = 1;
        audio.currentTime = 0;
    });
}

// Replace the playSound function
function playSound(type) {
    const sound = audioFiles[type];
    if (!sound) return;
    
    // Reset and play
    sound.currentTime = 0;
    sound.play().catch(console.error);
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

    // Adjust font size for the first word
    adjustFontSize();
}

// Function to change to the next word
function nextWord(action) {
    if (action === 'correct') {
        score++;
        correctWords.push(words[currentIndex]);
        playSound('correct');  // Updated to use string identifier
    } else if (action === 'pass') {
        passedWords.push(words[currentIndex]);
        playSound('pass');     // Updated to use string identifier
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
        playSound('timer');    // Updated to use string identifier
    }

    if (timeRemaining === 0) {
        endGame();
    }
}

// Function to end the game and show the end page with the score
function endGame() {
    clearInterval(timerInterval);
    playSound('finish');       // Updated to use string identifier
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
    preloadAudio();           // Add preloading
    startGame();
    adjustFontSize();
    checkOrientation();
};

window.onresize = function() {
    adjustFontSize();
    checkOrientation();
};