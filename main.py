from fastapi import FastAPI, Request
from fastapi.staticfiles import StaticFiles 
from typing import List
import random
import string

app = FastAPI()

def place_word(board, word):
    # Randomly choose orientation: 0=horizontal, 1=vertical, 2=diagonal
    orientation = random.randint(0, 3)
    
    placed = False
    while not placed:
        if orientation == 0:  # Horizontal
            row = random.randint(0, len(board)-1)
            col = random.randint(0, len(board)-len(word))
            reverse = random.choice([True, False])
            if reverse:
                word = word[::-1]
            space_available = all(board[row][c] == '-' or 
              board[row][c] == word[i] 
                for i, c in enumerate(range(col, col+len(word))))
            if space_available:
                for i, c in enumerate(range(col, col+len(word))):
                    board[row][c] = word[i]
                placed = True

        elif orientation == 1:  # Vertical
            row = random.randint(0, len(board)-len(word))
            col = random.randint(0, len(board)-1)
            reverse = random.choice([True, False])
            if reverse:
                word = word[::-1]
            space_available = all(board[r][col] == '-' or 
                board[r][col] == word[i] 
                  for i, r in enumerate(range(row, row+len(word))))
            if space_available:
                for i, r in enumerate(range(row, row+len(word))):
                    board[r][col] = word[i]
                placed = True

        elif orientation == 2:  # Diagonal top-left to bottom right
            row = random.randint(0, len(board)-len(word))
            col = random.randint(0, len(board)-len(word))
            reverse = random.choice([True, False])
            if reverse:
                word = word[::-1]
            space_available = all(board[r][c] == '-' or 
                board[r][c] == word[i] 
                  for i, (r, c) in enumerate(zip(range(row, row+len(word)), 
                                      range(col, col+len(word)))))
            if space_available:
                for i, (r, c) in enumerate(zip(range(row, row+len(word)), 
                                      range(col, col+len(word)))):
                    board[r][c] = word[i]
                placed = True
                
        elif orientation == 3:  # Diagonal bottom-left to top-right
            row = random.randint(len(word) - 1, len(board) - 1)
            col = random.randint(0, len(board) - len(word))
            reverse = random.choice([True, False])
            if reverse:
                word = word[::-1]
            space_available = all(board[r][c] == '-' or 
                board[r][c] == word[i] 
                  for i, (r, c) in enumerate(zip(range(row, row-len(word), -1),
                                     range(col, col+len(word)))))
            if space_available:
                for i, (r, c) in enumerate(zip(range(row, row-len(word), -1), 
                      range(col, col+len(word)))):
                    board[r][c] = word[i]
                placed = True

def fill_empty(board):
    for row in range(len(board)):
        for col in range(len(board)):
            if board[row][col] == '-':
                board[row][col] = random.choice(string.ascii_uppercase)

def create_word_search(words: List[str]):
    board = [['-' for _ in range(13)] for _ in range(13)]

    for word in words:
        place_word(board, word)

    fill_empty(board)

    return board

@app.post('/wordsearch')
async def post_word_search(request: Request):
    data = await request.json()
    words = data.get("words", [])
    board = create_word_search(words)
    return {"puzzle": board}


app.mount("/", StaticFiles(directory="frontend", html=True), name="frontend")