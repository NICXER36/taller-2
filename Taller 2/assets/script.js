// Galería personalizada
const galleryContainer = document.querySelector('.gallery-container');
const galleryItems = document.querySelectorAll('.gallery-item');
const prevButton = document.querySelector('.gallery-prev');
const nextButton = document.querySelector('.gallery-next');

let currentIndex = 0;
const itemWidth = 320; // Ancho de cada item + gap

function updateGallery() {
    galleryContainer.scrollTo({
        left: currentIndex * itemWidth,
        behavior: 'smooth'
    });
}

prevButton.addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--;
        updateGallery();
    }
});

nextButton.addEventListener('click', () => {
    if (currentIndex < galleryItems.length - 1) {
        currentIndex++;
        updateGallery();
    }
});

// Validación del formulario
document.getElementById('formulario-reservacion').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Limpiar mensajes de error anteriores
    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(msg => msg.textContent = '');
    
    // Obtener valores del formulario
    const nombre = document.getElementById('nombre').value.trim();
    const email = document.getElementById('email').value.trim();
    const telefono = document.getElementById('telefono').value.trim();
    const fecha = document.getElementById('fecha').value;
    const personas = document.getElementById('personas').value;
    
    let isValid = true;
    
    // Validación del nombre
    if (nombre.length < 3) {
        showError('nombre', 'El nombre debe tener al menos 3 caracteres');
        isValid = false;
    }
    
    // Validación del email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showError('email', 'Por favor ingrese un correo electrónico válido');
        isValid = false;
    }
    
    // Validación del teléfono
    const telefonoRegex = /^[0-9]{10}$/;
    if (!telefonoRegex.test(telefono)) {
        showError('telefono', 'El teléfono debe tener 10 dígitos');
        isValid = false;
    }
    
    // Validación de la fecha
    const fechaActual = new Date();
    const fechaSeleccionada = new Date(fecha);
    if (fechaSeleccionada < fechaActual) {
        showError('fecha', 'La fecha debe ser futura');
        isValid = false;
    }
    
    // Validación del número de personas
    if (personas < 1 || personas > 10) {
        showError('personas', 'El número de personas debe estar entre 1 y 10');
        isValid = false;
    }
    
    // Si todo es válido, enviar el formulario
    if (isValid) {
        // Aquí puedes añadir el código para enviar los datos al servidor
        alert('¡Reservación enviada con éxito! Nos pondremos en contacto contigo pronto.');
        this.reset();
    }
});

// Función para mostrar mensajes de error
function showError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const errorSpan = field.nextElementSibling;
    errorSpan.textContent = message;
    field.classList.add('error');
}