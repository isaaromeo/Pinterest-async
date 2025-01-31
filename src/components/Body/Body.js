import { Pin } from "../Pin/Pin";
import { layoutMasonry } from "../Pin/Pin";
import { request } from "../searchRequest";
const apiKey = import.meta.env.VITE_UNSPLASH_CLIENT_ID;

 export const Body = (option = "Home") => { //option = "Home"
    console.log("Entering Body()...");

    const app = document.querySelector("#app");

    const main = document.createElement("div");
    main.classList.add("main")
    app.append(main);

    const pinGrid = document.createElement("div");
    pinGrid.classList.add("pin-grid");
    main.append(pinGrid);

    const input = document.querySelector(".search-input");

    let query;

    if(option === "Home") {
        query = input.value || "random";
    } else {query = "crystal"}
    

    getPinData(query);

    window.addEventListener('load', () => {
        console.log("load");
        console.log("1")
        setTimeout(() => {
                layoutMasonry();
        },2000);
        layoutMasonry();
});
    window.addEventListener('resize', () => {
        console.log("resize");
        layoutMasonry();
});

    input.addEventListener("change", async () => {
        clearGrid();
        getPinData(input.value);
        console.log("1")
        setTimeout(() => {
                layoutMasonry();
        },2000);
        console.log("2")
        
    
})
}

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
        const pinData = await request(query);
        console.log("hola", pinData)
        const Pins = printBody(pinData);
        console.log(Pins)
        sessionStorage.setItem("pinInfo", JSON.stringify(Pins));
        
    } catch (error) {
        console.log("data could not be retrieved")
    }
    
    
}

export const clearGrid = () => {
    console.log("Entering clearGrid...");

    const grid = document.querySelector(".pin-grid");
    grid.textContent = "";
}