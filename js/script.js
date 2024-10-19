document.getElementById("hamburger-menu").addEventListener("click", function() {
    const nav = document.querySelector("nav");
    nav.classList.toggle("nav-active");
});

// Get the modal, button, and close span
var modal = document.getElementById("loginModal");
var btn = document.getElementById("loginBtn");
var span = document.getElementsByClassName("close");

// When the user clicks the login button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on the close (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}
