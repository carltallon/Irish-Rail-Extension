// script.js
document.addEventListener('DOMContentLoaded', function () {
    // Define the URL of the API
    const baseUrl = 'https://corsproxy.io/?https://irish-rail-rest-api.fly.dev/stations/';
    const dropdown = document.getElementById('stations');
    const dataContainer = document.getElementById('data-container');

    // Fetch data from the API based on the selected station
    function fetchData(stationCode) {

        // Clear the existing table
        dataContainer.innerHTML = '';

        const apiUrl = `${baseUrl}${stationCode}/timetable`;

        fetch(apiUrl)
        .then(response => {
            if (response.ok) {
                return response.json(); // Assuming the API returns JSON data
            } else {
                throw new Error('Failed to fetch data');
            }
        })
        .then(data => {
            // Manipulate the data
            const jsonData = data; // Assuming data is an array of JSON objects

            // Create an array to store JavaScript objects
            const javascriptObjects = [];

            // Loop through the JSON data and convert each object to a JavaScript object
            jsonData.forEach(jsonObj => {
                // Modify or process each JSON object here if needed
                const javascriptObj = {
                    Destination: jsonObj.destination,
                    Expected: jsonObj.exp_arrival,
                    LastLocation: jsonObj.last_location
                };

                // Push the JavaScript object to the array
                javascriptObjects.push(javascriptObj);
            });

            const limitedData = javascriptObjects.slice(0, 3); 

            // Display the JavaScript objects in the HTML page
            const dataContainer = document.getElementById('data-container');

            // Create an HTML table to display the data
            const table = document.createElement('table');

            // Create the table header
            const thead = document.createElement('thead');
            const headerRow = document.createElement('tr');
            for (const key in limitedData[0]) {
                if (limitedData[0].hasOwnProperty(key)) {
                    const th = document.createElement('th');
                    th.textContent = key;
                    headerRow.appendChild(th);
                }
            }
            thead.appendChild(headerRow);
            table.appendChild(thead);

            // Create the table body with rows and cells
            const tbody = document.createElement('tbody');
            limitedData.forEach(obj => {
                const row = document.createElement('tr');
                for (const key in obj) {
                    if (obj.hasOwnProperty(key)) {
                        const cell = document.createElement('td');
                        cell.textContent = obj[key];
                        row.appendChild(cell);
                    }
                }
                tbody.appendChild(row);
            });
            table.appendChild(tbody);

            // Append the table to the data container
            dataContainer.appendChild(table);
            
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }

    // Add a change event listener to the dropdown
    dropdown.addEventListener('change', function () {
        const selectedStation = dropdown.value;
        // Call fetchData with the selected station code
        fetchData(selectedStation);
    });

    // Initialize with the default selected station (if needed)
    const defaultSelectedStation = dropdown.value;
    fetchData(defaultSelectedStation);
});

