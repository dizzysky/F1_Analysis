// import Chart from 'chart.js'; // Import Chart.js if not already imported
const circuitImages = {
    "jacarepagua": "https://upload.wikimedia.org/wikipedia/commons/7/75/Aut%C3%B3dromo_Internacional_Nelson_Piquet_in_Bras%C3%ADlia.svg",
    "imola": "https://upload.wikimedia.org/wikipedia/commons/4/42/Imola.svg",
    "monaco": "https://upload.wikimedia.org/wikipedia/commons/3/36/Monte_Carlo_Formula_1_track_map.svg",
    "rodriguez": "https://upload.wikimedia.org/wikipedia/commons/e/ef/Aut%C3%B3dromo_Hermanos_Rodr%C3%ADguez.svg",
    "villeneuve": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/%C3%8Ele_Notre-Dame_%28Circuit_Gilles_Villeneuve%29.svg/2560px-%C3%8Ele_Notre-Dame_%28Circuit_Gilles_Villeneuve%29.svg.png",
    "detroit": "https://upload.wikimedia.org/wikipedia/commons/d/df/TrackMap_Detroit-2023.png",
    "ricard": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Le_Castellet_circuit_map_Formula_One_2019_and_2021_with_corner_names_English_19_07_2021.svg/1920px-Le_Castellet_circuit_map_Formula_One_2019_and_2021_with_corner_names_English_19_07_2021.svg.png",
    "silverstone": "https://upload.wikimedia.org/wikipedia/commons/b/bd/Silverstone_Circuit_2020.png",
    "hockenheimring": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Hockenheim2012.svg/2560px-Hockenheim2012.svg.png",
    "hungaroring": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Hungaroring.svg/1920px-Hungaroring.svg.png",
    "spa": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Spa-Francorchamps_of_Belgium.svg/2560px-Spa-Francorchamps_of_Belgium.svg.png",
    "monza": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/Monza_track_map.svg/2880px-Monza_track_map.svg.png",
    "estoril": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Estoril_track_map.svg/2880px-Estoril_track_map.svg.png",
    "jerez": "https://upload.wikimedia.org/wikipedia/commons/2/26/Jerez_GP_Circuit_2004.png",
    "suzuka": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Suzuka_circuit_map--2005.svg/2560px-Suzuka_circuit_map--2005.svg.png",
    "adelaide": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Adelaide_%28long_route%29.svg/2560px-Adelaide_%28long_route%29.svg.png"

}

const driverHeadshots = {
    "prost": "https://cdn.images.autosport.com/f1greatestdrivers/mug/1955022400.jpg",
    "berger": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGKdVutc1doaeJGomCW6sXtWArB_b_s9ClSYME48lBNM5FJdWk5NKn0C9zxKhswt_jwpo&usqp=CAU",
    "senna": "https://s.wsj.net/public/resources/images/B3-DW970_CAPTAI_FR_20190503142818.jpg"

}


const podiums1988 = [
    { constructor: 'McLaren-Honda', podiums: 25 },
    { constructor: 'Ferrari', podiums: 10 },
    { constructor: 'Lotus-Honda', podiums: 3 },
    { constructor: 'Benetton-Ford', podiums: 3 },
    { constructor: 'Arrows-Megatron', podiums: 1 },
    { constructor: 'March-Judd', podiums: 1 }
];  


const constructorColors = {
    'McLaren-Honda': '#c20619',
    'Ferrari': '#ff2800',
    'Lotus-Honda': '#00A800',
    'Arrows-Megatron': '#6a160b',
    'March-Judd': '#9cd5e8'

    // etc.
};

const sampleData = [
    { x: 1, y: 10 },
    { x: 2, y: 15 },
    { x: 3, y: 5 },
    { x: 4, y: 30 },
    { x: 5, y: 12 }
];




export default class F1Season {
    constructor(mainElement, races) {
        this.mainElement = mainElement;
        this.races = races; // Store the races array
        this.initializeRaces();
        this.initializeSeasonStats();
        this.initializeScatterPlot();  // Add this line here
    }



    initializeRaces() {
        const raceNav = document.getElementById('race-nav');
        this.races.forEach((race, index) => { // use this.races instead of races
            const raceLink = document.createElement('a');
            raceLink.href = '#';
            raceLink.className = 'race-link';
            // raceLink.textContent = `${race.raceName} - ${race.Circuit.circuitId}`; 
            raceLink.textContent = `${race.raceName}`; 
            raceLink.addEventListener('click', (e) => {
            e.preventDefault();

            //removes 'active' class from all links when you click on something else
            document.querySelectorAll('.race-link').forEach((link) => {
                link.classList.remove('active');
            });

            raceLink.classList.add('active');
            this.fetchRaceDetails(index).then((details) => {
            this.populateMainContent(details);
            });
        });
            raceNav.appendChild(raceLink);
        });
    }


