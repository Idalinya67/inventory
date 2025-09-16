// Dashboard functionality

// Chart instances
let departmentSpendingChart = null;
let inventorySummaryChart = null;
let categoryValueChart = null;

// Update Dashboard
function updateDashboard() {
    const inventory = JSON.parse(localStorage.getItem("inventory") || "[]");
    const transactions = JSON.parse(localStorage.getItem("transactions") || "[]");

    // Update summary cards
    updateSummaryCards(inventory, transactions);
    
    // Update forecasted shortages
    updateForecastedShortages(inventory);

    // Update expiring items
    updateExpiringItems(inventory);

    // Update department spending chart
    updateDepartmentSpendingChart(transactions, inventory);
}

// Update Summary Cards
function updateSummaryCards(inventory, transactions) {
    const totalItemsEl = document.getElementById("totalItems");
    const lowStockItemsEl = document.getElementById("lowStockItems");
    const totalValueEl = document.getElementById("totalValue");
    const sustainabilityScoreEl = document.getElementById("sustainabilityScore");
    const sustainabilityBarEl = document.getElementById("sustainabilityBar");

    if (totalItemsEl) {
        totalItemsEl.textContent = inventory.reduce((sum, item) => sum + item.quantity, 0).toLocaleString();
    }

    if (lowStockItemsEl) {
        const lowStockCount = inventory.filter(item => item.quantity <= item.reorderLevel).length;
        lowStockItemsEl.textContent = lowStockCount;
    }

    if (totalValueEl) {
        const totalVal = inventory.reduce((sum, item) => sum + item.price * item.quantity, 0);
        totalValueEl.textContent = `Ksh${totalVal.toLocaleString()}`;
    }

    if (sustainabilityScoreEl && sustainabilityBarEl) {
        // Calculate sustainability score
        const issuedItems = transactions.filter(t => t.type === 'issue').reduce((sum, t) => sum + t.quantity, 0);
        const expiredItems = inventory.filter(item => {
            if (!item.expiryDate) return false;
            const expiryDate = new Date(item.expiryDate);
            return expiryDate < new Date() && item.quantity > 0;
        }).reduce((sum, item) => sum + item.quantity, 0);

        const sustainability = issuedItems + expiredItems > 0 ? 
            (issuedItems / (issuedItems + expiredItems)) * 100 : 100;
            
        sustainabilityScoreEl.textContent = `${sustainability.toFixed(0)}%`;
        sustainabilityBarEl.style.width = `${sustainability}%`;

        // Set sustainability bar color based on score
        if (sustainability >= 80) {
            sustainabilityBarEl.classList.remove("bg-yellow-500", "bg-red-500");
            sustainabilityBarEl.classList.add("bg-green-500");
        } else if (sustainability >= 50) {
            sustainabilityBarEl.classList.remove("bg-green-500", "bg-red-500");
            sustainabilityBarEl.classList.add("bg-yellow-500");
        } else {
            sustainabilityBarEl.classList.remove("bg-green-500", "bg-yellow-500");
            sustainabilityBarEl.classList.add("bg-red-500");
        }
    }
}

// Update Forecasted Shortages
function updateForecastedShortages(inventory) {
    const forecastShortages = document.getElementById("forecastShortages");
    if (!forecastShortages) return;

    forecastShortages.innerHTML = "";

    inventory.forEach(item => {
        if (item.dailyUsage > 0) {
            const daysUntilOut = Math.floor(item.quantity / item.dailyUsage);

            if (daysUntilOut < 30) {
                const forecastItem = document.createElement("div");
                forecastItem.className = "p-3 mb-2 rounded-lg bg-red-100 border-l-4 border-red-500";
                forecastItem.innerHTML = `
                    <div class="flex justify-between">
                        <strong>${item.name}</strong>
                        <span>${daysUntilOut} days</span>
                    </div>
                    <div class="text-sm">Will run out in ${daysUntilOut} days at current usage rate</div>
                `;
                forecastShortages.appendChild(forecastItem);
            }
        }
    });

    if (forecastShortages.children.length === 0) {
        forecastShortages.innerHTML = '<p class="text-gray-500">No forecasted shortages in the next 30 days.</p>';
    }
}

// Update Expiring Items
function updateExpiringItems(inventory) {
    const expiringItems = document.getElementById("expiringItems");
    if (!expiringItems) return;

    expiringItems.innerHTML = "";
    const today = new Date();
    const nextMonth = new Date();
    nextMonth.setDate(today.getDate() + 30);

    inventory.forEach(item => {
        if (item.expiryDate) {
            const expiryDate = new Date(item.expiryDate);
            if (expiryDate <= nextMonth && expiryDate >= today) {
                const daysUntilExpiry = Math.floor((expiryDate - today) / (1000 * 60 * 60 * 24));

                const expiringItem = document.createElement("div");
                expiringItem.className = "p-3 mb-2 rounded-lg bg-yellow-100 border-l-4 border-yellow-500";
                expiringItem.innerHTML = `
                    <div class="flex justify-between">
                        <strong>${item.name}</strong>
                        <span>${daysUntilExpiry} days</span>
                    </div>
                    <div class="text-sm">Expires on ${new Date(item.expiryDate).toLocaleDateString()}</div>
                `;
                expiringItems.appendChild(expiringItem);
            }
        }
    });

    if (expiringItems.children.length === 0) {
        expiringItems.innerHTML = '<p class="text-gray-500">No items expiring in the next 30 days.</p>';
    }
}

