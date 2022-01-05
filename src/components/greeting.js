import { greetingTemp, greetingResTemp } from '../utils/template.js';
import { selector } from '../utils/selector.js';

export default function Greeting($target) {
  const render = () => {
    $target.append(greetingTemp(), greetingResTemp());
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
    $h4.innerHTML = `${greetWord()} ${$input.value} 님`;
    $input.value = '';
  });
}
