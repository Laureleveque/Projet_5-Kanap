// fonction enregistrer le panier dans l'API localStorage

function savePanier(panier) {
  localStorage.setItem("panier", JSON.stringify(panier)); // sérialisation ( transformation objets en chaîne de caractère)
}

// fonction récupération de l'item "panier"

function getPanier() {
  let panier = localStorage.getItem("panier");

  // panier = [{id, quantite, couleur}];

  if (panier == null) {
    // si panier vide --> tableau vide
    return [];
  } else {
    return JSON.parse(panier); // // transforme la chaîne de caractère en tableau (objets)
  }
}

// fonction ajout d'un produit au panier

function addPanier(produit) {
  let panier = getPanier(); //récupération du panier dans le localStorage

  let foundProduit = panier.find(
    (p) => p.id == produit.id && p.couleur == produit.couleur
  ); // contrôle si produit existant dans le panier
  if (foundProduit != undefined && foundProduit.couleur == produit.couleur) {
    foundProduit.quantite += produit.quantite; // le produit existe dans le panier --> + la nouvelle quantité
  } else {
    panier.push(produit); // on ajoute le produit dans le panier
  }
  savePanier(panier); //on enregistre le nouveau panier
}

// fonction suppression d'un produit du panier

function removeItem(produit) {
  let panier = getPanier();
  panier = panier.filter((p) => p.id != produit.id); // on filtre le tableau et on conserve tous les produits différent de l'id à suppimer
  savePanier(panier);
}

// fonction gérer la quantité

function changeQuantite(produit, quantite) {
  let panier = getPanier();
  let foundProduit = panier.find((p) => p.id == produit.id); // contrôle si produit existant dans le panier
  if (foundProduit != undefined);
  {
    foundProduit.quantite = parseInt(quantite);
  }
  if (foundProduit.quantite <= 0) {
    // cas où la quantité est négative
    removeItem(foundProduit);
  } else {
    savePanier(panier);
  }
}

// fonction total quantité dans le panier

function getTotalProduit() {
  let panier = getPanier();
  let number = 0;
  for (let produit of panier) {
    number += produit.quantite;
  }
  return number;
}

// fonction calcul du prix

function getTotalPrix() {
  let panier = getPanier();
  let total = 0;
  for (let produit of panier) {
    total = produit.quantite * produit.prix;
  }
  return total;
}
