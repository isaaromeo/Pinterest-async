
export class Pin {
    constructor(
      id,
      imageUrl,
      title,
      description,
      link,
      author,
      authorPP,
      tags = [],
      likes = 0,
      saves = 0,
      comments = [],
      date,
      height,
    ) {
      this.id = id;
      this.imageUrl = imageUrl;
      this.title = title;
      this.description = description;
      this.link = link;
      this.author = author;
      this.authorPP = authorPP;
      this.tags = tags;
      this.likes = likes;
      this.saves = saves;
      this.comments = comments;
      this.date = date;
      this.height = height;
    }
  
    like() {
      this.likes++;
    }
  
    unlike() {
      if (this.likes > 0) {
        this.likes--;
      }
    }
  
    save() {
      this.saves++;
    }
  
    unsave() {
      if (this.saves > 0) {
        this.saves--;
      }
    }
  
    addComment(comment) {
      this.comments.push(comment);
    }
  
    removeComment(commentId) {
      this.comments = this.comments.filter((comment) => comment.id !== commentId);
    }
  
    addTag(tag) {
      if (!this.tags.includes(tag)) {
        this.tags.push(tag);
      }
    }
  
    removeTag(tag) {
      this.tags = this.tags.filter((t) => t !== tag);
    }
  
    getDetails() {
      return {
        id: this.id,
        imageUrl: this.imageUrl,
        title: this.title,
        description: this.description,
        link: this.link,
        author: this.author,
        tags: this.tags,
        likes: this.likes,
        saves: this.saves,
        comments: this.comments,
        createdAt: this.createdAt,
      };
    }
  
    updateDetails({ title, description, link }) {
      if (title) this.title = title;
      if (description) this.description = description;
      if (link) this.link = link;
    }

    getPinHeight() {
        return this.height + 64;
    }

   printPin(location) {
     console.log("Entering PrintPin()...");

       const div = document.createElement("div");
       div.classList.add("pin");
       div.setAttribute("id", `${this.id}`);

      const imgContainer = document.createElement("div");//
      imgContainer.classList.add("pin-image-container"); //

       const img = document.createElement("img");
       img.classList.add("pin-image");
       img.src = this.imageUrl;
       img.alt = this.description;

       const saveButton = document.createElement("button");//
       saveButton.classList.add("pin-save-button");//
       saveButton.textContent = "Save";//
       saveButton.addEventListener("click", () =>{
        const parent = saveButton.parentElement;
        const grandparent = parent.parentElement;
        savePin(grandparent.id);

       })

      imgContainer.append(img, saveButton)

       const divContent = document.createElement("div");
       divContent.classList.add("pin-content");

       const title = document.createElement("h3");
       title.classList.add("pin-title");
       title.textContent = this.title;

      const divAuthor = document.createElement("div");
      divAuthor.classList.add("pin-author-container");

       const authorPP = document.createElement("img");
       authorPP.classList.add("pin-author-img");
       authorPP.src = this.authorPP;

       const author = document.createElement("p");
       author.classList.add("pin-author");
       author.textContent = this.author;

       divContent.append(authorPP, author);
       div.append(imgContainer, divContent);
       location.append(div);

    //  modificar altura pin 
       let pinHeight = this.height;
       document.documentElement.style.setProperty('$pin-height', `${pinHeight}`)





   }

  
}
    
  // }

   export function layoutMasonry() {
     console.log("Entering layoutMasonry...");

     const grid = document.querySelector('.pin-grid');
     const items = document.querySelectorAll('.pin');
     const gap = 16;  //Espacio entre elementos
     const minColumnWidth = 200; // Ancho mínimo de cada columna

      // Calcula el número de columnas en función del ancho de la ventana
     const containerWidth = grid.clientWidth;
     const columns = Math.floor(containerWidth / minColumnWidth);
     const columnWidth = (containerWidth - (gap * (columns - 1))) / columns;

      // Inicializa un array para rastrear la altura de cada columna
     const columnHeights = new Array(columns).fill(0);

      // Posiciona cada elemento en la columna más corta
     items.forEach(item => {
         const minHeight = Math.min(...columnHeights); // Encuentra la columna más corta
         const columnIndex = columnHeights.indexOf(minHeight);

          // Posiciona el elemento
         item.style.left = `${columnIndex * (columnWidth + gap)}px`;
         item.style.top = `${minHeight}px`;
         item.style.width = `${columnWidth}px`; // Asegura que el ancho sea correcto

          // Actualiza la altura de la columna
          columnHeights[columnIndex] += item.offsetHeight + gap;
     });

      // Ajusta la altura del contenedor
     grid.style.height = `${Math.max(...columnHeights)}px`;
 }

export function savePin(PinId) {
  console.log("Saving pin..")
  const Pins =JSON.parse(sessionStorage.getItem("pinInfo"));
  console.log(Pins)

  for(const pin of Pins){
    if(pin.id == PinId){
      localStorage.setItem(`Pin ${PinId}`, JSON.stringify(pin));
    }
  }
  
  
}

export function getSavedPins() {
  const data = Object.entries(localStorage).map(([key, value]) =>({
    key,
    value: JSON.parse(value)

  }))

  console.log(data)
  
  
}