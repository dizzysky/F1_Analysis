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
    "prost": "https://cdn.images.autosport.com/f1greatestdrivers/mug/1955022400.jpg"
}

export default class F1Season {
    constructor(mainElement, races) {
        this.mainElement = mainElement;
        this.races = races; // Store the races array
        this.initializeRaces();
    }



    initializeRaces() {
        const raceNav = document.getElementById('race-nav');
        this.races.forEach((race, index) => { // use this.races instead of races
          const raceLink = document.createElement('a');
          raceLink.href = '#';
          raceLink.textContent = `${race.raceName} - ${race.Circuit.circuitId}`; // use race.raceName and race.Circuit.circuitId
          raceLink.addEventListener('click', (e) => {
            e.preventDefault();
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
        let resultsHTML = ''; // Initialize resultsHTML variable
      
        details.Results.slice(0,10).forEach(result => {
          resultsHTML += `
            <div>
              <h3>${result.Driver.givenName} ${result.Driver.familyName} - ${result.Constructor.name}</h3>
              <p>Position: ${result.position}</p>
              <!-- <p>Points: ${result.points}</p> -->
              <p>Time: ${result.Time ? result.Time.time : 'N/A'}</p>
              <!-- <p>Status: ${result.status}</p> -->
              <a href="${result.Driver.url}">Driver Profile</a>
              <a href="${result.Constructor.url}">Constructor Profile</a>
            </div>
          `;
        });
      
        mainContent.innerHTML = `
          <h1>${details.raceName}</h1>
          <img src="${circuitImageURL}" width="300" alt="Track Configuration" /> <!-- Include the image here -->
          <p>Circuit: ${details.Circuit.circuitName}</p>
          <p>Location: ${details.Circuit.Location.locality}, ${details.Circuit.Location.country}</p>
          <p>Date: ${details.date}</p>
          ${resultsHTML} <!-- Append the results HTML here -->
        `;
      }
      
      
}
