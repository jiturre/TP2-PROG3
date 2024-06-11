import { Box, Typography } from "@mui/material";
import PropTypes from 'prop-types';

function History({ history }) {
  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h5" component="h2" align="center" gutterBottom>
        Historial de Búsquedas
      </Typography>
      {history.map((search, index) => (
        <Box key={index} sx={{ mb: 2, p: 2, border: '1px solid #ddd', borderRadius: '4px' }}>
          <Typography variant="h6" component="h3">
            {search.city}, {search.country}
          </Typography>
          <Box component="img" alt={search.conditionText} src={search.icon} sx={{ height: 50 }} />
          <Typography variant="body1">
            {search.temperature} °C - {search.conditionText}
          </Typography>
          <Typography variant="caption" display="block" sx={{ mt: 1 }}>
            {new Date(search.date).toLocaleString()}
          </Typography>
        </Box>
      ))}
    </Box>
  );
}

History.propTypes = {
  history: PropTypes.arrayOf(PropTypes.shape({
    city: PropTypes.string.isRequired,
    country: PropTypes.string.isRequired,
    temperature: PropTypes.number.isRequired,
    conditionText: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
  })).isRequired,
};

export default History;
