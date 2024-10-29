// Check if the script is loaded
console.log("script.js is loaded and running");

// Hamburger menu
document.getElementById("hamburger-menu").addEventListener("click", function() {
    const nav = document.querySelector("nav");
    nav.classList.toggle("nav-active");
});

// Get the modal
const modal = document.getElementById("loginModal");

// Get the button that opens the modal
const loginBtn = document.getElementById("login-btn");

// Get the <span> element that closes the modal
const closeBtn = document.querySelector(".close");

// When the user clicks the button, open the modal
loginBtn.onclick = function() {
  modal.style.display = "block";
}


// When the user clicks on <span> x, close the modal
closeBtn.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

// Form submission alert
document.getElementById("loginForm").onsubmit = function(event) {
  event.preventDefault(); // Prevents page reload
  alert("Feature coming soon!");
  modal.style.display = "none"; // Closes modal after submission
}
