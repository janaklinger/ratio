// server.js or app.js
const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser')
const db = require('./queries')
const port = 3300

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.use(cors({
  origin: 'http://127.0.0.1:5500'
}));

app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
})

app.get('/data', db.getData)
/* Um die getDataByFilters Funktion zu nutzen muss die URL nach folgendem Muster vervollstädnigt werden: 
http://localhost:3300/data/filters?centuries=14,15&sources=Syriaca.org -> Finde alle Datensätze 
mit der Angabe centuries = 14,15, die aus der Source Syriaca.org stammen.
So kann nacheinander nach den unterschiedlichen Kategorien gefiltert und die Suche immer weiter eingeschränkt werden. */
/* app.get('/data/filters', (req, res) => {
  const { source, library, centuries, genres, script } = req.query;
  db.getDataByFilters({ params: { source, library, centuries, genres, script } }, res);
}); */
app.get('/data/filters', (req, res) => {
  const { sources, origPlaces, centuries, genres, scripts } = req.query;

  db.getDataByFilters({
    params: {
      sources,
      origPlaces,
      centuries,
      genres,
      scripts
    }
  }, res);
});

app.get('/data/sources', db.getSources)
app.get('/data/centuries', db.getCenturies)
app.get('/data/genres', db.getGenres)
app.get('/data/scripts', db.getScripts)
app.get('/data/origPlaces', db.getPlaces)

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})