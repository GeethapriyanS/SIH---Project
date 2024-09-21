document.getElementById('dashboard-link').addEventListener('click', function () {
    showPage('dashboard-page');
});

document.getElementById('automation-link').addEventListener('click', function () {
    showPage('automation-page');
});

document.getElementById('resource-link').addEventListener('click', function () {
    showPage('resource-allocation-page');
});

document.getElementById('notification-link').addEventListener('click', function () {
    showPage('notification-page');
});

function showPage(pageId) {
    const pages = ['dashboard-page', 'automation-page', 'resource-allocation-page','notification-page'];
    pages.forEach(page => {
        document.getElementById(page).style.display = 'none';
    });
    document.getElementById(pageId).style.display = 'block';
}

// Initialize with Dashboard as the default page
showPage('dashboard-page');

// Chart.js implementation for Dashboard

const ctx1 = document.getElementById('total-applications-chart').getContext('2d');
const totalApplicationsChart = new Chart(ctx1, {
    type: 'bar',
    data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [{
            label: 'Total Applications',
            data: [120, 150, 180, 130, 160, 190, 210, 240, 220, 200, 180, 240],
            backgroundColor: '#004aad'
        }]
    },
    options: {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

const ctx2 = document.getElementById('verified-applications-chart').getContext('2d');
const verifiedApplicationsChart = new Chart(ctx2, {
    type: 'line',
    data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
            {
                label: 'Verified Applications Data 1',
                data: [50, 60, 70, 60, 80, 90, 100, 110, 90, 80, 60, 70],
                borderColor: '#004aad',
                fill: false
            },
            {
                label: 'Verified Applications Data 2',
                data: [30, 40, 50, 40, 60, 70, 80, 90, 70, 60, 40, 50],
                borderColor: '#cc0044',
                fill: false
            }
        ]
    },
    options: {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

const ctx3 = document.getElementById('district-applications-chart').getContext('2d');
const districtApplicationsChart = new Chart(ctx3, {
    type: 'doughnut',
    data: {
        labels: ['District 1', 'District 2', 'District 3', 'District 4'],
        datasets: [{
            label: 'District Applications',
            data: [36, 57, 63, 71],
            backgroundColor: ['#004aad', '#00cc44', '#cc0044', '#f4a500']
        }]
    },
    options: {
        responsive: true
    }
});

const ctx4 = document.getElementById('delivery-applications-chart').getContext('2d');
const deliveryApplicationsChart = new Chart(ctx4, {
    type: 'line',
    data: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [
            {
                label: 'Delivery Applications A',
                data: [33, 28, 26, 30, 32, 25, 29],
                borderColor: '#004aad',
                fill: false
            },
            {
                label: 'Delivery Applications B',
                data: [13, 18, 16, 20, 22, 15, 19],
                borderColor: '#00cc44',
                fill: false
            }
        ]
    },
    options: {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});
