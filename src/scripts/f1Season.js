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


    async populateMainContent(details) {
        const mainContent = document.querySelector('#race-content .fade-content');
        const circuitImageURL = circuitImages[details.Circuit.circuitId];
        let tableRowsHTML = ''; // Initialize the table rows HTML variable


          //WEATHER
    const latitude = details.Circuit.Location.lat;
    const longitude = details.Circuit.Location.long;
    const weatherData = await fetchWeatherData(latitude, longitude);
    const averageTemperature = weatherData.hourly.temperature_2m.reduce((acc, val) => acc + val, 0) / weatherData.hourly.temperature_2m.length;
    const averagePrecipitation = weatherData.hourly.precipitation.reduce((acc, val) => acc + val, 0) / weatherData.hourly.precipitation.length;
    const roundedTemperature = parseFloat(averageTemperature).toFixed(2);
    const roundedPrecipitation = parseFloat(averagePrecipitation).toFixed(2);


    console.log('Full Weather Data:', weatherData);

    console.log(weatherData);
    if(!weatherData) {
        console.error("failed to fetch weather data");
        return;
    }


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
    
    //WEATHER
    mainContent.innerHTML += `
    <div>
        <h2 style="font-size: 2em;">Weather Data</h2>
        <p>Temperature: ${roundedTemperature}°C</p>
        <!-- <p>Temperature: ${weatherData.temperature_2m}°C</p> -->
        <!-- <p>Precipitation: ${weatherData.precipitation}mm</p> -->
        <p>Precipitation: ${roundedPrecipitation}mm</p>
    </div>
    `;

    // Identify the winner's name from details.Results
const winnerLastName = details.Results[0].Driver.familyName;
const winnerFirstName = details.Results[0].Driver.givenName;
const winnerFullName = `${winnerFirstName} ${winnerLastName}`;

// Get the winner's headshot URL from driverHeadshots
const winnerHeadshotURL = driverHeadshots[winnerLastName];
// console.log("WINNER HEADSHOT: ", winnerHeadshotURL);

// Add the winner's headshot to your HTML content
mainContent.innerHTML += `
    <div>
        <h2 style="font-size: 2em">Winner: ${winnerFullName}</h2>
        <img src="${winnerHeadshotURL}" width="100" alt="${winnerFullName}'s headshot">
    </div>
`;


    mainContent.classList.remove('fade-out');
    ; }, 500);

    }//end populate main content

    async initializeSeasonStats() {
        const mainContent = document.querySelector('#race-content .fade-content');
        const spinner = document.getElementById('spinner');

        spinner.style.display = 'block';

        // Clear existing content
        mainContent.innerHTML = '';
        const scatterData = await getScatterData('1988');
        const driverNationalities = await getDriverNationalities('1988');


        spinner.style.display = 'none';

        //start fading out
        mainContent.classList.add('fade-out');
        

        setTimeout(() => {

        const imageBlurbContainer = document.createElement('div');
        imageBlurbContainer.style.display = 'flex';
        imageBlurbContainer.style.marginBottom = '50px';
        mainContent.appendChild(imageBlurbContainer);



        //Image Element

        const imageElement = document.createElement('img');
        imageElement.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Gerhard_Berger_1988_Canada.jpg/220px-Gerhard_Berger_1988_Canada.jpg';  // Replace this
        imageElement.alt = 'Description of the image';
        imageElement.width = 500; // Optional
        imageElement.height = 300; // Optional
        imageElement.style.marginRight = '30px';
        imageBlurbContainer.appendChild(imageElement);


        // Add the blurb to the right of the image and position it above it
        const blurbElement = document.createElement('p');
        blurbElement.innerHTML = `
        The 1988 Formula One season was one of the most exciting in history. Ayrton Senna won his first Drivers' Championship, narrowly beating his McLaren teammate Alain Prost. The two drivers were closely matched throughout the season, and there were many controversial moments, including a collision between them at the Japanese Grand Prix.

        The 1988 season was also the last season where turbocharged engines were allowed in Formula One. The McLaren-Honda MP4/4 was the dominant car of the year, and it won 15 of the 16 races.

        The image you are seeing is of Gerhard Berger, who finished third in the Drivers' Championship. He was driving for Ferrari in 1988, and he won two races that season.
        <br>
        `;
        imageBlurbContainer.appendChild(blurbElement);
        
        //container for both charts
        const chartsContainer = document.createElement('div');
        chartsContainer.style.display = 'flex';
        mainContent.appendChild(chartsContainer);
    
            // Create a container for the FIRST chart
            const chartContainer = document.createElement('div');
            chartContainer.style.width = '350px'; // Set the width you want here
            chartContainer.style.height = '200px'; // Set the height you want here
            chartContainer.style.marginRight = '50px';
            chartsContainer.appendChild(chartContainer); // Add the container to the main content area
        
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
        chartsContainer.appendChild(scatterPlotContainer);

        const scatterCanvas = scatterPlotContainer.appendChild(document.createElement('canvas'));
        const scatterCtx = scatterCanvas.getContext('2d');

        

        


        new Chart(scatterCtx, {
            type: 'scatter',
            data: {
                datasets: [{
                    label: 'Races Participated vs Podium Finishes',
                    data: scatterData,
                    backgroundColor: 'rgba(0, 0, 255, 0.5)',
                    borderColor: 'rgba(0, 0, 0, 0.1)',
                    borderWidth: 1
                }]
            },
            options: {
                // ...scatter plot configuration here ...
                // plugins: {
                //     datalabels: {
                //         // display: false
                //     }
                // }
            }
        });


        const nationalityColors = {
            'Italian': '#008C45', // Green
            'French': '#0033cc',  // Blue
            'British': '#012169', // Red
            'Spanish': '#ff9933', // Orange
            'Argentine': '#6CACE4',
            'Belgian': '#FFCD00',
            'Swedish' : '#006AA7',
            'Brazilian' : '#009739',
            'Austrian' : '#EF3340',
            'American' : "#B31942"



            // Add other countries and colors here
        };

        const flagEmojis = {
            'Italian': '🇮🇹',
            'French': '🇫🇷',
            'British': '🇬🇧',
            'Spanish': '🇪🇸',
            'Austrian': '🇦🇹',
            'Belgian' : '🇧🇪',
            'American' : '🇺🇸', 
            'Brazilian' : '🇧🇷',
            'Swedish' : '🇸🇪', 
            'Argentine' : '🇦🇷',
            'Japanese' : '🇯🇵'
        }
        


        console.log('Driver Nationalities:', driverNationalities);
console.log('Nationality Colors:', nationalityColors);
console.log('Flag Emojis:', flagEmojis);


        //Doughnut Chart 
const doughnutChartContainer = document.createElement('div');
doughnutChartContainer.style.width = '350px';
doughnutChartContainer.style.height = '200px';
chartsContainer.appendChild(doughnutChartContainer);

const doughnutCanvas = doughnutChartContainer.appendChild(document.createElement('canvas'));
const doughnutCtx = doughnutCanvas.getContext('2d');

new Chart(doughnutCtx, {
    type: 'doughnut',
    data: {
        labels: Object.keys(driverNationalities),  // Nationalities from the object
        datasets: [{
            data: Object.values(driverNationalities),  // Number of drivers per nationality
            backgroundColor: Object.keys(driverNationalities).map(nat => nationalityColors[nat] || '#FFFFFF'), 
            borderColor: 'rgba(0, 0, 0, 0.1)',
            borderWidth: 1
        }]
    },
    options: {
        plugins: {
            datalabels: {
                formatter: (value, ctx) => {
                    const label = ctx.chart.data.labels[ctx.dataIndex];
                    return flagEmojis[label] || label;
                },
                color: '#fff',
            }
        },
        // ...other chart options
    }
});
        mainContent.classList.remove('fade-out');
    }, 500);
    }//end initializeSeasonStats
}//class end


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

const fetchWeatherData = async (latitude, longitude) => {
    const url = `https://archive-api.open-meteo.com/v1/archive?latitude=${latitude}&longitude=${longitude}&start_date=2023-08-11&end_date=2023-08-25&hourly=temperature_2m,precipitation`;
    
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("An error occurred:", error);
    }
};



async function getDriverNationalities(season) {
    const nationalities = {};
    
    // Fetch the data from the Ergast API
    const response = await fetch(`http://ergast.com/api/f1/${season}/drivers.json`);
    const data = await response.json();
    
    // Loop through the list of drivers
    for (const driver of data.MRData.DriverTable.Drivers) {
      const nationality = driver.nationality;
      
      // If this nationality is already in the object, increment the count
      if (nationalities.hasOwnProperty(nationality)) {
        nationalities[nationality]++;
      } else {
        // Otherwise, add this nationality to the object with a count of 1
        nationalities[nationality] = 1;
      }
    }
    
    return nationalities;
  }