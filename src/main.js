import App from './App.js';
import { selector } from './utils/selector.js';

const $main = selector('#main');

new App($main);

/*
App

toggle
clock
greeting
progress
todos

this.state = {
    todos:[],
    name:null,
    currentInput:null
}

this.setState = (nextState) => {
    todo.setState
    progress.setState
}
*/
