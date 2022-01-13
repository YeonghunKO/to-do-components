import Toggle from './components/toggle.js';
import Clock from './components/clock.js';
import Greeting from './components/greeting.js';
import TodoInput from './components/todoInput.js';
import ProgressBar from './components/progress.js';
import Todo from './components/todo.js';

import { isValidate } from './utils/validate.js';

import { Hash } from './utils/hash.js';
import { getItem, setItem } from './utils/storage.js';
import { selector } from './utils/selector.js';

export default class App {
  constructor($target) {
    this.PENDING_LIST_KEYWORD = 'pending-list';
    this.FINISHED_LIST_KEYWORD = 'finished-list';

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
        const idObj = listObjCreator(value);
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

    this.populateList();

    window.addEventListener('beforeunload', this.saveState);
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

  populateList = () => {
    const pendingList = getItem(this.PENDING_LIST_KEYWORD, []);
    const finisehdList = getItem(this.FINISHED_LIST_KEYWORD, []);
    this.setState(
      { renderType: 'init' },
      { pending: pendingList, finished: finisehdList }
    );
  };

  // returnArrBycurrentOrder = () => {};

  saveState = () => {
    const pendingLists = selector('#pending-list').children;
    const finishedLists = selector('#finished-list').children;

    const pendingObjList = [];
    const finishedObjList = [];

    [...pendingLists].forEach($list => {
      const id = $list.id;
      const value = $list.querySelector('span:nth-of-type(2)').innerText;
      pendingObjList.push({ id, value });
    });

    [...finishedLists].forEach($list => {
      const id = $list.id;
      const value = $list.querySelector('span:nth-of-type(2)').innerText;
      finishedObjList.push({ id, value });
    });

    setItem(this.PENDING_LIST_KEYWORD, pendingObjList);
    setItem(this.FINISHED_LIST_KEYWORD, finishedObjList);
  };
}

function listObjCreator(value) {
  return { id: Hash.createHash(Hash.getSalt()), value };
}
