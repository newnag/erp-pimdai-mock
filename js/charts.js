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

    // ===== 2. Sales Bar Chart (Quotation vs Order) =====
    const salesBarCtx = document.getElementById('salesBarChart');
    if (salesBarCtx) {
        new Chart(salesBarCtx, {
            type: 'bar',
            data: {
                labels: ['จำนวน', 'มูลค่า (M)'],
                datasets: [
                    {
                        label: 'ใบเสนอราคา',
                        data: [45, 2.5],
                        backgroundColor: '#3b82f6',
                        borderRadius: 6,
                        barThickness: 30
                    },
                    {
                        label: 'ออเดอร์',
                        data: [32, 1.8],
                        backgroundColor: '#10b981',
                        borderRadius: 6,
                        barThickness: 30
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
                            padding: 15
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: { color: '#e2e8f0' }
                    },
                    x: {
                        grid: { display: false }
                    }
                }
            }
        });
    }

    // ===== 3. Sales Gauge Chart (Closing Rate) =====
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
                labels: ['Followers', 'Conversion', 'FB Click', 'GG Click', 'Ads Click/Add'],
                datasets: [{
                    data: [124, 38, 256, 189, 85],
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

});
