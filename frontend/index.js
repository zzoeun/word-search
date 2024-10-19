let selectedCells = [];
let isSelecting = false;

document.getElementById("new-game").addEventListener("click", () => {
  const input = document.getElementById("word-input").value;
  const words = input.split(",").map((word) => word.trim().toUpperCase());

  const wordList = document.getElementById("words");
  wordList.innerHTML = "";
  words.forEach((word) => {
    const li = document.createElement("li");
    li.textContent = word;
    wordList.appendChild(li);
  });

  fetch("/wordsearch", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ words: words }),
  })
    .then((response) => response.json())
    .then((data) => {
      const puzzle = data.puzzle;
      const gameBoard = document.getElementById("game-board");
      gameBoard.innerHTML = "";

      const table = document.createElement("table");
      puzzle.forEach((row) => {
        const tr = document.createElement("tr");
        row.forEach((cell) => {
          const td = document.createElement("td");
          td.textContent = cell;

          td.addEventListener("click", () => {
            if (!startCell) {
              startCell = { rowIndex, colIndex, td };
              td.classList.add("selected");
            } else if (!endCell) {
              endCell = { rowIndex, colIndex, td };
              td.classList.add("selected");
              checkSelectedWord();
            }
          });
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
