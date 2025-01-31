// src/renderPage.js
import { Header } from "./components/Header/Header";
import { Body } from "./components/Body/Body";
import { store } from "./store";

export const renderPage = (page) => {
    console.log("Rendering page:", store.state.currentPage); // Depuración

    const app = document.querySelector("#app");
    app.innerHTML = ""; // Limpia el contenido anterior

    // Renderiza el Header
    Header();

    // Renderiza el Body según la página
    Body();
};