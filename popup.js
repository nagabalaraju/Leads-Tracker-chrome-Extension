document.addEventListener('DOMContentLoaded', function () {
  var saveButton = document.getElementById('saveButton');
  var userInput = document.getElementById('userInput');
  var saveInputButton = document.getElementById('saveInputButton');
  var tabsList = document.getElementById('tabsList');
  var deleteButton = document.getElementById('deleteButton');

  // Display saved tabs and inputs on extension popup open
  displaySavedTabs();
  displaySavedInputs();

  saveButton.addEventListener('click', function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      var currentUrl = tabs[0].url;
      saveLink(currentUrl);
      // Refresh the displayed tabs
      displaySavedTabs();
    });
  });

  saveInputButton.addEventListener('click', function () {
    var inputText = userInput.value.trim();
    if (inputText !== "") {
      saveInput(inputText);
      // Refresh the displayed inputs
      displaySavedInputs();
      // Clear the input field
      userInput.value = "";
    }
  });

  function displaySavedTabs() {
    // Get and display saved tabs
    var savedLinks = JSON.parse(localStorage.getItem('savedLinks')) || [];
    tabsList.innerHTML = '';
    savedLinks.forEach(function (link) {
      var li = document.createElement('li');
      var a = document.createElement('a');
      a.href = link;
      a.textContent = link;
      a.target = '_blank'; // Open link in a new tab
      li.appendChild(a);
      tabsList.appendChild(li);
    });
  }

  function displaySavedInputs() {
    // Get and display saved inputs
    var savedInputs = JSON.parse(localStorage.getItem('savedInputs')) || [];
    savedInputs.forEach(function (input) {
      var li = document.createElement('li');
      var a = document.createElement('a');
      a.href = input;
      a.target = '_blank'; // Open link in a new tab
      a.textContent = "Input: " + input;

      li.appendChild(a);
      tabsList.appendChild(li);
    });
  }

  function saveLink(link) {
    // Get existing saved links or initialize an empty array
    var savedLinks = JSON.parse(localStorage.getItem('savedLinks')) || [];
    // Add the current link to the array
    savedLinks.push(link);
    // Save the updated array back to local storage
    localStorage.setItem('savedLinks', JSON.stringify(savedLinks));
    console.log("Saved link: " + link);
  }

  function saveInput(input) {
    // Get existing saved inputs or initialize an empty array
    var savedInputs = JSON.parse(localStorage.getItem('savedInputs')) || [];
    // Add the current input to the array
    savedInputs.push(input);
    // Save the updated array back to local storage
    localStorage.setItem('savedInputs', JSON.stringify(savedInputs));
    console.log("Saved input: " + input);
  }

  deleteButton.addEventListener('click', function () {
    localStorage.removeItem('savedLinks');
    localStorage.removeItem('savedInputs');
    // Refresh the displayed tabs and inputs
    displaySavedTabs();
    displaySavedInputs();
    console.log("All saved data deleted");
  });
});

