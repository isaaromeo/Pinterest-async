

export const Button = ({text, fnc}) => {

    const button = document.createElement("button");

    button.textContent = text;
    button.addEventListener("click", fnc);
}