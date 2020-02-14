// const request = require("request");
const fetch = require("node-fetch");

const getForecast = (lat, long, callback) => {
  const url =
    "https://api.darksky.net/forecast/dadbc4c0da193aebd69a29bbab876744/" +
    encodeURIComponent(lat) +
    "," +
    encodeURIComponent(long) +
    "?units=si";

    fetch(url).then(function(response){
      return response.json();
    }).then(function(body){
     
            callback(
              undefined,
              `The weather is ${body.daily.data[0].summary} it is currently ${body.currently.temperature} degrees(si) hot. There is a ${body.currently.precipProbability}% chance of raining today!`
            );
    });
  // request({ url, json: true }, (error, { body }) => {
  //   if (error) {
  //     callback("can not connect to the weather service!", undefined);
  //   } else if (body.error) {
  //     callback("Can not get weather info! pls try another search!", undefined);
  //   } else {
  //     callback(
  //       undefined,
  //       `The weather is ${body.daily.data[0].summary} it is currently ${body.currently.temperature} degrees(si) hot. There is a ${body.currently.precipProbability}% chance of raining today!`
  //     );
  //   }
  // });
};

// getForecast(37.8267, -122.4233, (error, data) => {
//   if (error) {
//     console.log("error:", error);
//   } else {
//     console.log("Success:", data);
//   }
// });

module.exports = getForecast;
