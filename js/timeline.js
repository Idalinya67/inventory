// Timeline functionality

// Load Timeline
function loadTimeline() {
    const timelineContainer = document.getElementById("timelineContainer");
    if (!timelineContainer) return;
    
    const transactions = JSON.parse(localStorage.getItem("transactions") || "[]");
    const inventory = JSON.parse(localStorage.getItem("inventory") || "[]");
    
    timelineContainer.innerHTML = "";

    // Sort transactions by date (newest first)
    const sortedTransactions = [...transactions].sort(
        (a, b) => new Date(b.date) - new Date(a.date)
    );

    sortedTransactions.forEach((transaction) => {
        const item = inventory.find((i) => i.id === transaction.itemId);
        if (!item) return;

        const timelineItem = document.createElement("div");
        timelineItem.className = "timeline-item";

        timelineItem.innerHTML = `
            <div class="timeline-dot"></div>
            <div class="bg-white p-4 rounded-lg shadow">
                <div class="flex justify-between items-center mb-2">
                    <span class="font-semibold">${transaction.type === "receive" ? "Received" : "Issued"} ${transaction.quantity} ${item.name}</span>
                    <span class="text-sm text-gray-500">${new Date(transaction.date).toLocaleDateString()}</span>
                </div>
                <p class="text-sm text-gray-600">
                    ${transaction.type === "receive" ? "Added to" : "Taken from"} ${transaction.department} ${transaction.notes ? `- ${transaction.notes}` : ""}
                </p>
                ${transaction.emergency ? '<span class="inline-block mt-2 px-2 py-1 text-xs bg-red-100 text-red-800 rounded">EMERGENCY ISSUE</span>' : ""}
            </div>
        `;

        timelineContainer.appendChild(timelineItem);
    });
}