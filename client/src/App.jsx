import { Container, Typography } from "@mui/material";
import WeatherProvider from "./WeatherProvider";

export default function App() {
  return (
    <Container maxWidth="xs" sx={{ mt: 2 }}>
      <Typography variant="h3" component="h1" align="center" gutterBottom>
        Weather App
      </Typography>
      <WeatherProvider />
      <Typography textAlign="center" sx={{ mt: 2, fontSize: "10px" }}>
        Suministrado por:{" "}
        <a href="https://www.weatherapi.com/" title="Weather API">
          WeatherAPI.com
        </a>
      </Typography>
    </Container>
  );
}
