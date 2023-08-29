import F1Season from "./scripts/f1Season";

document.addEventListener("DOMContentLoaded", function() {
    console.log("Hello world!");
    fetch("http://ergast.com/api/f1/1988.json")
        .then(response => response.json())
        .then(data => {
            const races = data.MRData.RaceTable.Races; // Extract the races array
            const main = document.getElementById("main");
            new F1Season(main, races); // Create F1Season instance with the fetched races

        })
        .catch(error => console.error("An error occurred:", error));
});
