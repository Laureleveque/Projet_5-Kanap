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

    const divImage = document.getElementsByClassName("item__img")[0]; //récupération de la div de l'image

    const image = document.createElement("img");

    image.src = canape.imageUrl; // insère imageUrl dans l'attribut src de la balise image
    image.alt = canape.altTxt; // modifie le contenu de alt

    divImage.appendChild(image); // insertion de l'image

    // récupération de l'élément titre et insertion contenu

    const titre = document.getElementById("title");
    titre.innerHTML = canape.name;

    // récupération de l'élément prix et insertion contenu

    const prix = document.getElementById("price");
    prix.innerHTML = canape.price;

    // récupération de l'élément description et insertion contenu

    const paragraphe = document.getElementById("description");
    paragraphe.innerHTML = canape.description;

    // choix des couleurs pour chaque canapé

    const couleurs = document.getElementById("colors"); // récupération de l'élément de sélection de couleur

    for (let i = 0; i < canape.colors.length; i++) {
      // itération sur chaque couleur présente dans le tableau
      const couleur = canape.colors[i];

      const choix = document.createElement("option"); // création de l'élément option (autant d'options que de couleurs)
      choix.innerHTML = couleur; // insertion de la couleur
      choix.value = couleur;
      couleurs.appendChild(choix);
    }

    //  si code statut erroné
  })
  .catch(function (err) {
    console.error(err);
  });
