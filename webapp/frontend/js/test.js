



        const sourcesDiv = document.getElementById("sources");
        const librariesDiv = document.getElementById("libraries");
        const centuriesDiv = document.getElementById("centuries");
        const genresDiv = document.getElementById("genres");
        const scriptsDiv = document.getElementById("scripts");
        
        
        
        
        
        fetch(url + sources)
          .then(response => response.json())
          .then(data => {
            data.forEach((element, index) => {
              const { source } = element;
              const divId = `div_sources${index}`;
              sourcesDiv.insertAdjacentHTML(
                "beforeend",
                `
                  <div class="form-check py-1 ps-5 fw-light" id="${divId}">
                    <input class="form-check-input" type="checkbox" autocomplete="off">
                    <label class="form-check-label text-white" id="layer_src${index}">${source}</label>
                  </div>
                `
              );
              
        
            });
          });
        
          fetch(url + centuries)
          .then(response => response.json())
          .then(data => {
            /* Da auch Datensätze mit century-Angaben nach dem 16. Jahrhundert vorhanden sind,
             muss die slice()-Funktion genutzt werden, die den Output auf die ersten 12 Treffer 
             der Schleife reduziert. */
            data.slice(0,12).forEach((element, index) => {
              const { century } = element;
              const divId = `div_cent${index}`;
              centuriesDiv.insertAdjacentHTML(
                "beforeend",
                `
                  <div class="form-check py-1 ps-5 fw-light" id="${divId}">
                    <input class="form-check-input" type="checkbox" autocomplete="off">
                    <label class="form-check-label text-white" id="layer_lib${index}">${century}. Jh.</label>
                  </div>
                `
              );
            });
          });
        
        fetch(url + libraries)
          .then(response => response.json())
          .then(data => {
            data.forEach((element, index) => {
              const { library } = element;
              const divId = `div_lib${index}`;
              librariesDiv.insertAdjacentHTML(
                "beforeend",
                `
                  <div class="form-check py-1 ps-5 fw-light" id="${divId}">
                    <input class="form-check-input" type="checkbox" autocomplete="off">
                    <label class="form-check-label text-white" id="layer_lib${index}">${library}</label>
                  </div>
                `
              );
            });
          });
        
          fetch(url + genres)
          .then(response => response.json())
          .then(data => {
            data.forEach((element, index) => {
              const { genre } = element;
              const divId = `div_gen${index}`;
              genresDiv.insertAdjacentHTML(
                "beforeend",
                `
                  <div class="form-check py-1 ps-5 fw-light" id="${divId}">
                    <input class="form-check-input" type="checkbox" autocomplete="off">
                    <label class="form-check-label text-white" id="layer_lib${index}">${genre}</label>
                  </div>
                `
              );
            });
          });
        
        
          fetch(url + scripts)
          .then(response => response.json())
          .then(data => {
            data.forEach((element, index) => {
              const { script } = element;
              const divId = `div_script${index}`;
              scriptsDiv.insertAdjacentHTML(
                "beforeend",
                `
                  <div class="form-check py-1 ps-5 fw-light" id="${divId}">
                    <input class="form-check-input" type="checkbox" autocomplete="off">
                    <label class="form-check-label text-white" id="layer_lib${index}">${script}</label>
                  </div>
                `
              );
            });
          });



          /* Zweiter Abschnitt der reinkopierten Skripts... */

//Start of every API-Query
let url = "http://localhost:3300";
          //API-Querys
let by_id = "/data/id/:id";

let all_data = "/data";

let by_sources = "/data/source/"
let by_library = "/data/library/:library";
let by_genre = "/data/genres/:genres";
let by_century = "/data/centuries/:centuries";
let by_script = "/data/scripts/:script";

let sources = "/data/source";
let centuries = "/data/centuries";
let genres = "/data/genres";
let scripts = "/data/scripts";
let libraries = "/data/library";


const everything = 
fetch(url + all_data)
.then(function(response){
    return response.json();
})
.then(function(data){
    data.forEach(function(element, index){
        let cx = 100 + element.width_mm;
        let cy = 900 - element.height_mm;

        let myCirc = document.createElementNS("http://www.w3.org/2000/svg", "circle");
                myCirc.setAttribute("class", "hovercircle");
                myCirc.id = 'all_'+index;
                myCirc.setAttribute("cx", cx);
                myCirc.setAttribute("cy", cy);
                myCirc.setAttribute("r", "4px");
                document.getElementById("circlegroup").appendChild(myCirc);
        let myTitle = document.createElementNS("http://www.w3.org/2000/svg", "title");
                myTitle.innerHTML = element.ms_id + ", " + element.title;
                document.getElementById(myCirc.id).appendChild(myTitle);
        let myGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
                myGroup.setAttribute("class", "togglegroup");
                myGroup.id = 'toggle_'+index;
                document.getElementById("circlegroup").appendChild(myGroup);
        let myPolyline = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
                myPolyline.setAttribute("class", "toggleline");
                myPolyline.setAttribute("points", "100 " + cy + ", " + cx + " " + cy + ", " + cx + " 900");
                document.getElementById(myGroup.id).appendChild(myPolyline);
    })
})
window.onload(
    run(everything)
);


