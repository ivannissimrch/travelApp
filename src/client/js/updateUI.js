function updateUI(apiResults){

 document.getElementById('cityImage').style.backgroundImage  = `url(${apiResults.cityPictureLink})` 
 document.getElementById('weatherIcon').style.backgroundImage  = `url(https://www.weatherbit.io/static/img/icons/${apiResults.icon}.png)`
 document.getElementById('days').innerHTML = (`My Trip to ${apiResults.city}, ${apiResults.country} is ${apiResults.daysTillTrip} Days away`)
 document.getElementById('description').innerHTML = (` Expected Weather on ${apiResults.dateofWeather} ${apiResults.description}`)
 document.getElementById('temperature').innerHTML = (`Expected temperature ${apiResults.temperature} F`)

}

export{ updateUI}