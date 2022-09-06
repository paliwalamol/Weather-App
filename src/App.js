import './App.css';
import { useState } from 'react';

function App() {
  const [res,setRes] = useState(null);
  const [but,SetButton]  = useState(true);
  const [inpt,setInput]  = useState("");
  const [city,setCity] = useState(null);
  const [weather,setWeather] = useState(null);


  const setInputfunc = (e) => {
    setInput(e.target.value);
    // console.log(e.target.value);
    if(e.target.value === ""){
      SetButton(true);
    }
    else{
    SetButton(false);
    }
    setRes(null);
  }

  const fetchData = (e) => {
    e.preventDefault();
    console.log("fetching data");
    fetch(`https://restcountries.com/v3.1/name/${inpt}?fullText=true`).then((res) => res.json()).then((data) => {
      setRes(data);
      if(data && data.status!==404){
        setCity(data[0].capital);
      }
    }
    );  
  }

  // console.log(res);

  const setInitial = () => {
    console.log("set initial button clicked");
    setRes(null);
    setInput("");
    SetButton(true);
    setWeather(null);  
  }
  
  const getWeather = () => {
    console.log("get weather button clicked");
    fetch(`http://api.weatherstack.com/current?access_key=17a211a98de9e9420bd480d8d82ec189&query=${city}`).then((res) => res.json()).then((data) => {
      // console.log(data);
      setWeather(data);
  });
  }


  return (
    <div className="App">
    <h1>Weather App</h1>
    {!res && 
      <>
      <form className='box'>
      <input placeholder='Enter country Name' className="inp" type="text" value={inpt} onChange={(e)=>setInputfunc(e)}/>
      <button className="btn" disabled={but} onClick={(e)=>fetchData(e)}>Submit</button>
      </form>
      </>
      }
  
      {!weather && res && res?.status!==404 && res.map((item,key) => {
        
        return (
          <div className="box" key={key}>
            
            <h3>Capital: {item.capital}</h3>
            <h3>Population: {item.population}</h3>
            <h3>Latitude:{item.latlng[0]} longitude:{item.latlng[1]}</h3>
            
            <img src={item.flags.png} name="flag" alt="flagimage" className="image" />
            <button className='btn' onClick={getWeather}>Get Capital Weather</button>
            <button className='btn' onClick={setInitial}>Back</button>
          </div>
        )
        })}
        {!weather && res?.status===404 && 
          <>
          <h1 className='box'>Country not found</h1>
        </>
      }
      {weather && 
           
          <div className="box">
            <h1>Weather in {city}</h1>
            <img src={weather.current.weather_icons[0]} alt="weatherImage" />
            <h3>Temperature: {weather.current.temperature}°C </h3>
            <h3>Humidity: {weather.current.humidity}</h3>
            <h3>Description: {weather.current.weather_descriptions}</h3>
            <button className='btn' onClick={setInitial}>Back to Home</button>  
            </div>
            
      }
        
      
    </div>
  );
}

export default App;
