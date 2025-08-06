//Um die Abschnitte in der Sidebar aus- und einklappbar zu schalten.
$(document).ready(function () {
  $('.toggle-section').click(function () {
    $(this).toggleClass('active');
    $(this).next('.section-content').slideToggle();
  });
});

// Nur die erste Gruppe ausklappen, alle anderen zuklappen
$(document).ready(function () {
  $('.toggle-section').not(':first').removeClass('active');
  $('.toggle-section').not(':first').next('.section-content').slideUp();

})

//Start of every API-Query
let url = "http://localhost:3300";

//API-Querys
//let all_data = "/data";

let sources = "/data/sources";
let centuries = "/data/centuries";
let genres = "/data/genres";
let scripts = "/data/scripts";
let origPlaces = "/data/origPlaces";
let filters = "/data/filters?";


const sourcesDiv = document.getElementById("sources");
const origPlacesDiv = document.getElementById("origPlaces");
const centuriesDiv = document.getElementById("centuries");
const genresDiv = document.getElementById("genres");
const scriptsDiv = document.getElementById("scripts");
const VisSVG = document.getElementById("vis");


fetch(url + centuries)
  .then(response => response.json())
  .then(data => {
    /* Da auch Datensätze mit century-Angaben nach dem 16. Jahrhundert vorhanden sind,
     muss die slice()-Funktion genutzt werden, die den Output auf die ersten 12 Treffer 
     der Schleife reduziert. */
    data.slice(4, 15).forEach((element, index) => {
      const { century, frequency } = element;
      const divId = `div_cent${century}`;
      centuriesDiv.insertAdjacentHTML(
        "beforeend",
        `
          <div class="form-check py-1 ps-5 fw-light" id="${divId}">
            <input class="form-check-input century-button" type="checkbox" autocomplete="off" data-source="${century}" id="century${century}">
            <label class="form-check-label text-white fw-lighter">${century}th
              <span class="badge fw-lighter bg-light-subtle border border-light-subtle text-light-emphasis rounded-pill">${frequency}</span>
            </label>
          </div>
        `
      );
    });
  });

fetch(url + sources)
  .then(response => response.json())
  .then(data => {
    data.forEach((element, index) => {
      const { source, frequency } = element;
      const divId = `div_source${index}`;
      sourcesDiv.insertAdjacentHTML(
        "beforeend",
        `
                  <div class="form-check py-1 ps-5 fw-light" id="${divId}">
                    <input class="form-check-input source-button" type="checkbox" autocomplete="off" data-source="${source}">
                    <label class="form-check-label text-white fw-lighter" >${source}
                    <span class="badge fw-lighter bg-light-subtle border border-light-subtle text-light-emphasis rounded-pill">${frequency}</span>
                    </label>
                  </div>
                `
      );


    });
  });

fetch(url + genres)
  .then(response => response.json())
  .then(data => {
    data.forEach((element, index) => {
      const { genre, frequency } = element;
      const divId = `div_genre${index}`;
      genresDiv.insertAdjacentHTML(
        "beforeend",
        `
                  <div class="form-check py-1 ps-5 fw-light" id="${divId}">
                    <input class="form-check-input genre-button" type="checkbox" autocomplete="off" data-source="${genre}">
                    <label class="form-check-label text-white fw-lighter" >${genre}
                    <span class="badge fw-lighter bg-light-subtle border border-light-subtle text-light-emphasis rounded-pill">${frequency}</span>
                    </label>
                  </div>
                `
      );
    });
  });


fetch(url + scripts)
  .then(response => response.json())
  .then(data => {
    data.forEach((element, index) => {
      const { script, frequency } = element;
      const divId = `div_script${index}`;
      scriptsDiv.insertAdjacentHTML(
        "beforeend",
        `
                  <div class="form-check py-1 ps-5 fw-light" id="${divId}">
                    <input class="form-check-input script-button" type="checkbox" autocomplete="off" data-source="${script}">
                    <label class="form-check-label text-white fw-lighter" >${script}
                    <span class="badge fw-lighter bg-light-subtle border border-light-subtle text-light-emphasis rounded-pill">${frequency}</span>
                    </label>
                  </div>
                `
      );
    });
  });

