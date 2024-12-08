// Get the necessary DOM elements
const inputItem = document.getElementById('input-item');
const addItemBtn = document.getElementById('add-item-btn');
const listContainer = document.getElementById('list-container');
const clearAllBtn = document.getElementById('clear-all-btn');

// Initialize an empty shopping list array
let shoppingList = [];

// Function to render the shopping list on the UI
function renderList() {
    listContainer.innerHTML = ''; // Clear the current list
    shoppingList.forEach((item, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = item.name;
        if (item.purchased) {
            listItem.classList.add('strikethrough');
        }

        // Toggle the purchased state on click
        listItem.addEventListener('click', () => togglePurchased(index));

        // Add list item to the DOM
        listContainer.appendChild(listItem);
    });

    // Save the list to local storage
    localStorage.setItem('shoppingList', JSON.stringify(shoppingList));
}

// Toggle item purchased status
function togglePurchased(index) {
    shoppingList[index].purchased = !shoppingList[index].purchased;
    renderList(); // Re-render the list
}

// Add item to the shopping list
addItemBtn.addEventListener('click', () => {
    const itemName = inputItem.value.trim();
    if (itemName) {
        shoppingList.push({ name: itemName, purchased: false });
        inputItem.value = ''; // Clear input field
        renderList(); // Re-render the list
    }
});

// Clear all items from the list
clearAllBtn.addEventListener('click', () => {
    shoppingList = []; // Empty the array
    renderList(); // Re-render the list
});

// Load shopping list from local storage (if any)
window.onload = () => {
    const savedList = JSON.parse(localStorage.getItem('shoppingList'));
    if (savedList) {
        shoppingList = savedList;
        renderList();
    }
};
