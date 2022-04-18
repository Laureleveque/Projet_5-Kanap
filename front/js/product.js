
            // Faire le lien entre un produit de la page d’accueil et la page Produit


// récupération de l'id du produit dans l'URL

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


                  // Insertion d'un produit et de ses détails 

    // création de l'élément image et insertion image+alt

    const divImage = document.getElementsByClassName("item__img")[0];

    const image = document.createElement("img");

    image.src = canape.imageUrl;
    image.alt = canape.altTxt;

    divImage.appendChild(image);


    // récupération de l'élément titre et insertion contenu

    const titre = document.getElementById("title");
    titre.innerHTML = canape.name;


    // récupération de l'élément prix et insertion contenu

    const prix = document.getElementById("price");
    prix.innerHTML = canape.price;


    // récupération de l'élément description et insertion contenu

    const paragraphe = document.getElementById("description");
    paragraphe.innerHTML = canape.description;


    // choix de la couleur pour chaque canapé

    const couleurs = document.getElementById("colors");

    for (let i = 0; i < canape.colors.length; i++) { // itération sur chaque couleur présente dans le tableau
     
      const couleur = canape.colors[i];

      const choix = document.createElement("option");
      choix.innerHTML = couleur;
      choix.value = couleur;
      couleurs.appendChild(choix);
    }


                  // Ajout des produits dans le panier


    // écoute de l'événement click "Ajouter au Panier"

    const bouton = document.getElementById("addToCart");
    bouton.addEventListener("click", function (event) {
      const quantite = parseInt(document.getElementById("quantity").value); // récupération de la quantité saisie
      const couleur = document.getElementById("colors").value; // récupération de la couleur choisie
      const parent = document.getElementsByClassName("item__content")[0];

      if (couleur != "") { // si la couleur est choisie --> ajout au panier de l'id, la quantité et la couleur
        addPanier({ id: id, quantite: quantite, couleur: couleur });
        document.location.href = "../html/cart.html"; //lien vers page cart.html
      
      } else if (parent.children.length == 4) { // sinon message de rappel de choisir une couleur
        const message = document.createElement("p");
        message.innerHTML = "Veuillez choisir une couleur";
        message.style.color = "red";
        parent.appendChild(message);
      }
    });
  })

  //  si code statut erroné

  .catch(function (err) {
    console.error(err);
  });
