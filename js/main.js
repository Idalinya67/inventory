// Main application functionality
document.addEventListener('DOMContentLoaded', function() {
  // Initialize storage
  if (typeof initializeStorage === 'function') {
    initializeStorage();
  }
  
  // DOM Elements
  const sidebarToggle = document.getElementById("sidebarToggle");
  const sidebar = document.getElementById("sidebar");
  const downloadReport = document.getElementById("downloadReport");
  const contentSections = document.querySelectorAll(".content-section");
  const tabLinks = document.querySelectorAll("aside a");
  
  // Event Listeners
  if (sidebarToggle && sidebar) {
    sidebarToggle.addEventListener("click", function () {
      sidebar.classList.toggle("hidden");
      sidebar.classList.toggle("md:block");
    });
  }
  
  if (downloadReport) {
    downloadReport.addEventListener("click", function () {
      generateReport();
    });
  }
  
  // Tab navigation
  if (tabLinks.length > 0) {
    tabLinks.forEach((link) => {
      link.addEventListener("click", function (e) {
        e.preventDefault();
        const targetSection = this.classList[0].replace("-tab", "Section");
  
        // Update active tab
        tabLinks.forEach((tab) =>
          tab.classList.remove("tab-active", "bg-blue-600")
        );
        this.classList.add("tab-active", "bg-blue-600");
  
        // Show target section
        contentSections.forEach((section) => section.classList.add("hidden"));
        const targetEl = document.getElementById(targetSection);
        if (targetEl) {
          targetEl.classList.remove("hidden");
        }
  
        // Load section-specific data
        if (targetSection === "dashboardSection" && typeof updateDashboard === 'function') {
          updateDashboard();
        } else if (targetSection === "inventorySection" && typeof loadInventory === 'function') {
          loadInventory();
        } else if (targetSection === "usersSection" && typeof loadUsers === 'function') {
          loadUsers();
        } else if (targetSection === "receiptsSection" && typeof loadReceipts === 'function') {
          loadReceipts();
        } else if (targetSection === "aiAssistantSection" && typeof loadAIAssistant === 'function') {
          loadAIAssistant();
        } else if (targetSection === "timelineSection" && typeof loadTimeline === 'function') {
          loadTimeline();
        } else if (targetSection === "reportsSection" && typeof loadReports === 'function') {
          loadReports();
        } else if (targetSection === "settingsSection" && typeof loadSettings === 'function') {
          loadSettings();
        }
      });
    });
  }
  
  // Theme selectors
  const themeSelectors = document.querySelectorAll(".theme-selector");
  if (themeSelectors.length > 0) {
    themeSelectors.forEach((selector) => {
      selector.addEventListener("click", function () {
        const theme = this.getAttribute("data-theme");
        changeTheme(theme);
      });
    });
  }
});

// Functions
function generateReport() {
  // Implementation for generating a PDF report
  alert("Report generation functionality would be implemented here.");
}

function changeTheme(theme) {
  localStorage.setItem("themeColor", theme);

  // Remove all theme classes
  document.body.classList.remove(
    "theme-blue",
    "theme-green",
    "theme-purple",
    "theme-red"
  );

  // Add the selected theme class
  document.body.classList.add(`theme-${theme}`);

  // Update the theme color in various UI elements
  const colorMap = {
    blue: {
      primary: "bg-blue-500",
      hover: "hover:bg-blue-600",
      text: "text-blue-500",
    },
    green: {
      primary: "bg-green-500",
      hover: "hover:bg-green-600",
      text: "text-green-500",
    },
    purple: {
      primary: "bg-purple-500",
      hover: "hover:bg-purple-600",
      text: "text-purple-500",
    },
    red: {
      primary: "bg-red-500",
      hover: "hover:bg-red-600",
      text: "text-red-500",
    },
  };

  const colors = colorMap[theme];

  // Update buttons and other elements with theme color
  document.querySelectorAll(".tab-active").forEach((tab) => {
    tab.classList.remove(
      "bg-blue-600",
      "bg-green-600",
      "bg-purple-600",
      "bg-red-600"
    );
    tab.classList.add(colors.primary);
  });

  document.querySelectorAll("button").forEach((button) => {
    if (button.classList.contains("bg-blue-500")) {
      button.classList.remove("bg-blue-500", "hover:bg-blue-600");
      button.classList.add(colors.primary, colors.hover);
    }
  });
}

// ✅ Added AI Assistant loader
function loadAIAssistant() {
  console.log("AI Assistant loaded");
  // You can later add your actual AI UI initialization here
}
