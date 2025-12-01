// ---------- IMPORTAÇÕES ----------
import { db, auth } from "./firebase.js";
import {
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// ---------- CONFIGURAÇÃO ----------
const publicPages = ["login.html", "registro.html"];
const currentPage = window.location.pathname.split("/").pop() || "clientes.html";

// ---------- FUNÇÃO: DESTACAR ITEM DA SIDEBAR ----------
function highlightSidebar() {
  try {
    document.querySelectorAll(".menu-item").forEach(li => li.classList.remove("active"));
    const link = document.querySelector(`.menu-item a[href="${currentPage}"]`);
    if (link?.parentElement) link.parentElement.classList.add("active");
  } catch (e) {}
}

// ---------- VERIFICAÇÃO DE LOGIN ----------
onAuthStateChanged(auth, async (user) => {

  const isPublicPage = publicPages.includes(currentPage);

  // --- USUÁRIO DESLOGADO ---
  if (!user) {
    if (!isPublicPage) {
      window.location.replace("login.html");
    }
    return;
  }

  // --- USUÁRIO LOGADO EM LOGIN → REDIRECIONA ---
  if (currentPage === "login.html") {
    window.location.replace("dashboard.html");
    return;
  }

  // --- USUÁRIO LOGADO EM REGISTRO → PERMITIR (NÃO REDIRECIONAR) ---
  // NÃO FAZ NADA AQUI

  // --- CARREGAR DADOS DO USUÁRIO ---
  const ref = doc(db, "usuarios", user.uid);
  const snap = await getDoc(ref);
  const dados = snap.data();

  // --- VERIFICAR BLOQUEIO ---
  if (dados?.bloqueado === true) {
    alert("Sua conta foi bloqueada por um administrador.");
    await signOut(auth);
    window.location.href = "login.html";
    return;
  }

  // --- HABILITAR SIDEBAR ---
  highlightSidebar();
});

// ---------- FUNÇÃO DE LOGOUT ----------
try {
  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      signOut(auth);
    });
  }
} catch (e) {}
