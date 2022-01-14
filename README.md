# to-do-components

https://github.com/YeonghunKO/TO-LIST-ADVANCED/tree/master/src 에 있는 todo list를 component 방식으로 다시 만들어 보았다.
유튜버에서 예전 프로젝트를 다시 만들어보고 부족한 점이 무었이었는지 살펴보고 개선하는 연습이 실력을 확실히 증폭시켜준다고 해서 시작한 프로젝트이다.

프로젝트 기능, 새로배운 기술, 그리고 부족한 점과 느낀점을 얘기해보려고 한다.

[시연 해보기!](https://to-do-list-component.netlify.app/)

# 프로젝트 기능
✅ 날씨, 설명 토글

✅ 편집 기능

✅ 드래그 앤 드랍 기능


✅ 진행상황 표시


# 포인트
✅ 컴포넌트 형식으로 코드 재구성

✅ 반응형으로 만듬

✅ 선별적으로 list 랜더링

    - 프로젝트 초반에는 그냥 App state상태가 바뀌면 바뀐 부분 뿐만아니라 안 바뀐 부분까지 통째로 list-container를 랜더링 시켰다.
    
    - 그러나, 리팩토링 하면서 state가 바뀌면 바뀌는 시점에 type을 pass하여 선별적으로 랜더링 되도록 하엿다.

✅ state의 validation을 체크

✅ Hash를 사용해 list에 id를 만듬

✅ list가 랜더링 될때마다 localStorage에 저장하지 않고 unload될때(창이 닫힐때, 새로고침하기 전) 딱 한번 list를 local에 save함

# 새로 알게된 것

## CSS

1. after 가상 선택자를 사용해서 drag me를 구현한것.

## JS

1. 클래스는 생성자 함수와 달리 new 키워드를 붙이지 않으면 시작부터 오류가 발생하기에, `new.target` 이용한 방어코드를 작성할 필요가 없다.

2. button의 id를 이용해 dom을 가져오려고 했는데 null이 떴다. 이유는 `id = 'instruction__btn '` 라고 했기 때문. 즉, btn 뒤에 빈칸이 있어서 오류가 난것. 빈칸을 없애주자.

3. 만약에 pending list ul, finisehd list ul에다가 `class='list-container'`를 추가해주고 `list-container`에다가 클릭이벤트를 추가하면 pending list ul에만 추가된다.(첫번째 자식에만 이벤트 적용) 따라서 더 상위의 DOM에 다가 클릭 이벤트를 추가해줘야 한다. 그래서 list section 에다가 추가해주니 해결 되었다.

4. drag and drop을 적용. [여기서 포스팅 확인](https://velog.io/@yhko1992/drag-and-drop-API)

# 예전 프로젝트에 비해서 개선된 점

## GIT

1. 깃커밋을 세세하게 그리고 명료하게 작성하였다.

## HTML
1. BEM 방법론을 도입하였다.

weather button같은 경우를 보면 알 수 있다. btn, arrow, box를 아래와 같이 구분하였다.

```html
<button id="weather__btn" class="weather__btn">
  <span class="weather__arrow">🔻</span>
  <div class="weather__box invisible">
    <span class="city"></span>
    <div class="weather__box__description"></div>
    <span class="real_temp"></span>
    <span class="sensory_temp"></span>
  </div>
</button>
```

## JS

1. 앞서 언급했지만 컴포넌트를 만들고 추가하는 방식으로 코드를 짜보았다. 확실히 함수를 무작위로 만들고 명령형으로 짜는 것 보다는 가독성이 좋아졌다.

2. 각 컴포넌트의 속성에 따라 분류를 하고 폴더를 만들어 따로 모아놓았다.
    - utils와 component로 나누었다. utils안에는 hash, storage같은 기능을 모아두었고 component는 파일이름에서도 알 수 있듯이 clock, toggle, todolist같은 컴포넌트들이 들어있다.
    - 그리고 css, img 파일들을 assets폴더안에 따로 분류해놓았다.
    - 그러고 보면 constant파일도 만들어서 string을 따로 모아둘 걸 그랬다.
    
3. async, await를 이용한 점
     - weather api를 불러올때 예전 프로젝트에서는 fetch.then을 이용해서 데이터를 가져오고 가공했다면, 이번 프로젝트에서는 async,await 키워드로 api를 이용하였다. 
     
```javascript
const API_KEY = 'fdc043150b4a4dabe389dd2724e69e21';

export const requestWeather = async (lat, lng) => {
  try {
    const weatherData = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric&lang=kr`
    );
    if (weatherData.ok) {
      const res = await weatherData.json();
      return {
        city: res.name,
        realTemp: res.main.temp,
        feelTemp: res.main.feels_like,
        icon: res.weather[0].icon,
      };
    } else {
      console.log('invalid data');
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};
```

4. 성능 향상(?)

개발자 도구의 performance 탭을 이용해 성능을 비교해보았다. todo 를 3개 추가하고 편집한다음 finished로 넘기고 위치도 바꿔준다음에 모두 삭제했다.

결론 부터 얘기하자면 컴포넌트 todo가 살짝 더 성능이 좋은것 같았다.
그러나 제목에(?)를 붙인 이유는 기존 todo도 그다지 나쁘지 않기 때문에 성능에 유의미한 변화가 있다고 하기에는 애매해서 물음표를 붙였다. 일단 gif를 참고하길

**<<기존 todo>>**
![기존 todo](https://github.com/YeonghunKO/for-video-container/blob/master/1todo.gif?raw=true)


**<<컴포넌트 todo>>**
![컴포넌트 todo](https://github.com/YeonghunKO/for-video-container/blob/master/2todo.gif?raw=true)

기존 todo에서 100ms이상 걸린 프레임이 더 많이 발견되는 것을 알 수 있다. 그러나 초록색도 많기 때문에 충분히 쾌적한 환경이라고 할 수 있을 것 같다.
음... 명령형 프로그래밍이 더 성능면에서 우세할 줄 알았는데 반대의 결과가 나왔다. 선별적 랜더링을 그만큼 잘 했기 때문인가? 아님 template.js를 잘 활용해서?

# 아쉬운 점

1. App.state가 사실 거의 사용되고 있지 않다는 점이다.
    - submit,edit,delete같이 todo 가 조작될때마다 state까지 바뀌지만 바뀐 state를 넘겨주기보다 id만 넘겨주고 dom을 조작하는 방식이다.
    - 그리고 save할때도 querySelectorAll을 이용해서 id와 value를 뽑아와서 저장하는 편이다. 사실상 state를 사용하는 순간은 submit할때 pending을 넘겨주는 것 밖에 없다.
    - state를 사용하고 싶다면 state를 넘겨줘서 state안에 있는 object 대로 dom을 싹다 새로 구성하면 되는데 그건 너무 비효율적이다.
    
2. 토글같은 경우는 HTML에 의존하고 있다
    - 이걸 아쉬운점이라고 할 수 있을지는 모르겠다. 그러나 컴포넌트는 그냥 선언만 하면 HTML부터 모든것을 새롭게 만들어야 의의가 있다고 생각해서 아쉬운점이라고 했다.
    - HTML에 틀을 만들어놓은 이유는 조금이라도 JS에 부담을 덜어줘서 성능을 향상시키고 DOM을 좀더 자유자재로 사용할 수 있게 하기 위함이었다.
    
# 느낀 점

- 확실히 기존에 했던 프로젝트를 컴포넌트로 다시 만들어봄으로써 컴포넌트 패러다임을 다시 한 번 확실하게 느낄 수 있었다. (로직을 짜는 능력이 향상된것은 말할 필요도 없다)
그리고 내가 이제 가독성과 확장성 그리고 성능을 고려한다는 점에서 성장했다는 것을 알 수 있었다. 그리고 나름 재미있었다!!

그럼 끝!


