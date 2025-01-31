

export const navLinks = ({path, text, img}) => {
    const li = document.createElement("li");
    const a = document.createElement("a");

    li.classList.add("navLink")
    a.href = path;
    a.textContent = text;
    a.classList.add(`${text}`)

    if(img != ""){
        const image = document.createElement("img");
        image.src = img;
        image.alt = text;
        image.classList.add(`${text}`)
        li.append(image);
    } else { li.append(a)}
    
    return li;


}