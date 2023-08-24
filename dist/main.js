/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _scripts_f1Season__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./scripts/f1Season */ \"./src/scripts/f1Season.js\");\n\ndocument.addEventListener(\"DOMContentLoaded\", function () {\n  console.log(\"Hello world!\");\n  fetch(\"http://ergast.com/api/f1/1988.json\").then(response => response.json()).then(data => {\n    const races = data.MRData.RaceTable.Races; // Extract the races array\n    const main = document.getElementById(\"main\");\n    new _scripts_f1Season__WEBPACK_IMPORTED_MODULE_0__[\"default\"](main, races); // Create F1Season instance with the fetched races\n  }).catch(error => console.error(\"An error occurred:\", error));\n});//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvaW5kZXguanMiLCJtYXBwaW5ncyI6Ijs7QUFBMEM7QUFFMUNDLFFBQVEsQ0FBQ0MsZ0JBQWdCLENBQUMsa0JBQWtCLEVBQUUsWUFBVztFQUNyREMsT0FBTyxDQUFDQyxHQUFHLENBQUMsY0FBYyxDQUFDO0VBQzNCQyxLQUFLLENBQUMsb0NBQW9DLENBQUMsQ0FDdENDLElBQUksQ0FBQ0MsUUFBUSxJQUFJQSxRQUFRLENBQUNDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FDakNGLElBQUksQ0FBQ0csSUFBSSxJQUFJO0lBQ1YsTUFBTUMsS0FBSyxHQUFHRCxJQUFJLENBQUNFLE1BQU0sQ0FBQ0MsU0FBUyxDQUFDQyxLQUFLLENBQUMsQ0FBQztJQUMzQyxNQUFNQyxJQUFJLEdBQUdiLFFBQVEsQ0FBQ2MsY0FBYyxDQUFDLE1BQU0sQ0FBQztJQUM1QyxJQUFJZix5REFBUSxDQUFDYyxJQUFJLEVBQUVKLEtBQUssQ0FBQyxDQUFDLENBQUM7RUFDL0IsQ0FBQyxDQUFDLENBQ0RNLEtBQUssQ0FBQ0MsS0FBSyxJQUFJZCxPQUFPLENBQUNjLEtBQUssQ0FBQyxvQkFBb0IsRUFBRUEsS0FBSyxDQUFDLENBQUM7QUFDbkUsQ0FBQyxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vanNwLXNldHVwLy4vc3JjL2luZGV4LmpzP2I2MzUiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEYxU2Vhc29uIGZyb20gXCIuL3NjcmlwdHMvZjFTZWFzb25cIjtcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgZnVuY3Rpb24oKSB7XG4gICAgY29uc29sZS5sb2coXCJIZWxsbyB3b3JsZCFcIik7XG4gICAgZmV0Y2goXCJodHRwOi8vZXJnYXN0LmNvbS9hcGkvZjEvMTk4OC5qc29uXCIpXG4gICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSlcbiAgICAgICAgLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgICAgICBjb25zdCByYWNlcyA9IGRhdGEuTVJEYXRhLlJhY2VUYWJsZS5SYWNlczsgLy8gRXh0cmFjdCB0aGUgcmFjZXMgYXJyYXlcbiAgICAgICAgICAgIGNvbnN0IG1haW4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm1haW5cIik7XG4gICAgICAgICAgICBuZXcgRjFTZWFzb24obWFpbiwgcmFjZXMpOyAvLyBDcmVhdGUgRjFTZWFzb24gaW5zdGFuY2Ugd2l0aCB0aGUgZmV0Y2hlZCByYWNlc1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4gY29uc29sZS5lcnJvcihcIkFuIGVycm9yIG9jY3VycmVkOlwiLCBlcnJvcikpO1xufSk7XG4iXSwibmFtZXMiOlsiRjFTZWFzb24iLCJkb2N1bWVudCIsImFkZEV2ZW50TGlzdGVuZXIiLCJjb25zb2xlIiwibG9nIiwiZmV0Y2giLCJ0aGVuIiwicmVzcG9uc2UiLCJqc29uIiwiZGF0YSIsInJhY2VzIiwiTVJEYXRhIiwiUmFjZVRhYmxlIiwiUmFjZXMiLCJtYWluIiwiZ2V0RWxlbWVudEJ5SWQiLCJjYXRjaCIsImVycm9yIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/index.js\n");

