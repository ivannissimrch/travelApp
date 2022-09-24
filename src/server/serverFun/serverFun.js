    
// function to get Api data
async function getApiData (req, res) {    
    // Setup empty JS object to sture  data from api's
    const projectData = { }   
    
    //require dotenv to use enviroment variable
    const dotenv = require('dotenv');
    dotenv.config();
    const geoApiKey = process.env.GEO_API_KEY
    const weatherApiKey = process.env.WEATHER_API_KEY
    const pixaBayKey =  process.env.PIXABAY_API_KEY

    //require to use node-fecth on node
    const fetch = require('node-fetch');

       
    const userData = req.body
    console.log(userData)
    const city = userData.City
    const travelDate = userData.date

    //add date and city form user input to object        
    projectData.travelDate = travelDate
    projectData.city = city
       
    //get geoData
    const geoGetRoute = `http://api.geonames.org/searchJSON?q=${city}&maxRows=1&username=${geoApiKey}`         
    const response = await fetch(geoGetRoute);

    try {
     const geoData = await response.json()                                 
    
     console.log(geoData);
     //add recived geoData lng and lat to constant tp call weather api
     const geoLongitude = geoData.geonames[0].lng
     const geoLatitude = geoData.geonames[0].lat        
     
     //get weather data    
     const currentDate = new Date() 
    
     const hours = currentDate.getHours()
     const minutes = currentDate.getMinutes()
     const seconds = currentDate.getMilliseconds()
      

     const userTravelDate = new Date(travelDate)
     userTravelDate.setHours(hours, minutes, seconds)
     console.log(currentDate)  
     console.log(userTravelDate)    

     const daysToTrip = Math.floor((userTravelDate.getTime()  - currentDate.getTime() ) / (1000 * 3600 * 24))+ 1
     projectData.daysTillTrip =daysToTrip
     console.log(daysToTrip)

    const weatherRoute = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${geoLatitude}&lon=${ geoLongitude}&key=${weatherApiKey}&units=I`       

     
     const newData = await fetch(weatherRoute)
     const weatherData = await newData.json()
     // add recived weatherData to  object
     console.log(weatherData)
     projectData.temperature = weatherData.data[daysToTrip].temp
     projectData.description = weatherData.data[daysToTrip].weather.description
     projectData.icon = weatherData.data[daysToTrip].weather.icon
     projectData.dateofWeather = weatherData.data[daysToTrip].datetime
     projectData.state = weatherData.state_code
     projectData.country = weatherData.country_code


     //get city name from weather api
     const fullCityName = weatherData.city_name    
     const countryName = weatherData.timezone.split('/')[1] 
     //use the first city name otherwise pixabay migth not find results
     const cityName = fullCityName.split(' ')[0]
     console.log(`city name from weather api ${cityName}`)
             
     //request pixabay picture for city 
     const pixabayRoute = `https://pixabay.com/api/?key=${pixaBayKey}&q=${cityName}+landmarks&image_type=photo&per_page=3`
     const getImage = await fetch(pixabayRoute)
     const cityImage = await getImage.json()
     console.log(cityImage)
     // if city image not found then use country name as cityPictureLink 
     if( cityImage.total == 0 )
     {
        const pixabayRoute  = `https://pixabay.com/api/?key=${pixaBayKey}&q=${countryName}+landmarks&image_type=photo&per_page=3`
        const getImage = await fetch(pixabayRoute)
        const cityImage = await getImage.json()
        projectData.cityPictureLink = cityImage.hits[0].largeImageURL            
     }

     //else add recived pixabay city picture  to object
     else{          
     projectData.cityPictureLink = cityImage.hits[0].largeImageURL 
     } 
     
     //send object back to function
     res.json(projectData)              
                          
           
    }catch(error) {                
    console.log("errorr", error)            
    }        
}


module.exports = {
   getApiData 
}