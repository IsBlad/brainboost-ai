document.getElementById('listForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form from submitting the traditional way
  
    // Get the values from the form
    const listName = document.getElementById('listName').value;
    const wordCount = document.getElementById('wordCount').value;
  
    // Redirect to the second page with the list name and word count as query parameters
    window.location.href = `addwords.html?listName=${encodeURIComponent(listName)}&wordCount=${wordCount}`;
  });