/***/ }),

/***/ "./src/scripts/f1Season.js":
/*!*********************************!*\
  !*** ./src/scripts/f1Season.js ***!
  \*********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ F1Season; }\n/* harmony export */ });\nclass F1Season {\n  constructor(mainElement, races) {\n    this.mainElement = mainElement;\n    this.races = races; // Store the races array\n    this.initializeRaces();\n  }\n  initializeRaces() {\n    const raceNav = document.getElementById('race-nav');\n    this.races.forEach((race, index) => {\n      // use this.races instead of races\n      const raceLink = document.createElement('a');\n      raceLink.href = '#';\n      raceLink.textContent = `${race.raceName} - ${race.Circuit.circuitId}`; // use race.raceName and race.Circuit.circuitId\n      raceLink.addEventListener('click', e => {\n        e.preventDefault();\n        this.fetchRaceDetails(index).then(details => {\n          this.populateMainContent(details);\n        });\n      });\n      raceNav.appendChild(raceLink);\n    });\n  }\n  fetchRaceDetails(index) {\n    // Replace with the correct API endpoint to fetch details for the specific race\n    const url = `http://ergast.com/api/f1/1988/1/results.json`;\n    return fetch(url).then(response => response.json()).then(data => {\n      // Process the data as needed to extract the details you want to display\n      return details;\n    }).catch(error => console.error(\"An error occurred:\", error));\n  }\n  populateMainContent(details) {\n    // Here you'll take the 'details' object and update the content of your page\n    // You can manipulate the DOM to add elements, text, images, etc.\n    const mainContent = document.getElementById('race-content');\n    // ... add content to mainContent using the details object\n  }\n}//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvc2NyaXB0cy9mMVNlYXNvbi5qcyIsIm1hcHBpbmdzIjoiOzs7O0FBQWUsTUFBTUEsUUFBUSxDQUFDO0VBQzFCQyxXQUFXQSxDQUFDQyxXQUFXLEVBQUVDLEtBQUssRUFBRTtJQUM1QixJQUFJLENBQUNELFdBQVcsR0FBR0EsV0FBVztJQUM5QixJQUFJLENBQUNDLEtBQUssR0FBR0EsS0FBSyxDQUFDLENBQUM7SUFDcEIsSUFBSSxDQUFDQyxlQUFlLENBQUMsQ0FBQztFQUMxQjtFQUVBQSxlQUFlQSxDQUFBLEVBQUc7SUFDZCxNQUFNQyxPQUFPLEdBQUdDLFFBQVEsQ0FBQ0MsY0FBYyxDQUFDLFVBQVUsQ0FBQztJQUNuRCxJQUFJLENBQUNKLEtBQUssQ0FBQ0ssT0FBTyxDQUFDLENBQUNDLElBQUksRUFBRUMsS0FBSyxLQUFLO01BQUU7TUFDcEMsTUFBTUMsUUFBUSxHQUFHTCxRQUFRLENBQUNNLGFBQWEsQ0FBQyxHQUFHLENBQUM7TUFDNUNELFFBQVEsQ0FBQ0UsSUFBSSxHQUFHLEdBQUc7TUFDbkJGLFFBQVEsQ0FBQ0csV0FBVyxHQUFJLEdBQUVMLElBQUksQ0FBQ00sUUFBUyxNQUFLTixJQUFJLENBQUNPLE9BQU8sQ0FBQ0MsU0FBVSxFQUFDLENBQUMsQ0FBQztNQUN2RU4sUUFBUSxDQUFDTyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUdDLENBQUMsSUFBSztRQUN4Q0EsQ0FBQyxDQUFDQyxjQUFjLENBQUMsQ0FBQztRQUNsQixJQUFJLENBQUNDLGdCQUFnQixDQUFDWCxLQUFLLENBQUMsQ0FBQ1ksSUFBSSxDQUFFQyxPQUFPLElBQUs7VUFDN0MsSUFBSSxDQUFDQyxtQkFBbUIsQ0FBQ0QsT0FBTyxDQUFDO1FBQ25DLENBQUMsQ0FBQztNQUNKLENBQUMsQ0FBQztNQUNGbEIsT0FBTyxDQUFDb0IsV0FBVyxDQUFDZCxRQUFRLENBQUM7SUFDL0IsQ0FBQyxDQUFDO0VBQ0o7RUFHRlUsZ0JBQWdCQSxDQUFDWCxLQUFLLEVBQUU7SUFDcEI7SUFDQSxNQUFNZ0IsR0FBRyxHQUFJLDhDQUE2QztJQUMxRCxPQUFPQyxLQUFLLENBQUNELEdBQUcsQ0FBQyxDQUNkSixJQUFJLENBQUNNLFFBQVEsSUFBSUEsUUFBUSxDQUFDQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQ2pDUCxJQUFJLENBQUNRLElBQUksSUFBSTtNQUNaO01BQ0EsT0FBT1AsT0FBTztJQUNoQixDQUFDLENBQUMsQ0FDRFEsS0FBSyxDQUFDQyxLQUFLLElBQUlDLE9BQU8sQ0FBQ0QsS0FBSyxDQUFDLG9CQUFvQixFQUFFQSxLQUFLLENBQUMsQ0FBQztFQUMvRDtFQUlBUixtQkFBbUJBLENBQUNELE9BQU8sRUFBRTtJQUMzQjtJQUNBO0lBQ0EsTUFBTVcsV0FBVyxHQUFHNUIsUUFBUSxDQUFDQyxjQUFjLENBQUMsY0FBYyxDQUFDO0lBQzNEO0VBQ0Y7QUFFTiIsInNvdXJjZXMiOlsid2VicGFjazovL2pzcC1zZXR1cC8uL3NyYy9zY3JpcHRzL2YxU2Vhc29uLmpzPzJlYzMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgY2xhc3MgRjFTZWFzb24ge1xuICAgIGNvbnN0cnVjdG9yKG1haW5FbGVtZW50LCByYWNlcykge1xuICAgICAgICB0aGlzLm1haW5FbGVtZW50ID0gbWFpbkVsZW1lbnQ7XG4gICAgICAgIHRoaXMucmFjZXMgPSByYWNlczsgLy8gU3RvcmUgdGhlIHJhY2VzIGFycmF5XG4gICAgICAgIHRoaXMuaW5pdGlhbGl6ZVJhY2VzKCk7XG4gICAgfVxuXG4gICAgaW5pdGlhbGl6ZVJhY2VzKCkge1xuICAgICAgICBjb25zdCByYWNlTmF2ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3JhY2UtbmF2Jyk7XG4gICAgICAgIHRoaXMucmFjZXMuZm9yRWFjaCgocmFjZSwgaW5kZXgpID0+IHsgLy8gdXNlIHRoaXMucmFjZXMgaW5zdGVhZCBvZiByYWNlc1xuICAgICAgICAgIGNvbnN0IHJhY2VMaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuICAgICAgICAgIHJhY2VMaW5rLmhyZWYgPSAnIyc7XG4gICAgICAgICAgcmFjZUxpbmsudGV4dENvbnRlbnQgPSBgJHtyYWNlLnJhY2VOYW1lfSAtICR7cmFjZS5DaXJjdWl0LmNpcmN1aXRJZH1gOyAvLyB1c2UgcmFjZS5yYWNlTmFtZSBhbmQgcmFjZS5DaXJjdWl0LmNpcmN1aXRJZFxuICAgICAgICAgIHJhY2VMaW5rLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIHRoaXMuZmV0Y2hSYWNlRGV0YWlscyhpbmRleCkudGhlbigoZGV0YWlscykgPT4ge1xuICAgICAgICAgICAgICB0aGlzLnBvcHVsYXRlTWFpbkNvbnRlbnQoZGV0YWlscyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICByYWNlTmF2LmFwcGVuZENoaWxkKHJhY2VMaW5rKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG5cblxuICAgIGZldGNoUmFjZURldGFpbHMoaW5kZXgpIHtcbiAgICAgICAgLy8gUmVwbGFjZSB3aXRoIHRoZSBjb3JyZWN0IEFQSSBlbmRwb2ludCB0byBmZXRjaCBkZXRhaWxzIGZvciB0aGUgc3BlY2lmaWMgcmFjZVxuICAgICAgICBjb25zdCB1cmwgPSBgaHR0cDovL2VyZ2FzdC5jb20vYXBpL2YxLzE5ODgvMS9yZXN1bHRzLmpzb25gO1xuICAgICAgICByZXR1cm4gZmV0Y2godXJsKVxuICAgICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSlcbiAgICAgICAgICAudGhlbihkYXRhID0+IHtcbiAgICAgICAgICAgIC8vIFByb2Nlc3MgdGhlIGRhdGEgYXMgbmVlZGVkIHRvIGV4dHJhY3QgdGhlIGRldGFpbHMgeW91IHdhbnQgdG8gZGlzcGxheVxuICAgICAgICAgICAgcmV0dXJuIGRldGFpbHM7XG4gICAgICAgICAgfSlcbiAgICAgICAgICAuY2F0Y2goZXJyb3IgPT4gY29uc29sZS5lcnJvcihcIkFuIGVycm9yIG9jY3VycmVkOlwiLCBlcnJvcikpO1xuICAgICAgfVxuXG5cblxuICAgICAgcG9wdWxhdGVNYWluQ29udGVudChkZXRhaWxzKSB7XG4gICAgICAgIC8vIEhlcmUgeW91J2xsIHRha2UgdGhlICdkZXRhaWxzJyBvYmplY3QgYW5kIHVwZGF0ZSB0aGUgY29udGVudCBvZiB5b3VyIHBhZ2VcbiAgICAgICAgLy8gWW91IGNhbiBtYW5pcHVsYXRlIHRoZSBET00gdG8gYWRkIGVsZW1lbnRzLCB0ZXh0LCBpbWFnZXMsIGV0Yy5cbiAgICAgICAgY29uc3QgbWFpbkNvbnRlbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmFjZS1jb250ZW50Jyk7XG4gICAgICAgIC8vIC4uLiBhZGQgY29udGVudCB0byBtYWluQ29udGVudCB1c2luZyB0aGUgZGV0YWlscyBvYmplY3RcbiAgICAgIH1cbiAgICAgIFxufVxuIl0sIm5hbWVzIjpbIkYxU2Vhc29uIiwiY29uc3RydWN0b3IiLCJtYWluRWxlbWVudCIsInJhY2VzIiwiaW5pdGlhbGl6ZVJhY2VzIiwicmFjZU5hdiIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJmb3JFYWNoIiwicmFjZSIsImluZGV4IiwicmFjZUxpbmsiLCJjcmVhdGVFbGVtZW50IiwiaHJlZiIsInRleHRDb250ZW50IiwicmFjZU5hbWUiLCJDaXJjdWl0IiwiY2lyY3VpdElkIiwiYWRkRXZlbnRMaXN0ZW5lciIsImUiLCJwcmV2ZW50RGVmYXVsdCIsImZldGNoUmFjZURldGFpbHMiLCJ0aGVuIiwiZGV0YWlscyIsInBvcHVsYXRlTWFpbkNvbnRlbnQiLCJhcHBlbmRDaGlsZCIsInVybCIsImZldGNoIiwicmVzcG9uc2UiLCJqc29uIiwiZGF0YSIsImNhdGNoIiwiZXJyb3IiLCJjb25zb2xlIiwibWFpbkNvbnRlbnQiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/scripts/f1Season.js\n");

/***/ }),

/***/ "./src/index.scss":
/*!************************!*\
  !*** ./src/index.scss ***!
  \************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvaW5kZXguc2NzcyIsIm1hcHBpbmdzIjoiO0FBQUEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9qc3Atc2V0dXAvLi9zcmMvaW5kZXguc2Nzcz85NzQ1Il0sInNvdXJjZXNDb250ZW50IjpbIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/index.scss\n");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval-source-map devtool is used.
/******/ 	__webpack_require__("./src/index.js");
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.scss");
/******/ 	
/******/ })()
;