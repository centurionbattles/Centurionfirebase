
console.log("script loaded");

// --- Firebase Realtime Multiplayer ---
const movesRef = firebase.database().ref("moves");
const multiplayerMode = true;
const mySessionId = Date.now() + '-' + Math.floor(Math.random() * 1000); // simple unique id
let isMyTurn = false;

movesRef.on("child_added", (snapshot) => {
  const move = snapshot.val();
  if (move.sessionId !== mySessionId) {
    movePiece(move.from.r, move.from.c, move.to.r, move.to.c, false);
    isMyTurn = true;
    updateTurnDisplay();

  if (multiplayerMode && sendMove) {
    movesRef.push({
      from: { r: r1, c: c1 },
      to: { r: r2, c: c2 },
      sessionId: mySessionId,
      timestamp: Date.now()
    });
    isMyTurn = false;
    updateTurnDisplay();
  }

  }
});



// --- Multiplayer WebSocket Setup ---
const socket = new WebSocket('wss://centurionmpc.onrender.com'); // Replace with your WebSocket URL
let myPlayerId = null;
let isMyTurn = false;
let multiplayerMode = true;

socket.onopen = () => {
  console.log("Connected to WebSocket server");
};

socket.onmessage = (event) => {
  const msg = JSON.parse(event.data);

  if (msg.type === 'init') {
    myPlayerId = msg.player;
    isMyTurn = (myPlayerId === 2); // White starts
    updateTurnDisplay();

  if (multiplayerMode && sendMove) {
    movesRef.push({
      from: { r: r1, c: c1 },
      to: { r: r2, c: c2 },
      sessionId: mySessionId,
      timestamp: Date.now()
    });
    isMyTurn = false;
    updateTurnDisplay();
  }


  if (multiplayerMode && sendMove && myPlayerId !== null) {
    socket.send(JSON.stringify({ type: 'move', from: { r: r1, c: c1 }, to: { r: r2, c: c2 } }));
    isMyTurn = false;
    updateTurnDisplay();

  if (multiplayerMode && sendMove) {
    movesRef.push({
      from: { r: r1, c: c1 },
      to: { r: r2, c: c2 },
      sessionId: mySessionId,
      timestamp: Date.now()
    });
    isMyTurn = false;
    updateTurnDisplay();
  }

  }

  } else if (msg.type === 'move') {
    const { from, to } = msg;
    movePiece(from.r, from.c, to.r, to.c, false); // don't resend
    isMyTurn = true;
    updateTurnDisplay();

  if (multiplayerMode && sendMove) {
    movesRef.push({
      from: { r: r1, c: c1 },
      to: { r: r2, c: c2 },
      sessionId: mySessionId,
      timestamp: Date.now()
    });
    isMyTurn = false;
    updateTurnDisplay();
  }


  if (multiplayerMode && sendMove && myPlayerId !== null) {
    socket.send(JSON.stringify({ type: 'move', from: { r: r1, c: c1 }, to: { r: r2, c: c2 } }));
    isMyTurn = false;
    updateTurnDisplay();

  if (multiplayerMode && sendMove) {
    movesRef.push({
      from: { r: r1, c: c1 },
      to: { r: r2, c: c2 },
      sessionId: mySessionId,
      timestamp: Date.now()
    });
    isMyTurn = false;
    updateTurnDisplay();
  }

  }

  } else if (msg.type === 'player_left') {
    alert(msg.message);
    boardElement.style.pointerEvents = 'none';
  }
};

 // Confirm script runs

// --- Multiplayer WebSocket Setup ---
const socket = new WebSocket('wss://your-app-name.onrender.com'); // ⬅️ Replace with your actual WebSocket URL
let myPlayerId = null;
let isMyTurn = false;
let multiplayerMode = true;

socket.onopen = () => {
  console.log("Connected to WebSocket server");
};

