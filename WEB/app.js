//importaçao do firebas
import { auth } from "../firebase.js";

//verificaçao de login
import { onAuthStateChanged, signOut } 
  from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

onAuthStateChanged(auth, user => {
  if (!user) {
    window.location.href = "login.html";
  }
});

//funçao de logout
document.getElementById("logoutBtn").addEventListener("click", () => {
  signOut(auth);
});
