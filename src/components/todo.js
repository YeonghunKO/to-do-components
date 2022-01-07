import { selector } from '../utils/selector.js';
import { listContainerTemp, listTemp } from '../utils/template.js';

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
    const li = e.target.closest('li');
    console.log(classList, li);
    if (li) {
      if (classList.contains('fa-edit')) {
        onEdit(li.id);
      } else if (classList.contains('fa-check-square')) {
        onFinished(li.id);
      } else if (classList.contains('fa-backward')) {
        onPending(li.id);
      } else {
        onDelete(li.id);
      }
    }
  });
}
