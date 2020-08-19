const request = require("request");

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1IjoiZW5nZXNsYW1hZGVsbCIsImEiOiJja2R0aHluYjIwMTBmMnlwaW5uYWc5aDFxIn0.HFodyALyVXDGjFiSHdRCag&limit=1`;

  request({ url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect to location services");
    } else if (response.body.features.length === 0) {
      callback("Unable to find location. Try another search");
    } else {
      callback(undefined, {
        latitude: response.body.features[0].center[1],
        longitude: response.body.features[0].center[0],
        location: response.body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;
