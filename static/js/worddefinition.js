document.querySelectorAll(".definition-box").forEach(definitionBox => {
  const editBtn = definitionBox.querySelector(".edit");
  const regenBtn = definitionBox.querySelector(".regenerate");
  
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
    } else {
      editableText.forEach(paragraph => {
        paragraph.setAttribute("contenteditable", "false");
        paragraph.classList.remove("editable-highlight");
      });
    }
  });

  // Regenerate / Cancel button logic
  regenBtn.addEventListener("click", function() {
    if (isEditMode) {
      // Cancel edit mode without showing the alert
      const editableText = definitionBox.querySelectorAll(".definition, .example");
      editableText.forEach((paragraph, index) => {
        paragraph.innerHTML = originalContent[index]; // Reset to original content
        paragraph.setAttribute("contenteditable", "false");
        paragraph.classList.remove("editable-highlight");
      });

      editBtn.textContent = "Edit"; // Reset button text
      regenBtn.textContent = "Regenerate";
      isEditMode = false; // Exit edit mode
    } else {
      // Show alert instead of opening modal
      alert("Feature coming soon!");
      
      // Code for the modal window
      // regenModal.style.display = "block"; // Open modal
      // Optionally update modal content based on current definition
      // const word = definitionBox.querySelector("h3").innerText; // Get the word
      // regenModal.querySelector("h3").innerText = `How should it be different?`; // Update modal heading
      // regenModal.querySelector(".regenInput").value = ""; // Clear input field
    }
  });

  // Cancel button in modal logic (if the modal is uncommented in the future)
  const cancelBtn = document.getElementById("regenModal")?.querySelector(".cancel");
  if (cancelBtn) {
    cancelBtn.addEventListener("click", function() {
      console.log("Closing regenerate modal.");
      regenModal.style.display = "none"; // Close modal when Cancel is clicked
    });
  }
});