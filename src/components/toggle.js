import { selector } from '../utils/selector.js';
import { requestWeather } from '../utils/api.js';

const $instructionBtn = selector('#instruction__btn');
const $instructionArrow = selector('.instruction__arrow');
const $instructionBox = selector('.instruction__box');

const $weatherBtn = selector('.weather__btn');
const $weatherArrow = selector('.weather__arrow');
const $weatherBox = selector('.weather__box');

const $weatherBoxDesc = selector('.weather__box__description');

const $weatherCity = selector('.city');
const $weatherIcon = selector('.weather__icon');
const $realTemp = selector('.real_temp');
const $sensoryTemp = selector('.sensory_temp');

export default function Toggle() {
  const handleGeoSuccess = async pos => {
    const { latitude, longitude } = pos.coords;
    const weatherData = await requestWeather(latitude, longitude);
    console.log(weatherData);
  };

  const handleGeoError = () => {
    alert("Can't access geo location");
  };

  const askForCoords = () => {
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
  };

  askForCoords();

  console.log('toggle');
}
