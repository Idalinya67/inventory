// Authentication functionality

document.addEventListener('DOMContentLoaded', function() {
  const loginForm = document.getElementById("loginForm");
  
  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value;

      // Simple authentication (for demo purposes)
      if (username === "admin" && (password === "password123" || password === 1234 || password === "admin")) {
        document.getElementById("loginPage").classList.add("hidden");
        document.getElementById("appPage").classList.remove("hidden");
        
        // Initialize the application
        if (typeof updateDashboard === 'function') updateDashboard();
        if (typeof loadInventory === 'function') loadInventory();
        if (typeof loadUsers === 'function') loadUsers();
        if (typeof loadReceipts === 'function') loadReceipts();
        if (typeof loadTimeline === 'function') loadTimeline();
      } else {
        alert("Invalid credentials. Use admin/password123 for demo.");
      }
    });
  }
});
