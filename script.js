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
        
        // Agregar la ciudad al mapa y a la lista de ciudades
        map.appendChild(city);
        cities.push({ x, y, element: city });
    }
}

// Función que maneja el inicio del arrastre
function handleDragStart(e) {
    e.dataTransfer.setData('text/plain', e.target.style.left + ',' + e.target.style.top);
}

// Ejecutar la función para generar ciudades
generateCities();
