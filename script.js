const map = document.getElementById('map');
const cities = [];
const numCities = 5; // Número de ciudades
let selectedCities = []; // Ciudades seleccionadas por el jugador

// Función para generar ciudades
function generateCities() {
    // Eliminar ciudades existentes
    map.innerHTML = ''; // Limpia el contenido del contenedor del mapa
    cities.length = 0; // Limpiar el array de ciudades

    for (let i = 0; i < numCities; i++) {
        const city = document.createElement('div');
        city.classList.add('city');
        city.style.border = ''; // Asegurarse de que el borde esté vacío

        // Posicionar la ciudad en un lugar aleatorio
        const x = Math.floor(Math.random() * (map.clientWidth - 30));
        const y = Math.floor(Math.random() * (map.clientHeight - 30));
        city.style.left = `${x}px`;
        city.style.top = `${y}px`;

        city.setAttribute('draggable', true);
        city.addEventListener('dragstart', handleDragStart);
        city.addEventListener('dragend', handleDragEnd);

        map.appendChild(city);
        cities.push({ x, y, element: city });
    }
}

// Inicializar el juego
generateCities();

// Función para manejar el inicio del arrastre
function handleDragStart(e) {
    e.target.classList.add('dragging');
}

function handleDragEnd(e) {
    e.target.classList.remove('dragging');
}

function handleDrop(e) {
    e.preventDefault();
    const cityElement = document.querySelector('.dragging');
    if (cityElement) {
        const newX = e.clientX - map.offsetLeft - (cityElement.clientWidth / 2);
        const newY = e.clientY - map.offsetTop - (cityElement.clientHeight / 2);
        cityElement.style.left = `${newX}px`;
        cityElement.style.top = `${newY}px`;

        const city = cities.find(c => c.element === cityElement);
        if (city && !selectedCities.includes(city)) {
            selectedCities.push(city);
            cityElement.style.border = '2px solid green';
        }
    }

    if (selectedCities.length === cities.length) {
        const messageElement = document.getElementById('message');
        if (messageElement) {
            messageElement.textContent = '¡Todas las ciudades han sido visitadas! Ahora puedes verificar tu ruta.';
        }
    }

    if (cityElement) {
        cityElement.classList.remove('dragging');
    }
}

map.addEventListener('dragover', (e) => e.preventDefault());
map.addEventListener('drop', handleDrop);

// Función para calcular la distancia entre dos ciudades
function calculateDistance(cityA, cityB) {
    const dx = cityA.x - cityB.x;
    const dy = cityA.y - cityB.y;
    return Math.sqrt(dx * dx + dy * dy);
}

// Función para verificar la ruta y calcular la puntuación
function verifyRoute() {
    const messageElement = document.getElementById('message');
    const scoreElement = document.getElementById('score');
    if (messageElement && scoreElement) {
        if (selectedCities.length === cities.length) {
            let totalDistance = 0;
            for (let i = 0; i < selectedCities.length - 1; i++) {
                totalDistance += calculateDistance(selectedCities[i], selectedCities[i + 1]);
            }

            // Distancia entre la última ciudad y la primera para cerrar el ciclo
            totalDistance += calculateDistance(selectedCities[selectedCities.length - 1], selectedCities[0]);

            const score = Math.floor(10000 / totalDistance); // Cuanto menor la distancia, mayor la puntuación
            messageElement.textContent = '¡Ruta completada correctamente!';
            scoreElement.textContent = `Puntuación: ${score}`;
        } else {
            messageElement.textContent = 'No has visitado todas las ciudades. Inténtalo de nuevo.';
        }
    }
}

document.getElementById('check-route').addEventListener('click', verifyRoute);

// Función para reiniciar el juego
function resetGame() {
    selectedCities = [];
    const messageElement = document.getElementById('message');
    const scoreElement = document.getElementById('score');
    if (messageElement && scoreElement) {
        messageElement.textContent = ''; // Limpiar el mensaje
        scoreElement.textContent = ''; // Limpiar la puntuación
    }

    // Eliminar las ciudades del DOM
    const cityElements = document.querySelectorAll('.city');
    cityElements.forEach(el => el.remove());

    // Volver a generar ciudades
    generateCities();
}

// Asignar el evento de clic al botón de reiniciar
document.getElementById('reset-game').addEventListener('click', resetGame);
