// Inventory management functionality

// DOM Elements
let addItemBtn, addItemModal, cancelAddItem, addItemForm, inventoryTable;

// Initialize Inventory
function initInventory() {
    addItemBtn = document.getElementById("addItemBtn");
    addItemModal = document.getElementById("addItemModal");
    cancelAddItem = document.getElementById("cancelAddItem");
    addItemForm = document.getElementById("addItemForm");
    inventoryTable = document.getElementById("inventoryTable");
    
    // Add event listeners
    if (addItemBtn) {
        addItemBtn.addEventListener("click", function() {
            addItemModal.classList.remove("hidden");
        });
    }
    
    if (cancelAddItem) {
        cancelAddItem.addEventListener("click", function() {
            addItemModal.classList.add("hidden");
        });
    }
    
    if (addItemForm) {
        addItemForm.addEventListener("submit", function(e) {
            e.preventDefault();
            addNewItem();
            addItemModal.classList.add("hidden");
        });
    }
}

// Load Inventory
function loadInventory() {
    const inventory = JSON.parse(localStorage.getItem("inventory") || "[]");
    if (!inventoryTable) return;
    
    inventoryTable.innerHTML = "";

    inventory.forEach((item) => {
        const row = document.createElement("tr");

        // Apply styling for low stock items
        if (item.quantity <= item.reorderLevel) {
            row.classList.add("low-stock");
        }

        // Check if item is expiring soon
        if (item.expiryDate) {
            const today = new Date();
            const expiryDate = new Date(item.expiryDate);
            const daysUntilExpiry = Math.floor((expiryDate - today) / (1000 * 60 * 60 * 24));

            if (daysUntilExpiry <= 30 && daysUntilExpiry >= 0) {
                row.classList.add("expiring-soon");
            }
        }

        row.innerHTML = `
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${item.code}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${item.name}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${item.category}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Ksh${item.price.toFixed(2)}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${item.quantity}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${item.expiryDate ? new Date(item.expiryDate).toLocaleDateString() : "N/A"}</td>
            <td class="px-6 py-4 whitespace-nowrap">
                <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${item.quantity > item.reorderLevel ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}">
                    ${item.quantity > item.reorderLevel ? "In Stock" : "Low Stock"}
                </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <button class="text-indigo-600 hover:text-indigo-900 mr-3 edit-item" data-id="${item.id}">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="text-red-600 hover:text-red-900 delete-item" data-id="${item.id}">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;

        inventoryTable.appendChild(row);
    });

    // Add event listeners for edit and delete buttons
    document.querySelectorAll(".edit-item").forEach((button) => {
        button.addEventListener("click", function() {
            const itemId = this.getAttribute("data-id");
            editItem(itemId);
        });
    });

    document.querySelectorAll(".delete-item").forEach((button) => {
        button.addEventListener("click", function() {
            const itemId = this.getAttribute("data-id");
            deleteItem(itemId);
        });
    });
}

// Add New Item
function addNewItem() {
    const inventory = JSON.parse(localStorage.getItem("inventory") || "[]");

    const newItem = {
        id: generateId(inventory),
        code: document.getElementById("itemCode").value,
        name: document.getElementById("itemName").value,
        category: document.getElementById("itemCategory").value,
        price: parseFloat(document.getElementById("itemPrice").value),
        quantity: parseInt(document.getElementById("itemQuantity").value),
        reorderLevel: parseInt(document.getElementById("itemReorderLevel").value),
        expiryDate: document.getElementById("itemExpiryDate").value || null,
        dailyUsage: 0, // Default value, will be calculated based on usage
    };

    inventory.push(newItem);
    localStorage.setItem("inventory", JSON.stringify(inventory));

    // Reset form
    addItemForm.reset();

    // Update UI
    loadInventory();
    if (typeof updateDashboard === 'function') updateDashboard();
}

// Edit Item
function editItem(itemId) {
    // Implementation for editing an item
    alert(`Edit functionality for item ${itemId} would be implemented here.`);
}

// Delete Item
function deleteItem(itemId) {
    if (confirm("Are you sure you want to delete this item?")) {
        let inventory = JSON.parse(localStorage.getItem("inventory") || "[]");
        inventory = inventory.filter((item) => item.id !== parseInt(itemId));
        localStorage.setItem("inventory", JSON.stringify(inventory));

        loadInventory();
        if (typeof updateDashboard === 'function') updateDashboard();
    }
}

// Initialize inventory on page load
document.addEventListener('DOMContentLoaded', function() {
    initInventory();
});