GOOD Word Search 게입니다. 

찾고자 하는 단어를 input 필드에 입력한 후, "Game Start!" 버튼을 클릭하여 게임을 시작합니다.

단어 배치: 서버에서 단어들을 받아와 게임 보드에 랜덤하게 배치합니다.
post 기능을 통해 입력 단어를 파이썬에서 받고, 랜덤하게 배치합니다. 

랜덤배치 기능은 orientation과 randit 함수를 활용했습니다. 
정답이 랜덤 배치된 후 fill_empty를 define하여 보드판을 완성했습니다. 

자바스크립트를 통해 정답을 입력하는 기능을 구현했습니다.
mousedown, mpuseover, mouseup 등 세가지 기능의 특징을 활용하여 코드를 구성했습니다.
다만..아직 대각선 선택이 잘 안되는 이슈와 클릭 시 다른 알파벳이 같이 입력되는 이슈가 있습니다..( + 추후 수정 예정..)
정답 확인은 자바스크립트에 checkSelectedWor함수를 넣어 구현했습니다.

정답 단어도 자바스크립트에 wordlist를 통해 구현했습니다. (+ 정답을 찾으면 체크되는 기능도 추가하고 싶습니다..)
