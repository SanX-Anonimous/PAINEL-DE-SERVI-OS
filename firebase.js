import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
  getFirestore,
  collection,
  addDoc,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDsCcZ_vSRrUNDAKNdA5Wg9d3qT4JkHVf0",
  authDomain: "painel-servicos-cd99e.firebaseapp.com",
  projectId: "painel-servicos-cd99e",
  storageBucket: "painel-servicos-cd99e.firebasestorage.app",
  messagingSenderId: "644520755386",
  appId: "1:644520755386:web:755f3877b27af613558283",
  measurementId: "G-REBFM123LM"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

window.db = db;
window.collection = collection;
window.addDoc = addDoc;
window.onSnapshot = onSnapshot;
window.doc = doc;
window.updateDoc = updateDoc;
window.deleteDoc = deleteDoc;
window.serverTimestamp = serverTimestamp;

console.log("🔥 Firebase + Firestore conectado!");
