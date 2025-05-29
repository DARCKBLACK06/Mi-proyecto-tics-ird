import { auth } from "./firebase-config.js";
import { signInWithEmailAndPassword } from "firebase/auth";

document.querySelector(".login-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  
  const email = document.querySelector(".login-form input[type='email']").value;
  const password = document.querySelector(".login-form input[type='password']").value;
  const errorElement = document.createElement('p');
  errorElement.className = 'error-message';
  errorElement.style.color = 'red';
  errorElement.style.marginTop = '10px';

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    
    // Verificación de email de administrador (cambia por tu email real)
    if (userCredential.user.email === "admin@tuempresa.com") {
      window.location.href = "inicio.html";
    } else {
      throw new Error("No tienes permisos de administrador");
    }
  } catch (error) {
    let message = "Error desconocido";
    switch(error.code) {
      case "auth/invalid-email": message = "Formato de email inválido"; break;
      case "auth/user-not-found": message = "Usuario no registrado"; break;
      case "auth/wrong-password": message = "Contraseña incorrecta"; break;
      case "auth/too-many-requests": message = "Demasiados intentos. Intenta más tarde"; break;
      default: message = error.message;
    }
    
    // Elimina mensajes anteriores
    const existingError = document.querySelector('.error-message');
    if (existingError) existingError.remove();
    
    // Muestra nuevo error
    errorElement.textContent = message;
    document.querySelector(".login-form").appendChild(errorElement);
  }
});