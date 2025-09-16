// Reports functionality

// Chart instances
let inventorySummaryChart = null;
let categoryValueChart = null;

// Load Reports
function loadReports() {
    const inventory = JSON.parse(localStorage.getItem("inventory") || "[]");
    const transactions = JSON.parse(localStorage.getItem("transactions") || "[]");

    // Update inventory summary chart
    updateInventorySummaryChart(inventory);

    // Update category value chart
    updateCategoryValueChart(inventory);
}

// Update Inventory Summary Chart
function updateInventorySummaryChart(inventory) {
    const ctx = document.getElementById("inventorySummaryChart");
    if (!ctx) return;
    
    const categories = [...new Set(inventory.map((item) => item.category))];
    const categoryCounts = {};

    categories.forEach((category) => {
        categoryCounts[category] = inventory.filter(
            (item) => item.category === category
        ).length;
    });

    // Destroy previous chart instance if it exists
    if (inventorySummaryChart) {
        inventorySummaryChart.destroy();
    }

    // Create new chart
    inventorySummaryChart = new Chart(ctx, {
        type: "bar",
        data: {
            labels: categories,
            datasets: [
                {
                    label: "Number of Items",
                    data: Object.values(categoryCounts),
                    backgroundColor: "#3b82f6",
                    borderWidth: 0,
                },
            ],
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false,
                },
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        precision: 0
                    },
                    grid: {
                        color: "#e5e7eb",
                    },
                },
                x: {
                    ticks: {
                        color: "#374151",
                    },
                    grid: {
                        display: false,
                    },
                },
            },
            animation: {
                duration: 1000,
                easing: "easeOutQuart",
            },
        },
    });
}

// Update Category Value Chart
function updateCategoryValueChart(inventory) {
    const ctx = document.getElementById("categoryValueChart");
    if (!ctx) return;
    
    const categories = [...new Set(inventory.map((item) => item.category))];
    const categoryValues = {};

    categories.forEach((category) => {
        categoryValues[category] = inventory
            .filter((item) => item.category === category)
            .reduce((sum, item) => sum + item.price * item.quantity, 0);
    });

    // Destroy previous chart instance if it exists
    if (categoryValueChart) {
        categoryValueChart.destroy();
    }

    // Create new chart
    categoryValueChart = new Chart(ctx, {
        type: "pie",
        data: {
            labels: categories,
            datasets: [
                {
                    data: Object.values(categoryValues),
                    backgroundColor: [
                        "#3b82f6",
                        "#10b981",
                        "#8b5cf6",
                        "#f59e0b",
                        "#ef4444",
                        "#ec4899",
                        "#06b6d4",
                    ],
                    borderWidth: 0,
                },
            ],
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: "right",
                    labels: {
                        font: {
                            size: 11,
                        },
                    },
                },
                tooltip: {
                    callbacks: {
                        label: function (context) {
                            return `Ksh${context.raw.toLocaleString()}`;
                        },
                    },
                },
            },
            animation: {
                duration: 1000,
                easing: "easeOutQuart",
            },
        },
    });
}