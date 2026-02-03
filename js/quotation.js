// ===== Quotation Page JavaScript =====

document.addEventListener('DOMContentLoaded', function() {
    initQuotation();
});

function initQuotation() {
    // Initialize date fields
    setDefaultDates();
    
    // Bind events
    bindTableEvents();
    bindCalculationEvents();
    bindFileUpload();
    bindWithholding();
    
    // Initial calculation
    calculateTotals();
}

// ===== Date Functions =====
function setDefaultDates() {
    const today = new Date();
    const docDateInput = document.getElementById('docDate');
    const dueDateInput = document.getElementById('dueDate');
    const creditDaysSelect = document.getElementById('creditDays');
    
    // Set today's date
    docDateInput.value = formatDate(today);
    
    // Calculate due date based on credit days
    updateDueDate();
    
    // Listen for changes
    docDateInput.addEventListener('change', updateDueDate);
    creditDaysSelect.addEventListener('change', updateDueDate);
}

function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function updateDueDate() {
    const docDate = new Date(document.getElementById('docDate').value);
    const creditDays = parseInt(document.getElementById('creditDays').value) || 0;
    
    const dueDate = new Date(docDate);
    dueDate.setDate(dueDate.getDate() + creditDays);
    
    document.getElementById('dueDate').value = formatDate(dueDate);
}

// ===== Table Events =====
function bindTableEvents() {
    const addRowBtn = document.getElementById('addRowBtn');
    addRowBtn.addEventListener('click', addNewRow);
    
    // Bind existing delete buttons
    document.querySelectorAll('.btn-delete-row').forEach(btn => {
        btn.addEventListener('click', function() {
            deleteRow(this);
        });
    });
}

function addNewRow() {
    const tbody = document.getElementById('itemsBody');
    const rowCount = tbody.querySelectorAll('.item-row').length + 1;
    
    const newRow = document.createElement('tr');
    newRow.className = 'item-row';
    newRow.setAttribute('data-row', rowCount);
    
    newRow.innerHTML = `
        <td class="col-no">${rowCount}</td>
        <td class="col-product">
            <input type="text" class="form-input product-input" placeholder="พิมพ์ชื่อสินค้าหรือรหัส">
        </td>
        <td class="col-qty">
            <input type="number" class="form-input qty-input" value="1" min="1">
        </td>
        <td class="col-unit">
            <select class="form-select unit-select">
                <option value="ชิ้น">ชิ้น</option>
                <option value="กล่อง">กล่อง</option>
                <option value="แพ็ค">แพ็ค</option>
                <option value="เซ็ต">เซ็ต</option>
            </select>
        </td>
        <td class="col-price">
            <input type="number" class="form-input price-input" value="0" min="0" step="0.01">
        </td>
        <td class="col-total">
            <span class="row-total">0.00</span>
        </td>
        <td class="col-action">
            <button class="btn-delete-row" title="ลบรายการ">
                <i class="fas fa-trash-alt"></i>
            </button>
        </td>
    `;
    
    tbody.appendChild(newRow);
    
    // Bind events for new row
    const deleteBtn = newRow.querySelector('.btn-delete-row');
    deleteBtn.addEventListener('click', function() {
        deleteRow(this);
    });
    
    const qtyInput = newRow.querySelector('.qty-input');
    const priceInput = newRow.querySelector('.price-input');
    
    qtyInput.addEventListener('input', function() {
        calculateRowTotal(newRow);
        calculateTotals();
    });
    
    priceInput.addEventListener('input', function() {
        calculateRowTotal(newRow);
        calculateTotals();
    });
    
    // Focus on product input
    newRow.querySelector('.product-input').focus();
}

function deleteRow(button) {
    const row = button.closest('.item-row');
    const tbody = document.getElementById('itemsBody');
    
    // Don't delete if it's the last row
    if (tbody.querySelectorAll('.item-row').length <= 1) {
        alert('ต้องมีอย่างน้อย 1 รายการ');
        return;
    }
    
    row.remove();
    
    // Renumber rows
    const rows = tbody.querySelectorAll('.item-row');
    rows.forEach((row, index) => {
        row.setAttribute('data-row', index + 1);
        row.querySelector('.col-no').textContent = index + 1;
    });
    
    calculateTotals();
}

// ===== Calculation Events =====
function bindCalculationEvents() {
    // Bind qty and price inputs
    document.querySelectorAll('.qty-input, .price-input').forEach(input => {
        input.addEventListener('input', function() {
            const row = this.closest('.item-row');
            calculateRowTotal(row);
            calculateTotals();
        });
    });
    
    // Discount
    document.getElementById('discountPercent').addEventListener('input', calculateTotals);
    
    // VAT checkbox
    document.getElementById('includeVat').addEventListener('change', calculateTotals);
}

function calculateRowTotal(row) {
    const qty = parseFloat(row.querySelector('.qty-input').value) || 0;
    const price = parseFloat(row.querySelector('.price-input').value) || 0;
    const total = qty * price;
    
    row.querySelector('.row-total').textContent = formatNumber(total);
    return total;
}

