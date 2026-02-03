// Supplier Form JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initializeSupplierForm();
});

function initializeSupplierForm() {
    // Attachment Upload
    const attachFileBtn = document.getElementById('attachFileBtn');
    const attachmentInput = document.getElementById('attachmentInput');
    
    if (attachFileBtn && attachmentInput) {
        attachFileBtn.addEventListener('click', function() {
            attachmentInput.click();
        });
        
        attachmentInput.addEventListener('change', function(e) {
            if (this.files && this.files.length > 0) {
                handleAttachmentUpload(this.files);
            }
        });
    }

    // Save Button
    const saveBtn = document.getElementById('saveBtn');
    if (saveBtn) {
        saveBtn.addEventListener('click', function() {
            saveSupplier();
        });
    }

    // Search Database Button
    const searchDatabaseBtn = document.querySelector('.btn-search-database');
    if (searchDatabaseBtn) {
        searchDatabaseBtn.addEventListener('click', function() {
            alert('กำลังพัฒนาฟังก์ชันค้นหาฐานข้อมูลสรรพากร');
        });
    }

    // Auto-format Tax ID
    const taxIdInput = document.querySelector('input[placeholder="เลขประจำตัวผู้เสียภาษี"]');
    if (taxIdInput) {
        taxIdInput.addEventListener('input', function() {
            // Remove non-numeric characters
            this.value = this.value.replace(/\D/g, '');
        });
    }

    // Auto-format Postal Code
    const postalCodeInput = document.querySelector('input[placeholder="รหัสไปรษณีย์"]');
    if (postalCodeInput) {
        postalCodeInput.addEventListener('input', function() {
            // Remove non-numeric characters
            this.value = this.value.replace(/\D/g, '');
        });
    }
}

function handleAttachmentUpload(files) {
    const fileNames = Array.from(files).map(f => f.name).join(', ');
    alert(`ไฟล์ที่แนบ: ${fileNames}`);
    
    // Update button text
    const attachFileBtn = document.getElementById('attachFileBtn');
    attachFileBtn.innerHTML = `
        <i class="fas fa-check"></i>
        ${files.length} ไฟล์ถูกแนบ
    `;
    attachFileBtn.style.background = '#d1fae5';
    attachFileBtn.style.color = '#065f46';
    attachFileBtn.style.borderColor = '#10b981';
}

function saveSupplier() {
    // Collect form data
    const formData = {
        contactType: document.querySelector('input[name="contactType"]:checked')?.value,
        location: document.querySelector('input[name="location"]:checked')?.value,
        branchType: document.querySelector('input[name="branchType"]:checked')?.value,
        accountType: document.querySelector('input[name="accountType"]:checked')?.value,
        status: document.querySelector('input[name="status"]:checked')?.value,
    };
    
    // Validate required fields (you can add more validation)
    const businessName = document.querySelector('textarea[placeholder="ชื่อบริษัท/ร้านค้า"]').value;
    if (!businessName.trim()) {
        alert('กรุณากรอกชื่อบริษัท/ร้านค้า');
        return;
    }
    
    // Show success message
    if (confirm('ต้องการบันทึกข้อมูลซัพพลายเออร์นี้หรือไม่?')) {
        // Simulate saving
        alert('บันทึกข้อมูลสำเร็จ!');
        // Redirect to supplier list
        window.location.href = 'suppliers.html';
    }
}
