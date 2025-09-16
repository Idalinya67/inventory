// Receipts and issues functionality

// DOM Elements
let addReceiptBtn, addReceiptModal, cancelAddReceipt, addReceiptForm, receiptItem, receiptsTable, emergencyModeToggle;

// Initialize Receipts
function initReceipts() {
    addReceiptBtn = document.getElementById("addReceiptBtn");
    addReceiptModal = document.getElementById("addReceiptModal");
    cancelAddReceipt = document.getElementById("cancelAddReceipt");
    addReceiptForm = document.getElementById("addReceiptForm");
    receiptItem = document.getElementById("receiptItem");
    receiptsTable = document.getElementById("receiptsTable");
    emergencyModeToggle = document.getElementById("emergencyModeToggle");
    
    // Add event listeners
    if (addReceiptBtn) {
        addReceiptBtn.addEventListener("click", function() {
            populateReceiptItems();
            addReceiptModal.classList.remove("hidden");
        });
    }
    
    if (cancelAddReceipt) {
        cancelAddReceipt.addEventListener("click", function() {
            addReceiptModal.classList.add("hidden");
        });
    }
    
    if (addReceiptForm) {
        addReceiptForm.addEventListener("submit", function(e) {
            e.preventDefault();
            addNewReceipt();
            addReceiptModal.classList.add("hidden");
        });
    }
    
    if (emergencyModeToggle) {
        emergencyModeToggle.addEventListener("change", function() {
            localStorage.setItem("emergencyMode", this.checked.toString());
        });
    }
}

// Load Receipts
function loadReceipts() {
    const transactions = JSON.parse(localStorage.getItem("transactions") || "[]");
    const inventory = JSON.parse(localStorage.getItem("inventory") || "[]");
    if (!receiptsTable) return;
    
    receiptsTable.innerHTML = "";

    transactions.forEach((transaction) => {
        const item = inventory.find((i) => i.id === transaction.itemId);
        if (!item) return;

        const row = document.createElement("tr");

        // Apply emergency styling if needed
        if (transaction.emergency) {
            row.classList.add("emergency-issue");
        }

        row.innerHTML = `
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${new Date(transaction.date).toLocaleDateString()}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <span class="px-2 py-1 rounded-full text-xs ${transaction.type === "receive" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}">
                    ${transaction.type === "receive" ? "Receive" : "Issue"} ${transaction.emergency ? "(EMERGENCY)" : ""}
                </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${item.code}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${item.name}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${transaction.department}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${transaction.reference}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${transaction.quantity}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <button class="text-red-600 hover:text-red-900 delete-receipt" data-id="${transaction.id}">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;

        receiptsTable.appendChild(row);
    });

    // Add event listeners for delete buttons
    document.querySelectorAll(".delete-receipt").forEach((button) => {
        button.addEventListener("click", function() {
            const receiptId = this.getAttribute("data-id");
            deleteReceipt(receiptId);
        });
    });
}

// Populate Receipt Items
function populateReceiptItems() {
    const inventory = JSON.parse(localStorage.getItem("inventory") || "[]");
    if (!receiptItem) return;
    
    receiptItem.innerHTML = '<option value="">Select Item</option>';

    inventory.forEach((item) => {
        const option = document.createElement("option");
        option.value = item.id;
        option.textContent = `${item.code} - ${item.name} (${item.quantity} available)`;
        receiptItem.appendChild(option);
    });
}

// Add New Receipt
function addNewReceipt() {
    const transactions = JSON.parse(localStorage.getItem("transactions") || "[]");
    const inventory = JSON.parse(localStorage.getItem("inventory") || "[]");
    const type = document.querySelector('input[name="receiptType"]:checked').value;
    const itemId = parseInt(document.getElementById("receiptItem").value);
    const quantity = parseInt(document.getElementById("receiptQuantity").value);
    const department = document.getElementById("receiptDepartment").value;
    const reference = document.getElementById("receiptReference").value;
    const notes = document.getElementById("receiptNotes").value;
    const emergencyMode = localStorage.getItem("emergencyMode") === "true";

    // Find the item
    const itemIndex = inventory.findIndex((item) => item.id === itemId);
    if (itemIndex === -1) {
        alert("Selected item not found.");
        return;
    }

    // Check if there's enough stock for issue
    if (type === "issue" && inventory[itemIndex].quantity < quantity) {
        if (!emergencyMode) {
            alert(`Not enough stock. Only ${inventory[itemIndex].quantity} available.`);
            return;
        } else {
            // Emergency issue - proceed with warning
            if (!confirm(`EMERGENCY ISSUE: Only ${inventory[itemIndex].quantity} available, but issuing ${quantity}. Continue?`)) {
                return;
            }
        }
    }

    // Update inventory
    if (type === "receive") {
        inventory[itemIndex].quantity += quantity;
    } else {
        inventory[itemIndex].quantity -= quantity;

        // Update user's issued items count if applicable
        const users = JSON.parse(localStorage.getItem("users") || "[]");
        // This would typically be linked to a specific user, but for simplicity we're not implementing that here
    }

    localStorage.setItem("inventory", JSON.stringify(inventory));

    // Add transaction
    const newTransaction = {
        id: generateId(transactions),
        itemId: itemId,
        type: type,
        quantity: quantity,
        date: new Date().toISOString().split("T")[0],
        department: department,
        reference: reference,
        notes: notes,
        emergency: type === "issue" && emergencyMode && inventory[itemIndex].quantity < quantity,
    };

    transactions.push(newTransaction);
    localStorage.setItem("transactions", JSON.stringify(transactions));

    // Reset form
    addReceiptForm.reset();

    // Update UI
    loadReceipts();
    if (typeof loadInventory === 'function') loadInventory();
    if (typeof updateDashboard === 'function') updateDashboard();
}

// Delete Receipt
function deleteReceipt(receiptId) {
    if (confirm("Are you sure you want to delete this transaction?")) {
        let transactions = JSON.parse(localStorage.getItem("transactions") || "[]");
        transactions = transactions.filter((transaction) => transaction.id !== parseInt(receiptId));
        localStorage.setItem("transactions", JSON.stringify(transactions));

        loadReceipts();
        if (typeof updateDashboard === 'function') updateDashboard();
    }
}

// Initialize receipts on page load
document.addEventListener('DOMContentLoaded', function() {
    initReceipts();
});