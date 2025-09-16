// User management functionality

// DOM Elements
let addUserBtn, addUserModal, cancelAddUser, addUserForm, usersTable;

// Initialize Users
function initUsers() {
    addUserBtn = document.getElementById("addUserBtn");
    addUserModal = document.getElementById("addUserModal");
    cancelAddUser = document.getElementById("cancelAddUser");
    addUserForm = document.getElementById("addUserForm");
    usersTable = document.getElementById("usersTable");
    
    // Add event listeners
    if (addUserBtn) {
        addUserBtn.addEventListener("click", function() {
            addUserModal.classList.remove("hidden");
        });
    }
    
    if (cancelAddUser) {
        cancelAddUser.addEventListener("click", function() {
            addUserModal.classList.add("hidden");
        });
    }
    
    if (addUserForm) {
        addUserForm.addEventListener("submit", function(e) {
            e.preventDefault();
            addNewUser();
            addUserModal.classList.add("hidden");
        });
    }
}

// Load Users
function loadUsers() {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    if (!usersTable) return;
    
    usersTable.innerHTML = "";

    users.forEach((user) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${user.id}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${user.name}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${user.role}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${user.department}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${user.itemsIssued}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <button class="text-indigo-600 hover:text-indigo-900 mr-3 edit-user" data-id="${user.id}">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="text-red-600 hover:text-red-900 delete-user" data-id="${user.id}">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;

        usersTable.appendChild(row);
    });

    // Add event listeners for edit and delete buttons
    document.querySelectorAll(".edit-user").forEach((button) => {
        button.addEventListener("click", function() {
            const userId = this.getAttribute("data-id");
            editUser(userId);
        });
    });

    document.querySelectorAll(".delete-user").forEach((button) => {
        button.addEventListener("click", function() {
            const userId = this.getAttribute("data-id");
            deleteUser(userId);
        });
    });
}

// Add New User
function addNewUser() {
    const users = JSON.parse(localStorage.getItem("users") || "[]");

    const newUser = {
        id: generateId(users),
        name: document.getElementById("userName").value,
        role: document.getElementById("userRole").value,
        department: document.getElementById("userDepartment").value,
        email: document.getElementById("userEmail").value,
        itemsIssued: 0,
    };

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    // Reset form
    addUserForm.reset();

    // Update UI
    loadUsers();
}

// Edit User
function editUser(userId) {
    // Implementation for editing a user
    alert(`Edit functionality for user ${userId} would be implemented here.`);
}

// Delete User
function deleteUser(userId) {
    if (confirm("Are you sure you want to delete this user?")) {
        let users = JSON.parse(localStorage.getItem("users") || "[]");
        users = users.filter((user) => user.id !== parseInt(userId));
        localStorage.setItem("users", JSON.stringify(users));

        loadUsers();
    }
}

// Initialize users on page load
document.addEventListener('DOMContentLoaded', function() {
    initUsers();
});