const express = require('express');
const axios = require('axios');
const app = express();

const PORT = process.env.PORT || 3000;

app.get('/api/distance', async (req, res) => {
    try {
        const { origins, destinations, mode, departure_time } = req.query;

        const url = `https://maps.googleapis.com/maps/api/distancematrix/json`;
        const response = await axios.get(url, {
            params: {
                origins,
                destinations,
                mode,
                departure_time,
                key: process.env.GOOGLE_MAPS_API_KEY, // Securely use environment variables
            },
        });

        res.json(response.data);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Failed to fetch data from Google Maps API' });
    }
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
