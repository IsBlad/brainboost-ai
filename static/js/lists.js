document.addEventListener('DOMContentLoaded', function() {
    // ... existing code ...
    adjustCardTitles();
});

// Add resize listener to handle window resizing
window.addEventListener('resize', adjustCardTitles); 

function adjustCardTitles() {
    const cardTitles = document.querySelectorAll('.card h2');
    
    cardTitles.forEach(title => {
        const card = title.closest('.card');
        const cardWidth = card.clientWidth;
        let fontSize = 24; // Starting font size in pixels
        
        // Reset font size to measure natural width
        title.style.fontSize = `${fontSize}px`;
        
        // Reduce font size until text fits in one line
        while (title.scrollWidth > cardWidth - 40 && fontSize > 12) { // 40px for padding
            fontSize--;
            title.style.fontSize = `${fontSize}px`;
        }
    });
} 