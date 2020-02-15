const express = require("express");
const path = require("path");
const hbs = require("hbs");
// const bodyParser = require("body-parser");
// const request = require("request");
const geoCode = require("./utils/geoCode");
const getForecast = require("./utils/forecast");
const port = process.env.PORT || 3000;
const app = express();

//define paths for express config
const staticDir = path.join(__dirname, "../public");
const viewPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//setup handlebars engine
app.set("view engine", "hbs");
app.set("views", viewPath);
hbs.registerPartials(partialsPath);

//setup static directory to serve
app.use(express.static(staticDir));
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Rishabh Kalathiya"
  });
});

/* start exprmnt */

app.post("/location", (req, res) => {
  return res.redirect("/weather");
});

/* end of exprmnt */

app.get("/weather", (req, res) => {
 /*  const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const board = document.querySelector("h4");

weatherForm.addEventListener("submit",(e)=>{
    e.preventDefault();
    const location = search.value; */
  const location = req.query.address;
  console.log(location);
  if (!location) {
    return res.send({
      error: "you must provide a valid address!"
    });
  }
  geoCode(location, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({ error });
    }
    getForecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({ error });
      }
      // console.log("Location:", location);
      // console.log("Weather:", forecastData);
      res.send({
        location,
        forecast: forecastData
      });
    });
  });
// });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    helpText: "The Help Text.",
    name: "Rishabh Kalathiya"
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    aboutText: "The About Text.",
    name: "Rishabh Kalathiya"
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: 404,
    name: "Rishabh Kalathiya",
    errorMessage: "Help Article Not Found"
  });
});

// app.get("/help/*", (req, res) => {
//   res.send("<h2>help article not found!</h2>");
// });

// app.get("*", (req, res) => {
//   res.send("<title>Error</title><h2>404 Page not found!</h2>");
// });
app.get("*", (req, res) => {
  res.render("404", {
    title: 404,
    name: "Rishabh Kalathiya",
    errorMessage: "Page Not Found"
  });
});

app.listen(port, () =>
  console.log(`server is up! Listening on port ${port}.....`)
);
