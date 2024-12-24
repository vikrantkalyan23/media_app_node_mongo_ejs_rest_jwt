const express = require('express');
const axios = require('axios');
const router = express.Router();

// Replace with your OpenWeatherMap API key
const API_KEY = 'YOUR_API_KEY_HERE';

router.get('/', async (req, res) => {
    const { lat, lon } = req.query;

    if (!lat || !lon) {
        return res.status(400).send({ error: 'Latitude and longitude are required.' });
    }

    try {
        const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather`,
            {
                params: {
                    lat,
                    lon,
                    appid: API_KEY,
                    units: 'metric', // Get temperature in Celsius
                },
            }
        );

        res.json(response.data);
    } catch (error) {
        res.status(500).send({ error: 'Failed to fetch weather data.' });
    }
});

module.exports = router;
