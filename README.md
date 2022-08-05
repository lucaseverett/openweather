# OpenWeather API

This is a Node/Express server for retrieving current weather conditions from the OpenWeather API.

## Usage

This API can be accessed with a `get` request to `/current` while passing parameters for `lat` and `lon`.

Requests are cached to minimize use of the OpenWeather API. Subsequent requests for the same `lat` and `lon` will return idential data for 30 minutes after the initial request.

**Example usage:**

http://localhost:5000/current?lat=33.44&lon=-94.04

## API Output

When a valid lat and lon are provided, the following JSON will be returned.

```json
{
  "lat": 33.44,
  "lon": -94.04,
  "timestamp": 1659652068137,
  "result": {
    "condition": "Clear",
    "comfort-level": "hot",
    "active-alerts": true,
    "alerts": ["Heat Advisory"]
  }
}
```

## API Key (Important)

To connect to the OpenWeather API, a key is required. Visit the [API](https://openweathermap.org/api) page to sign up for an account and generate a key.

Once a key has been generated, it must be placed in a file named `.env` in the same directory as `server.js`.

The key should be in the following format in the `.env` file.

`API_KEY=api key goes here`

## How to Install and Start the Server

To install the neccessary packages, run `npm install`.

To start the server, run `npm start`.

## How to Run Tests

To run the tests, run `npm test`.

To view code coverage, run `npm run test:coverage`.
