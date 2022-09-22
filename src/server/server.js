
const getApiData = require('./serverFun/serverFun')

//port number for express server
const port = 8081;

/* Require Express to run server and routes */
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
//const fetch = require('node-fetch');

/* Start up an instance of app */
const app = express(); 

/* Middleware
Here we are configuring express to use body-parser as middle-ware. */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/* Cors for cross origin allowance */
app.use(cors());

/* Initialize the main project folder*/
app.use(express.static('dist'));

app.get('/', function (req, res) {
      res.sendFile('dist/index.html')   
   })   
    
    
/*  post method  recived data from client*/
app.post('/addGeoData', getApiData.getApiData)   
       
        
/* Setup Server */
app.listen(port, () => {
    console.log(`Server is runing on port: ${port}`);
} )

