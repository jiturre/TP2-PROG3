import { Box, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import PropTypes from 'prop-types';

function CityForm({ city, setCity, error, loading, onSubmit }) {
  return (
    <Box
      sx={{ display: "grid", gap: 2 }}
      component="form"
      autoComplete="off"
      onSubmit={onSubmit}
    >
      <TextField
        id="city"
        label="Ciudad"
        variant="outlined"
        size="small"
        required
        value={city}
        onChange={(e) => setCity(e.target.value)}
        error={error.error}
        helperText={error.message}
      />
      <LoadingButton
        type="submit"
        variant="contained"
        loading={loading}
        loadingIndicator="Buscando..."
      >
        Buscar
      </LoadingButton>
    </Box>
  );
}

CityForm.propTypes = {
  city: PropTypes.string.isRequired,
  setCity: PropTypes.func.isRequired,
  error: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default CityForm;
