import { clockTemp } from '../utils/template.js';
import { selector } from '../utils/selector.js';

export default function Clock($target) {
  const getTime = () => {
    const date = new Date();
    const time = date.toLocaleTimeString();
    return time;
  };

  const render = () => {
    $target.appendChild(clockTemp());
  };

  render();
  const $clock = selector('.clock-container__clock');

  setInterval(() => {
    $clock.innerHTML = getTime();
  }, 1000);
}