fetch(url + sources)
.then(function(response) {
    return response.json();
        
    })
    .then(function(data) {
        /* Schleife. Für jede Source... */
        data.forEach(function(element, index) {  
            let drucken = element.source

            // ...wird ein Div mit Input und Label in der Sidebar generiert
                /* Hier wurde diese auf den ersten Blick recht umständliche Variante zur Erstellung der 
                Elemente gewählt, damit diese im weiteren Verlauf des Skripts ansprechbare Teile des HTML-Dokuments werden. 
                Wenn nur .innerHTML genutzt wird um dann verschiedene Elemente als String einzufügen, funktioniert zwar die 
                Anzeige der Elemente in der Sidebar, aber in späteren Funktionen kann auf diese Elemente nicht mehr zugegriffen
                werden. Das hat zum Beispiel zur Folge, dass die checkboxen nicht mit einem eventlistener versehen werden können. */
            let myDiv_src = document.createElement("div");
            myDiv_src.className = "form-check py-1 ps-5 fw-light";
            myDiv_src.id += "div_sources"+index;
            document.getElementById("sources").appendChild(myDiv_src);
            
            let myInput_src = document.createElement("input");
            myInput_src.className = "form-check-input";
            myInput_src.type = "checkbox";
            myInput_src.autocomplete = "off";
            document.getElementById(myDiv_src.id).appendChild(myInput_src);

            let myLabel_src = document.createElement("label");
            myLabel_src.id = "layer_src"+index;
            myLabel_src.className = "form-check-label text-white";
            myLabel_src.innerHTML = drucken;
            document.getElementById(myDiv_src.id).appendChild(myLabel_src);

            //Datensätze der einzelnen sources laden und boxen mit on-click funktion versehen.
            document.getElementById(myDiv_src.id).addEventListener("click", function(e) {
              let sel_value = myLabel_src.innerHTML;
              let by_sources = "/data/source/" + sel_value;
          
          //if Box is checked: add the different markers with an individual Pop-Up. Or else: Clear the markers from the layer
          if($(e.target).is(":checked")){

            document.getElementById("circlegroup").remove(this.children);
              fetch(url + by_sources)
              .then(function(response) {
                  return response.json();
                })
            
              .then(function(data) {
                data.forEach(function(element, index){
                  
                  let cx = 100 + element.width_mm;
                  let cy = 900 - element.height_mm;
                  let newGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
                          newGroup.id = 'circlegroup'
                          document.getElementById("vis").appendChild(newGroup);


                  let myCirc = document.createElementNS("http://www.w3.org/2000/svg", "circle");
                          myCirc.setAttribute("class", "hovercircle");
                          myCirc.id = 'all_'+index;
                          myCirc.setAttribute("cx", cx);
                          myCirc.setAttribute("cy", cy);
                          myCirc.setAttribute("r", "4px");
                          document.getElementById("circlegroup").appendChild(myCirc);
                  let myTitle = document.createElementNS("http://www.w3.org/2000/svg", "title");
                          myTitle.innerHTML = element.ms_id + ", " + element.title;
                          document.getElementById(myCirc.id).appendChild(myTitle);
                  let myGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
                          myGroup.setAttribute("class", "togglegroup");
                          myGroup.id = 'toggle_'+index;
                          document.getElementById("circlegroup").appendChild(myGroup);
                  let myPolyline = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
                          myPolyline.setAttribute("class", "toggleline");
                          myPolyline.setAttribute("points", "100 " + cy + ", " + cx + " " + cy + ", " + cx + " 900");
                          document.getElementById(myGroup.id).appendChild(myPolyline);
              })
              
              
  
                    

              });
          }
          else{ 
              //wenn eine Checkbox nicht mehr aktiviert ist, werden die Marker entfernt.
                  /* hier ist die Unterscheidung zwischen .clearLayers() und .remove() sehr wichtig! 
                  .remove() entfernt die Layer, was ein nochmaliges Anzeigen der Marker nach erneutem anklicken der
                  Checkbox unmöglich macht! Durch .clearLayers() werden zwar die Marker von der Karte entfernt, 
                  die Layer als solche bleibt aber bestehen und kann erneut mit Markern versehen werden. */
              run(everything);
          }
      
       });
      
    })   
    })

    fetch(url + libraries)
    .then(function(response) {
        return response.json();
            
        })
        .then(function(data) {
            /* Schleife. Für jede library... */
            data.forEach(function(element, index) {  
                let drucken = element.library
    
                // ...wird ein Div mit Input und Label in der Sidebar generiert
                let myDiv_lib = document.createElement("div");
                myDiv_lib.className = "form-check py-1 ps-5 fw-light";
                myDiv_lib.id += "div_lib"+index;
                document.getElementById("libraries").appendChild(myDiv_lib);
                
                let myInput_lib = document.createElement("input");
                myInput_lib.className = "form-check-input";
                myInput_lib.type = "checkbox";
                myInput_lib.autocomplete = "off";
                document.getElementById(myDiv_lib.id).appendChild(myInput_lib);
    
                let myLabel_lib = document.createElement("label");
                myLabel_lib.id = "layer_lib"+index;
                myLabel_lib.className = "form-check-label text-white";
                myLabel_lib.innerHTML = drucken;
                document.getElementById(myDiv_lib.id).appendChild(myLabel_lib);
        })
        })



