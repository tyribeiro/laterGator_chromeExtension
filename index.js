// Array to store the list
let listArray = [];
let oldListArray = [];

// DOM elements
const input = document.getElementById("input");
const inputBtn = document.getElementById("input-btn");
const ulEl = document.getElementById("ul-el");
const deleteBtn = document.getElementById("delete-btn");
const tabBtn = document.getElementById("tab-btn");

// Get the list from the local storage
const linksFromLocalStorage = JSON.parse(localStorage.getItem("listArray"));

// If the list is not empty, then render the list
if (linksFromLocalStorage) {
  listArray = linksFromLocalStorage;
  render(listArray);
}

// Function to render the list of list
function render(list) {
  let listItem = "";
  for (let i = 0; i < list.length; i++) {
    listItem += `<li>
           <a target = '_blank' href='${list[i]}'>${list[i]}</a>
           </li>`;
  }
  ulEl.innerHTML = listItem;
}

// Event listener for the delete button
deleteBtn.addEventListener("dblclick", function () {
  localStorage.clear();
  listArray = [];
  render(listArray);
});

// Event listener for the input button
inputBtn.addEventListener("click", function () {
  listArray.push(input.value);
  render(listArray);
  input.value = "";

  localStorage.setItem("listArray", JSON.stringify(listArray));
});

// Event listener for the tab button
tabBtn.addEventListener("click", function () {
  // Get the current tab using chrome API
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    listArray.push(tabs[0].url);
    localStorage.setItem("listArray", JSON.stringify(listArray));
    render(listArray);
  });
});
