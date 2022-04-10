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

      // récupération de l'image

      const imageDiv = document.createElement("div");
      imageDiv.classList.add("cart__item__img");
      article.appendChild(imageDiv);

      const image = document.createElement("img");
      image.src = canape.imageUrl;
      image.alt = canape.altTxt;
      imageDiv.appendChild(image);

      // récupération titre, couleur et prix

      const contentDiv = document.createElement("div");
      contentDiv.classList.add("cart__item__content");
      article.appendChild(contentDiv);

      const descriptionDiv = document.createElement("div");
      descriptionDiv.classList.add("cart__item__content__description");
      contentDiv.appendChild(descriptionDiv);

      const titre = document.createElement("h2");
      titre.innerHTML = canape.name;
      descriptionDiv.appendChild(titre);

      const couleur = document.createElement("p");
      couleur.innerHTML = produit.couleur;
      descriptionDiv.appendChild(couleur);

      const prix = document.createElement("p");
      prix.innerHTML = canape.price + " €";
      descriptionDiv.appendChild(prix);

      // gestion de la quantité

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

      const suppression = document.createElement("p");
      suppression.classList.add("deleteItem");
      suppression.innerHTML = "Supprimer";
      article.appendChild(suppression);

      suppression.addEventListener("click", (event) => {
        removeItem(produit);
        items.removeChild(article);
      });
    })

    .catch(function (err) {
      console.error(err);
    });
}

// gestion total article(s) dans le panier

// gestion prix total
