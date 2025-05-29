// Función para abrir el modal de personalización
function openModal() {
  document.getElementById("customModal").style.display = "block";
}

// Función para cerrar el modal
function closeModal() {
  document.getElementById("customModal").style.display = "none";
}

// Función para establecer fondo desde la galería
function setBackground(imagePath) {
  // Aplica el fondo y fuerza la prioridad sobre el CSS
  document.body.style.backgroundImage = `url('${imagePath}')`;
  document.body.style.setProperty('background-image', `url('${imagePath}')`, 'important');
  
  // Guarda en localStorage (para persistencia)
  localStorage.setItem("bgImage", imagePath);
  closeModal();
}

// Función para subir imagen personalizada
function uploadImage() {
  const input = document.getElementById("uploadInput");
  const file = input.files[0];

  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      const imageUrl = e.target.result;
      // Aplica el fondo subido
      document.body.style.backgroundImage = `url('${imageUrl}')`;
      document.body.style.setProperty('background-image', `url('${imageUrl}')`, 'important');
      
      // Guarda la imagen como base64 en localStorage
      localStorage.setItem("bgImage", imageUrl);
      closeModal();
    };
    reader.readAsDataURL(file);
  }
}

// Cargar fondo al iniciar la página
window.onload = function() {
  // Verificar si hay un fondo guardado
  const savedBg = localStorage.getItem("bgImage");
  
  if (savedBg) {
    // Aplicar el fondo guardado con prioridad
    document.body.style.backgroundImage = `url('${savedBg}')`;
    document.body.style.setProperty('background-image', `url('${savedBg}')`, 'important');
  }

  // Debug: Verificar en consola qué hay guardado
  console.log("Fondo actual:", savedBg || "Predeterminado");
};

// Evento para evitar recarga del formulario
document.querySelector(".login-form").addEventListener("submit", function(e) {
  e.preventDefault();
  // Aquí luego agregarás la lógica de Firebase Auth
  console.log("Formulario enviado (sin acción aún)");
});
