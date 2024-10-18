// js/worddefinition.js

// Wait for the DOM to fully load
document.addEventListener('DOMContentLoaded', function() {
    const definitionsContainer = document.getElementById('definitions-container');
    const listNameElement = document.getElementById('listName');
    const saveBtn = document.querySelector('.btn.save');
    const cancelBtn = document.querySelector('.btn.cancel');

    // Retrieve the word definitions from sessionStorage
    const wordDefinitions = JSON.parse(sessionStorage.getItem('wordDefinitions'));

    // Log the word definitions to the console for debugging
    console.log('Word Definitions:', wordDefinitions); // <-- Debugging line

    // Check if there are definitions to display
    if (wordDefinitions && Array.isArray(wordDefinitions) && wordDefinitions.length > 0) {
        wordDefinitions.forEach(wordDef => {
            // Check if the object contains the expected properties
            if (wordDef.word && wordDef.definition && Array.isArray(wordDef.examples)) {
                // Create a container for each word's definition
                const wordElement = document.createElement('div');
                wordElement.classList.add('definition-box');

                // Word Header
                const wordHeader = document.createElement('div');
                wordHeader.classList.add('word-header');

                const wordTitle = document.createElement('h3');
                wordTitle.textContent = wordDef.word;
                wordHeader.appendChild(wordTitle);

                const buttonsDiv = document.createElement('div');
                buttonsDiv.classList.add('buttons');

                const regenerateBtn = document.createElement('button');
                regenerateBtn.classList.add('btn', 'regenerate');
                regenerateBtn.textContent = 'Regenerate';

                const editBtn = document.createElement('button');
                editBtn.classList.add('btn', 'edit');
                editBtn.textContent = 'Edit';

                buttonsDiv.appendChild(regenerateBtn);
                buttonsDiv.appendChild(editBtn);

                wordHeader.appendChild(buttonsDiv);

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

                wordDef.examples.forEach(example => {
                    const exParagraph = document.createElement('p');
                    exParagraph.classList.add('example');
                    exParagraph.textContent = example;
                    exFieldset.appendChild(exParagraph);
                });

                // Assemble the definition box
                wordElement.appendChild(wordHeader);
                wordElement.appendChild(defFieldset);
                wordElement.appendChild(exFieldset);

                // Append the word definition block to the main container
                definitionsContainer.appendChild(wordElement);
            } else {
                console.error("Missing expected properties in API response:", wordDef);
            }
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

    // Handle Save and Cancel Buttons (Optional)
    saveBtn.addEventListener('click', function() {
        alert('Definitions saved successfully!');
        // Implement saving functionality as needed (e.g., send to server or save locally)
    });

    cancelBtn.addEventListener('click', function() {
        window.location.href = 'addwords.html'; // Redirect back to the Add Words page
    });

    // Event listener for "Regenerate" and "Edit" buttons
    definitionsContainer.addEventListener('click', async function(event) {
        if (event.target.classList.contains('regenerate')) {
            const definitionBox = event.target.closest('.definition-box');
            const word = definitionBox.querySelector('h3').textContent;

            // Fetch new data for the word
            const apiUrl = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
            try {
                const response = await fetch(apiUrl);
                if (!response.ok) {
                    throw new Error(`No definition found for "${word}".`);
                }
                const wordData = await response.json();

                // Process the fetched data
                const firstEntry = wordData[0];
                const meanings = firstEntry.meanings;

                if (Array.isArray(meanings) && meanings.length > 0) {
                    const firstMeaning = meanings[0];
                    const definitions = firstMeaning.definitions;

                    if (Array.isArray(definitions) && definitions.length > 0) {
                        const firstDefinition = definitions[0].definition;
                        const example = definitions[0].example || 'No examples available.';
                        const examplesArray = [];

                        if (definitions[0].example) {
                            examplesArray.push(definitions[0].example);
                        } else {
                            examplesArray.push('No examples available.');
                        }

                        // Update the definition and examples in the DOM
                        const defParagraph = definitionBox.querySelector('.definition');
                        defParagraph.textContent = firstDefinition;

                        const exFieldset = definitionBox.querySelector('.example-box');
                        exFieldset.innerHTML = ''; // Clear existing examples

                        const exLegend = document.createElement('legend');
                        exLegend.textContent = 'Example';
                        exFieldset.appendChild(exLegend);

                        examplesArray.forEach(example => {
                            const exParagraph = document.createElement('p');
                            exParagraph.classList.add('example');
                            exParagraph.textContent = example;
                            exFieldset.appendChild(exParagraph);
                        });

                        // Update the stored definitions in sessionStorage
                        const storedDefinitions = JSON.parse(sessionStorage.getItem('wordDefinitions'));
                        const wordIndex = storedDefinitions.findIndex(def => def.word.toLowerCase() === word.toLowerCase());
                        if (wordIndex !== -1) {
                            storedDefinitions[wordIndex].definition = firstDefinition;
                            storedDefinitions[wordIndex].examples = examplesArray;
                            sessionStorage.setItem('wordDefinitions', JSON.stringify(storedDefinitions));
                        }

                    } else {
                        // No definitions found
                        updateDefinitionBox(definitionBox, 'Definition not found.', ['No examples available.']);
                    }
                } else {
                    // No meanings found
                    updateDefinitionBox(definitionBox, 'Definition not found.', ['No examples available.']);
                }

            } catch (error) {
                console.error(error);
                alert(`There was an error fetching the definition for "${word}".`);
            }
        }

        if (event.target.classList.contains('edit')) {
            const definitionBox = event.target.closest('.definition-box');
            const wordTitle = definitionBox.querySelector('h3');
            const currentWord = wordTitle.textContent;

            // Replace the word title with an input field for editing
            const input = document.createElement('input');
            input.type = 'text';
            input.value = currentWord;
            input.id = `edit-word-${currentWord}`;
            input.style.fontSize = '1.5rem';
            input.style.width = '70%';
            wordTitle.replaceWith(input);
            input.focus();

            // Change Edit button to Save
            event.target.textContent = 'Save';
            event.target.classList.remove('edit');
            event.target.classList.add('save');

            // Handle Save button click
            event.target.addEventListener('click', async function() {
                const newWord = input.value.trim();
                if (newWord === '') {
                    alert('Word cannot be empty.');
                    return;
                }

                // Fetch new data for the updated word
                const apiUrl = `https://api.dictionaryapi.dev/api/v2/entries/en/${newWord}`;
                try {
                    const response = await fetch(apiUrl);
                    if (!response.ok) {
                        throw new Error(`No definition found for "${newWord}".`);
                    }
                    const wordData = await response.json();

                    // Process the fetched data
                    const firstEntry = wordData[0];
                    const meanings = firstEntry.meanings;

                    if (Array.isArray(meanings) && meanings.length > 0) {
                        const firstMeaning = meanings[0];
                        const definitions = firstMeaning.definitions;

                        if (Array.isArray(definitions) && definitions.length > 0) {
                            const firstDefinition = definitions[0].definition;
                            const example = definitions[0].example || 'No examples available.';
                            const examplesArray = [];

                            if (definitions[0].example) {
                                examplesArray.push(definitions[0].example);
                            } else {
                                examplesArray.push('No examples available.');
                            }

                            // Update the word title in the DOM
                            const newH3 = document.createElement('h3');
                            newH3.textContent = newWord;
                            input.replaceWith(newH3);

                            // Update the definition and examples in the DOM
                            const defParagraph = definitionBox.querySelector('.definition');
                            defParagraph.textContent = firstDefinition;

                            const exFieldset = definitionBox.querySelector('.example-box');
                            exFieldset.innerHTML = ''; // Clear existing examples

                            const exLegend = document.createElement('legend');
                            exLegend.textContent = 'Example';
                            exFieldset.appendChild(exLegend);

                            examplesArray.forEach(example => {
                                const exParagraph = document.createElement('p');
                                exParagraph.classList.add('example');
                                exParagraph.textContent = example;
                                exFieldset.appendChild(exParagraph);
                            });

                            // Update the stored definitions in sessionStorage
                            const storedDefinitions = JSON.parse(sessionStorage.getItem('wordDefinitions'));
                            const wordIndex = storedDefinitions.findIndex(def => def.word.toLowerCase() === currentWord.toLowerCase());
                            if (wordIndex !== -1) {
                                storedDefinitions[wordIndex].word = newWord;
                                storedDefinitions[wordIndex].definition = firstDefinition;
                                storedDefinitions[wordIndex].examples = examplesArray;
                                sessionStorage.setItem('wordDefinitions', JSON.stringify(storedDefinitions));
                            }

                            // Change Save button back to Edit
                            event.target.textContent = 'Edit';
                            event.target.classList.remove('save');
                            event.target.classList.add('edit');

                        } else {
                            // No definitions found
                            updateDefinitionBox(definitionBox, 'Definition not found.', ['No examples available.']);
                        }
                    } else {
                        // No meanings found
                        updateDefinitionBox(definitionBox, 'Definition not found.', ['No examples available.']);
                    }

                } catch (error) {
                    console.error(error);
                    alert(`There was an error fetching the definition for "${newWord}".`);
                }
            }, { once: true }); // Ensure the event listener is added only once
        }
    });

    /**
     * Helper function to update the definition box with new data
     * @param {HTMLElement} definitionBox - The container to update
     * @param {string} definition - The new definition
     * @param {Array} examples - The new examples array
     */
    function updateDefinitionBox(definitionBox, definition, examples) {
        // Update the definition
        const defParagraph = definitionBox.querySelector('.definition');
        defParagraph.textContent = definition;

        // Update the examples
        const exFieldset = definitionBox.querySelector('.example-box');
        exFieldset.innerHTML = ''; // Clear existing examples

        const exLegend = document.createElement('legend');
        exLegend.textContent = 'Example';
        exFieldset.appendChild(exLegend);

        examples.forEach(example => {
            const exParagraph = document.createElement('p');
            exParagraph.classList.add('example');
            exParagraph.textContent = example;
            exFieldset.appendChild(exParagraph);
        });
    }
}
