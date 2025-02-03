export const likesButton = (liked = false) => {
    const button = document.createElement("button");
    button.classList.add("likes-button");

    const heartIcon = document.createElement("div");
    heartIcon.classList.add("heart-icon");

    // Estado inicial del botón (liked o no liked)
    if (liked) {
        heartIcon.classList.add("liked");
    }

    // Cambiar el estado del botón al hacer clic
    button.addEventListener("click", () => {
        heartIcon.classList.toggle("liked");
    });

    button.appendChild(heartIcon);
    return button;
};