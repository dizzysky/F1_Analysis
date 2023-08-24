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
        // Replace with the correct API endpoint to fetch details for the specific race
        const url = `http://ergast.com/api/f1/1988/1/results.json`;
        return fetch(url)
          .then(response => response.json())
          .then(data => {
            // Process the data as needed to extract the details you want to display
            return details;
          })
          .catch(error => console.error("An error occurred:", error));
      }



      populateMainContent(details) {
        // Here you'll take the 'details' object and update the content of your page
        // You can manipulate the DOM to add elements, text, images, etc.
        const mainContent = document.getElementById('race-content');
        // ... add content to mainContent using the details object
      }
      
}
