const API_KEY = 'fdc043150b4a4dabe389dd2724e69e21';

export const requestWeather = async (lat, lng) => {
  try {
    const weatherData = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric&lang=kr`
    );
    if (weatherData.ok) {
      const res = await weatherData.json();
      return {
        city: res.name,
        realTemp: res.main.temp,
        feelTemp: res.main.feels_like,
        weatherIcon: res.weather[0].icon,
      };
    } else {
      console.log('invalid data');
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};
