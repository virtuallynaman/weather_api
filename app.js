const express = require("express");
const https = require("https");
const app = express();
app.use(express.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html") 
})

app.post("/", function(req, res){
    const cityName = req.body.cityName;
    const cityFirstLetter = cityName.slice(0,1).toUpperCase();
    const cityRemName = cityName.slice(1).toLowerCase();
    const city = cityFirstLetter + cityRemName;
    const api = "922c18f76821e3cfffc466ad7c3c8edf"
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + api + "&units=" + unit;
    https.get(url, function(response){
        console.log(response.statusCode);
        response.on("data", function(data){
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const desc = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageURL = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
            res.write("<h1>The temperature in " + city + " is " + temp + " degrees Celcius. </h1>");
            res.write("<h1>Weather currently is " + desc + "</h1>");
            res.write("<img src='" + imageURL + "' alt='" + desc + " image'>");
            res.send();
        })
    });
})

app.listen("3000", function(){
    console.log("Server is running on port 3000");
})