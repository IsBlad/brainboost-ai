document.addEventListener('DOMContentLoaded', function () {
    console.log("Script is loaded and running");
    const urlParams = new URLSearchParams(window.location.search);
    const listValue = urlParams.get('list'); // Get the value of the 'list' parameter

    function updateListName() {
        const listNameElement = document.getElementById('listName');
        if (listNameElement && listValue) {
            listNameElement.textContent = listValue;
        } else {
            // Retry after a short delay if the element isn't there yet
            setTimeout(updateListName, 100);
        }
        console.log("List value from URL:", listValue);
    }

    updateListName(); // Start the process
});