// Update Department Spending Chart
function updateDepartmentSpendingChart(transactions, inventory) {
    const ctx = document.getElementById("departmentSpendingChart");
    if (!ctx) return;

    const departments = JSON.parse(localStorage.getItem("departments") || "[]");
    const departmentSpending = {};

    departments.forEach(dept => {
        departmentSpending[dept] = 0;
    });

    transactions.forEach(transaction => {
        if (transaction.type === "issue") {
            const item = inventory.find(i => i.id === transaction.itemId);
            if (item) {
                departmentSpending[transaction.department] += item.price * transaction.quantity;
            }
        }
    });

    // Destroy previous chart instance if it exists
    if (departmentSpendingChart) {
        departmentSpendingChart.destroy();
    }

    // Create new chart
    departmentSpendingChart = new Chart(ctx, {
        type: "doughnut",
        data: {
            labels: Object.keys(departmentSpending),
            datasets: [
                {
                    data: Object.values(departmentSpending),
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

// Process AI Query (for dashboard AI)
function processAIQuery(query) {
    const aiResponse = document.getElementById("aiResponse");
    if (!aiResponse) return;

    // Simple AI response simulation
    const inventory = JSON.parse(localStorage.getItem("inventory") || "[]");
    const transactions = JSON.parse(localStorage.getItem("transactions") || "[]");

    let response = "I'm not sure how to respond to that. Try asking about stock levels, trends, or recommendations.";

    if (query.toLowerCase().includes("low stock")) {
        const lowStockItems = inventory.filter(item => item.quantity <= item.reorderLevel);
        if (lowStockItems.length > 0) {
            response = `There are ${lowStockItems.length} items with low stock: `;
            response += lowStockItems.map(item => item.name).join(", ");
            response += ". You should consider reordering these items soon.";
        } else {
            response = "All items are currently well stocked. No need to worry about low inventory.";
        }
    } else if (query.toLowerCase().includes("expir") || query.toLowerCase().includes("expiry")) {
        const today = new Date();
        const nextMonth = new Date();
        nextMonth.setDate(today.getDate() + 30);

        const expiringItems = inventory.filter(item => {
            if (!item.expiryDate) return false;
            const expiryDate = new Date(item.expiryDate);
            return expiryDate <= nextMonth && expiryDate >= today;
        });

        if (expiringItems.length > 0) {
            response = `There are ${expiringItems.length} items expiring in the next 30 days: `;
            response += expiringItems.map(item => `${item.name} (expires ${new Date(item.expiryDate).toLocaleDateString()})`).join(", ");
            response += ". Consider using these items first to reduce waste.";
        } else {
            response = "No items are expiring in the next 30 days. Good job on inventory management!";
        }
    } else if (query.toLowerCase().includes("recommend") || query.toLowerCase().includes("suggestion")) {
        // Generate a random recommendation from a set of pre-defined options
        const recommendations = [
            "Based on usage patterns, you should consider increasing stock of stationery items before the start of the new semester.",
            "Your science department seems to be using lab equipment at a higher rate. Consider ordering more Bunsen burners next month.",
            "The data shows that sports equipment has low utilization. Consider promoting sports activities to increase usage.",
            "Your sustainability score is good, but could be improved by reducing expired items. Focus on using items closer to their expiry date first.",
        ];

        response = recommendations[Math.floor(Math.random() * recommendations.length)];
    } else if (query.toLowerCase().includes("value") || query.toLowerCase().includes("worth")) {
        const totalVal = inventory.reduce((sum, item) => sum + item.price * item.quantity, 0);
        response = `The total value of your inventory is Ksh${totalVal.toLocaleString()}.`;
    } else if (query.toLowerCase().includes("usage") || query.toLowerCase().includes("trend")) {
        response = "Usage trends show that stationery items are used most frequently, followed by cleaning supplies. Lab equipment has the lowest turnover rate.";
    }

    aiResponse.innerHTML = `<p class="text-gray-800">${response}</p>`;
}

// Initialize dashboard event listeners
document.addEventListener('DOMContentLoaded', function() {
    const askAI = document.getElementById("askAI");
    const aiQuery = document.getElementById("aiQuery");
    
    if (askAI && aiQuery) {
        askAI.addEventListener("click", function() {
            const query = aiQuery.value.trim();
            if (query) {
                processAIQuery(query);
            }
        });
    }
});