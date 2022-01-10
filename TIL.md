# HTML

# CSS

# JS

1. 클래스는 생성자 함수와 달리 new 키워드를 붙이지 않으면 시작부터 오류가 발생하기에, `new.target` 이용한 방어코드를 작성할 필요가 없다.

2. button의 id를 이용해 dom을 가져오려고 했는데 null이 떴다. 이유는 `id = 'instruction__btn '` 라고 했기 때문. 즉, btn 뒤에 빈칸이 있어서 오류가 난것. 빈칸을 없애주자.

3. 만약에 pending list ul, finisehd list ul에다가 `class='list-container'`를 추가해주고 `list-container`에다가 클릭이벤트를 추가하면 pending list ul에만 추가된다. 따라서 더 상위의 DOM에 다가 클릭 이벤트를 추가해줘야 한다. 그래서 list section 에다가 추가해주니 해결 되었다.

# 할일

1. onSubmit 완성 ---- done.
2. onDelete,onFinished,onPending,onEdit 구현 --- done
3. 그리고 state업데이트 하기(list,progress에 넘겨주게) --- done
4. scrollbar --- done
5. state 검증 --- movieSeat Validate.js 를 참고하기! --- done
6. 시작할때 LS에서 데이터 가져와서 state업데이트 하기.
7. 드래그 기능 구현
8. beforeloaded 이벤트를 통해 변경사항 localStorage에 최종 저장
