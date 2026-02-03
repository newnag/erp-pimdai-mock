// ===== Billing List Page JavaScript =====

document.addEventListener('DOMContentLoaded', function() {
    initBillingList();
});

function initBillingList() {
    // Bind events
    bindSelectAll();
    bindStatusChange();
    bindSearch();
    bindPagination();
    bindMoreButtons();
    bindFilterTabs();
    bindCopyIcons();
}

// ===== Filter Tabs =====
function bindFilterTabs() {
    const tabs = document.querySelectorAll('.filter-tab[data-filter]');
    const rows = document.querySelectorAll('.data-row');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const filter = this.dataset.filter;
            
            // Update active tab
            tabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // Filter rows
            rows.forEach(row => {
                const rowType = row.dataset.type;
                
                if (filter === 'all') {
                    row.style.display = '';
                } else if (filter === 'single' && rowType === 'single') {
                    row.style.display = '';
                } else if (filter === 'combined' && rowType === 'combined') {
                    row.style.display = '';
                } else {
                    row.style.display = 'none';
                }
            });
        });
    });
}

// ===== Copy Document Number =====
function bindCopyIcons() {
    const copyIcons = document.querySelectorAll('.doc-icon');
    
    copyIcons.forEach(icon => {
        icon.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const docLink = this.previousElementSibling;
            const docNo = docLink.textContent;
            
            // Copy to clipboard
            navigator.clipboard.writeText(docNo).then(() => {
                showNotification(`คัดลอก ${docNo} แล้ว`, 'success');
                
                // Animate icon
                this.style.color = '#10b981';
                setTimeout(() => {
                    this.style.color = '';
                }, 1000);
            }).catch(() => {
                showNotification('ไม่สามารถคัดลอกได้', 'error');
            });
        });
    });
}

// ===== Select All Checkbox =====
function bindSelectAll() {
    const selectAll = document.getElementById('selectAll');
    const rowCheckboxes = document.querySelectorAll('.row-checkbox');
    
    if (selectAll) {
        selectAll.addEventListener('change', function() {
            rowCheckboxes.forEach(checkbox => {
                const row = checkbox.closest('.data-row');
                if (row.style.display !== 'none') {
                    checkbox.checked = this.checked;
                }
            });
        });
        
        // Update select all when individual checkboxes change
        rowCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', function() {
                const visibleCheckboxes = [...rowCheckboxes].filter(cb => {
                    return cb.closest('.data-row').style.display !== 'none';
                });
                
                const allChecked = visibleCheckboxes.every(cb => cb.checked);
                const someChecked = visibleCheckboxes.some(cb => cb.checked);
                
                selectAll.checked = allChecked;
                selectAll.indeterminate = someChecked && !allChecked;
            });
        });
    }
}

// ===== Status Change =====
function bindStatusChange() {
    const statusSelects = document.querySelectorAll('.status-select');
    
    statusSelects.forEach(select => {
        select.addEventListener('change', function() {
            const value = this.value;
            const row = this.closest('.data-row');
            const statusDot = row.querySelector('.status-dot');
            
            // Update select class
            this.className = 'status-select ' + value;
            
            // Update status dot
            statusDot.className = 'status-dot ' + value;
            
            // In real implementation, save to server
            console.log('Status changed:', {
                docNo: row.querySelector('.doc-link').textContent,
                newStatus: value
            });
            
            // Show notification
            showNotification(`อัปเดตสถานะเป็น "${getStatusText(value)}" แล้ว`);
        });
    });
}

function getStatusText(status) {
    const statusMap = {
        'billing-pending': 'รอวางบิล',
        'billing-done': 'เปิดบิลแล้ว',
        'cancelled': 'ยกเลิก'
    };
    return statusMap[status] || status;
}

// ===== Search =====
function bindSearch() {
    const searchInput = document.getElementById('searchInput');
    
    if (searchInput) {
        searchInput.addEventListener('input', debounce(function() {
            const searchTerm = this.value.toLowerCase().trim();
            filterTable(searchTerm);
        }, 300));
    }
}

function filterTable(searchTerm) {
    const rows = document.querySelectorAll('.data-row');
    
    rows.forEach(row => {
        const docNo = row.querySelector('.doc-link')?.textContent.toLowerCase() || '';
        const customerName = row.querySelector('.customer-name')?.textContent.toLowerCase() || '';
        const projectName = row.querySelector('.project-name')?.textContent.toLowerCase() || '';
        
        const match = docNo.includes(searchTerm) || 
                      customerName.includes(searchTerm) || 
                      projectName.includes(searchTerm);
        
        row.style.display = match ? '' : 'none';
    });
}

// ===== Pagination =====
function bindPagination() {
    const pageButtons = document.querySelectorAll('.page-btn:not(:disabled)');
    
    pageButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active from all
            pageButtons.forEach(b => b.classList.remove('active'));
            
            // Add active to clicked (if it's a number button)
            if (!this.querySelector('i')) {
                this.classList.add('active');
            }
            
            // In real implementation, load page data
            console.log('Page clicked:', this.textContent);
        });
    });
    
    // Page size change
    const pageSize = document.getElementById('pageSize');
    if (pageSize) {
        pageSize.addEventListener('change', function() {
            console.log('Page size changed:', this.value);
            // In real implementation, reload with new page size
        });
    }
}

// ===== More Buttons (Dropdown Menu) =====
function bindMoreButtons() {
    const moreButtons = document.querySelectorAll('.btn-more');
    
    moreButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            
            const row = this.closest('.data-row');
            const docNo = row.querySelector('.doc-link').textContent;
            
            // Show context menu
            showContextMenu(e, docNo);
        });
    });
    
    // Close menu on click outside
    document.addEventListener('click', function() {
        const existingMenu = document.querySelector('.context-menu');
        if (existingMenu) {
            existingMenu.remove();
        }
    });
}

