const createEle = ({ eleType, classes, id }) => {
  const $ele = document.createElement(eleType);
  if (classes) {
    classes.forEach(className => {
      $ele.classList.add(className);
    });
  }

  if (id) {
    $ele.setAttribute('id', id);
  }
  return $ele;
};

const weatherIconTemp = weatherIcon => {
  return `
    <span>날씨:</span>
    <img
    src="http://openweathermap.org/img/wn/${weatherIcon}.png"
    alt="weather-icon"
    class="weather__icon"
    />;
    `;
};

const clockTemp = () => {
  const $div = createEle({ eleType: 'div', classes: ['clock-container'] });
  $div.innerHTML = `
    <h1 class="clock-container__clock"></h1>
    `;
  return $div;
};

const greetingTemp = () => {
  const $form = createEle({ eleType: 'form', classes: ['form'] });
  $form.innerHTML = `
    <input type="text" class="form__input" placeholder="이름을 입력하세요" />
    `;
  return $form;
};

const greetingResTemp = () => {
  const $h4 = createEle({ eleType: 'h4', classes: ['name'] });
  return $h4;
};

const todoInputTemp = () => {
  const $todoForm = createEle({ eleType: 'form', classes: ['todo-form'] });

  $todoForm.innerHTML = `
    <input
    type="text"
    class="todo-form__input"
    placeholder="Enter your tasks"
    />
  `;

  return $todoForm;
};

const progressTemp = () => {
  const $progress = createEle({ eleType: 'div', classes: ['progress'] });
  $progress.innerHTML = `
  <div class="progress_count"></div>
  <progress id="progress-bar" value="" max=""></progress>
  `;

  return $progress;
};

const listContainerTemp = () => {
  const $container = createEle({ eleType: 'section', classes: ['list'] });
  $container.innerHTML = `
  <div>
  <h3>PENDING</h3>
    <ul id="pending-list" class='list-container'>
    
    </ul>
  </div>

  <div>
  <h3>FINISHED</h3>
    <ul id="finished-list" class='list-container'>
    
    </ul>
  </div>
  `;
  return $container;
};

const listTempArray = (lists, taskType) => {
  return lists
    .map(list => {
      return `
      <li id="${list.id}" draggable='true'>
      <div>
        <span class='${
          taskType === 'pending' ? 'pending-span' : 'finished-span'
        }'></span>
        <span>${list.value}</span>
      </div>
    
      <div class="buttons">
        <i class="far fa-edit"></i>
        <i class="${
          taskType === 'pending' ? 'far fa-check-square' : 'fas fa-backward'
        }"></i>
        <i class="far fa-trash-alt"></i>
      </div>
    </li>
      `;
    })
    .join('');
};

const singleListNode = (listObj, taskType) => {
  const { id, value } = listObj;
  const $li = createEle({ eleType: 'li', id });
  $li.innerHTML = `
  <div>
    <span class='${
      taskType === 'pending' ? 'pending-span' : 'finished-span'
    }'></span>
    <span>${value}</span>
  </div>

  <div class="buttons">
    <i class="far fa-edit"></i>
    <i class="${
      taskType === 'pending' ? 'far fa-check-square' : 'fas fa-backward'
    }"></i>
    <i class="far fa-trash-alt"></i>
  </div>
    `;
  return $li;
};

const editTemp = () => {
  return `
  <input
    type="text"
    class="todo-edit__input"
    placeholder="Edit your tasks and press Enter"
  />
  `;
};

const listRestoreTemp = (value, listType) => {
  return `
  <div>
    <span class='${
      listType === 'pending-list' ? 'pending-span' : 'finished-span'
    }'></span>
    <span>${value}</span>
  </div>
   
  <div class="buttons">
    <i class="far fa-edit"></i>
    <i class="${
      listType === 'pending-list' ? 'far fa-check-square' : 'fas fa-backward'
    }"></i>
    <i class="far fa-trash-alt"></i>
  </div>
  `;
};

export {
  weatherIconTemp,
  clockTemp,
  greetingTemp,
  greetingResTemp,
  todoInputTemp,
  progressTemp,
  listContainerTemp,
  listTempArray,
  singleListNode,
  editTemp,
  listRestoreTemp,
};
