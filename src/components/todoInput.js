import { selector } from '../utils/selector.js';
import { todoInputTemp } from '../utils/template.js';
import { addEventDragAndDrop } from '../utils/addDragAndDrop.js';

export default function TodoInput({ $target, onSubmit }) {
  const render = () => {
    $target.appendChild(todoInputTemp());
  };

  render();

  const $todoForm = selector('.todo-form');
  const $todoInput = selector('.todo-form__input');

  $todoForm.addEventListener('submit', e => {
    e.preventDefault();
    const value = $todoInput.value.trim('');
    if (value.length) {
      onSubmit($todoInput.value);
      $todoInput.value = '';
    }
  });
}
