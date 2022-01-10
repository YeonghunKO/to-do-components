import Toggle from './components/toggle.js';
import Clock from './components/clock.js';
import Greeting from './components/greeting.js';
import TodoInput from './components/todoInput.js';
import ProgressBar from './components/progress.js';
import Todo from './components/todo.js';
import { isValidate } from './utils/validate.js';

export default class App {
  constructor($target) {
    this.state = {
      pending: [],
      finished: [],
    };
    // updateState
    Toggle();
    Clock($target);
    Greeting($target);

    this.todoInput = TodoInput({
      $target,
      onSubmit: value => {
        const idObj = idObjCreator(value);
        this.pushTaskToPending(idObj);
        this.setState();
      },
    });

    this.progress = new ProgressBar($target);

    this.todo = new Todo({
      $target,
      initialState: this.state,
      onDelete: this.onDelete,
      onFinished: this.onFinished,
      onPending: this.onPending,
      onEdit: this.onEdit,
    });
  }

  onDelete = id => {
    this.deleteTaskFromPending(id);
    this.deleteTaskFromFinished(id);
    this.setState();
  };

  onFinished = id => {
    const deletedTask = this.deleteTaskFromPending(id);
    this.pushTaskToFinished(deletedTask);
    this.setState();
  };

  onPending = id => {
    const deletedTask = this.deleteTaskFromFinished(id);
    this.pushTaskToPending(deletedTask);
    this.setState();
  };

  onEdit = (id, newValue, listType) => {
    if (listType === 'pending-list') {
      this.state.pending.forEach(task => {
        if (task.id === id) {
          task.value = newValue;
        }
      });
    } else {
      this.state.finished.forEach(task => {
        if (task.id === id) {
          task.value = newValue;
        }
      });
    }
  };

  setState = (nextState = this.state) => {
    if (isValidate(nextState)) {
      this.state = nextState;
      const { pending, finished } = this.state;
      // console.log(pending, finished);
      this.progress.setState({
        pending: pending.length,
        finished: finished.length,
      });
      this.todo.setState({ pending, finished });
    }
  };

  deleteTaskFromPending = id => {
    let idTask;
    this.state.pending = this.state.pending.filter(task => {
      if (task.id !== id) {
        return true;
      } else {
        idTask = task;
      }
    });
    return idTask;
  };

  deleteTaskFromFinished = id => {
    let idTask;
    this.state.finished = this.state.finished.filter(task => {
      if (task.id !== id) {
        return true;
      } else {
        idTask = task;
      }
    });
    return idTask;
  };

  pushTaskToPending = obj => {
    this.state.pending.push(obj);
  };

  pushTaskToFinished = obj => {
    this.state.finished.push(obj);
  };

  saveState = () => {};
}

function idObjCreator(value) {
  return { id: Date.now() + value, value };
}

/*
edit
  <form action="" class="todo-edit">
    <input
      type="text"
      class="todo-edit__input"
      placeholder="Edit your tasks and press Enter"
    />
  </form>
*/

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
        <span class="pending-span"></span>  
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
        <span class="finished-span"></span>  
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
