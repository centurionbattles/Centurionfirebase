import { movesRef, mySessionId } from './firebase-config.js';

movesRef.push({
    from, to,
    sessionId,
    timestamp: Date.now()
  });
  isMyTurn = false;