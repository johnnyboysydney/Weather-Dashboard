

//window.onload = function(initialise)
//$(document).ready(function(initialise){})
//document.addEventListener("DOMContentLoaded", (initialise){
//});

// Declaration of variables
let cities = localStorage.getItem("cities");
if (!cities) {
    cities = [];
}
else
{
    cities = cities.split(",")
};

// show the history of the search and be able to return to that search on the main div
$("#search").on("click", function() {
    event.preventDefault();
    event.stopPropagation();
    let city = $("#city-input").val().trim();
    if (city != '') {
        // The following clears the error if errored!
        $("#city-input").html("")
        
        //console.log(localStorage.getItem("city"));
        searchCity(city);
        forecast(city);
        addHistory(city);
        renderHistory()
    }
    else {
        $("#city-input").html("Field cannot be empty");
    }
});
// Save the cities searched for
function addHistory(city){ 
    // Check for changes in the local item and log them
    cities.push(city);
    localStorage.setItem("cities", cities); 
};

// Render the history localstorage
function renderHistory(){
    $("#history").empty();
    for (i = 0; i < cities.length; i++) {
        //    
        $("#history").append($("<button class='btn btn-info d-flex flex-column'>").attr("cityName", cities[i]).text(cities[i]));
    }
    $("#history button").on("click",function(){
        event.preventDefault();
        let searchedCity = $(this).attr("cityName");
        // This queries the ajax function to return the city.
        searchCity(searchedCity);
        forecast(searchedCity);
    });
};

// Show city name, the date an icon representing the weather conditions, the temperature, the humidity the wind speed, and the UV index.
function searchCity(city){
    
    let queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=3d16044a2eba4d271046d70fd1f2c155";
    
$.ajax({
    url: queryURL,
    method: "GET"
}).then(function(response){
    //console.log(response);
    // Setting variables for the city weather results 
    // show current search on main div
    $("#cityName").attr("class", "nowrap").text(city);
    let tempT = $("#temperature").attr("class", "nowrap");
    $("#humidity").attr("class", "nowrap").text("Humidity: "+ response.main.humidity + "%.");
    $("#windSpeed").attr("class", "nowrap").text("WindSpeed: " + response.wind.speed + " m/s,");
    
    // Get date and time and set the current date and time
    let today = new Date();
    let date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
    let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    let dateTime = date+' '+time;

    // Displaying the date when the city is selected.
    $("#currentDate").text(dateTime);
    
    // Declaring the function F to C
    let cTemp = fToC(response.main.temp);
    
    // Show Temperature on main div
    tempT.text("Temperature: "+ cTemp);

    // Variables for ajax call for UV response
    let cityLat = response.coord.lat;
    let cityLon = response.coord.lon;
    let uvURL = "https://cors-anywhere.herokuapp.com/https://api.openweathermap.org/data/2.5/uvi?appid=" + "3d16044a2eba4d271046d70fd1f2c155" + "&lat=" + cityLat + "&lon=" + cityLon + "&units=imperial";
    $.ajax({
        url: uvURL,
        method: "GET"
    }).then(function (response) {
        
        // Create variable to get the UV and to create dom element on div.
        let uv = response.value;
        $("#uvIndex").empty(); // clear the element first
        $("#uvIndex").append($("<div id=\"uvColor\">").text("Uv Index: " + uv)).attr("class", "nowrap");
        // When checking the UV create a color that indicates whether the conditions are favorable, moderate, or severe
        if(uv <= 3){
            //change color to green
            $("#uvColor").attr("style", "background-color:green ; width:65%");
        }
        else if( uv <= 7){
            //change color to orange
            $("#uvColor").attr("style", "background-color:orange ; width:65%");
        }
        else{
            $("#uvColor").attr("style", "background-color:red ; width:65%");
        };
        
    })
})
};
// Function to show Farenheit to Celcious
function fToC(fahrenheit) {
    const fTemp = Math.round(fahrenheit);
    const fToCel = Math.round((fTemp - 32) * 5 / 9);
    const temp = `${fTemp}\xB0F : ${fToCel}\xB0C.`;
    return temp;   
};

// / view future weather conditions for that city and show a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, and the humidity
function forecast(city) {
    // Section for the 5 day query
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&appid=3d16044a2eba4d271046d70fd1f2c155";
    $.ajax({
        url: queryURL,
        method: "GET"
        // forecastFunction
    }).then(function(forecastResponse){
        // Creating  a filter for the 5 days
        let filteredDays = forecastResponse.list.filter(
            function (currentElement){
            return currentElement.dt_txt.includes("12:00:00")
            }	
        );
        //console.log(filteredDays)
        // Creating the HTML elements to display the forecast
        $("#forecast").empty();
        for(let i = 0; i < filteredDays.length; i++ ){
             
            // Creating variables that holds the arry of data from filteredDays function
            let date = filteredDays[i].dt_txt.split(" ")[0];
            let icon = filteredDays[i].weather[0].icon;
            let humidity = filteredDays[i].main.humidity;
            
            // Creating and adding classes and attributes to html elements.
            let square = $("<div>").attr("class","square");
            let section = $("<section>").attr("class","content").attr("class", "col-sm-3");
            let list = $("<ul>");
            let listElDates = $("<li>").attr("class","dates").attr("class", "nowrap").text(date);
            let listIcon = $("<ul>").append($("<img>").addClass("weatherImg").attr("src", "https://openweathermap.org/img/wn/" + icon + "@2x.png"));
            
            // Declaring the function F to C
            let cTemp = fToC(filteredDays[i].main.temp);
            let tempT = cTemp;
            
            // Creating and adding classes and atricbutes to html elements.
            let listElTempF = $("<li>").attr("class", "tempForecast").attr("class", "nowrap").text("Temp: " + tempT);
            let listElHumidityF = $("<li>").attr("class", "hunidityForecast").attr("class", "nowrap").text("Humidity: " + humidity);
           
            // Function to show Farenheit to Celcious
            function fToC(fahrenheit) {
                const fTemp = Math.round(fahrenheit);
                const fToCel = Math.round((fTemp - 32) * 5 / 9);
                const temp = `${fTemp}\xB0F : ${fToCel}\xB0C.`;
                return temp;    
            }
            // Appending all html elements together to form the buttons with the forecast
            square.append(section.append(list.append(listElDates,listIcon,listElTempF,listElHumidityF)))
             $("#forecast").append(square)//listElicons
        }    
    })
};

// First onload DOM
searchCity(localStorage.getItem("cities").split(",")[localStorage.getItem("cities").split(",").length-1]);
renderHistory();
forecast(localStorage.getItem("cities").split(",")[localStorage.getItem("cities").split(",").length-1]);


// Optionals
// optional - create a switch that can choose a random city upon opening.
// optional - Create a background img for the app depending on weather
// optional - the users location and weather at that current time/place.
// optional - Convert from F to C with a switch. Code to change both ways below.