socket.onmessage = (event) => {
  const msg = JSON.parse(event.data);

  if (msg.type === 'init') {
    myPlayerId = msg.player;
    isMyTurn = (myPlayerId === 2); // White starts
    updateTurnDisplay();

  if (multiplayerMode && sendMove) {
    movesRef.push({
      from: { r: r1, c: c1 },
      to: { r: r2, c: c2 },
      sessionId: mySessionId,
      timestamp: Date.now()
    });
    isMyTurn = false;
    updateTurnDisplay();
  }


  if (multiplayerMode && sendMove && myPlayerId !== null) {
    socket.send(JSON.stringify({ type: 'move', from: { r: r1, c: c1 }, to: { r: r2, c: c2 } }));
    isMyTurn = false;
    updateTurnDisplay();

  if (multiplayerMode && sendMove) {
    movesRef.push({
      from: { r: r1, c: c1 },
      to: { r: r2, c: c2 },
      sessionId: mySessionId,
      timestamp: Date.now()
    });
    isMyTurn = false;
    updateTurnDisplay();
  }

  }

  } else if (msg.type === 'move') {
    const { from, to } = msg;
    movePiece(from.r, from.c, to.r, to.c, false); // don't re-send
    isMyTurn = true;
    updateTurnDisplay();

  if (multiplayerMode && sendMove) {
    movesRef.push({
      from: { r: r1, c: c1 },
      to: { r: r2, c: c2 },
      sessionId: mySessionId,
      timestamp: Date.now()
    });
    isMyTurn = false;
    updateTurnDisplay();
  }


  if (multiplayerMode && sendMove && myPlayerId !== null) {
    socket.send(JSON.stringify({ type: 'move', from: { r: r1, c: c1 }, to: { r: r2, c: c2 } }));
    isMyTurn = false;
    updateTurnDisplay();

  if (multiplayerMode && sendMove) {
    movesRef.push({
      from: { r: r1, c: c1 },
      to: { r: r2, c: c2 },
      sessionId: mySessionId,
      timestamp: Date.now()
    });
    isMyTurn = false;
    updateTurnDisplay();
  }

  }

  } else if (msg.type === 'player_left') {
    alert(msg.message);
    boardElement.style.pointerEvents = 'none';
  }
};

const boardElement = document.getElementById('board');
const turnDisplay = document.getElementById('turnDisplay');
const promotionModal = document.getElementById('promotionModal');
const promotionOptions = document.getElementById('promotionOptions');

const boardSize = 10;

let board = [];
let selectedPiece = null;
let currentPlayer = 2;
let validMoves = [];
let moveTimeSeconds = 30;
let timeLeft = moveTimeSeconds;
let timerId = null;
const timerDisplay = document.getElementById('timerDisplay');

let blackPoints = 0;
let whitePoints = 0;
const blackPointsDisplay = document.getElementById('blackPoints');
const whitePointsDisplay = document.getElementById('whitePoints');

const piecePoints = {
  K: 20,
  Q: 12,
  R: 4,
  B: 4,
  N: 3,
  A: 3,
  W: 6,
  P: 1
};

function switchPlayer() {
  currentPlayer = currentPlayer === 1 ? 2 : 1;
  updateTurnDisplay();

  if (multiplayerMode && sendMove) {
    movesRef.push({
      from: { r: r1, c: c1 },
      to: { r: r2, c: c2 },
      sessionId: mySessionId,
      timestamp: Date.now()
    });
    isMyTurn = false;
    updateTurnDisplay();
  }


  if (multiplayerMode && sendMove && myPlayerId !== null) {
    socket.send(JSON.stringify({ type: 'move', from: { r: r1, c: c1 }, to: { r: r2, c: c2 } }));
    isMyTurn = false;
    updateTurnDisplay();

  if (multiplayerMode && sendMove) {
    movesRef.push({
      from: { r: r1, c: c1 },
      to: { r: r2, c: c2 },
      sessionId: mySessionId,
      timestamp: Date.now()
    });
    isMyTurn = false;
    updateTurnDisplay();
  }

  }

  resetTimer();
}

const piecesUnicode = {
  P: '♟',
  R: '♜',
  N: '♞',
  B: '♝',
  Q: '♛',
  K: '♚',
  A: '🝢',
  W: 'Ӂ'
};

function createEmptyBoard() {
  board = [];
  for(let r=0; r<boardSize; r++){
    const row = [];
    for(let c=0; c<boardSize; c++){
      row.push(null);
    }
    board.push(row);
  }
}

