import { board } from './board-setup.js';
import { switchPlayer } from './ui.js';

export function movePiece(r1, c1, r2, c2, doSwitch = true) {
  const piece = board[r1][c1];
  board[r2][c2] = piece;
  board[r1][c1] = null;
  if (doSwitch) switchPlayer();
}