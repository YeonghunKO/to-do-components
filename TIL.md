# HTML

# CSS

# JS

1. 클래스는 생성자 함수와 달리 new 키워드를 붙이지 않으면 시작부터 오류가 발생하기에, `new.target` 이용한 방어코드를 작성할 필요가 없다.

2. button의 id를 이용해 dom을 가져오려고 했는데 null이 떴다. 이유는 `id = 'instruction__btn '` 라고 했기 때문. 즉, btn 뒤에 빈칸이 있어서 오류가 난것. 빈칸을 없애주자.