function setupPieces() {
  const blackPiecesRow = [
    {type:'R'}, {type:'N'}, {type:'B'},{type:'W'}, {type:'Q'}, {type:'K'}, {type:'W'}, {type:'B'}, {type:'N'}, {type:'R'}
  ];
  const blackPiecesRow2 = [
    {type:'P'}, {type:'P'}, {type:'P'},{type:'P'}, {type:'A'}, {type:'A'}, {type:'P'}, {type:'P'}, {type:'P'}, {type:'P'}
  ];
  for(let c=0; c<boardSize; c++) {
    board[0][c] = {...blackPiecesRow[c], player:1};
    board[1][c] = {...blackPiecesRow2[c], player:1};
  }

  const whitePiecesRow = [
    {type:'R'}, {type:'N'}, {type:'B'},{type:'W'}, {type:'Q'}, {type:'K'}, {type:'W'}, {type:'B'}, {type:'N'}, {type:'R'}];
  const WhitePiecesRow2 = [
    {type:'P'}, {type:'P'}, {type:'P'},{type:'P'}, {type:'A'}, {type:'A'}, {type:'P'}, {type:'P'}, {type:'P'}, {type:'P'}
  ];
  for(let c=0; c<boardSize; c++) {
    board[9][c] = {...whitePiecesRow[c], player:2};
    board[8][c] = {...WhitePiecesRow2[c], player:2};
  }
}

function renderBoard() {
  boardElement.innerHTML = '';
  for(let r=0; r<boardSize; r++){
    for(let c=0; c<boardSize; c++){
      const sq = document.createElement('div');
      sq.classList.add('square');
      sq.classList.add((r+c) % 2 === 0 ? 'light' : 'dark');
      sq.dataset.row = r;
      sq.dataset.col = c;

      const piece = board[r][c];
      if(piece){
        sq.textContent = piecesUnicode[piece.type];
        sq.style.color = piece.player === 1 ? 'black' : 'white';
      }

      if(selectedPiece && selectedPiece.r === r && selectedPiece.c === c){
        sq.classList.add('highlight');
      }

      if(validMoves.some(m => m[0] === r && m[1] === c)){
        const dot = document.createElement('div');
        dot.classList.add('valid-move-dot');
        sq.appendChild(dot);
      }

      sq.addEventListener('click', () => onSquareClick(r, c));
      boardElement.appendChild(sq);
    }
  }
}

function onSquareClick(r, c) {
  if (!isMyTurn && multiplayerMode) return;
  if (!isMyTurn && multiplayerMode) return;
  if (!isMyTurn && multiplayerMode) return;

  const clickedPiece = board[r][c];

  if(!selectedPiece){
    if(clickedPiece && clickedPiece.player === currentPlayer){
      selectedPiece = {r, c, piece: clickedPiece};
      validMoves = getValidMoves(r,c);
      renderBoard();
    }
    return;
  }

  if(selectedPiece.piece.type === 'W'){
    const dr = Math.abs(r - selectedPiece.r);
    const dc = Math.abs(c - selectedPiece.c);
    const target = board[r][c];
    if(
      dr <=1 && dc <=1 &&
      target &&
      target.player !== currentPlayer &&
      target.type !== 'K'
    ){
      const pts = piecePoints[target.type] || 0;
      if (target.player === 1) {
        whitePoints -= pts;
        blackPoints += pts;
      } else if (target.player === 2) {
        blackPoints -= pts;
        whitePoints += pts;
      }
      board[r][c].player = currentPlayer;
      selectedPiece = null;
      validMoves = [];
      updatePointsDisplay();
      currentPlayer = currentPlayer === 1 ? 2 : 1;
      updateTurnDisplay();

  if (multiplayerMode && sendMove) {
    movesRef.push({
      from: { r: r1, c: c1 },
      to: { r: r2, c: c2 },
      sessionId: mySessionId,
      timestamp: Date.now()
    });
    isMyTurn = false;
    updateTurnDisplay();
  }


  if (multiplayerMode && sendMove && myPlayerId !== null) {
    socket.send(JSON.stringify({ type: 'move', from: { r: r1, c: c1 }, to: { r: r2, c: c2 } }));
    isMyTurn = false;
    updateTurnDisplay();

  if (multiplayerMode && sendMove) {
    movesRef.push({
      from: { r: r1, c: c1 },
      to: { r: r2, c: c2 },
      sessionId: mySessionId,
      timestamp: Date.now()
    });
    isMyTurn = false;
    updateTurnDisplay();
  }

  }

      renderBoard();
      return;
    }
  }

  if(validMoves.some(m => m[0] === r && m[1] === c)){
    movePiece(selectedPiece.r, selectedPiece.c, r, c);
    selectedPiece = null;
    validMoves = [];
    renderBoard();
    return;
  }

  if(clickedPiece && clickedPiece.player === currentPlayer){
    selectedPiece = {r, c, piece: clickedPiece};
    validMoves = getValidMoves(r, c);
    renderBoard();
    return;
  }

  selectedPiece = null;
  validMoves = [];
  renderBoard();
}

// NOTE: The rest of your logic continues below unchanged...

