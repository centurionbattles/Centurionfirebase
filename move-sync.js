movesRef.on("child_added", (snapshot) => {
  const move = snapshot.val();
  if (move.sessionId !== sessionId) {
    movePiece(move.from.r, move.from.c, move.to.r, move.to.c, false);
    isMyTurn = true;