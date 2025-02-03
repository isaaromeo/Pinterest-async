export const Dropdown = (content, parentElement) => {
    const dropdown = document.createElement("div");
    dropdown.classList.add("dropdown");

    const dropdownContent = document.createElement("div");
    dropdownContent.classList.add("dropdown-content");
    dropdownContent.innerHTML = content;

    dropdown.appendChild(dropdownContent);

    // Añadir el dropdown al DOM para calcular su ancho
    document.body.appendChild(dropdown);

    // Obtener el ancho y la altura del dropdown
    const dropdownWidth = dropdownContent.offsetWidth;
    const dropdownHeight = dropdownContent.offsetHeight;

    // Obtener la posición y dimensiones del elemento padre
    const rect = parentElement.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    // Calcular la posición izquierda para centrar el dropdown
    let leftPosition = rect.left + (rect.width / 2) - (dropdownWidth / 2);

    // Ajustar si el dropdown se sale por la izquierda
    if (leftPosition < 0) {
        leftPosition = 10; // Moverlo 10px desde el borde izquierdo
    }

    // Ajustar si el dropdown se sale por la derecha
    if (leftPosition + dropdownWidth > viewportWidth) {
        leftPosition = viewportWidth - dropdownWidth - 10; // Moverlo 10px desde el borde derecho
    }

    // Calcular la posición vertical
    let topPosition = rect.bottom;

    // Ajustar si el dropdown se sale por la parte inferior
    if (rect.bottom + dropdownHeight > viewportHeight) {
        topPosition = rect.top - dropdownHeight; // Mostrar encima del elemento
    }

    // Aplicar las posiciones calculadas
    dropdown.style.position = "absolute";
    dropdown.style.top = `${topPosition}px`;
    dropdown.style.left = `${leftPosition}px`;

    // Cerrar el dropdown al hacer clic fuera de él
    document.addEventListener("click", (e) => {
        if (!dropdown.contains(e.target) && !parentElement.contains(e.target)) {
            dropdown.remove();
        }
    });

    return dropdown;
};