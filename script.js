const submitButtonEl = $("#submit")
const apiKey = "a872c4276b67028a5b0f13b9e4e17de0"
const currentWeatherEl = $("#currentWeather")
const fiveDayEl = $("#fiveDay")
const searchHistoryEl = $("#searchHistory")
const submitHandler = function() {
    const element = $(this)
    console.log(element)
    let city
    if (element.text()!=="submit"){
        city=element.text()
    } else {
        
        city = element.siblings("input").val()
        const historyButton = $("<button>")
        historyButton.text(city)
        searchHistoryEl.append(historyButton)
    }
    let url = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${apiKey}`
    fetch(url).then(function(data){
        return data.json()
    })
    .then(function(data){
        console.log(data)
        currentWeather(data[0].lat,data[0].lon)
        fiveDayWeather(data[0].lat,data[0].lon)
    })
}
const currentWeather = function(lat, lon) {
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`
    fetch(url).then(function(data){
        return data.json()
    })
    .then(function(data){
        currentWeatherEl.empty()
        console.log(data)
        const city = $("<p>")
        city.text(data.name)
        const temp = $("<p>")
        temp.text(`Temp: ${data.main.temp}`)
        const date = $("<p>")
        date.text(dayjs.unix(data.dt).format("MM/DD/YYYY"))
        const icon = $("<img>")
        icon.attr("src", `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`) 
        const humidity = $("<p>")
        humidity.text(`Humidity: ${data.main.humidity}`)
        const windSpeed = $("<p>")
        windSpeed.text(`windSpeed: ${data.wind.speed}`)
        currentWeatherEl.append(city, temp, date, icon, humidity, windSpeed)
    
        
    })
}
const fiveDayWeather = function(lat, lon) {
    let url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`
    fetch(url).then(function(data){
        return data.json()
    })
    .then(function(data){
        fiveDayEl.empty()
        console.log(data)
        for(let i=0; i<data.list.length; i += 8) {
            let day = data.list[i]
            console.log(day)
            const city = $("<p>")
        city.text(day.name)
        const temp = $("<p>")
        temp.text(`Temp: ${day.main.temp}`)
        const date = $("<p>")
        date.text(dayjs.unix(day.dt).format("MM/DD/YYYY"))
        const icon = $("<img>")
        icon.attr("src", `https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`) 
        const humidity = $("<p>")
        humidity.text(`Humidity: ${day.main.humidity}`)
        const windSpeed = $("<p>")
        windSpeed.text(`windSpeed: ${day.wind.speed}`)
        fiveDayEl.append(city, temp, date, icon, humidity, windSpeed)
        }
    })
}

submitButtonEl.on("click", submitHandler)
searchHistoryEl.on("click", "button", submitHandler)