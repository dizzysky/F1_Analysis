import Example from "./scripts/example"; //Example here could be anything


document.addEventListener("DOMContentLoaded", function() {
    console.log("Hello world!");

    const main = document.getElementById("main");
    new Example(main);

});