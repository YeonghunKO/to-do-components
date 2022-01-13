import Toggle from './components/toggle.js';
import Clock from './components/clock.js';
import Greeting from './components/greeting.js';
import TodoInput from './components/todoInput.js';
import ProgressBar from './components/progress.js';
import Todo from './components/todo.js';

import { isValidate } from './utils/validate.js';

import { Hash } from './utils/hash.js';

export default class App {
  constructor($target) {
    this.state = {
      pending: [],
      finished: [],
    };
    Toggle();
    Clock($target);
    Greeting($target);

    this.todoInput = TodoInput({
      $target,
      onSubmit: value => {
        const idObj = idObjCreator(value);
        this.pushTaskToPending(idObj);
        // console.log(idObj);
        this.setState({ renderType: 'submit' });
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

  onDelete = ($li, parentId) => {
    if (parentId === 'pending-list') {
      this.deleteTaskFromPending($li.id);
    } else {
      this.deleteTaskFromFinished($li.id);
    }
    this.setState({ renderType: 'delete', $li, parentId });
  };

  onFinished = $li => {
    const deletedTask = this.deleteTaskFromPending($li.id);
    this.pushTaskToFinished(deletedTask);
    this.setState({ renderType: 'onFinished', $li });
  };

  onPending = $li => {
    const deletedTask = this.deleteTaskFromFinished($li.id);
    this.pushTaskToPending(deletedTask);
    this.setState({ renderType: 'onPending', $li });
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
        console.log(task, id);
        if (task.id === id) {
          task.value = newValue;
        }
      });
    }
  };

  setState = ({ renderType, $li, parentId }, nextState = this.state) => {
    if (isValidate(nextState)) {
      this.state = nextState;
      const { pending, finished } = this.state;
      this.progress.setState({
        pending: pending.length,
        finished: finished.length,
      });
      switch (renderType) {
        case 'submit':
          this.todo.setState({ pending, finished }, renderType);
          break;
        default:
          this.todo.setState({ pending, finished }, renderType, $li, parentId);
          break;
      }
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
  return { id: Hash.createHash(Hash.getSalt()), value };
}
