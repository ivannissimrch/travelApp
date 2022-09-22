//import js functions here
import { processData } from './js/processData'
import { updateUI } from './js/updateUI'
import { app } from './js/app' 

//import sass styles here
import './styles/base.scss'
import './styles/results.scss'
import './styles/form.scss'
import './styles/mediaquerry.scss'

import './images/travelImage.jpg'

 //set min and max date allow to retrive weather data.
 const toDay = new Date()  
 toDay.setDate(toDay.getDate()) 
 const lastDay = new Date()
 lastDay.setDate(toDay.getDate() + 15)
 const startDate = toDay.toLocaleString('en-CA').split(",")[0]  
 const endDate = lastDay.toLocaleString('en-CA').split(",")[0] 
 document.getElementById('dateInput').min = startDate;
 document.getElementById('dateInput').max = endDate

 //add eventListener
 document.getElementById('form1').addEventListener('submit',app)
 

//export functions
export {
    processData,    
    app,   
    updateUI    
   }