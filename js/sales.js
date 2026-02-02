// Sales Module JavaScript

// Modal Functions
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Close modal on outside click
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('modal')) {
        e.target.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Close modal on Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const activeModal = document.querySelector('.modal.active');
        if (activeModal) {
            activeModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
});

// Sub Navigation
document.addEventListener('DOMContentLoaded', function() {
    const subNavItems = document.querySelectorAll('.sub-nav-item');
    
    subNavItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            subNavItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Select All Checkbox
    const selectAllCheckbox = document.querySelector('.data-table thead input[type="checkbox"]');
    const rowCheckboxes = document.querySelectorAll('.data-table tbody input[type="checkbox"]');
    
    if (selectAllCheckbox) {
        selectAllCheckbox.addEventListener('change', function() {
            rowCheckboxes.forEach(checkbox => {
                checkbox.checked = this.checked;
            });
        });
    }
    
    // Product List - Add Product
    const addProductBtn = document.querySelector('.product-list + .btn');
    if (addProductBtn) {
        addProductBtn.addEventListener('click', function() {
            const productList = document.querySelector('.product-list');
            const newItem = document.createElement('div');
            newItem.className = 'product-item';
            newItem.innerHTML = `
                <select class="form-control">
                    <option>Select Product</option>
                    <option>Product A - ฿1,500</option>
                    <option>Product B - ฿2,500</option>
                    <option>Product C - ฿3,000</option>
                </select>
                <input type="number" class="form-control" placeholder="Qty" value="1" style="width: 80px;">
                <input type="text" class="form-control" placeholder="Price" style="width: 120px;">
                <button type="button" class="btn btn-danger btn-sm"><i class="fas fa-trash"></i></button>
            `;
            productList.appendChild(newItem);
            
            // Add remove functionality
            newItem.querySelector('.btn-danger').addEventListener('click', function() {
                newItem.remove();
                calculateTotal();
            });
        });
    }
    
    // Remove product item
    document.querySelectorAll('.product-item .btn-danger').forEach(btn => {
        btn.addEventListener('click', function() {
            if (document.querySelectorAll('.product-item').length > 1) {
                this.closest('.product-item').remove();
                calculateTotal();
            }
        });
    });
});

// Calculate Order Total
function calculateTotal() {
    // Placeholder for total calculation
    console.log('Calculating total...');
}

// Export Functions
function exportOrders(format) {
    console.log('Exporting orders as', format);
    Utils.showNotification('Exporting orders...', 'info');
}

// Print Invoice
function printInvoice(orderId) {
    console.log('Printing invoice for order', orderId);
    window.print();
}
