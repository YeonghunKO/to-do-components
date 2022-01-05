import { selector } from '../utils/selector.js';
import { requestWeather } from '../utils/api.js';
import { weatherIconTemp } from '../utils/template.js';

const $instructionBtn = selector('#instruction__btn');
const $instructionArrow = selector('.instruction__arrow');
const $instructionBox = selector('.instruction__box');

const $weatherBtn = selector('.weather__btn');
const $weatherArrow = selector('.weather__arrow');
const $weatherBox = selector('.weather__box');

const $weatherBoxDesc = selector('.weather__box__description');

const $weatherCity = selector('.city');
const $realTemp = selector('.real_temp');
const $sensoryTemp = selector('.sensory_temp');

export default function Toggle() {
  const handleGeoSuccess = async pos => {
    const { latitude, longitude } = pos.coords;
    const weatherData = await requestWeather(latitude, longitude);
    $weatherCity.innerHTML = `도시: ${weatherData.city}`;

    $weatherBoxDesc.innerHTML = weatherIconTemp(weatherData.icon);

    $realTemp.innerHTML = `현재기온: ${weatherData.realTemp}℃`;
    $sensoryTemp.innerHTML = `체감기온: ${weatherData.feelTemp}℃`;
  };

  const handleGeoError = () => {
    alert("Can't access geo location");
  };

  const fillUpWeatherBox = () => {
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
  };

  fillUpWeatherBox();

  $instructionBtn.addEventListener('click', () => {
    $instructionBtn.classList.toggle('active');
    $instructionArrow.classList.toggle('invisible');
    $instructionBox.classList.toggle('active');
  });

  $weatherBtn.addEventListener('click', () => {
    $weatherBtn.classList.toggle('active');
    $weatherArrow.classList.toggle('invisible');
    $weatherBox.classList.toggle('invisible');
  });
}
