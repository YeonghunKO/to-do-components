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
    <h1 class="clock-container__clock">00:00</h1>
    `;
  console.log($div);
  return $div;
};

const greetingTemp = () => {
  return `
    <form action="" class="form">
    <input type="text" class="form__input" placeholder="Enter your name" />
    </form>

    <h4 class="name"></h4>
    `;
};

export { weatherIconTemp, clockTemp, greetingTemp };
