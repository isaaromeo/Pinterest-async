export const Popup = (content) => {
    const popup = document.createElement("div");
    popup.classList.add("popup");

    const popupContent = document.createElement("div");
    popupContent.classList.add("popup-content");
    popupContent.innerHTML = content;

    popup.appendChild(popupContent);

    // Cerrar el popup al hacer clic fuera de él
    popup.addEventListener("click", (e) => {
        if (e.target === popup) {
            popup.remove();
        }
    });

    return popup;
};