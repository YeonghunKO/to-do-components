import { selector } from '../utils/selector.js';
import { progressTemp } from '../utils/template.js';

export default function ProgressBar($target) {
  $target.appendChild(progressTemp());
  const $proCount = selector('.progress_count');
  const $progressBar = selector('#progress-bar');

  const calCountMessage = (pending, finished) => {
    if (pending || finished) {
      if (pending === 0) {
        return '모든 할 일을 끝냈습니다! 자신에게 보상을 주십시오✨';
      }
      return `할 일이 ${pending}개 남았습니다`;
    } else {
      return '할일이 없습니다. 자유를 만끽하십시오😎';
    }
  };

  this.state = {
    pending: 0,
    finished: 0,
  };

  this.setState = nextState => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    const { pending, finished } = this.state;
    $proCount.style.opacity = 0;
    setTimeout(() => {
      $proCount.innerHTML = calCountMessage(pending, finished);
      $progressBar.value = finished;
      $progressBar.max = pending + finished;
      $proCount.style.opacity = 1;
    }, 300);
  };

  this.render();
}
