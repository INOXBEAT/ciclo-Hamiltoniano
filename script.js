const map = document.getElementById('map');
const cities = [];
const numCities = 5; // Número de ciudades
let selectedCities = []; // Ciudades seleccionadas por el jugador

// Función para generar ciudades
function generateCities() {
    for (let i = 0; i < numCities; i++) {
        const city = document.createElement('div');
        city.classList.add('city');

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

generateCities();

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
        document.getElementById('message').textContent = '¡Todas las ciudades han sido visitadas! Ahora puedes verificar tu ruta.';
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
    if (selectedCities.length === cities.length) {
        let totalDistance = 0;
        for (let i = 0; i < selectedCities.length - 1; i++) {
            totalDistance += calculateDistance(selectedCities[i], selectedCities[i + 1]);
        }

        // Distancia entre la última ciudad y la primera para cerrar el ciclo
        totalDistance += calculateDistance(selectedCities[selectedCities.length - 1], selectedCities[0]);

        const score = Math.floor(10000 / totalDistance); // Cuanto menor la distancia, mayor la puntuación
        document.getElementById('message').textContent = '¡Ruta completada correctamente!';
        document.getElementById('score').textContent = `Puntuación: ${score}`;
    } else {
        document.getElementById('message').textContent = 'No has visitado todas las ciudades. Inténtalo de nuevo.';
    }
}

document.getElementById('check-route').addEventListener('click', verifyRoute);