fetch(url + origPlaces)
  .then(response => response.json())
  .then(data => {
    data.forEach((element, index) => {
      const { origplace, frequency } = element;
      const divId = `div_place${index}`;
      origPlacesDiv.insertAdjacentHTML(
        "beforeend",
        `
                  <div class="form-check py-1 ps-5 fw-light" id="${divId}">
                    <input class="form-check-input origplace-button" type="checkbox" autocomplete="off" data-source="${origplace}">
                    <label class="form-check-label text-white fw-lighter" >${origplace}
                    <span class="badge fw-lighter bg-light-subtle border border-light-subtle text-light-emphasis rounded-pill">${frequency}</span>
                    </label>
                  </div>
                `
      );
    });
  });

/* const everything =
  fetch(url + all_data)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      let summeWidth = 0;
      let summeHeight = 0;
      data.forEach(function (element, index) {
        let cx = 100 + element.width_mm;
        let cy = 900 - element.height_mm;
        summeWidth += element.width_mm;
        summeHeight += element.height_mm;

        let myCirc = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        myCirc.setAttribute("class", "hovercircle");
        myCirc.id = 'all_' + index;
        myCirc.setAttribute("cx", cx);
        myCirc.setAttribute("cy", cy);
        myCirc.setAttribute("r", "4px");
        document.getElementById("circlegroup").appendChild(myCirc);
        let myTitle = document.createElementNS("http://www.w3.org/2000/svg", "title");
        myTitle.innerHTML = element.ms_id + ", " + element.title;
        document.getElementById(myCirc.id).appendChild(myTitle);
        let myGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
        myGroup.setAttribute("class", "togglegroup");
        myGroup.id = 'toggle_' + index;
        document.getElementById("circlegroup").appendChild(myGroup);
        let myPolyline = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
        myPolyline.setAttribute("class", "toggleline");
        myPolyline.setAttribute("points", "100 " + cy + ", " + cx + " " + cy + ", " + cx + " 900");
        document.getElementById(myGroup.id).appendChild(myPolyline);
      })
      let averageHeight = summeHeight / data.length;
      let averageWidth = summeWidth / data.length;
      let mittelwert = averageWidth / averageHeight;


      // Berechne die Endpunkte der Linie
      let linienanfang = { x: 100, y: 900 };
      let linienende = { x: 100 + (averageWidth), y: 900 - (averageHeight) };

      // Erzeuge das SVG-Element für die Linie
      let myLine = document.createElementNS("http://www.w3.org/2000/svg", "line");
      myLine.setAttribute("class", "mittelwert-line");
      myLine.setAttribute("x1", linienanfang.x);
      myLine.setAttribute("y1", linienanfang.y);
      myLine.setAttribute("x2", linienende.x);
      myLine.setAttribute("y2", linienende.y);
      document.getElementById("averagegroup").appendChild(myLine);

      let mittelwertText = mittelwert.toFixed(2);

      // Erzeuge das SVG-Element für den Text
      let myText = document.createElementNS("http://www.w3.org/2000/svg", "text");
      myText.setAttribute("class", "mittelwert-text");
      myText.setAttribute("x", linienende.x + 5);
      myText.setAttribute("y", linienende.y);
      myText.setAttribute("text-anchor", "start");
      myText.innerHTML = "Mean: " + mittelwertText;
      document.getElementById("averagegroup").appendChild(myText);
    }); */



