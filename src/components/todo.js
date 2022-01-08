import { selector } from '../utils/selector.js';
import {
  listContainerTemp,
  listTemp,
  editTemp,
  listRestoreTemp,
} from '../utils/template.js';

export default function Todo({
  $target,
  initialState,
  onDelete,
  onFinished,
  onPending,
  onEdit,
}) {
  this.state = initialState;
  $target.appendChild(listContainerTemp());
  const $pendingList = selector('#pending-list');
  const $finishedList = selector('#finished-list');
  const $listContainer = selector('.list');

  this.setState = nextState => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    const { pending, finished } = this.state;
    const pendingListTemps = listTemp(pending, 'pending');
    const finishedListTemps = listTemp(finished, 'finished');
    $pendingList.innerHTML = pendingListTemps;
    $finishedList.innerHTML = finishedListTemps;
  };

  $listContainer.addEventListener('click', e => {
    const { classList } = e.target;
    const $li = e.target.closest('li');

    if ($li) {
      if (classList.contains('fa-edit')) {
        const originalLiVal = $li.querySelector(
          'span:nth-of-type(2)'
        ).innerText;

        $li.innerHTML = editTemp();
        const $editInput = selector('.todo-edit__input');

        $editInput.addEventListener('keyup', e => {
          const listType = $li.parentElement.id;
          const { key } = e;

          if (key === 'Enter') {
            const { id } = $li;
            const { value } = $editInput;

            $li.innerHTML = listRestoreTemp(value, listType);
            onEdit(id, value, listType);
          } else if (key === 'Escape') {
            $li.innerHTML = listRestoreTemp(originalLiVal, listType);
          }
        });
      } else if (classList.contains('fa-check-square')) {
        onFinished($li.id);
      } else if (classList.contains('fa-backward')) {
        onPending($li.id);
      } else if (classList.contains('fa-trash-alt')) {
        onDelete($li.id);
      }
    }
  });
}
