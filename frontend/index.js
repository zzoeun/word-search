let selectedCells = [];
let isSelecting = false;
let words = [];
let startCell = null;

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
      puzzle.forEach((row, rowIndex) => {
        const tr = document.createElement("tr");
        row.forEach((cell, colIndex) => {
          const td = document.createElement("td");
          td.textContent = cell;

          td.addEventListener("mousedown", () => {
            isSelecting = true;
            startCell = { rowIndex, colIndex };
            toggleCellSelection(td, rowIndex, colIbdex);
          });

          td.addEventListener("mouseover", () => {
            if (isSelecting) {
              if (
                startCell &&
                (startCell.rowIndex === rowIndex ||
                  startCell.colIndex === colIndex)
              ) {
                toggleCellSelection(td, rowIndex, colIndex);
              }
            }
          });

          td.addEventListener("mouseup", () => {
            isSelecting = false;
            checkSelectedWord();
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

function toggleCellSelection(td, rowIndex, colIndex) {
  if (!td.classList.contains("selected")) {
    td.classList.add("selected");
    selectedCells.push({
      row: rowIndex,
      col: colIndex,
      letter: td.textContent,
    });
  } else {
    td.classList.remove("selected");
    selectedCells = selectedCells.filter(
      (cell) => cell.row !== rowIndex || cell.col !== colIndex
    );
  }
}

function checkSelectedWord() {
  if (selectedCells.length === 0) return;

  let selectedWord = selectedCells.map((cell) => cell.letter).join("");
  let reversedWord = selectedCells
    .map((cell) => cell.letter)
    .reverse()
    .join("");

  if (words.includes(selectedWord) || words.includes(reversedWord)) {
    alert(`Correct! You found: ${selectedWord}`);
    markWordAsFound();
  } else {
    resetSelection();
  }

  selectedCells = [];
}

function markWordAsFound() {
  selectedCells.forEach((cell) => {
    const td = document.querySelector(
      `table tr:nth-child(${cell.row + 1}) td:nth-child(${cell.col + 1})`
    );
    td.classList.add("correct");
  });
}

function resetSelection() {
  selectedCells.forEach((cell) => {
    const td = document.querySelector(
      `table tr:nth-child(${cell.row + 1}) td:nth-child(${cell.col + 1})`
    );
    td.classList.remove("selected");
  });
}

document.addEventListener("mouseup", () => {
  isSelecting = false;
});
