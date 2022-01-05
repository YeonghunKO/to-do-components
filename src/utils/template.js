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

const todoInputTemp = () => {};

export { weatherIconTemp, clockTemp, greetingTemp, greetingResTemp };