// letzter Stand 2023-05-17:


const everything = 
fetch(url + all_data)
.then(function(response){
return response.json();
})
.then(function(data){
data.forEach(function(element, index){
let cx = 100 + element.width_mm;
let cy = 900 - element.height_mm;

let myCirc = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      myCirc.setAttribute("class", "hovercircle");
      myCirc.id = 'all_'+index;
      myCirc.setAttribute("cx", cx);
      myCirc.setAttribute("cy", cy);
      myCirc.setAttribute("r", "4px");
      document.getElementById("circlegroup").appendChild(myCirc);
let myTitle = document.createElementNS("http://www.w3.org/2000/svg", "title");
      myTitle.innerHTML = element.ms_id + ", " + element.title;
      document.getElementById(myCirc.id).appendChild(myTitle);
let myGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
      myGroup.setAttribute("class", "togglegroup");
      myGroup.id = 'toggle_'+index;
      document.getElementById("circlegroup").appendChild(myGroup);
let myPolyline = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
      myPolyline.setAttribute("class", "toggleline");
      myPolyline.setAttribute("points", "100 " + cy + ", " + cx + " " + cy + ", " + cx + " 900");
      document.getElementById(myGroup.id).appendChild(myPolyline);
})
})


const srcs = 
fetch(url + sources)
.then(function(response) {
return response.json();

})
.then(function(data) {
/* Schleife. Für jede Source... */
data.forEach(function(element, index) {  
  let drucken = element.source

  // ...wird ein Div mit Input und Label in der Sidebar generiert
      /* Hier wurde diese auf den ersten Blick recht umständliche Variante zur Erstellung der 
      Elemente gewählt, damit diese im weiteren Verlauf des Skripts ansprechbare Teile des HTML-Dokuments werden. 
      Wenn nur .innerHTML genutzt wird um dann verschiedene Elemente als String einzufügen, funktioniert zwar die 
      Anzeige der Elemente in der Sidebar, aber in späteren Funktionen kann auf diese Elemente nicht mehr zugegriffen
      werden. Das hat zum Beispiel zur Folge, dass die checkboxen nicht mit einem eventlistener versehen werden können. */
  let myDiv_src = document.createElement("div");
  myDiv_src.className = "form-check py-1 ps-5 fw-light";
  myDiv_src.id += "div_sources"+index;
  document.getElementById("sources").appendChild(myDiv_src);
  
  let myInput_src = document.createElement("input");
  myInput_src.className = "form-check-input";
  myInput_src.type = "checkbox";
  myInput_src.autocomplete = "off";
  document.getElementById(myDiv_src.id).appendChild(myInput_src);

  let myLabel_src = document.createElement("label");
  myLabel_src.id = "layer_src"+index;
  myLabel_src.className = "form-check-label text-white";
  myLabel_src.innerHTML = drucken;
  document.getElementById(myDiv_src.id).appendChild(myLabel_src);

  //Datensätze der einzelnen sources laden und boxen mit on-click funktion versehen.
  document.getElementById(myDiv_src.id).addEventListener("click", function(e) {
    let sel_value = myLabel_src.innerHTML;
    let by_sources = "/data/source/" + sel_value;

//if Box is checked: add the different markers with an individual Pop-Up. Or else: Clear the markers from the layer
if($(e.target).is(":checked")){

  document.getElementById("circlegroup").remove(this.children);
    fetch(url + by_sources)
    .then(function(response) {
        return response.json();
      })
  
    .then(function(data) {
      data.forEach(function(element, index){
        
        let cx = 100 + element.width_mm;
        let cy = 900 - element.height_mm;
        let newGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
                newGroup.id = 'circlegroup'
                document.getElementById("vis").appendChild(newGroup);


        let myCirc = document.createElementNS("http://www.w3.org/2000/svg", "circle");
                myCirc.setAttribute("class", "hovercircle");
                myCirc.id = 'all_'+index;
                myCirc.setAttribute("cx", cx);
                myCirc.setAttribute("cy", cy);
                myCirc.setAttribute("r", "4px");
                document.getElementById("circlegroup").appendChild(myCirc);
        let myTitle = document.createElementNS("http://www.w3.org/2000/svg", "title");
                myTitle.innerHTML = element.ms_id + ", " + element.title;
                document.getElementById(myCirc.id).appendChild(myTitle);
        let myGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
                myGroup.setAttribute("class", "togglegroup");
                myGroup.id = 'toggle_'+index;
                document.getElementById("circlegroup").appendChild(myGroup);
        let myPolyline = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
                myPolyline.setAttribute("class", "toggleline");
                myPolyline.setAttribute("points", "100 " + cy + ", " + cx + " " + cy + ", " + cx + " 900");
                document.getElementById(myGroup.id).appendChild(myPolyline);
    })
    
    

          

    });
}
else{ 
    //wenn eine Checkbox nicht mehr aktiviert ist, werden die Marker entfernt.
        /* hier ist die Unterscheidung zwischen .clearLayers() und .remove() sehr wichtig! 
        .remove() entfernt die Layer, was ein nochmaliges Anzeigen der Marker nach erneutem anklicken der
        Checkbox unmöglich macht! Durch .clearLayers() werden zwar die Marker von der Karte entfernt, 
        die Layer als solche bleibt aber bestehen und kann erneut mit Markern versehen werden. */
    run(everything);
}

});

})   
})
const libs = 
fetch(url + libraries)
.then(function(response) {
return response.json();
  
})
.then(function(data) {
  /* Schleife. Für jede library... */
  data.forEach(function(element, index) {  
      let drucken = element.library

      // ...wird ein Div mit Input und Label in der Sidebar generiert
      let myDiv_lib = document.createElement("div");
      myDiv_lib.className = "form-check py-1 ps-5 fw-light";
      myDiv_lib.id += "div_lib"+index;
      document.getElementById("libraries").appendChild(myDiv_lib);
      
      let myInput_lib = document.createElement("input");
      myInput_lib.className = "form-check-input";
      myInput_lib.type = "checkbox";
      myInput_lib.autocomplete = "off";
      document.getElementById(myDiv_lib.id).appendChild(myInput_lib);

      let myLabel_lib = document.createElement("label");
      myLabel_lib.id = "layer_lib"+index;
      myLabel_lib.className = "form-check-label text-white";
      myLabel_lib.innerHTML = drucken;
      document.getElementById(myDiv_lib.id).appendChild(myLabel_lib);
})
})

           

      


