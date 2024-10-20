// Wait for the DOM to fully load
document.addEventListener('DOMContentLoaded', async function() {
    const definitionsContainer = document.getElementById('word-list'); // Use 'word-list' from your HTML

    // Load CSV data and parse it
    const wordDefinitions = await fetchCSVData('definitions_example.csv'); // Adjust the path to your CSV

    // Check if there are definitions to display
    if (wordDefinitions && Array.isArray(wordDefinitions) && wordDefinitions.length > 0) {
        wordDefinitions.forEach(wordDef => {
            // Create a container for each word's definition
            const wordElement = document.createElement('div');
            wordElement.classList.add('definition-box'); // You can add styles to this class in your CSS

            // Word Header
            const wordHeader = document.createElement('div');
            wordHeader.classList.add('word-header');

            const wordTitle = document.createElement('h3');
            wordTitle.textContent = wordDef.word;
            wordHeader.appendChild(wordTitle);

            // Definition Fieldset
            const defFieldset = document.createElement('fieldset');
            defFieldset.classList.add('def-box');
            defFieldset.setAttribute('role', 'presentation');

            const defLegend = document.createElement('legend');
            defLegend.textContent = 'Definition';

            const defParagraph = document.createElement('p');
            defParagraph.classList.add('definition');
            defParagraph.textContent = wordDef.definition;

            defFieldset.appendChild(defLegend);
            defFieldset.appendChild(defParagraph);

            // Example Fieldset
            const exFieldset = document.createElement('fieldset');
            exFieldset.classList.add('example-box');
            exFieldset.setAttribute('role', 'presentation');

            const exLegend = document.createElement('legend');
            exLegend.textContent = 'Example';

            exFieldset.appendChild(exLegend);

            // Add the example sentence to the fieldset
            const exParagraph = document.createElement('p');
            exParagraph.classList.add('example');
            exParagraph.textContent = wordDef.example;
            exFieldset.appendChild(exParagraph);

            // Assemble the definition box
            wordElement.appendChild(wordHeader);
            wordElement.appendChild(defFieldset);
            wordElement.appendChild(exFieldset);

            // Append the word definition block to the main container
            definitionsContainer.appendChild(wordElement);
        });
    } else {
        // If no definitions were found, display a message
        const noDefinitionsMessage = document.createElement('p');
        noDefinitionsMessage.textContent = 'No word definitions found.';
        noDefinitionsMessage.style.textAlign = 'center';
        noDefinitionsMessage.style.fontSize = '1.2rem';
        noDefinitionsMessage.style.color = '#333';
        definitionsContainer.appendChild(noDefinitionsMessage);
    }
});

/**
 * Function to fetch CSV data
 */
async function fetchCSVData(csvPath) {
    const response = await fetch(csvPath);
    const csvText = await response.text();
    return parseCSV(csvText);
}

/**
 * Simple CSV parsing function
 * @param {string} csvText - Raw CSV text data
 * @returns {Array} Parsed array of word definitions
 */
function parseCSV(csvText) {
    const rows = csvText.trim().split('\n');
    const parsedData = [];

    // Skip the header row and process each row
    for (let i = 1; i < rows.length; i++) {
        const row = rows[i].replace(/"/g, ''); // Remove quotes
        const [word, definition, example] = row.split(','); // Split by comma

        // Create an object for the word definition
        parsedData.push({
            word: word.trim(),
            definition: definition.trim(),
            example: example.trim(),
        });
    }

    return parsedData;
}