function showContextMenu(event, docNo) {
    // Remove existing menu
    const existingMenu = document.querySelector('.context-menu');
    if (existingMenu) {
        existingMenu.remove();
    }
    
    // Create menu
    const menu = document.createElement('div');
    menu.className = 'context-menu';
    menu.innerHTML = `
        <div class="menu-item" data-action="view">
            <i class="fas fa-eye"></i>
            ดูรายละเอียด
        </div>
        <div class="menu-item" data-action="edit">
            <i class="fas fa-edit"></i>
            แก้ไข
        </div>
        <div class="menu-item" data-action="duplicate">
            <i class="fas fa-copy"></i>
            คัดลอก
        </div>
        <div class="menu-item" data-action="print">
            <i class="fas fa-print"></i>
            พิมพ์
        </div>
        <div class="menu-item" data-action="download">
            <i class="fas fa-download"></i>
            ดาวน์โหลด PDF
        </div>
        <div class="menu-divider"></div>
        <div class="menu-item danger" data-action="delete">
            <i class="fas fa-trash-alt"></i>
            ลบ
        </div>
    `;
    
    // Position menu
    menu.style.position = 'fixed';
    menu.style.left = event.clientX + 'px';
    menu.style.top = event.clientY + 'px';
    
    // Add to body
    document.body.appendChild(menu);
    
    // Adjust position if off screen
    const rect = menu.getBoundingClientRect();
    if (rect.right > window.innerWidth) {
        menu.style.left = (event.clientX - rect.width) + 'px';
    }
    if (rect.bottom > window.innerHeight) {
        menu.style.top = (event.clientY - rect.height) + 'px';
    }
    
    // Bind menu item clicks
    menu.querySelectorAll('.menu-item').forEach(item => {
        item.addEventListener('click', function() {
            const action = this.dataset.action;
            handleMenuAction(action, docNo);
            menu.remove();
        });
    });
}

function handleMenuAction(action, docNo) {
    switch(action) {
        case 'view':
            window.location.href = `billing.html?doc=${docNo}`;
            break;
        case 'edit':
            window.location.href = `billing.html?doc=${docNo}&mode=edit`;
            break;
        case 'duplicate':
            showNotification(`กำลังคัดลอกเอกสาร ${docNo}...`);
            break;
        case 'print':
            showNotification(`กำลังพิมพ์เอกสาร ${docNo}...`);
            break;
        case 'download':
            showNotification(`กำลังดาวน์โหลด ${docNo}.pdf...`);
            break;
        case 'delete':
            if (confirm(`ต้องการลบเอกสาร ${docNo} หรือไม่?`)) {
                showNotification(`ลบเอกสาร ${docNo} แล้ว`, 'error');
            }
            break;
    }
}

// ===== Utility Functions =====
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func.apply(this, args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function showNotification(message, type = 'success') {
    // Remove existing notification
    const existing = document.querySelector('.notification');
    if (existing) {
        existing.remove();
    }
    
    // Create notification
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
        <span>${message}</span>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        padding: 15px 25px;
        background: ${type === 'success' ? '#10b981' : '#ef4444'};
        color: #fff;
        border-radius: 10px;
        display: flex;
        align-items: center;
        gap: 10px;
        font-weight: 500;
        box-shadow: 0 4px 20px rgba(0,0,0,0.15);
        z-index: 9999;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add context menu styles
const style = document.createElement('style');
style.textContent = `
    .context-menu {
        background: #fff;
        border-radius: 10px;
        box-shadow: 0 10px 40px rgba(0,0,0,0.15);
        padding: 8px 0;
        min-width: 180px;
        z-index: 9999;
        border: 1px solid #e2e8f0;
    }
    
    .menu-item {
        padding: 10px 18px;
        display: flex;
        align-items: center;
        gap: 12px;
        cursor: pointer;
        font-size: 0.9rem;
        color: #334155;
        transition: background 0.2s;
    }
    
    .menu-item:hover {
        background: #f1f5f9;
    }
    
    .menu-item i {
        width: 16px;
        color: #64748b;
    }
    
    .menu-item.danger {
        color: #ef4444;
    }
    
    .menu-item.danger i {
        color: #ef4444;
    }
    
    .menu-divider {
        height: 1px;
        background: #e2e8f0;
        margin: 8px 0;
    }
    
    .doc-icon {
        cursor: pointer;
        color: #94a3b8;
        font-size: 0.85rem;
        margin-left: 8px;
        transition: all 0.2s;
    }
    
    .doc-icon:hover {
        color: var(--primary-color);
    }
    
    .status-dot.billing-pending {
        background: #94a3b8;
    }
    
    .status-dot.billing-done {
        background: #3b82f6;
    }
    
    .status-select.billing-pending {
        color: #64748b;
        border-color: #e2e8f0;
        background-color: #f8fafc;
    }
    
    .status-select.billing-done {
        color: #3b82f6;
        border-color: #bfdbfe;
        background-color: #eff6ff;
    }
    
    .col-duedate {
        width: 130px;
        color: var(--text-secondary);
    }
    
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ===== Show Total Button =====
document.querySelector('.btn-show-total')?.addEventListener('click', function() {
    // Calculate total from visible rows
    let total = 0;
    document.querySelectorAll('.data-row').forEach(row => {
        if (row.style.display !== 'none') {
            const amountText = row.querySelector('.col-amount')?.textContent || '0';
            const amount = parseFloat(amountText.replace(/,/g, '')) || 0;
            total += amount;
        }
    });
    
    const formattedTotal = total.toLocaleString('th-TH', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
    
    showNotification(`ยอดรวมทั้งหมด: ฿${formattedTotal}`);
});
