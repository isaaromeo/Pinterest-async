import { navLinks } from "../NavLink/NavLink";
import { navButtons, navIcons } from "../../data/navLinks";
import { getSavedPins } from "../Pin/Pin";

import "./_Header.scss";


export const Header = () => {
    console.log("Entering Header()...");
    const app = document.querySelector("#app");

    const header = document.createElement("header");

    const logo = document.createElement("img");
    logo.alt = "Pinteret logo";
    logo.src = "../public/assets/imgs/logo.png"

    const navBar = document.createElement("nav");
    const ulButtons = document.createElement("ul");
    ulButtons.classList.add("navButtons");

    navButtons.forEach(navButton => {
        ulButtons.append(navLinks(navButton));
        
    });

    const divSearch = document.createElement("div");
    divSearch.classList.add("search")
    const searchIcon = document.createElement("img");
    searchIcon.src = "../public/assets/imgs/search.png"
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

}

// export const buttonSelected = () => {
//     nav
// }