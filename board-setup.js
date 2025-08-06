export const boardSize = 10;
export let board = [];

export function createEmptyBoard() {
  board.length = 0;
  for (let r = 0; r < boardSize; r++) {
    const row = [];
    for (let c = 0; c < boardSize; c++) {
      row.push(null);
    }
    board.push(row);
  }
}

export function setupPieces() {
  const blackPiecesRow = [
    { type: 'R' }, { type: 'N' }, { type: 'B' }, { type: 'W' }, { type: 'Q' }, { type: 'K' }, { type: 'W' }, { type: 'B' }, { type: 'N' }, { type: 'R' }
  ];
  const blackPawnRow = Array(10).fill({ type: 'P' });
  const whitePiecesRow = [...blackPiecesRow];
  const whitePawnRow = Array(10).fill({ type: 'P' });

  for (let c = 0; c < boardSize; c++) {
    board[0][c] = { ...blackPiecesRow[c], player: 1 };
    board[1][c] = { ...blackPawnRow[c], player: 1 };
    board[8][c] = { ...whitePawnRow[c], player: 2 };
    board[9][c] = { ...whitePiecesRow[c], player: 2 };
  }
}