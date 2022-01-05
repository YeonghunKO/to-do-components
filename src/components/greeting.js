import { greetingTemp, greetingResTemp } from '../utils/template.js';
import { selector } from '../utils/selector.js';
import { getItem, setItem } from '../utils/storage.js';

export default function Greeting($target) {
  const render = () => {
    const name = getItem('name');
    if (name) {
      $target.appendChild(greetingResTemp());
      const $h4 = selector('.name');
      $h4.innerHTML = `${greetWord()} ${name} 님`;
    } else {
      $target.append(greetingTemp(), greetingResTemp());
    }
  };

  const greetWord = () => {
    const hour = new Date().getHours();
    if (hour >= 0 && hour <= 12) {
      return '즐거운 하루 되세요☀';
    } else if (hour >= 13 && hour <= 17) {
      return '점심은 맛있게 드셨나요?';
    } else {
      return '편안함 밤 되세요🌛';
    }
  };

  render();

  const $h4 = selector('.name');
  const $form = selector('.form');
  const $input = selector('.form__input');

  $form.addEventListener('submit', e => {
    e.preventDefault();
    const name = $input.value;
    $h4.innerHTML = `${greetWord()} ${name} 님`;
    $form.classList.add('invisible');
    setItem('name', name);
  });
}