window.onload(
  run(everything, srcs, libs)
  );

        

  document.addEventListener('DOMContentLoaded', function() {
    // Hier wird der Code ausgeführt, wenn das DOM vollständig geladen ist
    const parentElement = document.getElementById('div_century7');
    const button13thCentury = parentElement.querySelector('#13');

    button13thCentury.addEventListener('click', filterByCentury.bind(null, 13));
  
    // Weitere Button-Event Listener

    function filterByCentury(century) {
      const apiUrl = `http://localhost:3300/data/filters?centuries=${century}`;
    
      fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
          // Hier kannst du die Visualisierung mit den gefilterten Datensätzen aktualisieren
          updateVisualization(data);
        })
        .catch(error => {
          // Hier kannst du Fehlerbehandlung durchführen
          console.error('Fehler beim Abrufen der Daten:', error);
        });
    }

  });






  // Rufe die performFacetedSearch-Funktion auf, wenn ein Button ausgewählt wird oder sich die Auswahl ändert.
// Beispiel für die Verwendung eines Event-Listeners mit Vanilla JavaScript

document.addEventListener('DOMContentLoaded', () => {
  // Code zum Hinzufügen der Klickereignis-Handler hier

  
  

})



const centuryButtons = document.getElementsByClassName('century-button');
  const centuryArray = Array.from(centuryButtons);
  
  centuryArray.forEach(checkbox => {
    console.log(checkbox);

    checkbox.addEventListener('click', (event) => {
      if (checkbox.checked) {
        const selectedSource = checkbox.closest('.century-button').getAttribute('data-source');
        console.log(selectedSource); // Ausgabe in der Konsole
        selectSource(selectedSource);
        clearPoints();
        performFacetedSearch();
      }
    });
  });