    fetchRaceDetails(index) {
        const url = `http://ergast.com/api/f1/1988/${index + 1}/results.json`;
        return fetch(url)
            .then(response => response.json())
            .then(data => {
            const raceDetails = data.MRData.RaceTable.Races[0];
            return raceDetails;
        })
            .catch(error => console.error("An error occurred:", error));
    }




    populateMainContent(details) {
        const mainContent = document.getElementById('race-content');
        const circuitImageURL = circuitImages[details.Circuit.circuitId];
        let tableRowsHTML = ''; // Initialize the table rows HTML variable


        mainContent.classList.add('fade-out');


        setTimeout(() => {
        details.Results.slice(0,5).forEach((result, index) => {
            tableRowsHTML += `
                <tr>
                    <td>${index + 1}</td>
                    <td>${result.Driver.givenName} ${result.Driver.familyName} - ${result.Constructor.name}</td>
                    <td>${result.Time ? result.Time.time : 'N/A'}</td>
                    <td><a href="${result.Driver.url}">Driver Profile</a></td>
                    <td><a href="${result.Constructor.url}">Constructor Profile</a></td>
                </tr>
            `;
        });
    
        mainContent.innerHTML = `
        <div style="display: flex; align-items: flex-start; font-family: Futura;">
        <img src="${circuitImageURL}" width="300" alt="Track Configuration" style="margin-right: 20px;" /> <!-- Added margin-right -->
        <div>
            <h2>${details.raceName}</h2>
            <p>Circuit: ${details.Circuit.circuitName}</p>
            <p>Location: ${details.Circuit.Location.locality}, ${details.Circuit.Location.country}</p>
            <p>Date: ${details.date}</p>
            <table>
                <thead>
                    <tr>
                        <th>Position</th>
                        <th>Driver</th>
                        <th>Constructor</th>
                        <th>Time</th>
                        <th>Profile Links</th>
                    </tr>
                </thead>
                <tbody>
                    ${tableRowsHTML} <!-- Append the table rows here -->
                </tbody>
            </table>
        </div>
    </div>
    `
    mainContent.classList.remove('fade-out');
    ; }, 500);

    }
    
    
    
    

    initializeSeasonStats() {
        const mainContent = document.getElementById('race-content');
        // Clear existing content
        mainContent.innerHTML = '';

        //start fading out
        mainContent.classList.add('fade-out');

        setTimeout(() => {
    
        // Create a container for the chart
        const chartContainer = document.createElement('div');
        chartContainer.style.width = '350px'; // Set the width you want here
        chartContainer.style.height = '200px'; // Set the height you want here
        mainContent.appendChild(chartContainer); // Add the container to the main content area
    
        const canvas = chartContainer.appendChild(document.createElement('canvas'));

        const podiumsData = podiums1988.map(item => item.podiums);
        const constructorNames = podiums1988.map(item => item.constructor);
        const backgroundColors = podiums1988.map(item => constructorColors[item.constructor]);

    
        const ctx = canvas.getContext('2d');
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: podiums1988.map(item => item.constructor),
                datasets: [{
                    label: 'Podium Wins by Constructor',
                    data: podiums1988.map(item => item.podiums),
                    backgroundColor: backgroundColors, // Example color
                    borderColor: 'rgba(0, 0, 0, 0.1)', // Example color
                    borderWidth: 1
                }]
            },
            options: {
                title: {
                    display: true,
                    text: 'Podium Wins by Constructor',
                    fontSize: 20, // Adjust the font size as needed
                    fontColor: '#000', // You can set the color if you want
                    fontStyle: 'bold' // Makes the title bold
                },
                responsive: true,
                maintainAspectRatio: false // Allow the chart to fit the container without maintaining its aspect ratio
            }
        });
        mainContent.classList.remove('fade-out');
    }, 500);
    }//end initializeSeasonStats


    initializeScatterPlot() {
        // Replace "your-real-api-url-here" with your actual API endpoint
        fetch("your-real-api-url-here")
            .then(response => response.json())
            .then(scatterData => {
                // Assuming scatterData is an array of objects with x and y properties
                const ctx = document.getElementById("myScatterChart").getContext("2d");
        
                new Chart(ctx, {
                    type: 'scatter',
                    data: {
                        datasets: [{
                            label: 'My Scatter Dataset',
                            data: scatterData.map(item => ({ x: item.x, y: item.y })),
                            backgroundColor: 'rgba(0, 123, 255, 0.5)'
                        }]
                    },
                    options: {
                        scales: {
                            x: {
                                beginAtZero: true
                            },
                            y: {
                                beginAtZero: true
                            }
                        }
                    }
                });
            })
            .catch(error => {
                console.error("An error occurred:", error);
                // You can initialize the chart with empty or fallback data here if you want
            });
    }
    
    
    
    
    



    
}
