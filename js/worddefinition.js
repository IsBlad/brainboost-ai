document.addEventListener('DOMContentLoaded', () => {
    // Event listeners for Save and Cancel buttons
    document.querySelector('.btn.save').addEventListener('click', saveWordList);
    document.querySelector('.btn.cancel').addEventListener('click', cancelWordList);

    // Fetch and display word definitions
    fetchWordDefinitions();
});

function fetchWordDefinitions() {
    const wordListDiv = document.getElementById('word-list');
    wordListDiv.innerHTML = '<div class="loading">Loading word definitions...</div>';

    fetch('/api/word-definitions')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            populateWordList(data);
        })
        .catch(error => {
            console.error('Error fetching word definitions:', error);
            displayError('Failed to load word definitions.');
        });
}

function populateWordList(data) {
    const wordListDiv = document.getElementById('word-list');
    wordListDiv.innerHTML = ''; // Clear loading or error messages

    for (const [word, details] of Object.entries(data)) {
        const wordBox = createWordBox(word, details);
        wordListDiv.appendChild(wordBox);
    }
}

function createWordBox(word, details) {
    // Create the main container
    const definitionBox = document.createElement('div');
    definitionBox.classList.add('definition-box');

    // Word Header
    const wordHeader = document.createElement('div');
    wordHeader.classList.add('word-header');

    const wordTitle = document.createElement('h3');
    wordTitle.textContent = word;

    const buttonsDiv = document.createElement('div');
    buttonsDiv.classList.add('buttons');

    const regenerateBtn = document.createElement('button');
    regenerateBtn.classList.add('btn', 'regenerate');
    regenerateBtn.textContent = 'Regenerate';
    regenerateBtn.addEventListener('click', () => regenerateDefinition(word));

    const editBtn = document.createElement('button');
    editBtn.classList.add('btn', 'edit');
    editBtn.textContent = 'Edit';
    editBtn.addEventListener('click', () => editWord(word, definitionBox));

    buttonsDiv.appendChild(regenerateBtn);
    buttonsDiv.appendChild(editBtn);

    wordHeader.appendChild(wordTitle);
    wordHeader.appendChild(buttonsDiv);

    // Definition Fieldset
    const defBox = document.createElement('fieldset');
    defBox.classList.add('def-box');
    defBox.setAttribute('role', 'presentation');

    const defLegend = document.createElement('legend');
    defLegend.textContent = 'Definition';
    defBox.appendChild(defLegend);

    const defParagraph = document.createElement('p');
    defParagraph.classList.add('definition');
    defParagraph.textContent = details.definition;
    defBox.appendChild(defParagraph);

    // Example Fieldset
    const exampleBox = document.createElement('fieldset');
    exampleBox.classList.add('example-box');
    exampleBox.setAttribute('role', 'presentation');

    const exampleLegend = document.createElement('legend');
    exampleLegend.textContent = 'Example';
    exampleBox.appendChild(exampleLegend);

    details.examples.forEach(exampleText => {
        const exampleParagraph = document.createElement('p');
        exampleParagraph.classList.add('example');
        exampleParagraph.textContent = exampleText;
        exampleBox.appendChild(exampleParagraph);
    });

    // Assemble the definition box
    definitionBox.appendChild(wordHeader);
    definitionBox.appendChild(defBox);
    definitionBox.appendChild(exampleBox);

    return definitionBox;
}

function displayError(message) {
    const wordListDiv = document.getElementById('word-list');
    wordListDiv.innerHTML = `<p class="error">${message}</p>`;
}

function regenerateDefinition(word) {
    // Implement regeneration logic here
    alert(`Regenerate definition for "${word}"`);
}

function editWord(word, definitionBox) {
    // Toggle between view and edit mode
    const isEditing = definitionBox.classList.contains('editing');

    if (isEditing) {
        // Save the edited content
        const newDefinition = definitionBox.querySelector('.definition').textContent;
        const newExamples = Array.from(definitionBox.querySelectorAll('.example')).map(p => p.textContent);

        // TODO: Send updated data to the back-end via API

        // Update the UI
        definitionBox.querySelector('.definition').textContent = newDefinition;
        // For examples, you might want to re-render them or allow editing similarly

        // Remove editing state
        definitionBox.classList.remove('editing');
        event.target.textContent = 'Edit';
    } else {
        // Enter edit mode
        definitionBox.classList.add('editing');
        event.target.textContent = 'Save';

        // Replace definition paragraph with a textarea
        const defParagraph = definitionBox.querySelector('.definition');
        const defTextarea = document.createElement('textarea');
        defTextarea.value = defParagraph.textContent;
        defTextarea.classList.add('definition-edit');
        defParagraph.replaceWith(defTextarea);

        // Similarly, make examples editable if desired
    }
}

function saveWordList() {
    // Collect all word definitions and send to the back-end
    const wordBoxes = document.querySelectorAll('.definition-box');
    const wordData = {};

    wordBoxes.forEach(box => {
        const word = box.querySelector('.word-header h3').textContent;
        const definition = box.querySelector('.def-box .definition').textContent;
        const examples = Array.from(box.querySelectorAll('.example')).map(p => p.textContent);

        wordData[word] = {
            definition: definition,
            examples: examples
        };
    });

    // Send data to the back-end
    fetch('/api/save-word-definitions', { // Update endpoint as needed
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(wordData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Save failed with status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        alert('Word definitions saved successfully!');
    })
    .catch(error => {
        console.error('Error saving word definitions:', error);
        alert('Failed to save word definitions.');
    });
}

function cancelWordList() {
    // Implement cancel logic, e.g., redirecting to another page or reverting changes
    if (confirm('Are you sure you want to cancel? Unsaved changes will be lost.')) {
        window.location.href = 'lists.html'; // Update the URL as needed
    }
}