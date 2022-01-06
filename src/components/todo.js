import { selector } from '../utils/selector.js';
import {
  listContainerTemp,
  pendingListTemp,
  finishedListTemp,
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
  const $buttons = selector('.buttons');

  this.setState = nextState => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    const { pending, finished } = this.state;
    const pendingListTemps = pendingListTemp(pending);
    const finishedListTemps = finishedListTemp(finished);
    $pendingList.innerHTML = pendingListTemps;
    $finishedList.innerHTML = finishedListTemps;
  };

  if ($buttons) {
    $buttons.addEventListener('click', e => {
      const { classsName } = e.$target;
      console.log(className);
    });
  }
}
