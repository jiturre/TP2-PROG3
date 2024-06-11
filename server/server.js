const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Search model
const SearchSchema = new mongoose.Schema({
  city: String,
  country: String,
  temperature: Number,
  conditionText: String,
  icon: String,
  date: { type: Date, default: Date.now }
});

const Search = mongoose.model('Search', SearchSchema);

// Routes
app.post('/api/search', async (req, res) => {
  const { city, country, temperature, conditionText, icon } = req.body;
  const newSearch = new Search({ city, country, temperature, conditionText, icon });

  try {
    const savedSearch = await newSearch.save();
    res.json(savedSearch);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.get('/api/history', async (req, res) => {
  try {
    const history = await Search.find().sort({ date: -1 });
    res.json(history);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});