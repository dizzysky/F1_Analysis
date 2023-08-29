import { circuitImages, driverHeadshots, podiums1988, constructorColors, countryFlags } from "./dataset";
const fetchData = async (url) => {
    try {
        const response = await fetch(url);
        return await response.json();
    } catch (error) {
        console.error("An error occurred:", error);
        return null;
    }
};

const createLinkElement = (text, className, clickHandler) => {
    const link = document.createElement('a');
    link.href = '#';
    link.className = className;
    link.textContent = text;
    link.addEventListener('click', clickHandler);
    return link;
};

const createRaceRowHTML = (result, index) => `
    <tr>
        <td>${index + 1}</td>
        <td>${result.Driver.givenName} ${result.Driver.familyName}</td>
        <td>${result.Constructor.name}</td>  <!-- Added this cell -->
        <td>${result.Time ? result.Time.time : 'N/A'}</td>
        <td><a href="${result.Driver.url}">Driver Profile</a></td>
        <!-- <td><a href="${result.Constructor.url}">Constructor Profile</a></td> -->
    </tr>
`;


export default class F1Season {
    constructor(mainElement, races) {
        this.mainElement = mainElement;
        this.races = races; // Store the races array
        this.initializeRaces();
        this.initializeSeasonStats();
        // this.initializeScatterPlot();  // Add this line here
    }

    async fetchRaceDetails(index) {
        const url = `http://ergast.com/api/f1/1988/${index + 1}/results.json`;
        const data = await fetchData(url);
        return data?.MRData?.RaceTable?.Races[0] ?? null;
    }
    
    initializeRaces() {
        const raceNav = document.getElementById('race-nav');
        this.races.forEach((race, index) => {
            const { raceName, Circuit } = race;
            const flagURL = countryFlags[Circuit.circuitId];
            const raceLink = createLinkElement(raceName, 'race-link', async (e) => {
                e.preventDefault();
                // Active link handling
                document.querySelectorAll('.race-link').forEach((link) => link.classList.remove('active'));
                raceLink.classList.add('active');
        
                const details = await this.fetchRaceDetails(index);
                this.populateMainContent(details);
            });



             // Add transitionend event listener
        raceLink.addEventListener('transitionend', (e) => {
            if (e.propertyName === 'border-bottom' || e.propertyName === 'border-bottom') {
                raceLink.classList.add('bold-border');
            }
        });
            
            // Create flag image element if URL exists
        if (flagURL) {
            const flagImg = document.createElement('img');
            flagImg.src = flagURL;
            flagImg.width = 20;
            flagImg.alt = `Flag of ${Circuit.Location.country}`;
            flagImg.style.marginLeft = "10px";
            raceLink.appendChild(flagImg);
        }

    
            raceNav.appendChild(raceLink);
        });
    }


    populateMainContent(details) {
        const mainContent = document.querySelector('#race-content .fade-content');
        const circuitImageURL = circuitImages[details.Circuit.circuitId];
        let tableRowsHTML = ''; // Initialize the table rows HTML variable


        mainContent.classList.add('fade-out');


        setTimeout(() => {
            let tableRowsHTML = details.Results.slice(0,5).map(createRaceRowHTML).join('');

        mainContent.innerHTML = `
        <div style="display: flex; align-items: flex-start; font-family: Futura;">
        <img src="${circuitImageURL}" width="300" alt="Track Configuration" style="margin-right: 75px;" /> <!-- Added margin-right -->
        <div>
            <h2 style="margin-top: 0;">${details.raceName}</h2>
            <p>Circuit: ${details.Circuit.circuitName}</p>
            <p>Location: ${details.Circuit.Location.locality}, ${details.Circuit.Location.country}</p>
            <p>Date: ${details.date}</p>
            <table class="styled-table">
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

    async initializeSeasonStats() {
        const mainContent = document.querySelector('#race-content .fade-content');
        // Clear existing content
        mainContent.innerHTML = '';

        //start fading out
        mainContent.classList.add('fade-out');


        const scatterData = await getScatterData('1988');

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




             // Scatter Plot
        const scatterPlotContainer = document.createElement('div');
        scatterPlotContainer.style.width = '350px';
        scatterPlotContainer.style.height = '200px';
        mainContent.appendChild(scatterPlotContainer);

        const scatterCanvas = scatterPlotContainer.appendChild(document.createElement('canvas'));
        const scatterCtx = scatterCanvas.getContext('2d');

        
        new Chart(scatterCtx, {
            type: 'scatter',
            data: {
                datasets: [{
                    label: 'Average Lap Time vs Podium Wins',
                    data: scatterData,
                    backgroundColor: 'rgba(0, 0, 255, 0.5)',
                    borderColor: 'rgba(0, 0, 0, 0.1)',
                    borderWidth: 1
                }]
            },
            options: {
                // ... Your scatter plot configuration here ...
            }
        });

            




        mainContent.classList.remove('fade-out');
    }, 500);
    }//end initializeSeasonStats
}


async function getScatterData(season) {
    const url = `http://ergast.com/api/f1/${season}.json`;
    const response = await fetchData(url);
    const races = response.MRData.RaceTable.Races;

    let driverData = {};

    for (let race of races) {
        const raceUrl = `http://ergast.com/api/f1/${season}/${race.round}/results.json`;
        const raceResponse = await fetchData(raceUrl);
        const results = raceResponse.MRData.RaceTable.Races[0].Results;

        results.forEach((result) => {
            const driverId = result.Driver.driverId;
            if (!driverData[driverId]) {
                driverData[driverId] = { races: 0, podiums: 0 };
            }
            driverData[driverId].races++;

            if (parseInt(result.position) <= 3) {
                driverData[driverId].podiums++;
            }
        });
    }

    const scatterData = Object.keys(driverData).map((driverId) => ({
        x: driverData[driverId].races,
        y: driverData[driverId].podiums
    }));

    return scatterData;
}
