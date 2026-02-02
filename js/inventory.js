// Inventory Module JavaScript

// Modal Functions (shared)
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

// View Toggle
document.addEventListener('DOMContentLoaded', function() {
    const gridViewBtn = document.getElementById('gridView');
    const listViewBtn = document.getElementById('listView');
    const productsGrid = document.querySelector('.products-grid');
    
    if (gridViewBtn && listViewBtn) {
        gridViewBtn.addEventListener('click', function() {
            gridViewBtn.classList.add('active');
            listViewBtn.classList.remove('active');
            if (productsGrid) {
                productsGrid.style.display = 'grid';
            }
        });
        
        listViewBtn.addEventListener('click', function() {
            listViewBtn.classList.add('active');
            gridViewBtn.classList.remove('active');
            if (productsGrid) {
                productsGrid.style.display = 'flex';
                productsGrid.style.flexDirection = 'column';
            }
        });
    }
    
    // Sub Navigation
    const subNavItems = document.querySelectorAll('.sub-nav-item');
    subNavItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            subNavItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // File Upload Preview
    const fileUpload = document.querySelector('.file-upload input');
    if (fileUpload) {
        fileUpload.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    console.log('File uploaded:', file.name);
                };
                reader.readAsDataURL(file);
            }
        });
    }
});

// Stock Alert Check
function checkStockLevels() {
    const products = document.querySelectorAll('.product-card');
    let lowStockCount = 0;
    let outOfStockCount = 0;
    
    products.forEach(product => {
        const stockBadge = product.querySelector('.stock-badge');
        if (stockBadge.classList.contains('low-stock')) {
            lowStockCount++;
        } else if (stockBadge.classList.contains('out-of-stock')) {
            outOfStockCount++;
        }
    });
    
    if (lowStockCount > 0 || outOfStockCount > 0) {
        console.log(`Stock Alert: ${lowStockCount} low stock, ${outOfStockCount} out of stock`);
    }
}

// Search Products
function searchProducts(query) {
    const products = document.querySelectorAll('.product-card');
    const searchTerm = query.toLowerCase();
    
    products.forEach(product => {
        const name = product.querySelector('h4').textContent.toLowerCase();
        const sku = product.querySelector('.product-sku').textContent.toLowerCase();
        
        if (name.includes(searchTerm) || sku.includes(searchTerm)) {
            product.style.display = 'block';
        } else {
            product.style.display = 'none';
        }
    });
}

// Filter by Category
function filterByCategory(category) {
    const products = document.querySelectorAll('.product-card');
    
    products.forEach(product => {
        const productCategory = product.querySelector('.product-category').textContent;
        
        if (category === 'all' || productCategory === category) {
            product.style.display = 'block';
        } else {
            product.style.display = 'none';
        }
    });
}

// Filter by Stock Status
function filterByStockStatus(status) {
    const products = document.querySelectorAll('.product-card');
    
    products.forEach(product => {
        const stockBadge = product.querySelector('.stock-badge');
        
        if (status === 'all') {
            product.style.display = 'block';
        } else if (status === 'in-stock' && stockBadge.classList.contains('in-stock')) {
            product.style.display = 'block';
        } else if (status === 'low-stock' && stockBadge.classList.contains('low-stock')) {
            product.style.display = 'block';
        } else if (status === 'out-of-stock' && stockBadge.classList.contains('out-of-stock')) {
            product.style.display = 'block';
        } else {
            product.style.display = 'none';
        }
    });
}
