import { navLinks } from "../NavLink/NavLink";
import { navButtons, navIcons } from "../../data/navLinks";
import { getSavedPins } from "../Pin/Pin";
import { store } from "../../store";

import "./_Header.scss";


export const Header = () => {
    console.log("Entering Header()...");
    const app = document.querySelector("#app");

    const header = document.createElement("header");

    const logo = document.createElement("img");
    logo.alt = "Pinteret logo";
    logo.src = "/assets/imgs/logo.png"

    const navBar = document.createElement("nav");
    const ulButtons = document.createElement("ul");
    ulButtons.classList.add("navButtons");

    navButtons.forEach(navButton => {
        ulButtons.append(navLinks(navButton));
        
    });

    const divSearch = document.createElement("div");
    divSearch.classList.add("search")
    const searchIcon = document.createElement("img");
    searchIcon.src = "/assets/imgs/search.png"
    searchIcon.alt = "search"
    const search = document.createElement("input");
    search.placeholder = "search"
    search.classList.add("search-input");
    divSearch.append(searchIcon, search);

    const ulIcons = document.createElement("ul");
    ulIcons.classList.add("navIcons");

    navIcons.forEach(navIcons => {
        ulIcons.append(navLinks(navIcons));
        
    });

    

    navBar.append(ulButtons, divSearch, ulIcons);
    header.append(logo, navBar);
    app.append(header);

    const pp = document.querySelector(".Profile");
    pp.addEventListener("click", getSavedPins);

    const home = document.querySelector("#Home");
    home.classList.toggle("selected");
    
    const explore = document.querySelector("#Explore");

    home.addEventListener("click", (e) => {
        e.preventDefault();
        store.setState({ currentPage: "Home", query: "random" });
        window.location.hash = "#home";
        selectPage(home);
        console.log("Home tiene la clase: ",home.className);
        console.log("Explore tiene la clase: ", explore.className);
    });

    explore.addEventListener("click", (e) => {
        e.preventDefault();// evita que haga reload por ser un <a> y que interrumpa el flujo de la app y que los estados de la pagina se actualicen correctamente
        store.setState({ currentPage: "Explore", query: "purple" });
        window.location.hash = "#explore";
        selectPage(explore);
        console.log("Explore tiene la clase: ", explore.className);
        console.log("Home tiene la clase: ",home.className);
    });

}


const selectPage = (selectedElement) => {
    // Remover la clase 'selected' de todos los enlaces
    document.querySelectorAll('.navButtons a').forEach(link => {
        link.classList.remove('selected');
    });
    // Añadir la clase 'selected' al enlace clickeado
    selectedElement.classList.add('selected');
};