import { auth, db } from "../firebase.js";

import { 
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup 
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import { 
  setDoc, 
  doc 
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";


// login com email e senha
const loginBtn = document.getElementById("loginbtn");

loginBtn.addEventListener("click", () => {
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;

    signInWithEmailAndPassword(auth, email, senha)
      .then(() => {
          window.location = "dashboard.html"; 
      })
      .catch((error) => {
          alert("Erro: " + error.message);
      });
});


// login com Google
const googleBtn = document.getElementById("googlebtn");
const provider = new GoogleAuthProvider();

googleBtn.addEventListener("click", async () => {
    try {
        const result = await signInWithPopup(auth, provider);

        const user = result.user;

    
        // (Opcional) Salvar dados do usuário no Firestore
    
        await setDoc(doc(db, "usuarios", user.uid), {
            nome: user.displayName,
            email: user.email,
            foto: user.photoURL,
            logadoVia: "google"
        }, { merge: true });

        // Redireciona para o dashboard
        window.location = "dashboard.html";

    } catch (error) {
        console.error(error);
        alert("Erro ao fazer login com Google: " + error.message);
    }
});
