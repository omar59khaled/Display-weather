// search input
let searchInput = document.getElementById('search')

// today variables
let todayName = document.getElementById('todayDateDayName')
let todayNumber = document.getElementById('todayDateDayNumber')
let todayMonth = document.getElementById('todayDateMonth')
let todayLocation = document.getElementById('todayLocation')
let todayDegree = document.getElementById('todayDegree')
let todayImage = document.getElementById('todayImage')
let todayCondition = document.getElementById('todayCondition')
let humidity = document.getElementById('humidity')
let wind = document.getElementById('wind')
let windDirection = document.getElementById('windDirection')

// nextday variables
let nextDayName = document.getElementsByClassName("nextDayName")
let nextDayImage = document.getElementsByClassName("nextDayImage")
let nextDayDegree = document.getElementsByClassName("nextDayDegree")
let nextDegreeMinimum = document.getElementsByClassName("nextDegreeMinimum")
let nextDayCondition = document.getElementsByClassName("nextDayCondition")



async function getWeatherData(cityName) {
    let reponse = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=29b0029c66304106980230557242301&q=${cityName}&days=3`)
    let weatherData = await reponse.json()
return weatherData;

}





function displayTodayWeather(data){
    let todayDate= new Date()
    todayName.innerHTML= todayDate.toLocaleDateString('en-us', {weekday:"long"})
    todayNumber.innerHTML=todayDate.getDate()
    todayMonth.innerHTML=todayDate.toLocaleDateString('en-us', {month:'long'})
    todayLocation.innerHTML= data.location.name 
    todayDegree.innerHTML=data.current.temp_c
    todayImage.setAttribute('src', data.current.condition.icon)
    todayCondition.innerHTML=data.current.condition.text
    humidity.innerHTML=data.current.humidity+'%'
    wind.innerHTML=data.current.wind_kph+'Km/h'
    windDirection.innerHTML=data.current.wind_dir
}

function displayNextDay(data){
    let nextDays= data.forecast.forecastday
    for(let i= 0; i<2; i++) {
        let nextDate = new Date(nextDays[i+1].date)
        nextDayName[i].innerHTML= nextDate.toLocaleDateString('en-us' , {weekday:'long'})
    nextDayDegree[i].innerHTML= nextDays[i+1].day.maxtemp_c
    nextDegreeMinimum[i].innerHTML= nextDays[i+1].day.mintemp_c
    nextDayCondition[i].innerHTML=nextDays[i+1].day.condition.text
    nextDayImage[i].setAttribute('src', nextDays[i+1].day.condition.icon)
    }   
    }


    

async function start(city='cairo'){
   let weather= await getWeatherData(city)
   if(!weather.error){
    displayTodayWeather(weather)
    displayNextDay(weather)
}  
} 

searchInput.addEventListener('input', function(){
start(searchInput.value)
})

start()