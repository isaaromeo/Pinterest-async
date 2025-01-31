import { Pin } from "./Pin/Pin";
import { layoutMasonry } from "./Pin/Pin";
const apiKey = import.meta.env.VITE_UNSPLASH_CLIENT_ID;


// src/components/searchRequest.js
export const request = async (query) => {
    console.log("Entering request...");

    try {
        const res = await fetch(
            `https://api.unsplash.com/search/photos?query=${query}&per_page=30&client_id=${apiKey}`
        );

        console.log("Response status:", res.status); // Depuración
        console.log("Response headers:", res.headers); // Depuración

        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        console.log("Request data:", data); // Depuración
        return data;
    } catch (error) {
        console.error("Error in request:", error); // Depuración
        throw error;
    }
};