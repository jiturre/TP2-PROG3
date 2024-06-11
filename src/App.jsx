import { LoadingButton } from "@mui/lab";
import { Box, Container, TextField, Typography } from "@mui/material";
import { useState } from "react";

const API_WEATHER =`http://api.weatherapi.com/v1/current.json?key=${import.meta.env.VITE_API_KEY}&q={city}`

console.log(import.meta.env.VITE_API_KEY);

const App = () => {
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState("");
  const [error, setError] = useState({
    error: false,
    message:""
  })

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log("submit");
    try {
      setLoading(true)
      if (!city.trim()) throw {message : "El campo ciudad es obligatorio"}
    } catch (error) {
      console.log(error)
      setError({
        error:true,
        message:error.message
      })
    } finally {
      setLoading(false)
    }
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 2 }}>
      <Typography variant="h3" component="h1" align="center" gutterBottom>
        Aplicación Clima
      </Typography>
      <Box
        sx={{ display: "grid", gap: 2 }}
        component="form"
        autoComplete="off"
        onSubmit={onSubmit}
      >
        <TextField
          id="city"
          label="City"
          variant="outlined"
          size="small"
          required
          fullWidth
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <LoadingButton
          type="submit"
          variant="contained"
          loading={loading}
          loadingIndicator="Buscando ciudad..."
        >
          Buscar..
        </LoadingButton>
      </Box>
      <Typography
        textAlign="center"
        sx={{ mt: 2, fontSize: "10px" }}
      >
        Suministrado por:{" "}
        <a
          href="https://www.weatherapi.com/"
          title="Weather API"
        >
          WeatherAPI.com
        </a>
      </Typography>
    </Container>
  );
};

export default App;
