// Function to get query parameters from the URL
function getQueryParams() {
    const params = {};
    window.location.search
      .substring(1)
      .split("&")
      .forEach(param => {
        const [key, value] = param.split("=");
        params[key] = decodeURIComponent(value);
      });
    return params;
  }
  
  // Extract listName and wordCount from the URL
  const queryParams = getQueryParams();
  const listName = queryParams.listName;
  let wordCount = parseInt(queryParams.wordCount); // Initialize wordCount from the query
  
  // Set the list title
  document.getElementById('listTitle').textContent = `List: ${listName}`;
  
  // Function to add a word input field
  function addWordInput(count) {
    const wordInputsDiv = document.getElementById('wordInputs');
  
    const label = document.createElement('label');
    label.textContent = `Word ${count}:`;
  
    const input = document.createElement('input');
    input.type = 'text';
    input.name = `word${count}`;
    input.required = true;
  
    // Append label and input to the div
    wordInputsDiv.appendChild(label);
    wordInputsDiv.appendChild(input);
    wordInputsDiv.appendChild(document.createElement('br')); // Line break for styling
  }
  
  // Generate initial input fields for words based on the wordCount
  for (let i = 1; i <= wordCount; i++) {
    addWordInput(i);
  }
  
  // Handle the Add Word button click event
  document.getElementById('addWordBtn').addEventListener('click', function() {
    wordCount++; // Increment word count
    addWordInput(wordCount); // Add a new word input field
  });
  
  // Handle form submission (this part can interact with your backend API)
  document.getElementById('wordListForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission
  
    const formData = new FormData(event.target); // Get all form data
    const words = [];
  
    for (let i = 1; i <= wordCount; i++) {
      words.push(formData.get(`word${i}`)); // Get each word input
    }
  
    // Example of sending the list of words to your backend for definitions
    fetch('https://your-backend-api-url.com/get-definitions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        listName: listName,
        words: words
      })
    })
    .then(response => response.json())
    .then(data => {
      // Do something with the returned definitions
      console.log(data); // For now, just log the response
      // You can display the definitions in the UI or handle them in some way
    })
    .catch(error => {
      console.error('Error:', error);
    });
  });