// Customer Management JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initializeCustomerPage();
});

function initializeCustomerPage() {
    // Filter tabs
    const filterTabs = document.querySelectorAll('.filter-tab');
    filterTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            filterTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            filterCustomers(this.dataset.filter);
        });
    });

    // Search functionality
    const searchInput = document.getElementById('searchInput');
    const clearSearch = document.getElementById('clearSearch');
    
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        clearSearch.style.display = searchTerm ? 'block' : 'none';
        performSearch(searchTerm);
    });
    
    clearSearch.addEventListener('click', function() {
        searchInput.value = '';
        this.style.display = 'none';
        performSearch('');
    });

    // Select all checkbox
    const selectAll = document.getElementById('selectAll');
    const rowCheckboxes = document.querySelectorAll('.row-checkbox');
    
    selectAll.addEventListener('change', function() {
        rowCheckboxes.forEach(checkbox => {
            checkbox.checked = this.checked;
        });
    });
    
    rowCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const allChecked = Array.from(rowCheckboxes).every(cb => cb.checked);
            const anyChecked = Array.from(rowCheckboxes).some(cb => cb.checked);
            selectAll.checked = allChecked;
            selectAll.indeterminate = anyChecked && !allChecked;
        });
    });

    // Menu buttons
    const menuButtons = document.querySelectorAll('.btn-menu');
    menuButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            showContextMenu(e, this.dataset.id);
        });
    });

    // Create new customer button
    const createBtn = document.getElementById('createBtn');
    createBtn.addEventListener('click', function() {
        // Navigate to customer create page
        window.location.href = 'customer-create.html';
    });

    // Import button
    const importBtn = document.getElementById('importBtn');
    importBtn.addEventListener('click', function() {
        alert('กำลังพัฒนาฟังก์ชันนำเข้ารายชื่อ');
    });

    // Copy list button
    const copyListBtn = document.getElementById('copyListBtn');
    copyListBtn.addEventListener('click', function() {
        copyTableToClipboard();
    });

    // Close context menu when clicking outside
    document.addEventListener('click', function() {
        hideContextMenu();
    });

    // Pagination
    setupPagination();
}

function filterCustomers(filter) {
    const rows = document.querySelectorAll('#customersTableBody tr');
    
    rows.forEach(row => {
        const type = row.dataset.type;
        
        if (filter === 'all') {
            row.style.display = '';
        } else if (filter === type) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
}

function performSearch(searchTerm) {
    const rows = document.querySelectorAll('#customersTableBody tr');
    
    rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        if (text.includes(searchTerm)) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
}

function showContextMenu(e, customerId) {
    const contextMenu = document.getElementById('contextMenu');
    const x = e.pageX;
    const y = e.pageY;
    
    contextMenu.style.display = 'block';
    contextMenu.style.left = x + 'px';
    contextMenu.style.top = y + 'px';
    
    // Store customer ID for later use
    contextMenu.dataset.customerId = customerId;
    
    // Add event listeners to menu items
    const menuItems = contextMenu.querySelectorAll('.context-menu-item');
    menuItems.forEach(item => {
        item.onclick = function() {
            handleContextMenuAction(this, customerId);
        };
    });
}

function hideContextMenu() {
    const contextMenu = document.getElementById('contextMenu');
    contextMenu.style.display = 'none';
}

function handleContextMenuAction(item, customerId) {
    const text = item.textContent.trim();
    
    switch(text) {
        case 'ดูรายละเอียด':
            // window.location.href = `customer-detail.html?id=${customerId}`;
            alert(`ดูรายละเอียดลูกค้า ID: ${customerId}`);
            break;
        case 'แก้ไข':
            // window.location.href = `customer-edit.html?id=${customerId}`;
            alert(`แก้ไขลูกค้า ID: ${customerId}`);
            break;
        case 'ทำสำเนา':
            alert(`ทำสำเนาลูกค้า ID: ${customerId}`);
            break;
        case 'ลบ':
            if (confirm('คุณต้องการลบลูกค้ารายนี้หรือไม่?')) {
                alert(`ลบลูกค้า ID: ${customerId}`);
            }
            break;
    }
    
    hideContextMenu();
}

function copyTableToClipboard() {
    const table = document.querySelector('.data-table');
    let text = '';
    
    // Get headers
    const headers = table.querySelectorAll('thead th');
    headers.forEach((header, index) => {
        if (index > 0 && index < headers.length - 1) { // Skip checkbox and actions
            text += header.textContent.trim() + '\t';
        }
    });
    text += '\n';
    
    // Get visible rows
    const rows = table.querySelectorAll('tbody tr');
    rows.forEach(row => {
        if (row.style.display !== 'none') {
            const cells = row.querySelectorAll('td');
            cells.forEach((cell, index) => {
                if (index > 0 && index < cells.length - 1) { // Skip checkbox and actions
                    text += cell.textContent.trim() + '\t';
                }
            });
            text += '\n';
        }
    });
    
    // Copy to clipboard
    navigator.clipboard.writeText(text).then(() => {
        // Show success message
        const btn = document.getElementById('copyListBtn');
        const originalHTML = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-check"></i>';
        btn.style.color = '#10b981';
        
        setTimeout(() => {
            btn.innerHTML = originalHTML;
            btn.style.color = '';
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy:', err);
        alert('ไม่สามารถคัดลอกได้');
    });
}

function setupPagination() {
    const pageButtons = document.querySelectorAll('.page-btn');
    
    pageButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            if (this.id || this.querySelector('i')) {
                // Navigation button
                return;
            }
            
            // Page number button
            pageButtons.forEach(b => {
                if (!b.id && !b.querySelector('i')) {
                    b.classList.remove('active');
                }
            });
            this.classList.add('active');
            
            // Load page data here
            console.log('Loading page:', this.textContent);
        });
    });
}
