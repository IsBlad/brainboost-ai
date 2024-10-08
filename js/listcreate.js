function openTab(evt, tabName) {
    // Get all elements with class="form-container" and hide them
    const forms = document.querySelectorAll('.form-container');
    forms.forEach(form => form.style.display = "none");

    // Get all elements with class="tablinks" and remove the class "active"
    const tablinks = document.querySelectorAll('.tablinks');
    tablinks.forEach(link => link.classList.remove("active"));

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.classList.add("active");
  }

  // By default, show the AI tab when the page loads
  document.getElementById('aiTab').style.display = 'block';