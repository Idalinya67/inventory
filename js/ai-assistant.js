// AI Assistant functionality

let aiAssistantInitialized = false;

// Initialize AI Assistant
function loadAIAssistant() {
  if (!aiAssistantInitialized) {
    const aiAssistantSection = document.getElementById("aiAssistantSection");
    
    // Load AI Assistant content
    aiAssistantSection.innerHTML = `
      <h2 class="text-2xl font-semibold text-gray-800 mb-6">AI Assistant</h2>
      
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Left Column - AI Chat Interface -->
        <div class="lg:col-span-2">
          <div class="ai-card bg-white overflow-hidden">
            <div class="gradient-bg px-6 py-4 text-white">
              <div class="flex items-center">
                <div class="w-12 h-12 rounded-full bg-white bg-opacity-20 flex items-center justify-center text-white mr-4">
                  <i class="fas fa-robot text-xl"></i>
                </div>
                <div>
                  <h2 class="text-xl font-semibold">AI Inventory Assistant</h2>
                  <p class="text-blue-100">Ask me anything about your inventory</p>
                </div>
              </div>
            </div>
            
            <div class="p-6">
              <div class="mb-6">
                <div class="flex">
                  <input type="text" id="aiAssistantQuery" placeholder="Ask something like 'What items should I reorder?'" class="flex-1 border border-gray-300 rounded-l-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <button id="askAIAssistant" class="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-r-lg font-medium">
                    <i class="fas fa-paper-plane mr-2"></i> Ask
                  </button>
                </div>
              </div>

              <div class="mb-6">
                <h3 class="font-medium text-gray-700 mb-3">Try asking:</h3>
                <div class="flex flex-wrap gap-2">
                  <div class="suggestion-chip bg-gray-100 text-gray-800 px-4 py-2 rounded-full text-sm" data-query="What items need reordering?">
                    Reorder suggestions
                  </div>
                  <div class="suggestion-chip bg-gray-100 text-gray-800 px-4 py-2 rounded-full text-sm" data-query="Show me items expiring soon">
                    Expiring soon
                  </div>
                  <div class="suggestion-chip bg-gray-100 text-gray-800 px-4 py-2 rounded-full text-sm" data-query="Which department uses the most supplies?">
                    Department usage
                  </div>
                  <div class="suggestion-chip bg-gray-100 text-gray-800 px-4 py-2 rounded-full text-sm" data-query="Generate inventory report">
                    Inventory report
                  </div>
                </div>
              </div>

              <div id="aiAssistantThinking" class="ai-thinking hidden p-5 rounded-lg mb-4 bg-blue-50">
                <div class="dot-flashing"></div>
                <span class="ml-2">Analyzing your inventory data...</span>
              </div>

              <div id="aiAssistantResponse" class="ai-response p-5 rounded-lg mb-4">
                <p class="text-gray-500">I'm ready to help you manage your inventory. Ask me anything about your stock levels, trends, or for recommendations.</p>
              </div>
            </div>
          </div>
          
          <div class="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="insight-card bg-white p-4 rounded-lg shadow">
              <div class="flex items-center mb-2">
                <div class="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600 mr-2">
                  <i class="fas fa-lightbulb"></i>
                </div>
                <h3 class="font-semibold">Smart Insight</h3>
              </div>
              <p class="text-sm text-gray-600">Based on usage patterns, you could save 15% by adjusting order quantities for lab supplies.</p>
            </div>
            
            <div class="warning-card bg-white p-4 rounded-lg shadow">
              <div class="flex items-center mb-2">
                <div class="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600 mr-2">
                  <i class="fas fa-exclamation-triangle"></i>
                </div>
                <h3 class="font-semibold">Attention Needed</h3>
              </div>
              <p class="text-sm text-gray-600">3 chemicals in the science department will expire in the next 30 days.</p>
            </div>
          </div>
        </div>
        
        <!-- Right Column - Features and Analytics -->
        <div class="space-y-6">
          <!-- AI Features -->
          <div class="ai-card bg-white p-6 rounded-lg shadow">
            <h3 class="font-semibold text-lg mb-4 text-gray-800">AI Features</h3>
            
            <div class="space-y-4">
              <div class="flex items-start">
                <div class="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-3 flex-shrink-0">
                  <i class="fas fa-chart-line"></i>
                </div>
                <div>
                  <h4 class="font-medium text-gray-800">Predictive Analytics</h4>
                  <p class="text-sm text-gray-600">Forecast demand and optimize inventory levels</p>
                </div>
              </div>
              
              <div class="flex items-start">
                <div class="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 mr-3 flex-shrink-0">
                  <i class="fas fa-robot"></i>
                </div>
                <div>
                  <h4 class="font-medium text-gray-800">Smart Suggestions</h4>
                  <p class="text-sm text-gray-600">Get AI-powered recommendations for inventory management</p>
                </div>
              </div>
              
              <div class="flex items-start">
                <div class="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 mr-3 flex-shrink-0">
                  <i class="fas fa-bell"></i>
                </div>
                <div>
                  <h4 class="font-medium text-gray-800">Automated Alerts</h4>
                  <p class="text-sm text-gray-600">Receive notifications for low stock or expiring items</p>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Quick Stats -->
          <div class="ai-card bg-white p-6 rounded-lg shadow">
            <h3 class="font-semibold text-lg mb-4 text-gray-800">Inventory Overview</h3>
            
            <div class="space-y-3">
              <div class="flex justify-between items-center">
                <span class="text-gray-600">Total Items</span>
                <span class="font-semibold" id="aiTotalItems">0</span>
              </div>
              
              <div class="flex justify-between items-center">
                <span class="text-gray-600">Low Stock Items</span>
                <span class="font-semibold text-red-600" id="aiLowStockItems">0</span>
              </div>
              
              <div class="flex justify-between items-center">
                <span class="text-gray-600">Expiring Soon</span>
                <span class="font-semibold text-yellow-600" id="aiExpiringItems">0</span>
              </div>
              
              <div class="flex justify-between items-center">
                <span class="text-gray-600">Total Categories</span>
                <span class="font-semibold" id="aiTotalCategories">0</span>
              </div>
            </div>
          </div>
          
          <!-- Recent Alerts -->
          <div class="ai-card bg-white p-6 rounded-lg shadow">
            <h3 class="font-semibold text-lg mb-4 text-gray-800">Recent Alerts</h3>
            
            <div class="space-y-3">
              <div class="alert-card bg-red-50 p-3 rounded">
                <div class="flex items-center mb-1">
                  <i class="fas fa-exclamation-circle text-red-500 mr-2"></i>
                  <span class="text-sm font-medium text-red-800">Low Stock</span>
                </div>
                <p class="text-xs text-red-600">Printer paper is below minimum stock level</p>
              </div>
              
              <div class="alert-card bg-yellow-50 p-3 rounded">
                <div class="flex items-center mb-1">
                  <i class="fas fa-clock text-yellow-500 mr-2"></i>
                  <span class="text-sm font-medium text-yellow-800">Expiring Soon</span>
                </div>
                <p class="text-xs text-yellow-600">5 chemicals expiring in the next 30 days</p>
              </div>
              
              <div class="alert-card bg-blue-50 p-3 rounded">
                <div class="flex items-center mb-1">
                  <i class="fas fa-chart-line text-blue-500 mr-2"></i>
                  <span class="text-sm font-medium text-blue-800">Usage Spike</span>
                </div>
                <p class="text-xs text-blue-600">Increased usage of lab equipment in Biology Dept</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
    
    // Add event listeners for the AI Assistant
    document.getElementById('askAIAssistant').addEventListener('click', handleAIAssistantQuery);
    
    const suggestionChips = document.querySelectorAll('.suggestion-chip');
    suggestionChips.forEach(chip => {
      chip.addEventListener('click', () => {
        document.getElementById('aiAssistantQuery').value = chip.getAttribute('data-query');
        handleAIAssistantQuery();
      });
    });
    
    // Load AI stats
    updateAIAssistantStats();
    
    aiAssistantInitialized = true;
  }
}

// Handle AI Query
function handleAIAssistantQuery() {
  const query = document.getElementById('aiAssistantQuery').value.trim();
  if (!query) return;
  
  const thinkingIndicator = document.getElementById('aiAssistantThinking');
  const aiResponse = document.getElementById('aiAssistantResponse');
  
  // Show thinking indicator
  thinkingIndicator.classList.remove('hidden');
  aiResponse.innerHTML = '';
  
  // Simulate AI processing
  setTimeout(() => {
    thinkingIndicator.classList.add('hidden');
    
    // Generate response based on query
    const response = generateAIResponse(query);
    aiResponse.innerHTML = response;
  }, 2000);
}

// Generate AI Response
function generateAIResponse(query) {
  const inventory = JSON.parse(localStorage.getItem('inventory')) || [];
  const lowStockItems = inventory.filter(item => item.quantity <= item.reorderLevel);
  const expiringItems = inventory.filter(item => {
    if (!item.expiryDate) return false;
    const expiryDate = new Date(item.expiryDate);
    const today = new Date();
    const diffTime = Math.abs(expiryDate - today);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 30;
  });
  
  // Simple pattern matching for demo purposes
  if (query.toLowerCase().includes('reorder') || query.toLowerCase().includes('low stock')) {
    if (lowStockItems.length === 0) {
      return `<p class="text-green-600 font-medium">All items are sufficiently stocked. No need to reorder anything at this time.</p>`;
    }
    
    let response = `<p class="font-medium mb-3">Based on current inventory levels, you should consider reordering these items:</p>`;
    response += `<ul class="list-disc pl-5 space-y-2">`;
    lowStockItems.forEach(item => {
      response += `<li><span class="font-medium">${item.name}</span> - Current stock: ${item.quantity} (Reorder level: ${item.reorderLevel})</li>`;
    });
    response += `</ul>`;
    return response;
  }
  
  if (query.toLowerCase().includes('expir') || query.toLowerCase().includes('soon')) {
    if (expiringItems.length === 0) {
      return `<p class="text-green-600 font-medium">No items are expiring in the next 30 days.</p>`;
    }
    
    let response = `<p class="font-medium mb-3">These items will expire in the next 30 days:</p>`;
    response += `<ul class="list-disc pl-5 space-y-2">`;
    expiringItems.forEach(item => {
      response += `<li><span class="font-medium">${item.name}</span> - Expires on: ${formatDate(item.expiryDate)}</li>`;
    });
    response += `</ul>`;
    return response;
  }
  
  if (query.toLowerCase().includes('report') || query.toLowerCase().includes('summary')) {
    const totalItems = inventory.reduce((sum, item) => sum + item.quantity, 0);
    const totalValue = inventory.reduce((sum, item) => sum + (item.quantity * item.price), 0);
    
    return `
      <p class="font-medium mb-3">Inventory Summary Report:</p>
      <ul class="space-y-2">
        <li><span class="font-medium">Total Items:</span> ${totalItems}</li>
        <li><span class="font-medium">Total Inventory Value:</span> Ksh${totalValue.toFixed(2)}</li>
        <li><span class="font-medium">Low Stock Items:</span> ${lowStockItems.length}</li>
        <li><span class="font-medium">Expiring Soon:</span> ${expiringItems.length}</li>
      </ul>
      <p class="mt-3 text-sm text-gray-600">For a detailed report, visit the Reports section.</p>
    `;
  }
  
  if (query.toLowerCase().includes('department') || query.toLowerCase().includes('usage')) {
    const transactions = JSON.parse(localStorage.getItem('transactions')) || [];
    const deptUsage = {};
    
    transactions.forEach(transaction => {
      if (transaction.type === 'issue') {
        if (!deptUsage[transaction.department]) {
          deptUsage[transaction.department] = 0;
        }
        deptUsage[transaction.department] += 1;
      }
    });
    
    let response = `<p class="font-medium mb-3">Items Issued by Department:</p>`;
    response += `<ul class="space-y-2">`;
    for (const dept in deptUsage) {
      response += `<li><span class="font-medium">${dept}:</span> ${deptUsage[dept]} items issued</li>`;
    }
    response += `</ul>`;
    return response;
  }
  
  // Default response for unrecognized queries
  return `
    <p class="font-medium">I can help you with:</p>
    <ul class="list-disc pl-5 mt-2 space-y-1">
      <li>Low stock alerts and reordering suggestions</li>
      <li>Items that are expiring soon</li>
      <li>Inventory summary reports</li>
      <li>Department-wise usage analysis</li>
    </ul>
    <p class="mt-3">Try asking about any of these topics!</p>
  `;
}

// Update AI Stats
function updateAIAssistantStats() {
  const inventory = JSON.parse(localStorage.getItem('inventory')) || [];
  const lowStockItems = inventory.filter(item => item.quantity <= item.reorderLevel);
  const expiringItems = inventory.filter(item => {
    if (!item.expiryDate) return false;
    const expiryDate = new Date(item.expiryDate);
    const today = new Date();
    const diffTime = Math.abs(expiryDate - today);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 30;
  });
  
  // Get unique categories
  const categories = new Set(inventory.map(item => item.category));
  
  // Update the stats in the UI
  if (document.getElementById('aiTotalItems')) {
    document.getElementById('aiTotalItems').textContent = inventory.length;
  }
  if (document.getElementById('aiLowStockItems')) {
    document.getElementById('aiLowStockItems').textContent = lowStockItems.length;
  }
  if (document.getElementById('aiExpiringItems')) {
    document.getElementById('aiExpiringItems').textContent = expiringItems.length;
  }
  if (document.getElementById('aiTotalCategories')) {
    document.getElementById('aiTotalCategories').textContent = categories.size;
  }
}