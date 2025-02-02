// src/router.js
// import { renderPage } from "./renderPage";
// export const router = {
//     routes: {
//         "#home": () => {
//             renderPage("Home");
//         },
//         "#explore": () => {
//             renderPage("Explore");
//         },
//     },

//     init() {
//         window.addEventListener("hashchange", () => this.navigate());
//         this.navigate();
//     },

//     navigate() {
//         const hash = window.location.hash || "#home";
//         if (this.routes[hash]) {
//             this.routes[hash]();
//         } else {
//             console.error("Route not found:", hash);
//         }
//     },
// };

// src/router.js
import { store } from "./store";

export const router = {
    routes: {
        "#home": () => {
            store.setState({ currentPage: "Home", query: "random" });
        },
        "#explore": () => {
            store.setState({ currentPage: "Explore", query: "purple" });
        },
        "#search": () => {
            store.setState({ currentPage: "Search", query: "purple" });
        },
    },

    init() {
        window.addEventListener("hashchange", () => this.navigate());
        this.navigate();
    },

    navigate() {
        const hash = window.location.hash || "#home";
        if (this.routes[hash]) {
            this.routes[hash]();
        } else {
            console.error("Route not found:", hash);
        }
    },
};