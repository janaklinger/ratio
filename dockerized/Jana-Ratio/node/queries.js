const Pool = require('pg').Pool
const pool = new Pool({
  user: 'Jana',
  host: 'ratio_postgres',
  database: 'ratio',
  password: 'postgres',
  port: 5432,
   max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
})

const getData = (request, response) => {

  pool.query('SELECT * FROM data', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
};
  
const getDataByFilters = (request, response) => {
  const { sources, origPlaces, centuries, genres, scripts } = request.params;
  
  let query = 'SELECT * FROM data WHERE 1=1';
  const parameters = [];

  // Erzeugen der Bedingungen für die einzelnen Kategorien, falls angegeben
  if (sources) {
    const sourceArray = sources.split(',');
    let sourceConditions = [];
    for (let i = 0; i < sourceArray.length; i++) {
      sourceConditions.push(`source = $${parameters.length + 1}`);
      parameters.push(sourceArray[i]);
    }
    query += ` AND (${sourceConditions.join(' OR ')})`;
  }
  if (origPlaces) {
    const origPlaceArray = origPlaces.split(',');
    let origPlaceConditions = [];
    for (let i = 0; i < origPlaceArray.length; i++) {
      origPlaceConditions.push(`origPlace = $${parameters.length + 1}`);
      parameters.push(origPlaceArray[i]);
    }
    query += ` AND (${origPlaceConditions.join(' OR ')})`;
  }
  if (centuries) {
    const centuryArray = centuries.split(',');
    let centuryConditions = [];
    for (let i = 0; i < centuryArray.length; i++) {
      centuryConditions.push(`$${parameters.length + 1} = ANY(centuries)`);
      parameters.push(centuryArray[i]);
    }
    query += ` AND (${centuryConditions.join(' OR ')})`;
  }
  if (genres) {
    const genreArray = genres.split(',');
    let genreConditions = [];
    for (let i = 0; i < genreArray.length; i++) {
      genreConditions.push(`$${parameters.length + 1} = ANY(genres)`);
      parameters.push(genreArray[i]);
    }
    query += ` AND (${genreConditions.join(' OR ')})`;
  }
  if (scripts) {
    const scriptArray = scripts.split(',');
    let scriptConditions = [];
    for (let i = 0; i < scriptArray.length; i++) {
      scriptConditions.push(`script = $${parameters.length + 1}`);
      parameters.push(scriptArray[i]);
    }
    query += ` AND (${scriptConditions.join(' OR ')})`;
  }

  pool.query(query, parameters, (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};
  
  const getSources = (request, response) => {
    const source = request.params.source
  
    pool.query('SELECT source, COUNT(*) AS frequency FROM data GROUP BY source ORDER BY frequency DESC', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

  const getScripts = (request, response) => {
    const script = request.params.script
  // Query sucht alle scripts, die mindestens 50x vorkommen und sortiert diese in der Reihenfolge ihrer Frequenz absteigend.
    pool.query('SELECT script, COUNT(*) AS frequency FROM data WHERE script IS NOT NULL GROUP BY script HAVING COUNT(*) >= 50 ORDER BY frequency DESC;', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

  const getPlaces = (request, response) => {
    const origPlace = request.params.origPlace
  // Query sucht alle origPlaces, die mindestens 50x vorkommen und sortiert diese in der Reihenfolge ihrer Frequenz absteigend.
    pool.query('SELECT origPlace, COUNT(*) AS frequency FROM data WHERE origPlace IS NOT NULL GROUP BY origPlace HAVING COUNT(*) >= 50 ORDER BY frequency DESC', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }
  
const getGenres = (request, response) => {
  pool.query('SELECT unnest(genres) AS genre, COUNT(*) AS frequency FROM data GROUP BY genre HAVING COUNT(*) >= 50 ORDER BY frequency DESC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

  const getCenturies = (request, response) => {

    pool.query('SELECT unnest(centuries) AS century, COUNT(*) AS frequency FROM data GROUP BY century ORDER BY century;', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

  module.exports = {
    getData,
    getDataByFilters,
    getSources,
    getCenturies,
    getGenres,
    getScripts,
    getPlaces
  }