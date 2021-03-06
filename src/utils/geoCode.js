// const request = require("request");
const fetch = require("node-fetch");

const geoLocation = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1Ijoic21hYyIsImEiOiJjazY5MmF2emMwNXoxM2xvNTN4bHZ6ajUxIn0.SJ1QAPWoyRMqNxr0pNRE4A&limit=1";

  fetch(url)
    .then(function(response) {
      return response.json();
    })
    .then(function(body) {
      if (body.error) {
        console.log(error);
        callback("can not connect to location service!", undefined);
      } else if (body.features.length === 0) {
        callback("unable to find Location. Try anothr search!", undefined);
      }
      callback(undefined, {
        location: body.features[0].place_name,
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0]
      });
    });

  // fetch(url).then((error, { body }={}) => {
  //   if (error) {
  //     console.log(error);
  //     callback("can not connect to location service!", undefined);
  //   } else if (body.features.length === 0) {
  //     callback("unable to find Location. Try anothr search!", undefined);
  //   } else {
  //     callback(undefined, {
  //       location: body.features[0].place_name,
  //       latitude: body.features[0].center[1],
  //       longitude: body.features[0].center[0]
  //     });
  //   }
  // });
  // request({ url, json: true }, (error, { body }) => {
  //   if (error) {
  //     callback("can not connect to location service!", undefined);
  //   } else if (body.features.length === 0) {
  //     callback("unable to find Location. Try anothr search!", undefined);
  //   } else {
  //     callback(undefined, {
  //       location: body.features[0].place_name,
  //       latitude: body.features[0].center[1],
  //       longitude: body.features[0].center[0]
  //     });
  //   }
  // });
};

module.exports = geoLocation;
