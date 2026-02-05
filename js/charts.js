// Dashboard Charts - Chart.js Implementation

document.addEventListener('DOMContentLoaded', function() {
    
    // Chart.js global defaults
    Chart.defaults.font.family = "'Prompt', 'Segoe UI', sans-serif";
    Chart.defaults.font.size = 11;
    Chart.defaults.plugins.legend.display = false;

    // ===== 1. Account Bar Chart - Premium Style =====
    const accountCtx = document.getElementById('accountChart');
    if (accountCtx) {
        new Chart(accountCtx, {
            type: 'bar',
            data: {
                labels: ['T-1 Inbound', 'Today Inbound', 'Outbound'],
                datasets: [{
                    data: [85400, 42500, 28750],
                    backgroundColor: [
                        'rgba(16, 185, 129, 0.85)',
                        'rgba(52, 211, 153, 0.85)',
                        'rgba(239, 68, 68, 0.85)'
                    ],
                    borderColor: [
                        '#10b981',
                        '#34d399',
                        '#ef4444'
                    ],
                    borderWidth: 2,
                    borderRadius: 8,
                    borderSkipped: false,
                    barThickness: 35
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        backgroundColor: 'rgba(30, 41, 59, 0.95)',
                        titleFont: { size: 12, weight: '600' },
                        bodyFont: { size: 13 },
                        padding: 12,
                        cornerRadius: 8,
                        displayColors: false,
                        callbacks: {
                            label: function(context) {
                                return '฿ ' + context.raw.toLocaleString();
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: { 
                            color: 'rgba(226, 232, 240, 0.6)',
                            drawBorder: false
                        },
                        border: { display: false },
                        ticks: {
                            padding: 8,
                            color: '#94a3b8',
                            font: { size: 10 },
                            callback: function(value) {
                                return '฿' + (value/1000) + 'K';
                            }
                        }
                    },
                    x: {
                        grid: { display: false },
                        border: { display: false },
                        ticks: {
                            color: '#64748b',
                            font: { size: 10 }
                        }
                    }
                },
                animation: {
                    duration: 1000,
                    easing: 'easeOutQuart'
                }
            }
        });
    }

    // ===== 2. Sales Total Charts - Quotation Count =====
    const totalCountCtx = document.getElementById('totalQuotationCountChart');
    if (totalCountCtx) {
        new Chart(totalCountCtx, {
            type: 'bar',
            data: {
                labels: ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.'],
                datasets: [
                    {
                        label: 'ใบเสนอราคา',
                        data: [42, 45, 38, 50, 47, 45],
                        backgroundColor: 'rgba(59, 130, 246, 0.7)',
                        borderColor: 'rgba(59, 130, 246, 1)',
                        borderWidth: 2,
                        borderRadius: 6,
                        barThickness: 25
                    },
                    {
                        label: 'ปิดการขาย',
                        data: [28, 32, 25, 35, 34, 32],
                        backgroundColor: 'rgba(16, 185, 129, 0.7)',
                        borderColor: 'rgba(16, 185, 129, 1)',
                        borderWidth: 2,
                        borderRadius: 6,
                        barThickness: 25
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: true,
                        position: 'top',
                        labels: {
                            color: '#1e293b',
                            usePointStyle: true,
                            padding: 10,
                            font: { size: 11 }
                        }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(30, 41, 59, 0.95)',
                        padding: 10,
                        cornerRadius: 8
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: { 
                            color: 'rgba(226, 232, 240, 0.6)',
                            drawBorder: false
                        },
                        border: { display: false },
                        ticks: {
                            color: '#64748b',
                            font: { size: 10 },
                            padding: 5
                        }
                    },
                    x: {
                        grid: { display: false },
                        border: { display: false },
                        ticks: {
                            color: '#64748b',
                            font: { size: 10 }
                        }
                    }
                }
            }
        });
    }

    // ===== 3. Sales Total Charts - Quotation Value =====
    const totalValueCtx = document.getElementById('totalQuotationValueChart');
    if (totalValueCtx) {
        new Chart(totalValueCtx, {
            type: 'line',
            data: {
                labels: ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.'],
                datasets: [
                    {
                        label: 'มูลค่าใบเสนอราคา (ล้านบาท)',
                        data: [2.1, 2.5, 2.0, 2.8, 2.6, 2.5],
                        borderColor: 'rgba(59, 130, 246, 1)',
                        backgroundColor: 'rgba(59, 130, 246, 0.2)',
                        borderWidth: 3,
                        tension: 0.4,
                        fill: true,
                        pointRadius: 5,
                        pointBackgroundColor: '#3b82f6',
                        pointBorderColor: 'white',
                        pointBorderWidth: 2
                    },
                    {
                        label: 'มูลค่าปิดการขาย (ล้านบาท)',
                        data: [1.5, 1.8, 1.4, 2.0, 1.9, 1.8],
                        borderColor: 'rgba(16, 185, 129, 1)',
                        backgroundColor: 'rgba(16, 185, 129, 0.2)',
                        borderWidth: 3,
                        tension: 0.4,
                        fill: true,
                        pointRadius: 5,
                        pointBackgroundColor: '#10b981',
                        pointBorderColor: 'white',
                        pointBorderWidth: 2
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: true,
                        position: 'top',
                        labels: {
                            color: '#1e293b',
                            usePointStyle: true,
                            padding: 10,
                            font: { size: 11 }
                        }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(30, 41, 59, 0.95)',
                        padding: 10,
                        cornerRadius: 8,
                        callbacks: {
                            label: function(context) {
                                return context.dataset.label + ': ฿' + context.parsed.y + 'M';
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: { 
                            color: 'rgba(226, 232, 240, 0.6)',
                            drawBorder: false
                        },
                        border: { display: false },
                        ticks: {
                            color: '#64748b',
                            font: { size: 10 },
                            padding: 5,
                            callback: function(value) {
                                return '฿' + value + 'M';
                            }
                        }
                    },
                    x: {
                        grid: { display: false },
                        border: { display: false },
                        ticks: {
                            color: '#64748b',
                            font: { size: 10 }
                        }
                    }
                }
            }
        });
    }

    // ===== 4. Sales by Person - Comparison Charts =====
    // กราฟเปรียบเทียบจำนวนใบเสนอราคา
    const personCountCtx = document.getElementById('salesPersonCountChart');
    if (personCountCtx) {
        new Chart(personCountCtx, {
            type: 'bar',
            data: {
                labels: ['สมชาย ใจดี', 'สมหญิง รักงาน', 'สมศักดิ์ ขยัน'],
                datasets: [
                    {
                        label: 'ใบเสนอราคา',
                        data: [18, 15, 12],
                        backgroundColor: 'rgba(59, 130, 246, 0.7)',
                        borderColor: 'rgba(59, 130, 246, 1)',
                        borderWidth: 2,
                        borderRadius: 8,
                        barThickness: 50
                    },
                    {
                        label: 'ปิดการขาย',
                        data: [14, 11, 7],
                        backgroundColor: 'rgba(16, 185, 129, 0.7)',
                        borderColor: 'rgba(16, 185, 129, 1)',
                        borderWidth: 2,
                        borderRadius: 8,
                        barThickness: 50
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: true,
                        position: 'top',
                        labels: {
                            usePointStyle: true,
                            padding: 15,
                            font: { size: 12 }
                        }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(30, 41, 59, 0.95)',
                        padding: 12,
                        cornerRadius: 8,
                        titleFont: { size: 13, weight: '600' },
                        bodyFont: { size: 12 },
                        callbacks: {
                            label: function(context) {
                                return context.dataset.label + ': ' + context.parsed.y + ' ใบ';
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: { 
                            color: 'rgba(226, 232, 240, 0.6)',
                            drawBorder: false
                        },
                        border: { display: false },
                        ticks: {
                            color: '#94a3b8',
                            font: { size: 11 },
                            padding: 8,
                            callback: function(value) {
                                return value + ' ใบ';
                            }
                        }
                    },
                    x: {
                        grid: { display: false },
                        border: { display: false },
                        ticks: {
                            color: '#64748b',
                            font: { size: 11 }
                        }
                    }
                },
                animation: {
                    duration: 1000,
                    easing: 'easeOutQuart'
                }
            }
        });
    }

    // กราฟเปรียบเทียบมูลค่า
    const personValueCtx = document.getElementById('salesPersonValueChart');
    if (personValueCtx) {
        new Chart(personValueCtx, {
            type: 'bar',
            data: {
                labels: ['สมชาย ใจดี', 'สมหญิง รักงาน', 'สมศักดิ์ ขยัน'],
                datasets: [
                    {
                        label: 'มูลค่าใบเสนอราคา',
                        data: [1.2, 0.8, 0.5],
                        backgroundColor: 'rgba(245, 158, 11, 0.7)',
                        borderColor: 'rgba(245, 158, 11, 1)',
                        borderWidth: 2,
                        borderRadius: 8,
                        barThickness: 50
                    },
                    {
                        label: 'มูลค่าปิดการขาย',
                        data: [0.93, 0.59, 0.29],
                        backgroundColor: 'rgba(16, 185, 129, 0.7)',
                        borderColor: 'rgba(16, 185, 129, 1)',
                        borderWidth: 2,
                        borderRadius: 8,
                        barThickness: 50
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: true,
                        position: 'top',
                        labels: {
                            usePointStyle: true,
                            padding: 15,
                            font: { size: 12 }
                        }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(30, 41, 59, 0.95)',
                        padding: 12,
                        cornerRadius: 8,
                        titleFont: { size: 13, weight: '600' },
                        bodyFont: { size: 12 },
                        callbacks: {
                            label: function(context) {
                                return context.dataset.label + ': ฿' + context.parsed.y.toFixed(2) + 'M';
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: { 
                            color: 'rgba(226, 232, 240, 0.6)',
                            drawBorder: false
                        },
                        border: { display: false },
                        ticks: {
                            color: '#94a3b8',
                            font: { size: 11 },
                            padding: 8,
                            callback: function(value) {
                                return '฿' + value.toFixed(1) + 'M';
                            }
                        }
                    },
                    x: {
                        grid: { display: false },
                        border: { display: false },
                        ticks: {
                            color: '#64748b',
                            font: { size: 11 }
                        }
                    }
                },
                animation: {
                    duration: 1000,
                    easing: 'easeOutQuart'
                }
            }
        });
    }

    // ===== Old Gauge Chart (Kept for reference) =====
    const gaugeCtx = document.getElementById('salesGaugeChart');
    if (gaugeCtx) {
        new Chart(gaugeCtx, {
            type: 'doughnut',
            data: {
                datasets: [{
                    data: [71.1, 28.9],
                    backgroundColor: ['#10b981', '#e2e8f0'],
                    borderWidth: 0,
                    circumference: 180,
                    rotation: 270
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                cutout: '75%',
                plugins: {
                    legend: { display: false },
                    tooltip: { enabled: false }
                }
            }
        });
    }

    // ===== 4. HR Donut Chart (Attendance) =====
    const hrDonutCtx = document.getElementById('hrDonutChart');
    if (hrDonutCtx) {
        new Chart(hrDonutCtx, {
            type: 'doughnut',
            data: {
                labels: ['มาทำงาน', 'ขาด/ลา', 'มาสาย'],
                datasets: [{
                    data: [9, 1, 2],
                    backgroundColor: ['#10b981', '#ef4444', '#f59e0b'],
                    borderWidth: 3,
                    borderColor: '#ffffff'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                cutout: '60%',
                plugins: {
                    legend: { display: false }
                }
            }
        });
    }

    // ===== 5. Marketing Ads Budget Donut Chart =====
    const adsBudgetCtx = document.getElementById('adsBudgetChart');
    if (adsBudgetCtx) {
        new Chart(adsBudgetCtx, {
            type: 'doughnut',
            data: {
                labels: ['Facebook', 'Google', 'Line'],
                datasets: [{
                    data: [65000, 35000, 25000],
                    backgroundColor: ['#1877f2', '#ea4335', '#00c300'],
                    borderWidth: 3,
                    borderColor: '#ffffff'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                cutout: '65%',
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return context.label + ': ฿' + context.raw.toLocaleString();
                            }
                        }
                    }
                }
            }
        });
    }

    // ===== 6. Marketing Line Conversion Horizontal Bar Chart =====
    const lineConversionCtx = document.getElementById('lineConversionChart');
    if (lineConversionCtx) {
        new Chart(lineConversionCtx, {
            type: 'bar',
            data: {
                labels: ['Line Volume Followers', 'GG Ads Conversion Click', 'Line Ads Conversion Click/Add'],
                datasets: [{
                    data: [2000, 38, 256, 189, 85],
                    backgroundColor: [
                        '#00c300',
                        '#00a000',
                        '#1877f2',
                        '#ea4335',
                        '#00c300'
                    ],
                    borderRadius: 4,
                    barThickness: 20
                }]
            },
            options: {
                indexAxis: 'y',
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false }
                },
                scales: {
                    x: {
                        beginAtZero: true,
                        grid: { color: '#e2e8f0' }
                    },
                    y: {
                        grid: { display: false }
                    }
                }
            }
        });
    }

    // ===== 7. Warehouse Donut Chart =====
    const warehouseDonutCtx = document.getElementById('warehouseDonutChart');
    if (warehouseDonutCtx) {
        new Chart(warehouseDonutCtx, {
            type: 'doughnut',
            data: {
                labels: ['วัสดุสิ้นเปลือง', 'วัตถุดิบหลัก', 'สินค้าสำเร็จรูป', 'เครื่องมือช่าง', 'Cost of goods'],
                datasets: [{
                    data: [125000, 890000, 2450000, 315000, 800000],
                    backgroundColor: [
                        '#f59e0b',
                        '#8b5cf6',
                        '#10b981',
                        '#3b82f6',
                        '#06b6d4'
                    ],
                    borderWidth: 3,
                    borderColor: '#ffffff'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                cutout: '55%',
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return context.label + ': ฿' + context.raw.toLocaleString();
                            }
                        }
                    }
                }
            }
        });
    }

    // ===== 8. Claim & Fix Donut Chart =====
    const claimDonutCtx = document.getElementById('claimDonutChart');
    if (claimDonutCtx) {
        new Chart(claimDonutCtx, {
            type: 'doughnut',
            data: {
                labels: ['Inkjet', 'Digital', 'Accessory'],
                datasets: [{
                    data: [5, 3, 8],
                    backgroundColor: ['#3b82f6', '#8b5cf6', '#f59e0b'],
                    borderWidth: 3,
                    borderColor: '#ffffff'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                cutout: '60%',
                plugins: {
                    legend: { display: false }
                }
            }
        });
    }

    // ===== 9. Sales by Product Donut Chart =====
    const salesByProductCtx = document.getElementById('salesByProductChart');
    if (salesByProductCtx) {
        new Chart(salesByProductCtx, {
            type: 'doughnut',
            data: {
                labels: ['หมวกพร้อมปัก', 'กลอนMortise', 'กลอนEnsure', 'ของขวัญพรีเมี่ยม', 'กลอนLockly', 'อื่นๆ'],
                datasets: [{
                    data: [167722.50, 121713.00, 106273.98, 97766.97, 91508.21, 1534343.35],
                    backgroundColor: [
                        '#0ea5e9',
                        '#38bdf8',
                        '#7dd3fc',
                        '#a5d8ff',
                        '#bae6fd',
                        '#e2e8f0'
                    ],
                    borderWidth: 0,
                    hoverOffset: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                cutout: '70%',
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        backgroundColor: 'rgba(30, 41, 59, 0.95)',
                        padding: 12,
                        cornerRadius: 8,
                        callbacks: {
                            label: function(context) {
                                return context.label + ': ฿' + context.raw.toLocaleString();
                            }
                        }
                    }
                }
            }
        });
    }

    // ===== 10. Collection Bar Chart =====
    const collectionCtx = document.getElementById('collectionChart');
    if (collectionCtx) {
        new Chart(collectionCtx, {
            type: 'bar',
            data: {
                labels: ['1-7 ธ.ค.', '8-14 ธ.ค.', '15-21 ธ.ค.', '22-31 ธ.ค.', '1-7 ม.ค.', '8-14 ม.ค.', '15-21 ม.ค.', '22-31 ม.ค.', '1-7 ก.พ.', '8-14 ก.พ.', '15-21 ก.พ.', '22-28 ก.พ.'],
                datasets: [
                    {
                        label: 'เก็บเงินแล้ว',
                        data: [220000, 85000, 125000, 560000, 350000, 60000, 45000, 180000, 420000, 85000, 45000, 0],
                        backgroundColor: '#0ea5e9',
                        borderRadius: 4,
                        barPercentage: 0.7,
                        categoryPercentage: 0.8
                    },
                    {
                        label: 'รายได้รวม',
                        data: [280000, 95000, 145000, 620000, 380000, 75000, 55000, 200000, 480000, 100000, 55000, 0],
                        backgroundColor: '#e2e8f0',
                        borderRadius: 4,
                        barPercentage: 0.7,
                        categoryPercentage: 0.8
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        backgroundColor: 'rgba(30, 41, 59, 0.95)',
                        padding: 12,
                        cornerRadius: 8,
                        callbacks: {
                            label: function(context) {
                                return context.dataset.label + ': ฿' + context.raw.toLocaleString();
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: { color: 'rgba(226, 232, 240, 0.6)' },
                        ticks: {
                            color: '#94a3b8',
                            font: { size: 10 },
                            callback: function(value) {
                                return (value/1000).toLocaleString();
                            }
                        }
                    },
                    x: {
                        grid: { display: false },
                        ticks: {
                            color: '#64748b',
                            font: { size: 9 },
                            maxRotation: 45,
                            minRotation: 45
                        }
                    }
                }
            }
        });
    }

    // ===== 11. Expense by Category Donut Chart =====
    const expenseByCategoryCtx = document.getElementById('expenseByCategoryChart');
    if (expenseByCategoryCtx) {
        new Chart(expenseByCategoryCtx, {
            type: 'doughnut',
            data: {
                labels: ['สินค้า/วัตถุดิบ', 'เงินเดือน/สวัสดิการ', 'การตลาดและโฆษณา', 'เบ็ดเตล็ด', 'ค่าเช่า', 'อื่นๆ'],
                datasets: [{
                    data: [933014.68, 605647.39, 288006.75, 163835.73, 138726.66, 282783.53],
                    backgroundColor: [
                        '#ec4899',
                        '#f472b6',
                        '#a855f7',
                        '#818cf8',
                        '#1f2937',
                        '#d1d5db'
                    ],
                    borderWidth: 0,
                    hoverOffset: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                cutout: '70%',
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        backgroundColor: 'rgba(30, 41, 59, 0.95)',
                        padding: 12,
                        cornerRadius: 8,
                        callbacks: {
                            label: function(context) {
                                return context.label + ': ฿' + context.raw.toLocaleString();
                            }
                        }
                    }
                }
            }
        });
    }

    // ===== 12. Payment Bar Chart =====
    const paymentCtx = document.getElementById('paymentChart');
    if (paymentCtx) {
        new Chart(paymentCtx, {
            type: 'bar',
            data: {
                labels: ['1-7 ธ.ค.', '8-14 ธ.ค.', '15-21 ธ.ค.', '22-31 ธ.ค.', '1-7 ม.ค.', '8-14 ม.ค.', '15-21 ม.ค.', '22-31 ม.ค.', '1-7 ก.พ.', '8-14 ก.พ.', '15-21 ก.พ.', '22-28 ก.พ.'],
                datasets: [
                    {
                        label: 'ชำระเงินแล้ว',
                        data: [160000, 75000, 180000, 750000, 120000, 65000, 420000, 220000, 85000, 0, 0, 0],
                        backgroundColor: '#ec4899',
                        borderRadius: 4,
                        barPercentage: 0.7,
                        categoryPercentage: 0.8
                    },
                    {
                        label: 'ค่าใช้จ่ายรวม',
                        data: [180000, 85000, 200000, 820000, 140000, 80000, 480000, 250000, 100000, 0, 0, 0],
                        backgroundColor: '#e2e8f0',
                        borderRadius: 4,
                        barPercentage: 0.7,
                        categoryPercentage: 0.8
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        backgroundColor: 'rgba(30, 41, 59, 0.95)',
                        padding: 12,
                        cornerRadius: 8,
                        callbacks: {
                            label: function(context) {
                                return context.dataset.label + ': ฿' + context.raw.toLocaleString();
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: { color: 'rgba(226, 232, 240, 0.6)' },
                        ticks: {
                            color: '#94a3b8',
                            font: { size: 10 },
                            callback: function(value) {
                                return (value/1000).toLocaleString();
                            }
                        }
                    },
                    x: {
                        grid: { display: false },
                        ticks: {
                            color: '#64748b',
                            font: { size: 9 },
                            maxRotation: 45,
                            minRotation: 45
                        }
                    }
                }
            }
        });
    }

    // ===== 13. Income vs Expense Line Chart =====
    const incomeExpenseCtx = document.getElementById('incomeExpenseChart');
    if (incomeExpenseCtx) {
        new Chart(incomeExpenseCtx, {
            type: 'line',
            data: {
                labels: ['ม.ค. 2026', 'ก.พ. 2026', 'มี.ค. 2026', 'เม.ย. 2026', 'พ.ค. 2026', 'มิ.ย. 2026', 'ก.ค. 2026', 'ส.ค. 2026', 'ก.ย. 2026', 'ต.ค. 2026', 'พ.ย. 2026', 'ธ.ค. 2026'],
                datasets: [
                    {
                        label: 'รายได้รวม',
                        data: [920000, 62000, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        borderColor: '#0ea5e9',
                        backgroundColor: 'rgba(14, 165, 233, 0.1)',
                        borderWidth: 2,
                        fill: true,
                        tension: 0.4,
                        pointRadius: 4,
                        pointBackgroundColor: '#0ea5e9',
                        pointBorderColor: '#fff',
                        pointBorderWidth: 2
                    },
                    {
                        label: 'ค่าใช้จ่ายรวม',
                        data: [680000, 200000, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        borderColor: '#ec4899',
                        backgroundColor: 'rgba(236, 72, 153, 0.1)',
                        borderWidth: 2,
                        fill: true,
                        tension: 0.4,
                        pointRadius: 4,
                        pointBackgroundColor: '#ec4899',
                        pointBorderColor: '#fff',
                        pointBorderWidth: 2
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                interaction: {
                    intersect: false,
                    mode: 'index'
                },
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        backgroundColor: 'rgba(30, 41, 59, 0.95)',
                        padding: 12,
                        cornerRadius: 8,
                        callbacks: {
                            label: function(context) {
                                return context.dataset.label + ': ฿' + context.raw.toLocaleString();
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: { color: 'rgba(226, 232, 240, 0.6)' },
                        ticks: {
                            color: '#94a3b8',
                            font: { size: 10 },
                            callback: function(value) {
                                return (value/1000).toLocaleString();
                            }
                        }
                    },
                    x: {
                        grid: { display: false },
                        ticks: {
                            color: '#64748b',
                            font: { size: 10 },
                            maxRotation: 45,
                            minRotation: 45
                        }
                    }
                }
            }
        });
    }

});
