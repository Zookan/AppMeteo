import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import axios from "axios";

// Icône personnalisée pour les marqueurs
const customIcon = new L.Icon({
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

// Liste des principales villes françaises avec leurs coordonnées (latitude, longitude)
const cities = [
  { name: "Paris", lat: 48.8566, lon: 2.3522 },
  { name: "Marseille", lat: 43.2965, lon: 5.3698 },
  { name: "Lyon", lat: 45.764, lon: 4.8357 },
  { name: "Toulouse", lat: 43.6047, lon: 1.4442 },
  { name: "Nice", lat: 43.7102, lon: 7.262 },
  { name: "Nantes", lat: 47.2184, lon: -1.5536 },
  { name: "Strasbourg", lat: 48.5734, lon: 7.7521 },
];

const API_KEY = "6a990338887bc0eba23a25fb95d9cdb0";

const Carte = () => {
  const [weatherData, setWeatherData] = useState({});

  useEffect(() => {
    // Recupère les données météo de la liste de ville "cities"
    const fetchWeather = async () => {
      const data = {};
      for (const city of cities) {
        try {
          const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${city.lat}&lon=${city.lon}&appid=${API_KEY}&units=metric`
          );
          data[city.name] = response.data;
        } catch (error) {
          console.error("Erreur lors de la récupération des données météo", error);
        }
      }
      setWeatherData(data);
    };

    fetchWeather();
  }, []);

  return (
    <MapContainer center={[46.603354, 1.888334]} zoom={6} style={{ height: "100vh", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      {cities.map((city) => (
        <Marker key={city.name} position={[city.lat, city.lon]} icon={customIcon}>
          <Popup>
            <h3>{city.name}</h3>
            {weatherData[city.name] ? (
              <div>
                <p>Température : {weatherData[city.name].main.temp}°C</p>
                <p>Météo : {weatherData[city.name].weather[0].description}</p>
                <p>Humidité : {weatherData[city.name].main.humidity}%</p>
                <p>Vent : {weatherData[city.name].wind.speed} m/s</p>
              </div>
            ) : (
              <p>Chargement des données météo...</p>
            )}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default Carte;
