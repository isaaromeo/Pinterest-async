import { Pin } from "../Pin/Pin";
import { layoutMasonry } from "../Pin/Pin";
import { request } from "../searchRequest";
import { store } from "../../store";

const apiKey = import.meta.env.VITE_UNSPLASH_CLIENT_ID;

// export const Body = async (option = "Home") => {
//     console.log("Entering Body() with option:", option); // Depuración

//     const app = document.querySelector("#app");

//     // Limpia el contenido anterior
//     const main = document.createElement("div");
//     main.classList.add("main");
//      // Limpia el contenido anterior
//     app.append(main);

//     const pinGrid = document.createElement("div");
//     pinGrid.classList.add("pin-grid");
//     main.append(pinGrid);

//     const input = document.querySelector(".search-input");

//     let query;

//     if (option === "Home") {
//         query = input.value || "random";
//     } else {
//         query = "crystal";
//     }

//     console.log("Query:", query); // Depuración

//     try {
//         await getPinData(query); // Espera a que se complete la solicitud
//     } catch (error) {
//         console.error("Error in Body:", error); // Depuración
//     }

//     // Configura los event listeners después de que se complete la solicitud
//     window.addEventListener("load", () => {
//         console.log("load");
//         setTimeout(() => {
//             layoutMasonry();
//         }, 2000);
//         layoutMasonry();
//     });

//     window.addEventListener("resize", () => {
//         console.log("resize");
//         layoutMasonry();
//     });

//     input.addEventListener("change", async () => {
//         clearGrid();
//         await getPinData(input.value); // Espera a que se complete la solicitud
//         setTimeout(() => {
//             layoutMasonry();
//         }, 2000);
//     });
// };

export const Body = () => {
    const app = document.querySelector("#app");

    const main = document.createElement("div");
    main.classList.add("main");
    app.append(main);

    const pinGrid = document.createElement("div");
    pinGrid.classList.add("pin-grid");
    main.append(pinGrid);

    const input = document.querySelector(".search-input");

    // Usa el estado global para obtener el query
    const query = store.state.query;

    console.log("Query:", query); // Depuración

    // Obtiene los datos de los pines
    getPinData(query);

    // Configura los event listeners

     window.addEventListener("load", () => {
         console.log("load");
         setTimeout(() => {
             layoutMasonry();
         }, 2000);
         layoutMasonry();
     });

     window.addEventListener("resize", () => {
         console.log("resize");
         layoutMasonry();
     });
     
    input.addEventListener("change", async () => {
        clearGrid();
        await getPinData(input.value);
        setTimeout(() => {
            layoutMasonry();
        }, 2000);
    });
};

export const printBody = (data) => {
    console.log("Entering printBody()...");
    const grid = document.querySelector(".pin-grid")
    
    const PinArray = new Array;//
    
    console.log(data)
    
    for(const result of data.results) {

        const pin = new Pin(result.id, 
                            result.urls.regular,
                            result.alt_description,
                            result.description,
                            result.links.download,
                            result.user.username,
                            result.user.profile_image.small,
                            result.slug,
                            result.likes,
                            0,
                            [],
                            result.updated_at,
                            result.height
                            );
        pin.printPin(grid);
        PinArray.push(pin);//
        
       

    }

    // printPinLayout(grid, PinArray);
    console.log(grid)
    return PinArray;
    
}

export const getPinData = async (query) => {
    console.log("Entering getPinData...");
    
    try {
        console.log(query)
        const pinData = await request(query);
        console.log("hola", pinData)
        const Pins = printBody(pinData);
        console.log(Pins)
        sessionStorage.setItem("pinInfo", JSON.stringify(Pins));
        setTimeout(() => {
            layoutMasonry();
        }, 2000);
        layoutMasonry()
        
    } catch (error) {
        console.log("data could not be retrieved")
    }
    
    
}

export const clearGrid = () => {
    console.log("Entering clearGrid...");

    const grid = document.querySelector(".pin-grid");
    grid.textContent = "";
}