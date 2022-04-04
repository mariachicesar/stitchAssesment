import axios from "axios";

const onGlobalSuccess = (response) => {
    /// Should not use if you need access to anything other than the data
    return response.data;
};

const onGlobalError = (err) => {
    //Waits for promise to catch error
    return Promise.reject(err);
};

let getGeocoding = (city) => {
    const config = {
        method: "GET",
        url: `https://geocoding-api.open-meteo.com/v1/search?name=${city}`,
      };
      return axios(config).then(onGlobalSuccess).catch(onGlobalError);
}

let getWeather = (lat, lon) => {
    const config = {
        method: "GET",
        url: `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m`,
        // url: `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&timezone=05:00:00&daily=weathercode,temperature_2m_max,temperature_2m_min&current_weather=true`,
      };
      return axios(config).then(onGlobalSuccess).catch(onGlobalError);
}

export { getGeocoding, getWeather}