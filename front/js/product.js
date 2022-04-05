// récupération du paramètre id de l'URL

const url = new URL(window.location.href);
const id = url.searchParams.get("id");
console.log(id);

// Envoi de la requête spécifique à chaque id

fetch("http://localhost:3000/api/products/" + id)
  .then(function (res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function (canape) {
    console.log(canape);

    // création de l'élément image
    const image = document.createElement("img");
    image.src = canape.imageUrl; // insère imageUrl dans l'attribut src de la balise image
    image.alt = canape.altTxt; // modifie le contenu de alt

    //récupération de la div de l'image
    const divImage = document.getElementsByClassName("item__img")[0];

    // insertion de l'image
    divImage.appendChild(image);

    // récupération de l'élément titre
    const titre = document.getElementById("title");
    titre.innerHTML = canape.name;

    // récupération de l'élément prix
    const prix = document.getElementById("price");
    prix.innerHTML = canape.price;

    // récupération de l'élément description
    const paragraphe = document.getElementById("description");
    paragraphe.innerHTML = canape.description;

    // récupération de l'élément de sélection de couleur
    const couleurs = document.getElementById("colors");

    //  si code statut erroné
  })
  .catch(function (err) {
    console.error(err);
  });
