document.querySelectorAll(".definition-box").forEach(definitionBox => {
    const editBtn = definitionBox.querySelector(".edit");
    const regenBtn = definitionBox.querySelector(".regenerate");
    const regenModal = document.getElementById("regenModal");
    
    let originalContent = [];
    let isEditMode = false;
  
    // Edit button logic
    editBtn.addEventListener("click", function() {
      const editableText = definitionBox.querySelectorAll(".definition, .example");
  
      isEditMode = !isEditMode;
      editBtn.textContent = isEditMode ? "Save" : "Edit";
      regenBtn.textContent = isEditMode ? "Cancel" : "Regenerate";
  
      if (isEditMode) {
        originalContent = Array.from(editableText).map(p => p.innerHTML);
        editableText.forEach(paragraph => {
          paragraph.setAttribute("contenteditable", "true");
          paragraph.classList.add("editable-highlight");
        });
        console.log("Entering edit mode");
      } else {
        editableText.forEach(paragraph => {
          paragraph.setAttribute("contenteditable", "false");
          paragraph.classList.remove("editable-highlight");
        });
        console.log("Exiting edit mode");
      }
    });
  
    // Regenerate button logic
    regenBtn.addEventListener("click", function() {
      console.log(`Regenerate button clicked. Current button text: ${regenBtn.textContent}`);
  
      if (isEditMode) {
        // Cancel edit mode without opening the modal
        const editableText = definitionBox.querySelectorAll(".definition, .example");
        editableText.forEach((paragraph, index) => {
          paragraph.innerHTML = originalContent[index]; // Reset to original content
          paragraph.setAttribute("contenteditable", "false");
          paragraph.classList.remove("editable-highlight");
        });
  
        editBtn.textContent = "Edit"; // Change Edit button back to "Edit"
        regenBtn.textContent = "Regenerate"; // Change Regenerate button back to "Regenerate"
        isEditMode = false; // Exit edit mode
        console.log("Edit mode canceled. Original content restored.");
      } else {
        console.log("Opening regenerate modal.");
        regenModal.style.display = "block"; // Open modal
        // Optionally update modal content based on current definition
        const word = definitionBox.querySelector("h3").innerText; // Get the word
        regenModal.querySelector("h3").innerText = `How should it be different?`; // Update modal heading
        regenModal.querySelector(".regenInput").value = ""; // Clear input field
      }
    });
  
    // Cancel button in modal logic
    const cancelBtn = regenModal.querySelector(".cancel");
    cancelBtn.addEventListener("click", function() {
      console.log("Closing regenerate modal.");
      regenModal.style.display = "none"; // Close modal when Cancel is clicked
    });
  });
  
  // Close regenerate modal when clicking outside of it
  window.onclick = function(event) {
    const regenModal = document.getElementById("regenModal");
    if (event.target == regenModal) {
      regenModal.style.display = "none";
    }
  };
  
  // Hamburger menu logic
  document.getElementById("hamburger-menu").addEventListener("click", function() {
      const nav = document.querySelector("nav");
      nav.classList.toggle("nav-active");
  });