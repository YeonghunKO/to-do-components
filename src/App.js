import Toggle from './components/toggle.js';
import Clock from './components/clock.js';

export default class App {
  constructor($target) {
    Toggle();
    Clock($target);
  }
}

/* 
 <div class="clock">
  <h1>00:00</h1>
 </div>

  <form action="" class="form">
    <input type="text" class="form__input" placeholder="Enter your name" />
  </form>

  <h4 class="name">Yeong</h4>

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
