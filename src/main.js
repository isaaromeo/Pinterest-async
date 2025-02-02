// import { Header } from './components/Header/Header';
// import { Body } from './components/Body/Body';
// import { Create } from './layout/Create/Create';
import './main.scss'




// // const app = document.querySelector('#app');
// Header();
// Body();

// const home = document.querySelector(".Home");
// const explore = document.querySelector(".Explore");
// const create = document.querySelector(".Create");

// const clearApp = () => {
//     const app = document.querySelector('#app');
//     app.innerHTML = ''; // Limpia el contenido anterior
// };

// home.addEventListener("click", () => {
//     clearApp();
//     Header();
//     Body("Home");
// });

// explore.addEventListener("click", () => {
//     clearApp();
//     Header();
//     Body("Explore");
// });

// create.addEventListener("click", () => {
//     clearApp();
//     Create();
// });


import { router } from "./router";
import { store } from "./store";
import { renderPage } from "./renderPage";

// Inicializa el enrutador
router.init();

// Suscríbete a los cambios de estado
store.subscribe((state) => {
    console.log("State changed:", store.state); // Depuración
    renderPage();
});

// Renderiza la página inicial
renderPage();

