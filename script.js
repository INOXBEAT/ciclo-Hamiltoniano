// Configuración básica
const map = document.getElementById('map');
const cities = [];
const numCities = 5; // Número de ciudades que se generarán

// Función para generar ciudades aleatorias
function generateCities() {
    for (let i = 0; i < numCities; i++) {
        const city = document.createElement('div');
        city.classList.add('city');
        
        // Posicionar la ciudad en un lugar aleatorio dentro del mapa
        const x = Math.floor(Math.random() * (map.clientWidth - 30));
        const y = Math.floor(Math.random() * (map.clientHeight - 30));
        
        city.style.left = `${x}px`;
        city.style.top = `${y}px`;
        
        // Hacer que las ciudades sean arrastrables
        city.setAttribute('draggable', true);
        city.addEventListener('dragstart', handleDragStart);
        city.addEventListener('dragend', handleDragEnd);
        
        // Agregar la ciudad al mapa y a la lista de ciudades
        map.appendChild(city);
        cities.push({ x, y, element: city });
    }
}

// Función que maneja el inicio del arrastre
function handleDragStart(e) {
    e.target.classList.add('dragging');  // Añadir una clase al elemento que estamos arrastrando
}

// Función que maneja el final del arrastre
function handleDragEnd(e) {
    e.target.classList.remove('dragging');  // Limpiar la clase al terminar el arrastre
}

// Ejecutar la función para generar ciudades
generateCities();

let selectedCities = []; // Lista de ciudades seleccionadas por el jugador

// Función para manejar cuando se suelta una ciudad
function handleDrop(e) {
    e.preventDefault();
    
    const cityElement = document.querySelector('.dragging');  // Obtener el elemento que se está arrastrando
    if (cityElement) {
        // Calcular las nuevas coordenadas de la ciudad
        const newX = e.clientX - map.offsetLeft - (cityElement.clientWidth / 2);
        const newY = e.clientY - map.offsetTop - (cityElement.clientHeight / 2);
        
        // Actualizar la posición de la ciudad
        cityElement.style.left = `${newX}px`;
        cityElement.style.top = `${newY}px`;
        
        // Encontrar la ciudad en el array de ciudades
        const city = cities.find(c => c.element === cityElement);
        if (city && !selectedCities.includes(city)) {
            selectedCities.push(city);  // Agregar la ciudad a la lista de seleccionadas
            cityElement.style.border = '2px solid green';  // Marcar la ciudad como visitada
        }
    }
    
    // Mostrar el mensaje si todas las ciudades han sido visitadas
    if (selectedCities.length === cities.length) {
        document.getElementById('message').textContent = '¡Todas las ciudades han sido visitadas! Ahora puedes verificar tu ruta.';
    }

    // Limpiar la clase 'dragging' al terminar
    if (cityElement) {
        cityElement.classList.remove('dragging');
    }
}

// Prevenir el comportamiento por defecto en el área de soltar
map.addEventListener('dragover', (e) => e.preventDefault());
map.addEventListener('drop', handleDrop);

// Botón para verificar la ruta
document.getElementById('check-route').addEventListener('click', verifyRoute);

// Función para verificar si el jugador ha visitado todas las ciudades y completado un ciclo hamiltoniano
function verifyRoute() {
    if (selectedCities.length === cities.length) {
        document.getElementById('message').textContent = 'Ruta completada correctamente. ¡Felicidades!';
    } else {
        document.getElementById('message').textContent = 'No has visitado todas las ciudades. Inténtalo de nuevo.';
    }
}