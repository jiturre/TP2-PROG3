import { useState, useEffect } from "react";
import CityForm from "./CityForm";
import WeatherDisplay from "./WeatherDisplay";
import History from "./History";

const API_WEATHER = `http://api.weatherapi.com/v1/current.json?key=${
  import.meta.env.VITE_API_KEY
}&lang=es&q=`;

function WeatherProvider() {
  const [city, setCity] = useState("");
  const [error, setError] = useState({ error: false, message: "" });
  const [loading, setLoading] = useState(false);
  const [weather, setWeather] = useState({
    city: "",
    country: "",
    temperature: 0,
    condition: "",
    conditionText: "",
    icon: "",
  });
  const [history, setHistory] = useState([]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError({ error: false, message: "" });
    setLoading(true);

    try {
      if (!city.trim()) throw { message: "El campo ciudad es obligatorio" };

      const res = await fetch(API_WEATHER + city);
      const data = await res.json();

      if (data.error) {
        throw { message: data.error.message };
      }

      const weatherData = {
        city: data.location.name,
        country: data.location.country,
        temperature: data.current.temp_c,
        condition: data.current.condition.code,
        conditionText: data.current.condition.text,
        icon: data.current.condition.icon,
      };

      setWeather(weatherData);
      saveSearch(weatherData);
    } catch (error) {
      console.log(error);
      setError({ error: true, message: error.message });
    } finally {
      setLoading(false);
    }
  };

  const saveSearch = async (weatherData) => {
    try {
      const res = await fetch('http://localhost:5000/api/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(weatherData),
      });

      if (!res.ok) {
        throw new Error('Error al guardar la búsqueda');
      }

      fetchHistory();
    } catch (err) {
      console.log(err);
    }
  };

  const fetchHistory = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/history');
      if (!res.ok) {
        throw new Error('Error al obtener el historial');
      }
      const data = await res.json();
      setHistory(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  return (
    <>
      <CityForm
        city={city}
        setCity={setCity}
        error={error}
        loading={loading}
        onSubmit={onSubmit}
      />
      <WeatherDisplay weather={weather} />
      <History history={history} />
    </>
  );
}

export default WeatherProvider;
