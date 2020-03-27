// Declaration of variables
let dateTime = "";


// show the history of the search and be able to return to that search on the main div
$("#search").on("click", function() {
    event.preventDefault();
    let city = $("#city-input").val().trim();
    if (city != '') {
        // The following clears the error if errored!
        $("#error").html("")
        localStorage.setItem("city", city);
        //console.log(localStorage.getItem("city"));
        searchCity(city);
        forecast(city);
    }
    else {
        $("#error").html("Field cannot be empty");
       
    }

});

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
    let cityName =$("#cityName").attr("class", "nowrap").text(city);
    let tempT = $("#temperature").attr("class", "nowrap");
    let humidity = $("#humidity").attr("class", "nowrap").text("Humidity: "+ response.main.humidity + "%.");
    let windSpeed = $("#windSpeed").attr("class", "nowrap").text("WindSpeed: " + response.wind.speed + " m/s,");
    
    // Get date and time and set the current date and time
    let today = new Date();
    let date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
    let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    let dateTime = date+' '+time;

    // Displaying the date when the city is selected.
    $("#currentDate").text(dateTime);
    
    // Declaring the function F to C
    let cTemp = fToC(response.main.temp);
    
    // Function to show Farenheit to Celcious
    function fToC(fahrenheit) {
        const fTemp = Math.round(fahrenheit);
        const fToCel = Math.round((fTemp - 32) * 5 / 9);
        const temp = `${fTemp}\xB0F : ${fToCel}\xB0C.`;
        return temp;    
    }
    // Show Temperature on main div
    tempT.text("Temperature: "+ cTemp);

    // Variables for ajax call for UV response
    let cityLat = response.coord.lat;
    let cityLon = response.coord.lon;
    let uvURL = "http://api.openweathermap.org/data/2.5/uvi?appid=" + "3d16044a2eba4d271046d70fd1f2c155" + "&lat=" + cityLat + "&lon=" + cityLon + "&units=imperial";
    $.ajax({
        url: uvURL,
        method: "GET"
    }).then(function (response) {
        // Create variable to get the UV and to create dom element on div.
        let uv = response.value;
        let tempT = $("#uvIndex").attr("class", "nowrap").text("Uv Index: " + uv);
        // When checking the UV create a color that indicates whether the conditions are favorable, moderate, or severe

    })
})
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
            let listIcon = $("<ul>").append($("<img>").addClass("weatherImg").attr("src", "http://openweathermap.org/img/wn/" + icon + "@2x.png"));
            
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
            square.append(section.append(list.append(listElDates,listElTempF,listIcon,listElHumidityF)))
             $("#forecast").append(square)//listElicons

        }    
    })
};
// To-Do
// Ensure when opening the weather dashboard, it opens with the last shown city.

// Optionals
// optional - create a switch that can choose a random city upon opening. 
// optional - Create a background img for the app depending on weather
// optional - the users location and weather at that current time/place.
// optional - Convert from F to C with a switch. Code to change both ways below.


