document.getElementById("new-game").addEventListener("click", () => {
  // FastAPI 서버에서 워드 서치 퍼즐 데이터를 받아옴
  fetch("http://127.0.0.1:8000/wordsearch")
    .then((response) => response.json())
    .then((data) => {
      const puzzle = data.puzzle; // 받은 퍼즐 데이터
      const gameBoard = document.getElementById("game-board");
      gameBoard.innerHTML = ""; // 기존 게임 보드 초기화

      // 퍼즐 테이블 생성
      const table = document.createElement("table");
      puzzle.forEach((row) => {
        const tr = document.createElement("tr");
        row.forEach((cell) => {
          const td = document.createElement("td");
          td.textContent = cell;
          tr.appendChild(td);
        });
        table.appendChild(tr);
      });
      gameBoard.appendChild(table);
    })
    .catch((error) => {
      console.error("Error fetching puzzle:", error);
    });
});
