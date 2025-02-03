import { Dropdown } from "../Dropdown/Dropdown";
import { Pin, getSavedPins, layoutMasonry } from "../Pin/Pin";
import { clearGrid } from "../Body/Body";

export const navLinks = ({path, text, img}) => {
    const li = document.createElement("li");
    const a = document.createElement("a");

    li.classList.add("navLink")
    a.href = path;
    a.textContent = text;
    a.setAttribute("id", `${text}`)

    if(img != ""){
        const image = document.createElement("img");
        image.src = img;
        image.alt = text;
        image.classList.add(`${text}`)

        switch(text) {
            case "Profile":
                image.addEventListener("click", (e) => {
                    e.preventDefault(); // Evita que el enlace se active
    
                    // Crea el contenido del dropdown
                    const dropdownContent = `
                        <button class="dropdown-button">Saved Pins</button>
                        <button class="dropdown-button">Logout</button>
                    `;
    
                    // Muestra el dropdown
                    const dropdown = Dropdown(dropdownContent, image);
                    document.body.appendChild(dropdown);
    
                    // Eventos para los botones del dropdown
                    const savedButton = dropdown.querySelector(".dropdown-button:first-child");
                    const logoutButton = dropdown.querySelector(".dropdown-button:last-child");
    
                    savedButton.addEventListener("click", () => {
                        const data = getSavedPins();
                        clearGrid();
                
                        const grid = document.querySelector(".pin-grid")
                
                        for(const e of data) {
                            const pin = new Pin(e.value.id, 
                                                e.value.imageUrl,
                                                e.value.title,
                                                e.value.description,
                                                e.value.link,
                                                e.value.author,
                                                e.value.imageUrl,
                                                e.value.tags,
                                                e.value.likes,
                                                0,
                                                [],
                                                e.value.date,
                                                e.value.height,
                                                e.value.link,
                                                        );
                            
                            pin.printPin(grid);           
                    
                        }    
                        layoutMasonry();
                        console.log("Saved pins clicked");
                        dropdown.remove();
                    });
                
    
                    logoutButton.addEventListener("click", () => {
                        console.log("Logout clicked");
                        dropdown.remove();
                    });
                });

                break;
            case "Alerts":
                image.addEventListener("click", (e) => {
                    e.preventDefault(); // Evita que el enlace se active
    
                    // Crea el contenido del dropdown
                    const dropdownContent = `
                        <button class="dropdown-button">Show all</button>
                    `;
    
                    // Muestra el dropdown
                    const dropdown = Dropdown(dropdownContent, image);
                    document.body.appendChild(dropdown);
    
                    // Eventos para los botones del dropdown
                    const alertsButton = dropdown.querySelector(".dropdown-button:first-child");
    
                    alertsButton.addEventListener("click", () => {
                        //Añadir un popup que diga tienes X pins guardados y
                        //has dado like a x pins
                        console.log("Alerts clicked");
                        dropdown.remove();
                    });
                });

                break;
            case "Messages":
                image.addEventListener("click", (e) => {
                    e.preventDefault(); // Evita que el enlace se active
    
                    // Crea el contenido del dropdown
                    const dropdownContent = `
                        <button class="dropdown-button">Show all</button>
                    `;
    
                    // Muestra el dropdown
                    const dropdown = Dropdown(dropdownContent, image);
                    document.body.appendChild(dropdown);
    
                    // Eventos para los botones del dropdown
                    const messagesButton = dropdown.querySelector(".dropdown-button:first-child");
    
                    messagesButton.addEventListener("click", () => {
                        //Añadir un popup que diga tienes X mensages
                        console.log("Messages clicked");
                        dropdown.remove();
                    });
                });

                break;

        }
        // if (text === "Profile") {
        //     image.addEventListener("click", (e) => {
        //         e.preventDefault(); // Evita que el enlace se active

        //         // Crea el contenido del dropdown
        //         const dropdownContent = `
        //             <button class="dropdown-button">Settings</button>
        //             <button class="dropdown-button">Logout</button>
        //         `;

        //         // Muestra el dropdown
        //         const dropdown = Dropdown(dropdownContent, image);
        //         document.body.appendChild(dropdown);

        //         // Eventos para los botones del dropdown
        //         const settingsButton = dropdown.querySelector(".dropdown-button:first-child");
        //         const logoutButton = dropdown.querySelector(".dropdown-button:last-child");

        //         settingsButton.addEventListener("click", () => {
        //             console.log("Settings clicked");
        //             dropdown.remove();
        //         });

        //         logoutButton.addEventListener("click", () => {
        //             console.log("Logout clicked");
        //             dropdown.remove();
        //         });
        //     });
        // } else if(text === "Alerts")
        li.append(image);
    } else { li.append(a)}
    
    return li;


}