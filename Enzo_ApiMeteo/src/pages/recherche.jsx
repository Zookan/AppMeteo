import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import { addFav } from "../features/favoriteSlice";

const API_KEY = '6a990338887bc0eba23a25fb95d9cdb0';

function Recherche() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState([]);
  const [error, setError] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();

    if (!city) {
      setError('Veuillez entrer une ville');
      return;
    }

    // Appelle de l'api en fonction de la ville
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=fr`)
      .then((response) => {
        setWeatherData(response.data);
        setError('');

        // 2ème appelle de l'api pour les prévision sur 5 jours
        return axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric&lang=fr`);
      })
      .then((forecastResponse) => {
        const filteredForecast = filterForecast(forecastResponse.data.list);
        setForecastData(filteredForecast);
      })
      .catch((error) => {
        setWeatherData(null);
        setForecastData([]);
        if (error.response && error.response.status === 404) {
          setError('Ville non trouvée. Veuillez essayer une autre ville.');
        } else {
          setError('Erreur lors de la récupération des données.');
        }
      });
  };

  // Filtrer les prévisions
  const filterForecast = (forecastList) => {
    const noonForecasts = forecastList.filter((forecast) =>
      forecast.dt_txt.includes('12:00:00')
    );
    return noonForecasts;
  };

  const dispatch = useDispatch();

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Recherche Météo</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Entrez le nom de la ville"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          style={{ padding: '10px', width: '200px', marginRight: '10px' }}
        />
        <button type="submit" style={{ padding: '10px 20px' }}>Rechercher</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {weatherData && (
        <div style={{ marginTop: '30px' }}>
          <h2>Météo actuelle à {weatherData.name}, {weatherData.sys.country}</h2>
          <p><strong>Température:</strong> {weatherData.main.temp} °C</p>
          <p><strong>Humidité:</strong> {weatherData.main.humidity}%</p>
          <p><strong>Conditions:</strong> {weatherData.weather[0].description}</p>
          <button onClick={() => dispatch(addFav({
            id: weatherData.id,
            nom: weatherData.name,
            temp: weatherData.main.temp
          }))}>Add fav</button>
        </div>
      )}

      {forecastData.length > 0 && (
        <div style={{ marginTop: '50px' }}>
          <h2>Prévisions sur 5 jours</h2>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
            {forecastData.map((forecast, index) => (
              <div key={index} style={{ border: '1px solid #ccc', padding: '10px' }}>
                <h3>{new Date(forecast.dt_txt).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })}</h3>
                <p><strong>Température:</strong> {forecast.main.temp} °C</p>
                <p><strong>Conditions:</strong> {forecast.weather[0].description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Recherche;
