//jshint esversion:6

const express = require("express");
const https = require("https");
const app = express();




app.set("view engine", "ejs");


app.use(express.static("public"));
app.use(express.urlencoded({
  extended: true
})); //pass information from an html file to a Server using a body parser





app.get("/", function(req, res) {




  res.render("app");
});


app.post("/", function(req, res) {


  let query = req.body.input;
  query = query.charAt(0).toUpperCase() + query.slice(1);

  const appKey = "04bf1c4d186d49524e1e50bce2f3ff23";
  const units = "metric";
  

  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + appKey + "&units=" + units;
  https.get(url, function(response) {





    response.on("data", function(data) {
      const weatherData = JSON.parse(data);


        const country = weatherData.sys.country;
        const emoji = "https://lipis.github.io/flag-icon-css/flags/4x3/" + weatherData.sys.country.toLowerCase() + ".svg";
        const temp = weatherData.main.temp;
        const weatherDescription = weatherData.weather[0].description;
        const weatherIcon = weatherData.weather[0].icon;
        const imgUrl = "http://openweathermap.org/img/wn/" + weatherIcon + "@2x.png";
        res.render("result", {
          description: weatherDescription,
          img: imgUrl,
          temp: temp,
          location: query,
          country: country,
          emoji: emoji
        });









      });

    });
    });









app.listen(process.env.PORT || 3000, function() {
  console.log("The Server has started on port 3000");
});
