import { initializeApp } from "https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js";
import { getDatabase, ref, push, onChildAdded } from "https://www.gstatic.com/firebasejs/8.10.1/firebase-database.js";
import { firebaseConfig } from './firebase-config.js';
import { board, boardSize, createEmptyBoard, setupPieces } from './board-setup.js';
import { renderBoard, updateTurnDisplay, switchPlayer, selectedPiece, validMoves, currentPlayer } from './ui.js';
import { movePiece } from './move.js';

// Firebase Init
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const movesRef = ref(database, 'moves');

let mySessionId = Date.now() + '-' + Math.floor(Math.random() * 1000);
let isMyTurn = false;

onChildAdded(movesRef, (snapshot) => {
  const move = snapshot.val();
  if (move.sessionId !== mySessionId) {
    movePiece(move.from.r, move.from.c, move.to.r, move.to.c, false);
    isMyTurn = true;
    updateTurnDisplay();
  }
});

window.onSquareClick = function(r, c) {
  if (!isMyTurn) return;

  const clickedPiece = board[r][c];

  if (!selectedPiece) {
    if (clickedPiece && clickedPiece.player === currentPlayer) {
      selectedPiece.r = r;
      selectedPiece.c = c;
      selectedPiece.piece = clickedPiece;
      validMoves.length = 0;
      renderBoard();
    }
    return;
  }

  const isValidMove = validMoves.some(m => m[0] === r && m[1] === c);
  if (isValidMove) {
    movePiece(selectedPiece.r, selectedPiece.c, r, c);
    push(movesRef, {
      from: { r: selectedPiece.r, c: selectedPiece.c },
      to: { r, c },
      sessionId: mySessionId,
      timestamp: Date.now()
    });
    isMyTurn = false;
    updateTurnDisplay();
  }
};

function initGame() {
  createEmptyBoard();
  setupPieces();
  renderBoard();
  updateTurnDisplay();
  isMyTurn = true;
}

initGame();