          //  Insertion des produits de l'API dans la page d’accueil


                    // envoi requête GET - Récupération des données de l'API

fetch("http://localhost:3000/api/products")
  .then(function (res) { // réponse à la requête

    if (res.ok) { // vérification déroulement de la requête

      return res.json(); // résultat de la requête au format JSON (Promise)
    }
  })

  .then(function (tousLesCanapes) { // récupération JSON dans value ( tableau des produits)
    console.log(tousLesCanapes);


                 //récupération des éléments du tableau et insertion de chaque élément dans la page d'accueil

    const section = document.getElementById("items"); // recherche dans le document l'élément dont l'id est "items (récupère la balise où afficher les produits)

    for (let i = 0; i < tousLesCanapes.length; i++) {

      const canape = tousLesCanapes[i]; // canapé = un produit [index dans le tableau]


      // création des balises à l'intérieur de la balise section et stockage dans les const

      const lien = document.createElement("a");
      const article = document.createElement("article");
      const image = document.createElement("img");
      const titre = document.createElement("h3");
      const paragraphe = document.createElement("p");


      // insertion des contenus

      lien.href = "./product.html?id=" + canape._id; // modification de l'attribut href de la balise a

      image.src = canape.imageUrl; // insère imageUrl dans l'attribut src de la balise image
      image.alt = canape.altTxt; // insertion contenu de alt

      titre.innerHTML = canape.name; // insertion titre à l'intérieur de la balise h3
      titre.classList.add("productName");

      paragraphe.innerHTML = canape.description; // insertion texte à l'intérieur de la balise p
      paragraphe.classList.add("productDescription");



      // ajout des éléments en tant qu'enfant (pour les voir sur la page)

      lien.appendChild(article);
      section.appendChild(lien);
      article.appendChild(image);
      article.appendChild(titre);
      article.appendChild(paragraphe);
    }
  })

  
  //  si code statut erroné

  .catch(function (err) {
    console.error(err);
  });
