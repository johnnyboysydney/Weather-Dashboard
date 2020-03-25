// Declaration of variables
var dateTime = "";


// show the history of the search and be able to return to that search on the main div
$("#search").on("click", function() {
    event.preventDefault();
    var city = $("#city-input").val().trim();
    localStorage.setItem("city", city);
    console.log(localStorage.getItem("city"));
    searchCity(city);
});

// Create the search function 
function searchCity(city){
    var apiKey = "3d16044a2eba4d271046d70fd1f2c155";
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + "city" + "&units=imperial&appid=3d16044a2eba4d271046d70fd1f2c155";

$.ajax({
    url: queryURL,
    method: "GET"
}).then(function(response){
    console.log(response);
    var cityName =$("#cityName").text(city);
    var temp = $("#temperature").text("Temperature: " + response.main.temp);
    var humidity = $("#humidity").text("Humidity: "+ response);
    var windSpeed = $("#windSpeed").text("WindSpeed: " + response.wind.speed);
    var lon = response.coord.lon;
    var lat = response.coord.lat;
    console.log(temp);
    console.log(cityName);
    console.log(humidity);
    console.log(windSpeed);
    console.log(lon);
    console.log(lat);
})
};


// show current search on main div


// Get date and time



// Show city name, the date an icon representing the weather conditions, the temperature, the humidity the wind speed, and the UV index.




// When checking the UV create a color that indicates whether the conditions are favorable, moderate, or severe



// view future weather conditions for that city and show a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, and the humidity



// Ensure when opening the weather dashboard, it opens with the last shown city.


// optional - create a switch that can choose a random city wupon opening. 
// optional - Create a background img for the app depending on
// optional - the users location and weather at that current time/place.
// optional - Convert from F to C with a switch. Code to change both ways below.

function cToF(celsius) 
{
  const cTemp = celsius;
  const cToFahr = cTemp * 9 / 5 + 32;
  const message = `${cTemp}\xB0C is ${cToFahr} \xB0F.`;
    console.log(message);
}

function fToC(fahrenheit) 
{
  const fTemp = fahrenheit;
  const fToCel = (fTemp - 32) * 5 / 9;
  const message = `${fTemp}\xB0F is ${fToCel}\xB0C.`;
    console.log(message);
} 
cToF(10);
fToC(65);