// public/js/auth.js

// Tus importaciones están correctas
import { auth } from "./firebase-config.js";
import { signInWithEmailAndPassword } from "firebase/auth";

document.querySelector(".login-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.querySelector(".login-form input[type='email']").value;
  const password = document.querySelector(".login-form input[type='password']").value;

  // Elemento para mostrar mensajes de error
  let errorElement = document.querySelector('.error-message'); // Intenta obtener uno existente
  if (!errorElement) { // Si no existe, crea uno
      errorElement = document.createElement('p');
      errorElement.className = 'error-message';
      errorElement.style.color = 'red';
      errorElement.style.marginTop = '10px';
      document.querySelector(".login-form").appendChild(errorElement); // Agrega al formulario
  }
   errorElement.textContent = ''; // Limpia el mensaje de error al intentar un nuevo login


  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);

    // *** ¡AQUÍ ESTÁ EL CAMBIO! ***
    // Eliminamos la condición del email de administrador.
    // Ahora, si signInWithEmailAndPassword tiene éxito, siempre redirigiremos.

    console.log("¡Inicio de sesión exitoso!", userCredential.user);
    // Redirige a inicio.html usando window.location.replace
    // Esto es mejor para el historial del navegador (evita volver al login con el botón 'atrás')
    window.location.replace('/inicio.html');

    // Si quisieras mantener la lógica de admin pero redirigir a otros a otra página:
    // if (userCredential.user.email === "admin@tuempresa.com") {
    //   window.location.replace('/admin-dashboard.html'); // Redirige admins a otra página
    // } else {
    //   window.location.replace('/inicio.html'); // Redirige otros a inicio.html
    // }


  } catch (error) {
    // Maneja cualquier error que ocurra durante el inicio de sesión (contraseña incorrecta, usuario no encontrado, etc.)
    let message = "Ocurrió un error al iniciar sesión."; // Mensaje general
    switch(error.code) {
      case "auth/invalid-email": message = "El formato del correo electrónico es inválido."; break;
      case "auth/user-not-found": message = "No se encontró una cuenta con este correo electrónico."; break;
      case "auth/wrong-password": message = "La contraseña es incorrecta."; break;
      case "auth/user-disabled": message = "Esta cuenta de usuario ha sido deshabilitada."; break;
      case "auth/too-many-requests": message = "Hemos bloqueado temporalmente esta cuenta debido a demasiados intentos fallidos. Inténtalo de nuevo más tarde."; break;
      default: message = `Error: ${error.message}`; // Para otros errores desconocidos
    }

    // Muestra el mensaje de error en el elemento que creamos/obtuvimos
    errorElement.textContent = message;
    console.error("Error al iniciar sesión:", error); // Opcional: loguear el error completo en consola
  }
});

// Opcional: Puedes añadir un listener para verificar el estado de autenticación
// y redirigir automáticamente si el usuario ya está logueado al visitar index.html
/*
import { onAuthStateChanged } from "firebase/auth";

onAuthStateChanged(auth, (user) => {
  if (user) {
    // El usuario está logueado
    console.log("Usuario ya logueado:", user);
    // Redirige a inicio.html si no estamos ya en inicio.html
    // Usamos window.location.pathname para obtener la ruta actual (ej: /index.html, /inicio.html)
    if (window.location.pathname !== '/inicio.html' && window.location.pathname !== '/inicio.html/') {
       // window.location.replace('/inicio.html'); // Redirige
       // También puedes hacerlo con href si prefieres que quede en el historial:
       window.location.href = '/inicio.html';
    }
  } else {
    // El usuario no está logueado
    console.log("Usuario no logueado.");
    // Si estás en una página que requiere autenticación (como inicio.html)
    // y el usuario no está logueado, podrías redirigir al login (index.html)
    // Puedes añadir esta lógica en inicio.html si prefieres
    // if (window.location.pathname === '/inicio.html' || window.location.pathname === '/inicio.html/') {
    //   window.location.replace('/'); // O window.location.replace('/index.html');
    // }
  }
});
*/
