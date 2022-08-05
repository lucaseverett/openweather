import express from "express";
import axios from "axios";
const router = express.Router();

// memoize weather results to reduce API usage
let memoized = [];

const getComfort = (temp) => {
  // hot, cold, moderate
  return temp < 50 ? "cold" : temp >= 50 && temp < 80 ? "moderate" : "hot";
};

const validateLat = (num) => /\d/.test(num) && Math.abs(num) <= 90;
const validateLon = (num) => /\d/.test(num) && Math.abs(num) <= 180;

const API_KEY = process.env.API_KEY;

const current = router.use(async (req, res, next) => {
  let lat = req.query.lat;
  let lon = req.query.lon;

  const API_URL = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,daily&units=imperial&appid=${API_KEY}`;

  if (!validateLat(lat) || !validateLon(lon)) {
    res.json({});
  } else {
    lat = Number(lat);
    lon = Number(lon);

    const cached = memoized.filter((obj) => obj.lat === lat && obj.lon === lon);

    // if cached results exist and are less than 30 minutes old)
    if (cached.length && (Date.now() - cached[0].timestamp) / 60000 < 30) {
      res.json(cached[0]);
    } else {
      try {
        const result = await axios.get(API_URL);

        const weather = result.data;

        const weatherObj = {
          lat,
          lon,
          timestamp: Date.now(),
          result: {
            condition: weather.current.weather[0].main,
            "comfort-level": getComfort(weather.current.temp),
            "active-alerts": weather?.alerts?.length ? true : false,
            alerts: weather?.alerts?.length
              ? weather.alerts.map((alert) => alert.event)
              : [],
          },
        };

        // remove from memoized if exists and add new result
        memoized = memoized.filter((obj) => obj.lat !== lat && obj.lon !== lon);
        memoized.push(weatherObj);

        res.json(weatherObj);
      } catch (error) {
        res.json({ error });
      }
    }
  }
});

export { current, getComfort, validateLat, validateLon };
