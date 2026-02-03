// Customer Form JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initializeCustomerForm();
});

function initializeCustomerForm() {
    // Foreign Bank Info Toggle
    const foreignBankCheckbox = document.getElementById('foreignBankInfo');
    const swiftCodeGroup = document.getElementById('swiftCodeGroup');
    const bankAddressGroup = document.getElementById('bankAddressGroup');
    
    if (foreignBankCheckbox) {
        foreignBankCheckbox.addEventListener('change', function() {
            if (this.checked) {
                swiftCodeGroup.style.display = 'flex';
                bankAddressGroup.style.display = 'flex';
            } else {
                swiftCodeGroup.style.display = 'none';
                bankAddressGroup.style.display = 'none';
            }
        });
    }

    // QR Code Upload
    const qrUploadArea = document.getElementById('qrUploadArea');
    const qrFileInput = document.getElementById('qrFileInput');
    
    if (qrUploadArea && qrFileInput) {
        qrUploadArea.addEventListener('click', function() {
            qrFileInput.click();
        });
        
        qrFileInput.addEventListener('change', function(e) {
            if (this.files && this.files.length > 0) {
                handleQRUpload(this.files);
            }
        });
        
        // Drag and Drop
        qrUploadArea.addEventListener('dragover', function(e) {
            e.preventDefault();
            this.style.borderColor = '#3b82f6';
            this.style.background = '#eff6ff';
        });
        
        qrUploadArea.addEventListener('dragleave', function(e) {
            e.preventDefault();
            this.style.borderColor = '#cbd5e1';
            this.style.background = '#f8fafc';
        });
        
        qrUploadArea.addEventListener('drop', function(e) {
            e.preventDefault();
            this.style.borderColor = '#cbd5e1';
            this.style.background = '#f8fafc';
            
            if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
                handleQRUpload(e.dataTransfer.files);
            }
        });
    }

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
            saveCustomer();
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

function handleQRUpload(files) {
    const file = files[0];
    
    if (!file.type.startsWith('image/')) {
        alert('กรุณาเลือกไฟล์รูปภาพเท่านั้น');
        return;
    }
    
    const reader = new FileReader();
    reader.onload = function(e) {
        const qrUploadArea = document.getElementById('qrUploadArea');
        qrUploadArea.innerHTML = `
            <img src="${e.target.result}" alt="QR Code" style="max-width: 200px; max-height: 200px; border-radius: 8px;">
            <p class="upload-text" style="margin-top: 10px;">คลิกเพื่อเปลี่ยนรูป</p>
        `;
    };
    reader.readAsDataURL(file);
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

function saveCustomer() {
    // Collect form data
    const formData = {
        contactType: document.querySelector('input[name="contactType"]:checked')?.value,
        type: Array.from(document.querySelectorAll('input[name="type"]:checked')).map(cb => cb.value),
        location: document.querySelector('input[name="location"]:checked')?.value,
        branchType: document.querySelector('input[name="branchType"]:checked')?.value,
        accountType: document.querySelector('input[name="accountType"]:checked')?.value,
    };
    
    // Validate required fields
    if (!formData.type || formData.type.length === 0) {
        alert('กรุณาเลือกประเภทอย่างน้อย 1 ประเภท');
        return;
    }
    
    // Show success message
    if (confirm('ต้องการบันทึกข้อมูลผู้ติดต่อนี้หรือไม่?')) {
        // Simulate saving
        alert('บันทึกข้อมูลสำเร็จ!');
        // Redirect to customer list
        window.location.href = 'customers.html';
    }
}
