import Toggle from './components/toggle.js';
import Clock from './components/clock.js';
import Greeting from './components/greeting.js';
import TodoInput from './components/todoInput.js';
import ProgressBar from './components/progress.js';

export default class App {
  constructor($target) {
    this.state = {
      pending: [],
      finished: [],
      count: 0,
    };
    Toggle();
    Clock($target);
    Greeting($target);

    this.todoInput = TodoInput({
      $target,
      onSubmit: value => {
        console.log(value);
      },
    });

    this.progress = new ProgressBar($target);
  }

  onDelete = () => {
    console.log('delete');
  };
  onFinished = () => {
    console.log('onFinished');
  };
  onPending = () => {
    console.log('onPending');
  };

  setState = nextState => {
    this.state = nextState;
    this.progress.setState(this.state);
  };
}

/* 
 
  <form action="" class="todo-form">
    <input
      type="text"
      class="todo-form__input"
      placeholder="Enter your tasks"
    />
  </form>

  <div class="progress">
    <div class="progress_count">2</div>
    <progress id="progress-bar" value="2" max="10"></progress>
  </div>

  <section class="list">

    <div>
      <h3>PENDING</h3>
      <ul id="pending-list">
        <li id="1640929192624" class="ui-sortable-handle">
          <span>list 구현</span>
          <div class="buttons">
            <i class="far fa-edit"></i>
            <i class="far fa-check-square"></i>
            <i class="far fa-trash-alt"></i>
          </div>
        </li>
      </ul>
    </div>
    
    <div>
      <h3>FINISHED</h3>
      <ul id="finished-list">
        <li id="1640929192624" class="ui-sortable-handle">
          <span>weather 구현</span>
          <div class="buttons">
            <i class="far fa-edit"></i>
            <i class="fas fa-backward"></i>
            <i class="far fa-trash-alt"></i>
          </div>
        </li>
      </ul>
    </div>

  </section>
*/
