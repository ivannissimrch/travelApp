

 async function processData(url, data) {        
       
          const response = await fetch(url, {
          method: 'POST', 
          credentials: 'same-origin',
          headers: {
              'Content-Type': 'application/json',
          },
         // Body data type must match "Content-Type" header        
          body: JSON.stringify(data), 
        });
    
          try {
            const newData = await response.json()   
            console.log(newData)        
               
            
             return newData  
            
          }catch(error) {            
          console("error", error);
          }     
    } 
  

export { processData }
