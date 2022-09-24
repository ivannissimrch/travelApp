

 async function app(event){
  
    event.preventDefault()
    //get user input from form
    let cityToTravel = document.getElementById('cityInput').value  
    let dateToTravel = document.getElementById('dateInput').value      
    
    //create object with user input
    const userData = {
    City : cityToTravel,
    date : dateToTravel
    }  
    
    const postGeoRoute = 'http://localhost:8081/addGeoData'   
   
   const response = await Client.processData(postGeoRoute, userData)
   await Client.updateUI(response) 
   
   //after click summit reset input values and set focus 
   document.getElementById('cityInput').value =  ''
   document.getElementById('cityInput').focus()
   document.getElementById('dateInput').value = ''   
   
}

export { app }