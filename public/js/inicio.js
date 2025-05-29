import { auth } from "./firebase-config.js";
import { onAuthStateChanged, signOut } from "firebase/auth";

// Verifica autenticación
onAuthStateChanged(auth, (user) => {
  if (!user || user.email !== "admin@tuempresa.com") {
    window.location.href = "index.html";
  } else {
    console.log("Usuario autenticado:", user.email);
    // Opcional: Mostrar email en el dashboard
    document.getElementById("admin-email").textContent = user.email;
  }
});

// Cerrar sesión (ejemplo si agregas un botón)
document.getElementById("logout-btn")?.addEventListener("click", () => {
  signOut(auth).then(() => {
    window.location.href = "index.html";
  });
});