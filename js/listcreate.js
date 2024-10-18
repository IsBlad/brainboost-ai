// js/script.js

// Wait for the DOM to fully load
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('listForm');

    // Check if the form exists on the page
    if (!form) {
        console.error('Form with id "listForm" not found.');
        return;
    }

    // Elements for error messages
    const listNameInput = document.getElementById('listName');
    const wordCountInput = document.getElementById('wordCount');
    const listNameError = document.getElementById('listNameError');
    const wordCountError = document.getElementById('wordCountError');

    // Function to validate inputs
    function validateInputs() {
        let isValid = true;

        // Reset previous error messages and styles
        listNameError.textContent = '';
        wordCountError.textContent = '';
        listNameInput.classList.remove('input-error');
        wordCountInput.classList.remove('input-error');

        // Validate list name
        if (listNameInput.value.trim() === '') {
            listNameError.textContent = 'Please enter a name for the list.';
            listNameInput.classList.add('input-error');
            isValid = false;
        }

        // Validate word count
        const wordCountValue = parseInt(wordCountInput.value, 10);
        if (isNaN(wordCountValue) || wordCountValue < 1) {
            wordCountError.textContent = 'Please enter a valid number of words (minimum 1).';
            wordCountInput.classList.add('input-error');
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
            listNameInput.classList.remove('input-error');
        }
    });

    wordCountInput.addEventListener('input', function() {
        const wordCountValue = parseInt(wordCountInput.value, 10);
        if (!isNaN(wordCountValue) && wordCountValue >= 1) {
            wordCountError.textContent = '';
            wordCountInput.classList.remove('input-error');
        }
    });
});
