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
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=3d16044a2eba4d271046d70fd1f2c155";
    
$.ajax({
    url: queryURL,
    method: "GET"
}).then(function(response){
    console.log(response);
    // Setting variables for the city weather results 
    // show current search on main div
    var cityName =$("#cityName").text(city);
    var tempT = $("#temperature");
    var humidity = $("#humidity").text("Humidity: "+ response.main.humidity + "%.");
    var windSpeed = $("#windSpeed").text("WindSpeed: " + response.wind.speed + " m/s,");
    var lon = response.coord.lon;
    var lat = response.coord.lat;
    
    // Get date and time and set the current date and time
    var today = new Date();
    var date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date+' '+time;
    // Displaying the date when the city is selected.
    $("#currentDate").text(dateTime);
    // Declaring the function F to C
    var cTemp = fToC(response.main.temp);
    // Function to show Farenheit to Celcious
    function fToC(fahrenheit) {
        const fTemp = Math.round(fahrenheit);
        const fToCel = Math.round((fTemp - 32) * 5 / 9);
        const temp = `${fTemp}\xB0F : ${fToCel}\xB0C.`;
        console.log(fToCel);
        console.log(temp);
        console.log(fTemp);
        return temp;    
    }
    // Show Temperature on main div
    tempT.text("Temperature: "+ cTemp);

    //C = (5/9) * (F - 32)
        // testing outputs with different approach and console.log() to verify its working. 
    // All below will be cleaned in last refractoring of code. 
    //var tempF = response.main.temp;
    //var tempC = response.main.temp;
    //console.log(tempT);
    //console.log(cityName);
    //console.log(humidity);
    //console.log(windSpeed);
    //console.log(lon);
    //console.log(lat);
    // function to convert Celcious to Farenheit
    // Might use it later for swtiching options.
    //function cToF(celsius) {
    //const cTemp = celsius;
    //const cToFahr = Math.round(cTemp * 9 / 5 + 32);
    //const message = `${cTemp}\xB0C is ${cToFahr} \xB0F.`;
    //console.log(message);
    //}
})
};

// Show city name, the date an icon representing the weather conditions, the temperature, the humidity the wind speed, and the UV index.




// When checking the UV create a color that indicates whether the conditions are favorable, moderate, or severe



// view future weather conditions for that city and show a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, and the humidity



// Ensure when opening the weather dashboard, it opens with the last shown city.


// optional - create a switch that can choose a random city wupon opening. 
// optional - Create a background img for the app depending on
// optional - the users location and weather at that current time/place.
// optional - Convert from F to C with a switch. Code to change both ways below.

