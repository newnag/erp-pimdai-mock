// Pending Orders Management JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initializePendingOrdersPage();
});

function initializePendingOrdersPage() {
    // Filter tabs
    const filterTabs = document.querySelectorAll('.filter-tab');
    filterTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            filterTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            filterOrders(this.dataset.filter);
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

    // Status change
    const statusSelects = document.querySelectorAll('.status-select');
    statusSelects.forEach(select => {
        select.addEventListener('change', function() {
            const newStatus = this.value;
            const row = this.closest('tr');
            row.dataset.status = newStatus;
            
            // Update select styling
            this.className = `status-select status-${newStatus}`;
            
            console.log('Status changed to:', newStatus);
        });
    });

    // Copy icons
    const copyIcons = document.querySelectorAll('.btn-copy-icon');
    copyIcons.forEach(icon => {
        icon.addEventListener('click', function(e) {
            e.stopPropagation();
            const docNumber = this.previousElementSibling.textContent;
            copyToClipboard(docNumber, this);
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

    // Create button
    const createBtn = document.getElementById('createBtn');
    createBtn.addEventListener('click', function() {
        alert('กำลังพัฒนาฟังก์ชันสร้างใบสั่งซื้อใหม่');
    });

    // Print button
    const printBtn = document.getElementById('printBtn');
    printBtn.addEventListener('click', function() {
        window.print();
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

function filterOrders(filter) {
    const rows = document.querySelectorAll('#ordersTableBody tr');
    
    rows.forEach(row => {
        const status = row.dataset.status;
        
        if (filter === 'all') {
            row.style.display = '';
        } else if (filter === status) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
}

function performSearch(searchTerm) {
    const rows = document.querySelectorAll('#ordersTableBody tr');
    
    rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        if (text.includes(searchTerm)) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
}

function copyToClipboard(text, button) {
    navigator.clipboard.writeText(text).then(() => {
        const originalHTML = button.innerHTML;
        button.innerHTML = '<i class="fas fa-check" style="color: #10b981;"></i>';
        
        setTimeout(() => {
            button.innerHTML = originalHTML;
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy:', err);
    });
}

function showContextMenu(e, orderId) {
    const contextMenu = document.getElementById('contextMenu');
    const x = e.pageX;
    const y = e.pageY;
    
    contextMenu.style.display = 'block';
    contextMenu.style.left = x + 'px';
    contextMenu.style.top = y + 'px';
    
    contextMenu.dataset.orderId = orderId;
    
    const menuItems = contextMenu.querySelectorAll('.context-menu-item');
    menuItems.forEach(item => {
        item.onclick = function() {
            handleContextMenuAction(this, orderId);
        };
    });
}

function hideContextMenu() {
    const contextMenu = document.getElementById('contextMenu');
    contextMenu.style.display = 'none';
}

function handleContextMenuAction(item, orderId) {
    const text = item.textContent.trim();
    
    switch(text) {
        case 'ดูรายละเอียด':
            alert(`ดูรายละเอียด PO ID: ${orderId}`);
            break;
        case 'แก้ไข':
            alert(`แก้ไข PO ID: ${orderId}`);
            break;
        case 'รับสินค้าเข้าคลัง':
            if (confirm('ต้องการรับสินค้าเข้าคลังหรือไม่?')) {
                alert(`รับสินค้าเข้าคลัง PO ID: ${orderId}`);
            }
            break;
        case 'ทำสำเนา':
            alert(`ทำสำเนา PO ID: ${orderId}`);
            break;
        case 'ลบ':
            if (confirm('คุณต้องการลบรายการนี้หรือไม่?')) {
                alert(`ลบ PO ID: ${orderId}`);
            }
            break;
    }
    
    hideContextMenu();
}

function copyTableToClipboard() {
    const table = document.querySelector('.data-table');
    let text = '';
    
    const headers = table.querySelectorAll('thead th');
    headers.forEach((header, index) => {
        if (index > 0 && index < headers.length - 1) {
            text += header.textContent.trim() + '\t';
        }
    });
    text += '\n';
    
    const rows = table.querySelectorAll('tbody tr');
    rows.forEach(row => {
        if (row.style.display !== 'none') {
            const cells = row.querySelectorAll('td');
            cells.forEach((cell, index) => {
                if (index > 0 && index < cells.length - 1) {
                    text += cell.textContent.trim() + '\t';
                }
            });
            text += '\n';
        }
    });
    
    navigator.clipboard.writeText(text).then(() => {
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
                return;
            }
            
            pageButtons.forEach(b => {
                if (!b.id && !b.querySelector('i')) {
                    b.classList.remove('active');
                }
            });
            this.classList.add('active');
            
            console.log('Loading page:', this.textContent);
        });
    });
}
