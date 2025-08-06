import { board, boardSize } from './board-setup.js';

export let selectedPiece = {};
export let validMoves = [];
export let currentPlayer = 2;

export function updateTurnDisplay() {
  const turnDisplay = document.getElementById('turnDisplay');
  turnDisplay.textContent = `Turn: ${currentPlayer === 1 ? 'Black' : 'White'}`;
}

export function renderBoard() {
  const boardElement = document.getElementById('board');
  boardElement.innerHTML = '';
  for (let r = 0; r < boardSize; r++) {
    for (let c = 0; c < boardSize; c++) {
      const sq = document.createElement('div');
      sq.classList.add('square');
      sq.classList.add((r + c) % 2 === 0 ? 'light' : 'dark');
      sq.dataset.row = r;
      sq.dataset.col = c;

      const piece = board[r][c];
      if (piece) {
        sq.textContent = piece.type;
        sq.style.color = piece.player === 1 ? 'black' : 'white';
      }

      sq.addEventListener('click', () => window.onSquareClick(r, c));
      boardElement.appendChild(sq);
    }
  }
}

export function switchPlayer() {
  currentPlayer = currentPlayer === 1 ? 2 : 1;
  updateTurnDisplay();
}