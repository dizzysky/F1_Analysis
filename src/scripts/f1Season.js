// f1Season.js

// Imports
import {
    fetchRaceDetails,
    fetchWeatherData,
    getScatterData,
    getDriverNationalities,
} from "./dataHandling.js";
import {
    circuitImages,
    driverHeadshots,
    constructorColors,
    podiums1988,
} from "./dataset.js";

// DOM Elements
const raceNav = document.getElementById("race-nav");
const mainContent = document.querySelector("#race-content .fade-content");
const spinner = document.getElementById("spinner");

// Event Listeners
raceNav.addEventListener("click", async (event) => {
    if (event.target.tagName === "A") {
        event.preventDefault();
        const raceIndex = parseInt(event.target.dataset.index, 10);
        const raceDetails = await fetchRaceDetails(raceIndex);
        populateMainContent(raceDetails);
    }
});

// Core Logic
async function populateMainContent(details) {
    mainContent.classList.add("fade-out");

    const weatherData = await fetchWeatherData(
        details.Circuit.Location.lat,
        details.Circuit.Location.long
    );
    const weatherAverages = calculateWeatherAverages(weatherData);

    setTimeout(() => {
        mainContent.innerHTML = renderRaceContent(details, weatherAverages);
        mainContent.classList.remove("fade-out");
    }, 500);
}

async function initializeSeasonStats() {
    spinner.style.display = "block";
    mainContent.innerHTML = "";

    const scatterData = await getScatterData("1988");
    const driverNationalities = await getDriverNationalities("1988");

    spinner.style.display = "none";

    mainContent.classList.add("fade-out");
    setTimeout(() => {
        mainContent.innerHTML = renderSeasonStats(
            scatterData,
            driverNationalities
        );
        mainContent.classList.remove("fade-out");
    }, 500);
}

// Helper Functions
function calculateWeatherAverages(weatherData) {
    const averageTemperature =
        weatherData.hourly.temperature_2m.reduce((acc, val) => acc + val, 0) /
        weatherData.hourly.temperature_2m.length;
    const averagePrecipitation =
        weatherData.hourly.precipitation.reduce((acc, val) => acc + val, 0) /
        weatherData.hourly.precipitation.length;

    return {
        temperature: parseFloat(averageTemperature).toFixed(2),
        precipitation: parseFloat(averagePrecipitation).toFixed(2),
    };
}

function renderRaceContent(details, weatherAverages) {
    const winner = details.Results[0];
    const winnerFullName = `${winner.Driver.givenName} ${winner.Driver.familyName}`;
    const circuitImageURL = circuitImages[details.Circuit.circuitId];

    const tableRowsHTML = details.Results.slice(0, 5)
        .map(
            (result) => `
            <tr>
                <td>${result.position}</td>
                <td>${result.Driver.givenName} ${result.Driver.familyName}</td>
                <td>${result.Constructor.name}</td>
                <td>${result.Time?.time || "N/A"}</td>
                <td><a href='/drivers/${
                    result.Driver.driverId
                }'>Profile</a></td>
            </tr>
        `
        )
        .join("");

    return `
        <div style="display: flex; align-items: flex-start; font-family: Futura;">
            <div style="flex: 1;">
                <img src="${circuitImageURL}" width="300" alt="Track Configuration" style="margin-right: 75px;" />
            </div>
            <div style="flex: 2;">
                <h2 style="margin-top: 0;">${details.raceName}</h2>
                <p>Circuit: ${details.Circuit.circuitName}</p>
                <p>Location: ${details.Circuit.Location.locality}, ${
        details.Circuit.Location.country
    }</p>
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
                        ${tableRowsHTML}
                    </tbody>
                </table>
            </div>
            <div style="flex: 1; margin-left: -5px; text-align: center; margin-top:150px;">
                <h2>Winner: ${winnerFullName}</h2>
                <img src="${
                    driverHeadshots[winner.Driver.familyName]
                }" width="100" alt="Winner Headshot">
            </div>
        </div>
        <div>
            <h2 style="font-size: 2em;">Weather Data</h2>
            <p>Temperature: ${weatherAverages.temperature}°C</p>
            <p>Precipitation: ${weatherAverages.precipitation}mm</p>
        </div>`;
}

function renderSeasonStats(scatterData, driverNationalities) {
    return `
        <div>
            <h2>Season Statistics</h2>
            <canvas id="scatterChart"></canvas>
            <canvas id="doughnutChart"></canvas>
        </div>`;
}

// Initialization
initializeSeasonStats();
