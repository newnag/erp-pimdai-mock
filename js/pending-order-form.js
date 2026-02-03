// Purchase Order Form JavaScript

document.addEventListener('DOMContentLoaded', function() {
    let rowCount = 3; // เริ่มต้นด้วย 3 แถว

    // Calculate totals
    function calculateTotals() {
        let subtotal = 0;

        // Calculate row totals
        document.querySelectorAll('.item-row').forEach(row => {
            const qty = parseFloat(row.querySelector('.qty-input').value) || 0;
            const price = parseFloat(row.querySelector('.price-input').value) || 0;
            const total = qty * price;
            
            row.querySelector('.row-total').textContent = total.toFixed(2);
            subtotal += total;
        });

        // Get discount
        const discountPercent = parseFloat(document.getElementById('discountPercent').value) || 0;
        const discountAmount = subtotal * (discountPercent / 100);
        const afterDiscount = subtotal - discountAmount;

        // Get VAT
        const includeVat = document.getElementById('includeVat').checked;
        const vatAmount = includeVat ? afterDiscount * 0.07 : 0;
        const finalTotal = afterDiscount + vatAmount;

        // Update display
        document.getElementById('subtotal').textContent = subtotal.toFixed(2);
        document.getElementById('discountAmount').textContent = discountAmount.toFixed(2);
        document.getElementById('afterDiscount').textContent = afterDiscount.toFixed(2);
        document.getElementById('vatAmount').textContent = vatAmount.toFixed(2);
        document.getElementById('finalTotal').textContent = finalTotal.toFixed(2);
        document.getElementById('grandTotal').textContent = finalTotal.toFixed(2);
    }

    // Add event listeners for calculation
    document.querySelectorAll('.qty-input, .price-input').forEach(input => {
        input.addEventListener('input', calculateTotals);
    });

    document.getElementById('discountPercent').addEventListener('input', calculateTotals);
    document.getElementById('includeVat').addEventListener('change', calculateTotals);

    // Add row button
    document.getElementById('addRowBtn').addEventListener('click', function() {
        rowCount++;
        const tbody = document.getElementById('itemsBody');
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
        
        // Add event listeners to new row
        newRow.querySelector('.qty-input').addEventListener('input', calculateTotals);
        newRow.querySelector('.price-input').addEventListener('input', calculateTotals);
        newRow.querySelector('.btn-delete-row').addEventListener('click', function() {
            newRow.remove();
            renumberRows();
            calculateTotals();
        });
    });

    // Delete row buttons
    document.querySelectorAll('.btn-delete-row').forEach(btn => {
        btn.addEventListener('click', function() {
            const row = this.closest('.item-row');
            if (document.querySelectorAll('.item-row').length > 1) {
                row.remove();
                renumberRows();
                calculateTotals();
            } else {
                alert('ต้องมีอย่างน้อย 1 รายการ');
            }
        });
    });

    // Renumber rows after deletion
    function renumberRows() {
        document.querySelectorAll('.item-row').forEach((row, index) => {
            row.querySelector('.col-no').textContent = index + 1;
            row.setAttribute('data-row', index + 1);
        });
        rowCount = document.querySelectorAll('.item-row').length;
    }

    // Withholding tax checkbox
    document.getElementById('withholding').addEventListener('change', function() {
        document.getElementById('withholdingRate').disabled = !this.checked;
    });

    // File upload
    const fileUploadArea = document.getElementById('fileUploadArea');
    const fileInput = document.getElementById('fileInput');

    fileUploadArea.addEventListener('click', function() {
        fileInput.click();
    });

    fileUploadArea.addEventListener('dragover', function(e) {
        e.preventDefault();
        this.style.borderColor = '#8b5cf6';
        this.style.background = 'rgba(139, 92, 246, 0.05)';
    });

    fileUploadArea.addEventListener('dragleave', function(e) {
        e.preventDefault();
        this.style.borderColor = '#e5e7eb';
        this.style.background = '#f9fafb';
    });

    fileUploadArea.addEventListener('drop', function(e) {
        e.preventDefault();
        this.style.borderColor = '#e5e7eb';
        this.style.background = '#f9fafb';
        
        const files = e.dataTransfer.files;
        handleFiles(files);
    });

    fileInput.addEventListener('change', function() {
        handleFiles(this.files);
    });

    function handleFiles(files) {
        console.log('Files uploaded:', files);
        // TODO: Handle file upload
        alert(`อัพโหลด ${files.length} ไฟล์`);
    }

    // Supplier selection
    document.getElementById('supplierSelect').addEventListener('change', function() {
        const supplierId = this.value;
        
        // Sample supplier data
        const suppliers = {
            '1': {
                name: 'บริษัท ซัพพลาย เอเชีย จำกัด',
                address: '123 ถนนสุขุมวิท แขวงคลองเตย เขตคลองเตย กรุงเทพมหานคร 10110',
                postalCode: '10110',
                taxId: '0105556001234',
                branch: 'สำนักงานใหญ่',
                contact: 'คุณสมชาย ใจดี'
            },
            '2': {
                name: 'บริษัท โกลบอล ซัพพลาย จำกัด',
                address: '456 ถนนพระราม 4 แขวงคลองเตย เขตคลองเตย กรุงเทพมหานคร 10110',
                postalCode: '10110',
                taxId: '0105556007890',
                branch: 'สำนักงานใหญ่',
                contact: 'คุณสมหญิง ซื่อสัตย์'
            }
        };

        if (supplierId && suppliers[supplierId]) {
            const supplier = suppliers[supplierId];
            document.getElementById('supplierAddress').value = supplier.address;
            document.getElementById('postalCode').value = supplier.postalCode;
            document.getElementById('taxId').value = supplier.taxId;
            document.getElementById('branchNo').value = supplier.branch;
            document.getElementById('contactPerson').value = supplier.contact;
        } else {
            document.getElementById('supplierAddress').value = '';
            document.getElementById('postalCode').value = '';
            document.getElementById('taxId').value = '';
            document.getElementById('branchNo').value = '';
            document.getElementById('contactPerson').value = '';
        }
    });

    // Calculate expected date when credit days change
    document.getElementById('creditDays').addEventListener('change', function() {
        const docDate = new Date(document.getElementById('docDate').value);
        const creditDays = parseInt(this.value);
        const expectedDate = new Date(docDate);
        expectedDate.setDate(expectedDate.getDate() + creditDays);
        
        document.getElementById('expectedDate').value = expectedDate.toISOString().split('T')[0];
    });

    // Save button
    document.getElementById('saveBtn').addEventListener('click', function() {
        // Collect form data
        const formData = {
            docNumber: document.getElementById('docNumber').textContent,
            supplier: document.getElementById('supplierSelect').value,
            supplierAddress: document.getElementById('supplierAddress').value,
            docDate: document.getElementById('docDate').value,
            expectedDate: document.getElementById('expectedDate').value,
            status: document.getElementById('status').value,
            items: [],
            subtotal: document.getElementById('subtotal').textContent,
            discount: document.getElementById('discountAmount').textContent,
            vat: document.getElementById('vatAmount').textContent,
            total: document.getElementById('finalTotal').textContent,
            remarks: document.getElementById('remarks').value,
            internalNote: document.getElementById('internalNote').value
        };

        // Collect items
        document.querySelectorAll('.item-row').forEach(row => {
            const product = row.querySelector('.product-input').value;
            if (product) {
                formData.items.push({
                    product: product,
                    qty: row.querySelector('.qty-input').value,
                    unit: row.querySelector('.unit-select').value,
                    price: row.querySelector('.price-input').value,
                    total: row.querySelector('.row-total').textContent
                });
            }
        });

        console.log('Purchase Order Data:', formData);
        alert('บันทึกใบสั่งซื้อเรียบร้อยแล้ว');
        
        // TODO: Send to backend
        // window.location.href = 'pending-orders.html';
    });

    // Close window button
    document.querySelector('.btn-secondary').addEventListener('click', function() {
        if (confirm('ต้องการปิดหน้าต่างนี้หรือไม่?')) {
            window.location.href = 'pending-orders.html';
        }
    });

    // Initial calculation
    calculateTotals();
});
