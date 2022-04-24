
                  // Affichage du tableau récapitulatif des achats



// récupération du panier (array) via localStorage (id,quantité,couleur)

const panier = getPanier();
console.log(panier);


// récupération de l'id "cart__items"

const items = document.getElementById("cart__items");


// initialisation de la variable totalPrix

let totalPrixPanier = 0;


// parcourir l'array panier

for (let i = 0; i < panier.length; i++) { 
  const produit = panier[i];


// Envoi de la requête spécifique à chaque id du panier (nom, image/alt et prix)

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
      article.setAttribute("data-id", produit.id); // provient du localStorage
      article.setAttribute("data-color", produit.couleur); // provient du localStorage
      items.appendChild(article);


      // création éléments et insertion image/alt

      const imageDiv = document.createElement("div");
      imageDiv.classList.add("cart__item__img");
      article.appendChild(imageDiv);

      const image = document.createElement("img");
      image.src = canape.imageUrl; // API
      image.alt = canape.altTxt; // API
      imageDiv.appendChild(image);


      // création éléments et insertion titre

      const contentDiv = document.createElement("div");
      contentDiv.classList.add("cart__item__content");
      article.appendChild(contentDiv);

      const descriptionDiv = document.createElement("div");
      descriptionDiv.classList.add("cart__item__content__description");
      contentDiv.appendChild(descriptionDiv);

      const titre = document.createElement("h2");
      titre.innerHTML = canape.name; // API
      descriptionDiv.appendChild(titre);


      // création élément et insertion couleur choisi par l'utilisateur

      const couleur = document.createElement("p");
      couleur.innerHTML = produit.couleur; // provient du localStorage
      descriptionDiv.appendChild(couleur);


      // création élément et insertion prix

      const prix = document.createElement("p");
      prix.innerHTML = canape.price + " €"; // API
      descriptionDiv.appendChild(prix);


      // création éléments et insertion saisie quantité par l'utilisateur

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
      saisie.setAttribute("value", produit.quantite); // localStorage
      quantiteDiv.appendChild(saisie);


                // Gestion quantité et prix 

      // total quantité

      const totalQuantite = document.getElementById("totalQuantity"); 
      totalQuantite.innerHTML = getTotalQuantite(); // fonction calcul quantité + insertion de la quantité totale

      
      // prix total
      
      const totalPrix = document.getElementById("totalPrice");          
      totalPrixPanier += produit.quantite*canape.price;
      totalPrix.innerHTML = totalPrixPanier; 

      
      
               // gestion de la suppression d'un produit --> MAJ de la quantité et du prix total

      const deleteDiv = document.createElement("div");
      deleteDiv.classList.add("cart__item__content__settings__delete");
      article.appendChild(deleteDiv);

      const suppression = document.createElement("p");
      suppression.classList.add("deleteItem");
      suppression.innerHTML = "Supprimer";
      article.appendChild(suppression);

      suppression.addEventListener("click", function (event) { // écoute événement "Supprimer" un article
        removeItem(produit); 
        items.removeChild(article); 
      
        totalQuantite.innerHTML = getTotalQuantite(); // mise à jour de la quantité
        
        totalPrixPanier -= produit.quantite*canape.price; // mise à jour du prix total
        totalPrix.innerHTML = totalPrixPanier;
      })


      // écoute événement "changer la quantité" --> MAJ de la quantité et du prix total
      
      let oldValue = parseInt(saisie.value); // on sauvegarde la valeur actuelle de la saisie (avant évènement)
      
      saisie.addEventListener("change", function (event) {
        changeQuantite(produit, saisie.value); // changement de la quantité dans le localStorage
        totalQuantite.innerHTML = getTotalQuantite(); // mise à jour de la quantité
      
        let newValue = parseInt(saisie.value); // valeur de la saisie après changement
        
        let totalPrixPanier = parseInt(totalPrix.innerHTML); // prix total avant changement
        
        if (newValue > oldValue) {
          totalPrixPanier += (newValue - oldValue) * canape.price; // on calcule le nouveau prix avec la nouvelle saisie
        
        } else {
          totalPrixPanier -= (oldValue - newValue) * canape.price; // on calcule le nouveau prix avec la nouvelle saisie
        }
        
        totalPrix.innerHTML = totalPrixPanier;
        
        oldValue = newValue; // mise à jour de la valeur actuelle de la saisie (avant le prochain évènement)
        })    
      })
  
      .catch(function (err) {
        console.error(err);
      });  
      }

  
              // gestion des données du formulaire


      const formulaire = document.getElementById("order");
      formulaire.addEventListener("click", function (event) { // écoute de l'événement saisie des données dans le formulaire

      event.preventDefault(); // annule l'envoi du formulaire par défaut afin de vérifier les champs


      //  saisie prénom

      const prenom = document.getElementById("firstName");
      const errPrenom = document.getElementById("firstNameErrorMsg");
    
      if (!prenom.value.match(/^([a-zA-Zéèêçâàùûôîï ]){2,20}$/)) {  // uniquement des lettres de l'alphabet pour le prénom et entre 2 et 20 caractères
   
        errPrenom.innerHTML = "Ce champ n'est pas au format requis";
  
      } else {

        errPrenom.innerHTML = ""; // pas de message erreur
      }


      // saisie nom

      const nom = document.getElementById("lastName");
      const errNom = document.getElementById("lastNameErrorMsg");
     
      if (!nom.value.match(/^([a-zA-Zéèêçâàùûôîï ]){2,20}$/)) { // uniquement des lettres de l'alphabet pour le nom et entre 2 et 20 caractères
    
        errNom.innerHTML = "Ce champ n'est pas au format requis ";
  
      } else {

        errNom.innerHTML = ""; // pas de message d'erreur
      }


      // saisie adresse

      const adresse = document.getElementById("address");
      const errAdresse = document.getElementById("addressErrorMsg");

      if (!adresse.value.match(/^([a-zA-Z0-9éèêçâàùûôîï ]){3,}$/)) { // lettres de l'alphabet / chiffres de 0 à 9 pour l'adresse et plus de 3 caractères
    
        errAdresse.innerHTML = "Ce champ n'est pas au format requis ";
  
      } else {

        errAdresse.innerHTML = ""; // pas de message d'erreur
      }


      // saisie ville

      const ville = document.getElementById("city");
      const errVille = document.getElementById("cityErrorMsg");

      if (!ville.value.match(/^([a-zA-Zéèêçâàùûôîï ]){2,20}$/)) { // uniquement des lettres de l'alphabet pour la ville et entre 2 et 20 caractères
    
        errVille.innerHTML = "Ce champ n'est pas au format requis ";
  
      } else {

        errVille.innerHTML = ""; // pas de message d'erreur
      }


      // saisie email

      const mail = document.getElementById("email");
      const errMail = document.getElementById("emailErrorMsg");
  
      if (!mail.value.match(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/ )) { // format spécifique pour l'email 
    
        errMail.innerHTML = "Veuillez saisir une adresse électronique valide";
      } 

      else {
    
        errMail.innerHTML = ""; // pas de message d'erreur
      }

      // si aucune erreur dans les champs de saisie

      if (
        (errPrenom.innerHTML == "") &&
        (errNom.innerHTML == "") &&
        (errAdresse.innerHTML == "") &&
        (errVille.innerHTML == "") &&
        (errMail.innerHTML == "")
  
      ){
  
      // alors création objet Contact

      let objetContact = { 

      firstName : document.getElementById("firstName").value,
      lastName : document.getElementById("lastName").value,
      address : document.getElementById("address").value,
      city : document.getElementById("city").value,
      email : document.getElementById("email").value 

      };

      // et création d'un tableau Produits
      
      const panier = getPanier();
      let tableauProduits = []; 

      for(const produit of panier) {
        tableauProduits.push(produit.id);
      }

    
         
      // création variable incluant l'objet contact et le tableau produit

      let objetPrincipal = { contact: objetContact, products: tableauProduits}

      // confirmation de la commande 
   
      const bouton = document.getElementsByClassName("cart__order__form__submit")[0];
      bouton.addEventListener("click", function (event) {
  

      // fonction envoi requête POST sur l’API et récupération de l’identifiant de commande dans la réponse

      send(objetPrincipal);
      });
      }
      });

    
      // fonction envoi de la requête POST + récupération de l'identifiant de commande

      function send(objetPrincipal) {

        fetch("http://localhost:3000/api/products/order", {

          method: "POST",
          headers: {
            "Accept":"application/json",
            "Content-Type": "application/json"
          },

          body: JSON.stringify(  // transformation objet contact et tableau produits en JSON

            objetPrincipal 

        )})

      .then(function (res) {
        if (res.ok) {
          return res.json();
        }
      })

      .then(function(reponse) {   // récupération de l'identifiant de commande sur la page confirmation

        // réinitialisation du panier
        savePanier([]);

        document.location.href = "../html/confirmation.html?id=" + reponse.orderId; // lien vers la page confirmation avec l'identifiant de commande
      })

      .catch(function (err) {
        console.error(err);
      })
      };
