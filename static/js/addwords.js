// Wait for the DOM to fully load
document.addEventListener('DOMContentLoaded', function() {
    // Function to get query parameters
    function getQueryParams() {
        const params = {};
        const queryString = window.location.search.substring(1);
        const pairs = queryString.split('&');
        for (const pair of pairs) {
            const [key, value] = pair.split('=');
            params[decodeURIComponent(key)] = decodeURIComponent(value || '');
        }
        return params;
    }

    const params = getQueryParams();
    const listTitle = document.getElementById('listName');
    const wordsContainer = document.getElementById('word-input-group');
    const wordForm = document.getElementById('word-form');
    const addWordBtn = document.getElementById('add-word-btn');

    // Set the list title
    const listName = params.list || 'Untitled List';
    const wordCount = parseInt(params.count, 10) || 1;
    listTitle.textContent = listName;

    // Function to create a word input field
    function createWordInput(index) {
        const inputGroup = document.createElement('div');
        inputGroup.classList.add('input-group');

        const label = document.createElement('label');
        label.setAttribute('for', `word${index}`);
        label.textContent = ``;

        const input = document.createElement('input');
        input.type = 'text';
        input.id = `word${index}`;
        input.name = `word`;
        input.required = true;
        input.placeholder = `Enter word ${index}`;

        const errorDiv = document.createElement('div');
        errorDiv.classList.add('error');
        errorDiv.id = `word${index}Error`;

        inputGroup.appendChild(label);
        inputGroup.appendChild(input);
        inputGroup.appendChild(errorDiv);
        wordsContainer.appendChild(inputGroup);
    }

    // Generate initial word input fields based on wordCount
    for (let i = 1; i <= wordCount; i++) {
        createWordInput(i);
    }

    let currentWordIndex = wordCount;

    // Event listener to add more word input fields dynamically
    addWordBtn.addEventListener('click', function() {
        currentWordIndex += 1;
        createWordInput(currentWordIndex);
    });

    // Function to validate word inputs
    function validateWords() {
        let isValid = true;

        for (let i = 1; i <= currentWordIndex; i++) {
            const input = document.getElementById(`word${i}`);
            const errorDiv = document.getElementById(`word${i}Error`);

            if (input) {
                if (input.value.trim() === '') {
                    errorDiv.textContent = `Please enter Word ${i}.`;
                    input.classList.add('input-error');
                    isValid = false;
                } else {
                    errorDiv.textContent = '';
                    input.classList.remove('input-error');
                }
            }
        }

        return isValid;
    }


    // Event listener for form submission
    wordForm.addEventListener('submit', function(event) {

        // event.preventDefault(); // Prevent default form submission
        console.log('Form submitted');

        if (validateWords()) {
            // Collect the words
            const words = [];
            for (let i = 1; i <= currentWordIndex; i++) {
                const input = document.getElementById(`word${i}`);
                if (input) {
                    const word = input.value.trim();
                    words.push(word);
                }
            }

        }
    });

    // Real-time validation for each word input
    wordsContainer.addEventListener('input', function(event) {
        const target = event.target;
        if (target && target.tagName.toLowerCase() === 'input') {
            const index = target.id.replace('word', '');
            const errorDiv = document.getElementById(`word${index}Error`);
            if (target.value.trim() !== '') {
                errorDiv.textContent = '';
                target.classList.remove('input-error');
            }
        }
    });
});