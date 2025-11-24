// Importações do Firebase via CDN
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";

import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAmsM9fA_Q1tai2OTwbivDMfp6yzHrHVoI",
  authDomain: "crm-simplificado.firebaseapp.com",
  projectId: "crm-simplificado",
  storageBucket: "crm-simplificado.firebasestorage.app",
  messagingSenderId: "579720713760",
  appId: "1:579720713760:web:e69f51af858fdf6cd88e45"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Exporta serviços
export const auth = getAuth(app);
export const db = getFirestore(app);
