import { getSavedPins, Pin } from "../Pin/Pin";
import { layoutMasonry } from "../Pin/Pin";
import { request } from "../searchRequest";
import { store } from "../../store";
import { Loader } from "../Loader/Loader";

const apiKey = import.meta.env.VITE_UNSPLASH_CLIENT_ID;

export const Body = () => {
    const app = document.querySelector("#app");

    const main = document.createElement("div");
    main.classList.add("main");
    app.append(main);

    const pinGrid = document.createElement("div");
    pinGrid.classList.add("pin-grid");
    main.append(pinGrid);

    const input = document.querySelector(".search-input");

    // Mostrar el loader
    const loader = Loader();
    app.append(loader);

    // Usa el estado global para obtener el query
    const query = store.state.query;

    console.log("Query:", query); // Depuración

    // Obtiene los datos de los pines
    // getPinData(query);

    getPinData(query).finally(() => {
        // Ocultar el loader después de que las imágenes se hayan cargado
        app.removeChild(loader);
    });

    // Configura el Intersection Observer
    // const observerTarget = document.createElement("div");
    // observerTarget.id = "observer-target";
    // document.body.append(observerTarget);

    // const observer = new IntersectionObserver(
    //     (entries) => {
    //         entries.forEach((entry) => {
    //             if (entry.isIntersecting) {
    //                 loadMoreImages();
    //             }
    //         });
    //     },
    //     { threshold: 1.0 }
    // );

    // observer.observe(observerTarget);   

    // Configura los event listeners

     window.addEventListener("load", () => {
         console.log("load");
         setTimeout(() => {
            console.log("layout 1")
             layoutMasonry();
         }, 2000);
         console.log("layout 2")
         layoutMasonry();
     });

     window.addEventListener("resize", () => {
        console.log("layout 3")
         layoutMasonry();
     });

    input.addEventListener("change", async () => {
        clearGrid();

        // Mostrar el loader
        const loader = Loader();
        app.append(loader);
        console.log("antes del timeout")
        await getPinData(input.value);
        setTimeout(() => {
            console.log("layout 4")
            layoutMasonry()
            app.replaceChild(loader)
            
        }, 2000);
        console.log("despues del timeout")
        store.setState({ currentPage: "Search", query: `${input.value}` });

        // Ocultar el loader después de que las imágenes se hayan cargado
        
    });

    window.addEventListener("scroll", () => {
        const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    
        // Verifica si el usuario ha llegado al final de la página
        if (scrollTop + clientHeight >= scrollHeight - 10) { // Margen de 10px
            loadMoreImages();
        }
        setTimeout(() => {
            console.log("layout 5")
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
                            result.height,
                            result.urls.small_s3,
                            );
        console.log(pin)                    
        pin.printPin(grid);
        PinArray.push(pin);//
        
       

    }

    // printPinLayout(grid, PinArray);
    console.log(grid)
    return PinArray;
    
}

export const getPinData = async (query) => {
    console.log("Entering getPinData...");

    // Mostrar el loader
    const loader = Loader();
    app.append(loader);    
    
    try {
        console.log(query)
        const pinData = await request(query);
        console.log("pin data: ", pinData)
        const Pins = printBody(pinData);
        console.log("Pins:",  Pins);
        sessionStorage.setItem("pinInfo", JSON.stringify(Pins));
        setTimeout(() => {
            console.log("layout 6")
            layoutMasonry();
            app.removeChild(loader)
        }, 2000);
        console.log("layout 7")
        layoutMasonry()
        
    } catch (error) {
        console.log("Error in getPinData: ", error)
    }
    
    
}

export const clearGrid = () => {
    console.log("Entering clearGrid...");

    const grid = document.querySelector(".pin-grid");
    grid.textContent = "";
}

let currentPage = 1; // Rastrea la página actual
let isLoading = false; // Bandera para evitar cargas duplicadas

const loadMoreImages = async () => {
    if (isLoading) return; // Evita cargas duplicadas
    isLoading = true;

    const input = document.querySelector(".search-input");
    currentPage++; // Incrementa el número de página
    const query = store.state.query; // Obtén el query actual

    // Mostrar el loader
    const loader = Loader();
    app.append(loader);   

    try {
        const pinData = await request(query, currentPage); // Pasa la página actual a la función request
        const Pins = printBody(pinData); // Agrega las nuevas imágenes al DOM
        console.log("Pins cargados:", Pins);
    } catch (error) {
        console.error("Error al cargar más imágenes:", error);
    } finally {
        isLoading = false; // Restablece la bandera
        app.removeChild(loader);
    }
};