function calculateTotals() {
    let subtotal = 0;
    
    // Calculate subtotal from all rows
    document.querySelectorAll('.item-row').forEach(row => {
        const qty = parseFloat(row.querySelector('.qty-input').value) || 0;
        const price = parseFloat(row.querySelector('.price-input').value) || 0;
        subtotal += qty * price;
    });
    
    // Get discount
    const discountPercent = parseFloat(document.getElementById('discountPercent').value) || 0;
    const discountAmount = subtotal * (discountPercent / 100);
    
    // After discount
    const afterDiscount = subtotal - discountAmount;
    
    // VAT
    const includeVat = document.getElementById('includeVat').checked;
    const vatAmount = includeVat ? afterDiscount * 0.07 : 0;
    
    // Final total
    const finalTotal = afterDiscount + vatAmount;
    
    // Update display
    document.getElementById('subtotal').textContent = formatNumber(subtotal);
    document.getElementById('discountAmount').textContent = formatNumber(discountAmount);
    document.getElementById('afterDiscount').textContent = formatNumber(afterDiscount);
    document.getElementById('vatAmount').textContent = formatNumber(vatAmount);
    document.getElementById('finalTotal').textContent = formatNumber(finalTotal);
    document.getElementById('grandTotal').textContent = formatNumber(finalTotal);
}

function formatNumber(num) {
    return num.toLocaleString('th-TH', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}

// ===== File Upload =====
function bindFileUpload() {
    const uploadArea = document.getElementById('fileUploadArea');
    const fileInput = document.getElementById('fileInput');
    
    uploadArea.addEventListener('click', () => fileInput.click());
    
    uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.style.borderColor = '#1a56db';
        uploadArea.style.background = '#eff6ff';
    });
    
    uploadArea.addEventListener('dragleave', () => {
        uploadArea.style.borderColor = '#cbd5e1';
        uploadArea.style.background = '';
    });
    
    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.style.borderColor = '#cbd5e1';
        uploadArea.style.background = '';
        
        const files = e.dataTransfer.files;
        handleFiles(files);
    });
    
    fileInput.addEventListener('change', (e) => {
        handleFiles(e.target.files);
    });
}

function handleFiles(files) {
    if (files.length > 0) {
        const fileNames = Array.from(files).map(f => f.name).join(', ');
        alert(`ไฟล์ที่เลือก: ${fileNames}`);
        // In real implementation, upload files here
    }
}

// ===== Withholding Tax =====
function bindWithholding() {
    const checkbox = document.getElementById('withholding');
    const rateSelect = document.getElementById('withholdingRate');
    
    checkbox.addEventListener('change', function() {
        rateSelect.disabled = !this.checked;
    });
}

// ===== Save Document =====
document.getElementById('saveBtn')?.addEventListener('click', function() {
    // Collect form data
    const formData = collectFormData();
    
    // Validate
    if (!validateForm(formData)) {
        return;
    }
    
    // In real implementation, send to server
    console.log('Form Data:', formData);
    alert('บันทึกเอกสารเรียบร้อยแล้ว!');
});

function collectFormData() {
    const items = [];
    document.querySelectorAll('.item-row').forEach(row => {
        const product = row.querySelector('.product-input').value;
        const qty = row.querySelector('.qty-input').value;
        const unit = row.querySelector('.unit-select').value;
        const price = row.querySelector('.price-input').value;
        
        if (product) {
            items.push({ product, qty, unit, price });
        }
    });
    
    return {
        docNumber: document.getElementById('docNumber').textContent,
        customer: document.getElementById('customerSelect').value,
        address: document.getElementById('customerAddress').value,
        postalCode: document.getElementById('postalCode').value,
        taxId: document.getElementById('taxId').value,
        branchNo: document.getElementById('branchNo').value,
        docDate: document.getElementById('docDate').value,
        creditDays: document.getElementById('creditDays').value,
        dueDate: document.getElementById('dueDate').value,
        salesPerson: document.getElementById('salesPerson').value,
        currency: document.getElementById('currency').value,
        project: document.getElementById('project').value,
        refNumber: document.getElementById('refNumber').value,
        priceType: document.getElementById('priceType').value,
        description: document.getElementById('description').value,
        warehouse: document.getElementById('warehouse').value,
        items: items,
        discountPercent: document.getElementById('discountPercent').value,
        includeVat: document.getElementById('includeVat').checked,
        withholding: document.getElementById('withholding').checked,
        withholdingRate: document.getElementById('withholdingRate').value,
        eSignature: document.getElementById('eSignature').checked,
        remarks: document.getElementById('remarks').value,
        internalNote: document.getElementById('internalNote').value
    };
}

function validateForm(data) {
    if (!data.customer) {
        alert('กรุณาเลือกลูกค้า');
        document.getElementById('customerSelect').focus();
        return false;
    }
    
    if (data.items.length === 0) {
        alert('กรุณาเพิ่มรายการสินค้าอย่างน้อย 1 รายการ');
        return false;
    }
    
    return true;
}
