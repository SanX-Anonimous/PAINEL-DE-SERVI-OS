import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

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

console.log("🔥 Firebase conectado com sucesso!");
