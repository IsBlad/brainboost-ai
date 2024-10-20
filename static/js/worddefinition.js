// Event listener for form submission
form.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission

    if (validateInputs()) {
        // If inputs are valid, proceed with redirection

        // Get the input values
        const listName = listNameInput.value.trim();

        // Debugging: Log the values (optional)
        console.log('List Name:', listName);

        // Encode the parameters to ensure they're URL-safe
        const encodedListName = encodeURIComponent(listName);

        // Redirect to the next page with query parameters
        window.location.href = `/reviewdefinitions?list=${encodedListName}`;
    }
});