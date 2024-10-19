document.getElementById("hamburger-menu").addEventListener("click", function() {
    const nav = document.querySelector("nav");
    nav.classList.toggle("nav-active");
});

// Get the modal, button, and close span
var modal = document.getElementById("loginModal");
var btn = document.getElementById("loginBtn");
var span = document.getElementsByClassName("close");

// When the user clicks the login button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on the close (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}


// Wait for the DOM to fully load
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('listForm');

    // Elements for error messages
    const listNameInput = document.getElementById('listName');
    const wordCountInput = document.getElementById('wordCount');
    const listNameError = document.getElementById('listNameError');
    const wordCountError = document.getElementById('wordCountError');

    // Function to validate inputs
    function validateInputs() {
        let isValid = true;

        // Reset previous error messages
        listNameError.textContent = '';
        wordCountError.textContent = '';

        // Validate list name
        if (listNameInput.value.trim() === '') {
            listNameError.textContent = 'Please enter a name for the list.';
            isValid = false;
        }

        // Validate word count
        const wordCountValue = parseInt(wordCountInput.value, 10);
        if (isNaN(wordCountValue) || wordCountValue < 1) {
            wordCountError.textContent = 'Please enter a valid number of words (minimum 1).';
            isValid = false;
        }

        return isValid;
    }

    // Event listener for form submission
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent default form submission

        if (validateInputs()) {
            // If inputs are valid, proceed with redirection

            // Get the input values
            const listName = listNameInput.value.trim();
            const wordCount = wordCountInput.value.trim();

            // Debugging: Log the values (optional)
            console.log('List Name:', listName);
            console.log('Word Count:', wordCount);

            // Encode the parameters to ensure they're URL-safe
            const encodedListName = encodeURIComponent(listName);
            const encodedWordCount = encodeURIComponent(wordCount);

            // Redirect to the next page with query parameters
            window.location.href = `addwords.html?list=${encodedListName}&count=${encodedWordCount}`;
        }
    });

    // Optional: Real-time validation as the user types
    listNameInput.addEventListener('input', function() {
        if (listNameInput.value.trim() !== '') {
            listNameError.textContent = '';
        }
    });

    wordCountInput.addEventListener('input', function() {
        const wordCountValue = parseInt(wordCountInput.value, 10);
        if (!isNaN(wordCountValue) && wordCountValue >= 1) {
            wordCountError.textContent = '';
        }
    });
});