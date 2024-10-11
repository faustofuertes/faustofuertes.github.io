const apiKey = 'ppR4S3ZFqbyEWbPhM7PN3INVNBmby5v4LNyC8nt7';

async function getComida(alimento) {
    try {
        const res = await fetch(`https://api.nal.usda.gov/fdc/v1/foods/search?query=${alimento}&api_key=${apiKey}`);
        const alimentos = await res.json();
        return alimentos;
    } catch (error) {
        console.error(error);
    }
}

async function mostrarComida(alimento) {
    const gramos = 100;
    const containerAlimentos = document.getElementsByClassName('comidas')[0];

    // Eliminar contenido existente
    while (containerAlimentos.firstChild) {
        containerAlimentos.removeChild(containerAlimentos.firstChild);
    }

    const alimentos = await getComida(alimento);

    for (const primerAlimento of alimentos.foods) {
        const nombre = primerAlimento.description;
        const calorias = primerAlimento.foodNutrients.find(nutriente => nutriente.nutrientName === 'Energy'); // Buscar calorías

        const comida = document.createElement('div');
        comida.classList.add('div-comida');
        comida.innerHTML = `<p>${nombre}</p> <p>${calorias ? calorias.value : 'No disponible'} kcal <br> ${gramos} g </p>`;

        containerAlimentos.appendChild(comida);
    }
}

const btnBuscar = document.getElementsByClassName('btn-buscar')[0];

btnBuscar.addEventListener('click', () => {
    const input = document.getElementsByClassName('buscador')[0];
    const alimento = input.value;

    const explorar = document.getElementsByClassName('explorar')[0];
    explorar.remove();

    const resultado = document.createElement('h2');
    resultado.textContent = `Resultados para: "${alimento}"`;

    const containerComidas = document.getElementsByClassName('comidas')[0];
    containerComidas.insertAdjacentElement('beforebegin', resultado);

    mostrarComida(alimento);
});