document.addEventListener("DOMContentLoaded", function () {
  setTimeout(function () {
    // Code, der nach 2 Sekunden und dem vollständigen Laden der Seite ausgeführt werden soll

    // Bei Auswahl eines Buttons füge den ausgewählten Wert zur entsprechenden Kategorie hinzu.
    let selectedSources = [];
    let selectedOrigPlaces = [];
    let selectedCenturies = [];
    let selectedGenres = [];
    let selectedScripts = [];

    function selectSource(source) {
      selectedSources.push(source);
    }

    function selectOrigPlace(origPlace) {
      selectedOrigPlaces.push(origPlace);
    }

    function selectCentury(century) {
      selectedCenturies.push(century);
    }

    function selectGenre(genre) {
      selectedGenres.push(genre);
    }

    function selectScript(script) {
      selectedScripts.push(script);
    }

    //Erstelle eine Funktion, die die API-Anfrage mit den ausgewählten Werten ausführt. Rufe diese Funktion immer auf,
    // wenn ein Button ausgewählt wird oder sich die Auswahl ändert.
    function performFacetedSearch() {
      // Rufe die API auf und übermittle die ausgewählten Werte
      fetch(`http://localhost:3300/data/filters?sources=${selectedSources.join(',')}&origPlaces=${selectedOrigPlaces.join(',')}&centuries=${selectedCenturies.join(',')}&genres=${selectedGenres.join(',')}&scripts=${selectedScripts.join(',')}`,{
  mode:  'cors', 
  method: 'GET' })
        .then(response => response.json())
        .then(function (data) {
          console.log("Faceted search gestartet!!")

          const circlegroup = document.getElementById("circlegroup");
          const averagegroup = document.getElementById("averagegroup");

          let summeWidth = 0;
          let summeHeight = 0;

          data.forEach((element, index) => {
            const cx = 100 + element.width_mm;
            const cy = 900 - element.height_mm;
            summeWidth += element.width_mm;
            summeHeight += element.height_mm;

            circlegroup.insertAdjacentHTML(
              "beforeend",
              `
    <circle class="hovercircle" id="codex_${index}" cx="${cx}" cy="${cy}" r="4px">
      <title>${element.source}, ${element.library}, ${element.ms_id}</title>
    </circle>
    <g class="togglegroup" id="toggle_${index}">
      <polyline class="toggleline" points="100 ${cy}, ${cx} ${cy}, ${cx} 900">
      </polyline>
    </g>
    `
            );
          });


          const averageHeight = summeHeight / data.length;
          const averageWidth = summeWidth / data.length;
          const maxValue = Math.max(averageHeight, averageWidth);
          const normalizedHeight = averageHeight / maxValue;
          const normalizedWidth = averageWidth / maxValue;

          console.log(summeHeight);
          console.log(`data.length: ${data.length}`);
          console.log(`averageHeight: ${averageHeight}`);
          console.log(`normalizedHeight: ${normalizedHeight}`);
          console.log(`averageWidth: ${averageWidth}`);
          console.log(`normalizedWidth: ${normalizedWidth}`);
          console.log(`maxValue: ${maxValue}`);

          const linienanfang = { x: 100, y: 900 };
          const linienende = { x: 100 + normalizedWidth * 700, y: 900 - normalizedHeight * 700 };

          const mittelwertText = normalizedWidth.toFixed(2);

          averagegroup.insertAdjacentHTML(
            "beforeend",
            `
  <line class="mittelwert-line" x1="${linienanfang.x}" y1="${linienanfang.y}" x2="${linienende.x}" y2="${linienende.y}"></line>
  <text class="mittelwert-text" x="${linienende.x + 5}" y="${linienende.y}" text-anchor="start">Mean: ${mittelwertText}</text>
  <text class="text" x="760" y="110" text-anchor="start">Number of records shown: ${data.length}</text>
  `
          );

        })
    }

    // Funktion zum Löschen der vorhandenen Punkte im SVG-Bereich
    function clearPoints() {
      const circlegroup = document.getElementById("circlegroup");
      while (circlegroup.firstChild) {
        circlegroup.firstChild.remove();
      }

      const averagegroup = document.getElementById("averagegroup");
      while (averagegroup.firstChild) {
        averagegroup.firstChild.remove();
      }
    }




    const centuryButtons = document.getElementsByClassName('century-button');
    const centuryArray = Array.from(centuryButtons);

    centuryArray.forEach(checkbox => {
      console.log(checkbox);

      checkbox.addEventListener('change', (event) => {
        if (checkbox.checked) {
          const selectedCentury = checkbox.closest('.century-button').getAttribute('data-source');
          console.log(selectedCentury); // Ausgabe in der Konsole
          clearPoints();
          selectCentury(selectedCentury);

          performFacetedSearch();
        } else {
          const selectedCentury = checkbox.closest('.century-button').getAttribute('data-source');
          console.log(selectedCentury); // Ausgabe in der Konsole
          clearPoints();
          const index = selectedCenturies.indexOf(selectedCentury);
          if (index > -1) {
            selectedCenturies.splice(index, 1);
          }

          performFacetedSearch();
        }
      });
    });

    const sourceButtons = document.getElementsByClassName('source-button');
    const sourceArray = Array.from(sourceButtons);

    sourceArray.forEach(checkbox => {
      console.log(checkbox);

      checkbox.addEventListener('change', (event) => {
        if (checkbox.checked) {
          const selectedSource = checkbox.closest('.source-button').getAttribute('data-source');
          console.log(selectedSource); // Ausgabe in der Konsole
          clearPoints();
          selectSource(selectedSource);

          performFacetedSearch();
        } else {
          const selectedSource = checkbox.closest('.source-button').getAttribute('data-source');
          console.log(selectedSource); // Ausgabe in der Konsole
          clearPoints();
          const index = selectedSources.indexOf(selectedSource);
          if (index > -1) {
            selectedSources.splice(index, 1);
          }

          performFacetedSearch();
        }
      });
    });

    const origPlaceButtons = document.getElementsByClassName('origplace-button');
    const origPlaceArray = Array.from(origPlaceButtons);

    origPlaceArray.forEach(checkbox => {
      console.log(checkbox);

      checkbox.addEventListener('change', (event) => {
        if (checkbox.checked) {
          const selectedOrigPlace = checkbox.closest('.origplace-button').getAttribute('data-source');
          console.log(selectedOrigPlace); // Ausgabe in der Konsole
          clearPoints();
          selectOrigPlace(selectedOrigPlace);

          performFacetedSearch();
        } else {
          const selectedOrigPlace = checkbox.closest('.origplace-button').getAttribute('data-source');
          console.log(selectedOrigPlace); // Ausgabe in der Konsole
          clearPoints();
          const index = selectedOrigPlaces.indexOf(selectedOrigPlace);
          if (index > -1) {
            selectedOrigPlaces.splice(index, 1);
          }

          performFacetedSearch();
        }
      });
    });

    const scriptButtons = document.getElementsByClassName('script-button');
    const scriptArray = Array.from(scriptButtons);


    scriptArray.forEach(checkbox => {
      console.log(checkbox);

      checkbox.addEventListener('change', (event) => {
        if (checkbox.checked) {
          const selectedScript = checkbox.closest('.script-button').getAttribute('data-source');
          console.log(selectedScript); // Ausgabe in der Konsole
          clearPoints();
          selectScript(selectedScript);

          performFacetedSearch();
        } else {
          const selectedScript = checkbox.closest('.script-button').getAttribute('data-source');
          console.log(selectedScript); // Ausgabe in der Konsole
          clearPoints();
          const index = selectedScripts.indexOf(selectedScript);
          if (index > -1) {
            selectedScripts.splice(index, 1);
          }

          performFacetedSearch();
        }
      });
    });

    const genreButtons = document.getElementsByClassName('genre-button');
    const genreArray = Array.from(genreButtons);


    genreArray.forEach(checkbox => {
      console.log(checkbox);

      checkbox.addEventListener('change', (event) => {
        if (checkbox.checked) {
          const selectedGenre = checkbox.closest('.genre-button').getAttribute('data-source');
          console.log(selectedGenre); // Ausgabe in der Konsole
          clearPoints();
          selectGenre(selectedGenre);

          performFacetedSearch();
        } else {
          const selectedGenre = checkbox.closest('.genre-button').getAttribute('data-source');
          console.log(selectedGenre); // Ausgabe in der Konsole
          clearPoints();
          const index = selectedGenres.indexOf(selectedGenre);
          if (index > -1) {
            selectedGenres.splice(index, 1);
          }

          performFacetedSearch();
        }
      });
    });


    console.log("Dieser Code wird 0.5 Sekunden nach dem vollständigen Laden der Seite ausgeführt.");
  }, 500);
});




