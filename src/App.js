import { useEffect, useState } from "react";
import "./App.css";
const weather_api_key = process.env.REACT_APP_WEATHER_API_KEY;
const geo_api_key = process.env.REACT_APP_GEO_API_KEY;
function App() {
  //*************getting user's current location***************/
  const [curr, getCurrent] = useState();
  const options1 = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": geo_api_key,
      "X-RapidAPI-Host": "ip-geo-location-and-ip-reputation.p.rapidapi.com",
    },
  };
  const getFetch = () => {
    fetch("https://ip-geo-location-and-ip-reputation.p.rapidapi.com/", options1)
      .then((response) => response.json())
      .then((data) => getCurrent({ c_location: data.geo_location.city_name }))
      .catch((err) => console.error(err));
  };
  useEffect(() => {
    getFetch();
  }, []);
  //****************getting user's location ends here*******************/

  const [location, setL] = useState(curr?.c_location);
  const [locationInfo, setlocationInfo] = useState();

  //call setfetch() after user's current location is set.
  useEffect(() => {
    setFetch();
  }, [curr]);

  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": weather_api_key,
      "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
    },
  };
  const setFetch = () => {
    let city = location;
    if (!city) {
      city = curr?.c_location;
    }
    fetch(
      `https://weatherapi-com.p.rapidapi.com/forecast.json?q=${city}&days=1`,
      options
    )
      .then((response) => response.json())
      //"trim" object, getting data needed.
      .then((response) =>
        setlocationInfo({
          region: response.location.region,
          name: response.location.name,
          country: response.location.country,
          farenheit: {
            current: response.current.temp_f,
            high: response.forecast.forecastday[0].day.maxtemp_f,
            low: response.forecast.forecastday[0].day.mintemp_f,
            feeling: response.current.feelslike_f,
          },
          celsius: {
            current: response.current.temp_c,
            high: response.forecast.forecastday[0].day.maxtemp_c,
            low: response.forecast.forecastday[0].day.mintemp_c,
            feeling: response.current.feelslike_c,
          },
          condition: response.current.condition.text,
          icon: response.current.condition.icon,
        })
      )
      .catch((err) => console.error(err));
  };
  //display search bar & data on the page
  return (
    <div className="App">
      <div className="search_bar">
        <input
          type="text"
          placeholder="Search for city..."
          // value={location}
          onChange={(c) => setL(c.target.value)}
        />
        <button onClick={setFetch}>Search</button>
        <h1>Your current location: {curr?.c_location}</h1>
      </div>
      <div className="weather_board">
        <div className="Top">
          <h1>{locationInfo?.name}</h1>
          <h1>
            {locationInfo?.farenheit.current} °F /{" "}
            {locationInfo?.celsius.current} °C
          </h1>
          <div className="condition_icon">
            <h1>
              <img
                src={locationInfo?.icon}
                alt="no show"
                width="60"
                height="60"
              ></img>
            </h1>
            <h1>{locationInfo?.condition}</h1>
            <div className="high_low">
              <h1>
                {locationInfo?.farenheit.high} °F / {locationInfo?.celsius.high}{" "}
                °C
              </h1>
              <h1>
                {locationInfo?.farenheit.low} °F / {locationInfo?.celsius.low}{" "}
                °C
              </h1>
            </div>
          </div>
          <h1>
            Feels like: {locationInfo?.farenheit.feeling} °F /{" "}
            {locationInfo?.celsius.feeling} °C
          </h1>
        </div>
        <h2>
          {locationInfo?.region}, {locationInfo?.country}
        </h2>
      </div>
    </div>
  );
}

export default App;
