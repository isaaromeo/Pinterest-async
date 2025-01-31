import { Pin } from "./Pin/Pin";
import { layoutMasonry } from "./Pin/Pin";
const apiKey = import.meta.env.VITE_UNSPLASH_CLIENT_ID;


export const request = async (query) => {
    console.log("Entering request...");
    
    const res = await fetch(`https://api.unsplash.com/search/photos?query=${query}&per_page=30&client_id=${apiKey}`);
    const data = await res.json();
    
    console.log(data)
    return data;
    
    
}