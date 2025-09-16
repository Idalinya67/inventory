// Utility functions

// Initialize localStorage with sample data if not exists
function initializeStorage() {
  if (!localStorage.getItem("inventory")) {
    const sampleInventory = [
      {
        id: 1,
        code: "PEN-BL",
        name: "Blue Pens",
        category: "Stationery",
        price: 10.0,
        quantity: 100,
        reorderLevel: 20,
        expiryDate: null,
        dailyUsage: 5,
      },
     
    ];
    localStorage.setItem("inventory", JSON.stringify(sampleInventory));
  }

  if (!localStorage.getItem("users")) {
    const sampleUsers = [
      {
        id: 1,
        name: "Dr. Jane Smith",
        role: "Administrator",
        department: "Administration",
        email: "jane.kiprono@college.edu",
        itemsIssued: 15,
      },

    ];
    localStorage.setItem("users", JSON.stringify(sampleUsers));
  }

  if (!localStorage.getItem("transactions")) {
    const sampleTransactions = [
      {
        id: 1,
        itemId: 1,
        type: "receive",
        quantity: 50,
        date: "2023-09-01",
        department: "Store",
        reference: "REC-001",
        notes: "Initial stock",
      },
     
    ];
    localStorage.setItem(
      "transactions",
      JSON.stringify(sampleTransactions)
    );
  }

  if (!localStorage.getItem("departments")) {
    const sampleDepartments = [
      "Administration",
      "Business",
      "Engineering",
      "Humanities",
      "Sports",
      "Library",
      "Store",
    ];
    localStorage.setItem(
      "departments",
      JSON.stringify(sampleDepartments)
    );
  }

  if (!localStorage.getItem("emergencyMode")) {
    localStorage.setItem("emergencyMode", "false");
  }

  if (!localStorage.getItem("themeColor")) {
    localStorage.setItem("themeColor", "blue");
  }
}

// Helper function to format date
function formatDate(dateString) {
  if (!dateString) return "N/A";
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
}

// Generate a unique ID
function generateId(items) {
  return items.length > 0 ? Math.max(...items.map(item => item.id)) + 1 : 1;
}