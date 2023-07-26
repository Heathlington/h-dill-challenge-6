const submitButtonEl = $("#submit")
const apiKey = "a872c4276b67028a5b0f13b9e4e17de0"
const currentWeatherEl = $("#currentWeather")
const fiveDayEl = $("#fiveDay")
const submitHandler = function() {
    const element = $(this)
    const city = element.siblings("input").val()
    console.log(city)
    let url = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${apiKey}`
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
        console.log(data)
        const city = $("<p>")
        city.text(data.name)
        const temp = $("<p>")
        temp.text(`Temp: ${data.main.temp}`)

        currentWeatherEl.append(city, temp)
        
    })
}
const fiveDayWeather = function(lat, lon) {
    let url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`
    fetch(url).then(function(data){
        return data.json()
    })
    .then(function(data){
        console.log(data)
        for(let i=0; i<data.list.length; i += 8) {
            let day = data.list[i]
            console.log(day)
        }
    })
}

submitButtonEl.on("click", submitHandler)