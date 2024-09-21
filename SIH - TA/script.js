document.addEventListener('DOMContentLoaded', function() {
    const districts = [
        { name: "CHENGALPATTU", pendingFiles: 10043, status: "Processing" },
        { name: "COIMBATORE", pendingFiles: 12300, status: "Under Review" },
        { name: "DHARMAPURI", pendingFiles: 15000, status: "Processing" },
        { name: "ERODE", pendingFiles: 12100, status: "Completed" },
        { name: "NAGAPATTINAM", pendingFiles: 34000, status: "High Backlog" },
        { name: "VIRUDHUNAGAR", pendingFiles: 12300, status: "Under Review" },
        { name: "TIRUVANNAMALAI", pendingFiles: 34903, status: "High Backlog" },
        { name: "KALLAKURICHI", pendingFiles: 23432, status: "Processing" },
        { name: "PERAMBALUR", pendingFiles: 12345, status: "Completed" },
        { name: "THOOTHUKUDI", pendingFiles: 9032, status: "Completed" }
    ];

    const vaoResources = [
        { vaoName: "VAO1", district: "CHENGALPATTU", resourcesNeeded: "3 additional clerks" },
        { vaoName: "VAO2", district: "COIMBATORE", resourcesNeeded: "2 additional computers" },
        { vaoName: "VAO3", district: "DHARMAPURI", resourcesNeeded: "5 additional clerks" },
        { vaoName: "VAO4", district: "ERODE", resourcesNeeded: "1 additional computer" },
        { vaoName: "VAO5", district: "NAGAPATTINAM", resourcesNeeded: "7 additional clerks" }
    ];

    function determineWorkload(pendingFiles) {
        return pendingFiles > 15000 ? 'High' : 'Low';
    }

    function renderTable(districts) {
        const tbody = document.querySelector('.resource-table tbody');
        tbody.innerHTML = '';

        districts.forEach(district => {
            const row = document.createElement('tr');
            const workload = determineWorkload(district.pendingFiles);

            row.innerHTML = `
                <td>${district.name}</td>
                <td>${district.pendingFiles}+</td>
                <td>${workload}</td>
                <td>${district.status}</td>
            `;

            tbody.appendChild(row);
        });
    }

    function getStatusSummary() {
        const statusSummary = districts.map(district => 
            <p><strong>${district.name}</strong>: ${district.status}</p>
        ).join('');
        return statusSummary || 'No status available';
    }

    // Initial rendering
    renderTable(districts);

    // Search functionality
    const searchBar = document.querySelector('.search-bar');
    searchBar.addEventListener('input', function() {
        const searchQuery = searchBar.value.toLowerCase();
        const filteredDistricts = districts.filter(district =>
            district.name.toLowerCase().includes(searchQuery)
        );
        renderTable(filteredDistricts);
    });

    // Status button functionality
    const statusButton = document.querySelector('.status-button');
    const statusDisplay = document.querySelector('.status-display');
    const statusText = document.querySelector('#status-text');

    statusButton.addEventListener('click', function() {
        statusText.innerHTML = getStatusSummary();
        statusDisplay.style.display = 'block';
    });

    // Reallocation button functionality
    const reallocationButton = document.querySelector('.reallocation-button');
    reallocationButton.addEventListener('click', function() {
        alert('Reallocation request has been sent successfully!');
        renderVaoResources(vaoResources);
        showContent(notificationContent, resourceReallocationContent);
        notificationMenu.classList.add('active');
        resourceReallocationMenu.classList.remove('active');
    });

    // Function to render VAO resources in the notification tab
    function renderVaoResources(vaoResources) {
        const notificationContent = document.getElementById('notification-content');
        notificationContent.innerHTML = `
            <h2>VAO Resource Requests</h2>
            <table class="vao-resource-table">
                <thead>
                    <tr>
                        <th>VAO NAME</th>
                        <th>DISTRICT</th>
                        <th>RESOURCES NEEDED</th>
                    </tr>
                </thead>
                <tbody>
                    ${vaoResources.map(vao => `
                        <tr>
                            <td>${vao.vaoName}</td>
                            <td>${vao.district}</td>
                            <td>${vao.resourcesNeeded}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;
    }

    // Tab navigation
    const notificationMenu = document.getElementById('notification-menu');
    const resourceReallocationMenu = document.getElementById('resource-reallocation-menu');
    const notificationContent = document.getElementById('notification-content');
    const resourceReallocationContent = document.getElementById('resource-reallocation-content');

    // Show the content of the active tab
    function showContent(contentToShow, contentToHide) {
        contentToShow.style.display = 'block';
        contentToHide.style.display = 'none';
    }

    notificationMenu.addEventListener('click', function() {
        showContent(notificationContent, resourceReallocationContent);
        notificationMenu.classList.add('active');
        resourceReallocationMenu.classList.remove('active');
    });

    resourceReallocationMenu.addEventListener('click', function() {
        showContent(resourceReallocationContent, notificationContent);
        resourceReallocationMenu.classList.add('active');
        notificationMenu.classList.remove('active');
    });

    // Optionally, you can make one tab active by default
    showContent(resourceReallocationContent, notificationContent);
    resourceReallocationMenu.classList.add('active');
});