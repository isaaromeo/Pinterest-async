import { Header } from './components/Header/Header';
import { Body } from './components/Body/Body';
import { Create } from './layout/Create/Create';
import './main.scss'




// const app = document.querySelector('#app');
Header();
Body("Home");

const home = document.querySelector(".Home");
const explore = document.querySelector(".Explore");
const create = document.querySelector(".Create");

home.addEventListener("click", () => {
    Body("Home");
}
)

explore.addEventListener("click", () => {
    Body("Explore");
}
)

create.addEventListener("click", () => {
    Create();
}
)
