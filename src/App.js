import React from "react"
import axois from "axios"
import './App.css';

function App() {

    const [wdata, setWdata] = React.useState({})

    const [location, setLocation] = React.useState('')

    const [error, setError] = React.useState(false)

    const apiUrl= "https://api.openweathermap.org/data/2.5/weather?units=metric&q="
    const apiKey ="f369f7a84430e818357cde4683abaaa8"
   
   
    async function weatherData(){

      const response = await axois.get(`${apiUrl}${location}&appid=${apiKey}`)
      if(response.status === 404){
        setError(true)
      }
      else{
        setWdata(response.data)
        setLocation("")
      }
      }
      
     
     
  
  

 

    const handleChange = (event) => {
      const {value} = event.target
      setLocation(value)
    }


    return(
      <main>
        <div className="search-bar">
        <input 
        type="text"
        className="search"
        placeholder="Enter City Name"
        onChange={handleChange}
        value={location}
        />
        <button className= "search-btn" onClick={weatherData}>Search </button> 
        </div>
        {error ? <h1 className="error">City Not Found</h1> :
         <div className="container">
        
       
         <div className="upper">
                
          <h2>{wdata.name}</h2>
          {wdata.main ? <h1>{Math.round(wdata.main.temp)}°C</h1> : null}
          {wdata.weather ?<h3>{wdata.weather[0].main}</h3> : null}
            </div>
            {wdata.name &&
            <div className="lower">
                <div className="humidity">
                    <p>Humidity</p>
                    {wdata.main? <p className="value">{wdata.main.humidity}%</p> : null}
                </div>
                <div className="speed">
                    <p>Wind Speed</p>
                    {wdata.wind? <p className="value">{Math.round(wdata.wind.speed)}km/h </p> : null}
                </div>
                <div className="feels-like">
                    <p>Feels like</p>
                    {wdata.main? <p className="value">{Math.round(wdata.main.feels_like)}°C</p> : null}
                </div>
            </div>
              }   
           
            </div> }
        
      </main>
    )

  }

export default App;
