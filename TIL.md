# HTML

# CSS

1. after 가상 선택자를 사용해서 drag me를 구현한것.

# JS

1. 클래스는 생성자 함수와 달리 new 키워드를 붙이지 않으면 시작부터 오류가 발생하기에, `new.target` 이용한 방어코드를 작성할 필요가 없다.

2. button의 id를 이용해 dom을 가져오려고 했는데 null이 떴다. 이유는 `id = 'instruction__btn '` 라고 했기 때문. 즉, btn 뒤에 빈칸이 있어서 오류가 난것. 빈칸을 없애주자.

3. 만약에 pending list ul, finisehd list ul에다가 `class='list-container'`를 추가해주고 `list-container`에다가 클릭이벤트를 추가하면 pending list ul에만 추가된다. 따라서 더 상위의 DOM에 다가 클릭 이벤트를 추가해줘야 한다. 그래서 list section 에다가 추가해주니 해결 되었다.

4. drag and drop 아티클 하나 쓰기.(어떤 태그가 start이고 enter인지 그런거 중심으로 설명)

# 할일

1. onSubmit 완성 ---- done.
2. onDelete,onFinished,onPending,onEdit 구현 --- done
3. 그리고 state업데이트 하기(list,progress에 넘겨주게) --- done
4. scrollbar --- done
5. state 검증 --- movieSeat Validate.js 를 참고하기! --- done
6. list hover할때 after 가상 선택자로 'drag me' 구현해보기(drag me는 중간에 위치하는게 좋을듯)
7. 드래그 기능 구현 --- done

   - 로토의 todo-drag and drop에 단서가 있을지도
   - setData/getData로 li.id,innerHTML 객체로 넘겨줘서 받아오고, dragend할때 교체함.
   - 출처: https://webdevtrick.com/html-drag-and-drop-list/#comment-39886
   - submit, onFinished, onPending 일때만 드래그드랍 이벤트가 등록되어야 함.최초로딩시에는 한 번만 등록되도록 flag변수를 만들어 줌.

   **원래는 pending,finshed둘중에 하나라도 빈 array면 template에서 map 돌릴때 undefined에러가 나야하는데 안나다가 왜 삭제버튼 누르고 pending누르면 에러가 날까?**

   -- 왜냐면 삭제를 하면 id가 pending에서 없어짐. 근데 finished,pending을 누르면 없어진 id를 찾으려고 할것이다. 그래서 undefined가 리턴이 되어 push되고 그럼 undefined에서 id,value를 찾으려고 할 것이기 때문에 오류가 나는 것이다.

8. 시작할때 LS에서 데이터 가져와서 state업데이트 하기.
9. beforeloaded 이벤트를 통해 변경사항 localStorage에 최종 저장
10. pending , finished 둘다 동시에 랜더링 하지말고 선택적으로 랜더링 하도록 리팩토링 하기
    - setState에 두번째 인자로 renderType을 넘겨주고(부모의 클래스에 따라서) todo.render에서 선택적으로 랜더하는 거다. --- done
11. Hash를 이용해서 list id 부여 --- done
