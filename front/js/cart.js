// récupération du panier

const panier = getPanier();
console.log(panier);

// récupération de l'id "cart__items"

const items = document.getElementById("cart__items");

for (let i = 0; i < panier.length; i++) {
  const produit = panier[i];

  fetch("http://localhost:3000/api/products/" + produit.id)
    .then(function (res) {
      if (res.ok) {
        return res.json();
      }
    })
    .then(function (canape) {
      // création de l'élément article

      const article = document.createElement("article");
      article.classList.add("cart__item");
      article.setAttribute("data-id", produit.id);
      article.setAttribute("data-color", produit.couleur);
      items.appendChild(article);

      // création élément et insertion image/alt

      const imageDiv = document.createElement("div");
      imageDiv.classList.add("cart__item__img");
      article.appendChild(imageDiv);

      const image = document.createElement("img");
      image.src = canape.imageUrl;
      image.alt = canape.altTxt;
      imageDiv.appendChild(image);

      // création éléments et insertion titre

      const contentDiv = document.createElement("div");
      contentDiv.classList.add("cart__item__content");
      article.appendChild(contentDiv);

      const descriptionDiv = document.createElement("div");
      descriptionDiv.classList.add("cart__item__content__description");
      contentDiv.appendChild(descriptionDiv);

      const titre = document.createElement("h2");
      titre.innerHTML = canape.name;
      descriptionDiv.appendChild(titre);

      // création élément et insertion couleur

      const couleur = document.createElement("p");
      couleur.innerHTML = produit.couleur;
      descriptionDiv.appendChild(couleur);

      // création élément et insertion prix

      const prix = document.createElement("p");
      prix.innerHTML = canape.price + " €";
      descriptionDiv.appendChild(prix);

      // création éléments et saisie quantité par l'utilisateur

      const settingsDiv = document.createElement("div");
      settingsDiv.classList.add("cart__item__content__settings");
      contentDiv.appendChild(settingsDiv);

      const quantiteDiv = document.createElement("div");
      quantiteDiv.classList.add("cart__item__content__settings__quantity");
      settingsDiv.appendChild(quantiteDiv);

      const quantite = document.createElement("p");
      quantiteDiv.appendChild(quantite);
      quantite.innerHTML = "Qté : ";

      const saisie = document.createElement("input");
      saisie.setAttribute("type", "number");
      saisie.classList.add("itemQuantity");
      saisie.setAttribute("name", "itemQuantity");
      saisie.setAttribute("min", 1);
      saisie.setAttribute("max", 100);
      saisie.setAttribute("value", produit.quantite);
      quantiteDiv.appendChild(saisie);

      // gestion de la suppression d'un produit

      const deleteDiv = document.createElement("div");
      deleteDiv.classList.add("cart__item__content__settings__delete");
      article.appendChild(deleteDiv);

      const suppression = document.createElement("p");
      suppression.classList.add("deleteItem");
      suppression.innerHTML = "Supprimer";
      article.appendChild(suppression);

      suppression.addEventListener("click", function (event) {
        removeItem(produit);
        items.removeChild(article);
        totalQuantite.innerHTML = getTotalQuantite();
      });

      // gestion total quantité

      const totalQuantite = document.getElementById("totalQuantity");
      totalQuantite.innerHTML = getTotalQuantite();


      // gestion prix total

      const totalPrix = document.getElementById("totalPrice");
      
      function getTotalPrix() {
        let panier = getPanier();
        let total = 0;
          for (let produit of panier) {
          total += produit.quantite * produit.prix;
        }
        return total;
      }
      totalPrix.innerHtml = getTotalPrix;

      

      // écoute événement changement de la quantité --> changement prix

      saisie.addEventListener("change", function (event) {
        changeQuantite(produit, saisie.value);

        totalQuantite.innerHTML = getTotalQuantite(); // mise à jour de la quantité
        totalPrix.innerHtml = getTotalPrix(); // mise à jour du prix
      });
    })

    .catch(function (err) {
      console.error(err);
    });
}

const totalQuantite = document.getElementById("totalQuantity");
totalQuantite.innerHTML = getTotalQuantite(); // mise à jour de la quantité




// gestion des données du formulaire

const formulaire = document.getElementById("order");
formulaire.addEventListener("click", function (event) {
  // écoute de l'événement saisie des données dans le formulaire

  event.preventDefault(); // annule l'envoi du formulaire par défaut


  //  saisie prénom

  const prenom = document.getElementById("firstName");
  const errPrenom = document.getElementById("firstNameErrorMsg");

  if (!prenom.value.match(/^([a-zA-Zéèêçâàùûôîï ]){2,20}$/)) {
    // erreur saisie prénom
    errPrenom.innerHTML = "Ce champ n'est pas au format requis";
  } else {
    errPrenom.innerHTML = ""; // pas de message erreur
  }


  // saisie nom

  const nom = document.getElementById("lastName");
  const errNom = document.getElementById("lastNameErrorMsg");

  if (!nom.value.match(/^([a-zA-Zéèêçâàùûôîï ]){2,}$/)) {
    // erreur saisie nom
    errNom.innerHTML = "Ce champ n'est pas au format requis ";
  } else {
    errNom.innerHTML = "";
  }


  // saisie adresse

  const adresse = document.getElementById("address");
  const errAdresse = document.getElementById("addressErrorMsg");

  if (!adresse.value.match(/^([a-zA-Z0-9éèêçâàùûôîï ]){3,}$/)) {
    // erreur saisie adresse
    errAdresse.innerHTML = "Ce champ n'est pas au format requis ";
  } else {
    errAdresse.innerHTML = "";
  }


  // saisie ville

  const ville = document.getElementById("city");
  const errVille = document.getElementById("cityErrorMsg");

  if (!ville.value.match(/^([a-zA-Zéèêçâàùûôîï ]){2,}$/)) {
    // erreur saisie ville
    errVille.innerHTML = "Ce champ n'est pas au format requis ";
  } else {
    errVille.innerHTML = "";
  }


  // saisie email

  const mail = document.getElementById("email");
  const errMail = document.getElementById("emailErrorMsg");

  if (
    !mail.value.match(
      /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/
    )
  ) {
    // erreur saisie email
    errMail.innerHTML = "Veuillez saisir une adresse électronique valide";
  } else {
    errMail.innerHTML = "";
  }

  if (
    (errPrenom.innerHTML == "") &&
    (errNom.innerHTML == "") &&
    (errAdresse.innerHTML == "") &&
    (errVille.innerHTML == "") &&
    (errMail.innerHTML == "")
  ) {

    
    // confirmation de la commande
   
    const bouton = document.getElementsByClassName(
      "cart__order__form__submit"
    )[0];
    bouton.addEventListener("click", function (event) {
     
      document.location.href = "../html/confirmation.html"; // lien vers la page confirmation
      
    });
  }
});

