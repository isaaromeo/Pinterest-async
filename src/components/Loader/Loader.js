export const Loader = () => {
    const loader = document.createElement("div");
    loader.classList.add("loader");
    loader.innerHTML = `
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
        <p>Loading...</p>
    `;
    return loader;
};