const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&%20exclude=hourly,daily&appid=5dd0eb61a1e4168d4e668845c00101ab&units=metric`;
  request({ url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect to the weather service");
    } else if (response.body.message) {
      callback("Unable to find location");
    } else {
      const currentWeather = response.body.daily[0];
      callback(
        undefined,
        `${response.body.daily[0].weather[0].description}. It is currently ${currentWeather.temp.min} degrees out. There is a ${currentWeather.clouds}% chance of rain`
      );
    }
  });
};

module.exports = forecast;
