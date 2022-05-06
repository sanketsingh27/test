import "./App.css";
import { useState } from "react";
function App() {
  const [place, setPlace] = useState(undefined);
  const [weatherData, setWeatherData] = useState({});

  const callWeatherAPI = (e) => {
    e.preventDefault();
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Host": "community-open-weather-map.p.rapidapi.com",
        "X-RapidAPI-Key": "ba1d17a4acmsh84c1363166efef8p14d515jsnf6c151e525bd",
      },
    };

    fetch(`https://community-open-weather-map.p.rapidapi.com/weather?q=${place}`, options)
      .then((response) => response.json())
      .then((response) => setWeatherData(response))
      .catch((err) => console.error(err));
  };

  return (
    <div className="App">
      <h1>Weatherly</h1>

      <section>
        <form>
          <input placeholder="city" value={place} onChange={(e) => setPlace(e.target.value)} />
          <button onClick={callWeatherAPI}>Get Data</button>
        </form>
      </section>

      {weatherData.cod === 200 && (
        <section>
          <h1>{weatherData.name}</h1>
          <div>
            <div>
              {" "}
              <span>Temp : </span> <span>{weatherData.main.temp}</span>{" "}
            </div>
            <div>
              {" "}
              <span>Pressure : </span> <span>{weatherData.main.pressure}</span>
            </div>
            <div>
              <span>Humidity : </span> <span>{weatherData.main.humidity}</span>
            </div>
            <div>
              <span>Visibility : </span> <span>{weatherData.visibility}</span>
            </div>
          </div>
        </section>
      )}

      {weatherData.cod === "404" && (
        <section>
          <h1>{weatherData.message}</h1>
        </section>
      )}
    </div>
  );
}

export default App;
