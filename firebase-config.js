const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "centurionbattles.firebaseapp.com",
  databaseURL: "https://centurionbattles-default-rtdb.firebaseio.com",
  projectId: "centurionbattles",
  storageBucket: "centurionbattles.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.database();
const movesRef = db.ref("moves");
const sessionId = Date.now() + "-" + Math.floor(Math.random() * 10000);
let isMyTurn = false;
let currentPlayer = 2;

// Sync move