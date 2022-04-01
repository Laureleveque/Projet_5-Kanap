// envoi requête Get - Récupération des données de l'API

fetch("http://localhost:3000/api/products") 
  .then(function (res) {  // réponse à la requête
    if (res.ok) { // vérification déroulement de la requête
      
      return res.json(); // résultat de la requête au format JSON (Promise)
    }
  })
  .then(function (value) { // récupération JSON dans value ( tableau des produits)
    console.log(value); 


    //récupération des éléments du tableau et insertion de chaque élément dans la page d'accueil


    const section = document.getElementById("items"); // récupère la balise où afficher les produits

    for (let i = 0; i < value.length; i++) { // itération sur tous les produits du tableau

      const element = value[i]; // element = un produit [index dans le tableau]


      // création des éléments à insérer dans le DOM

      const lien = document.createElement("a"); 
      const article = document.createElement("article"); 
      const image = document.createElement("img"); 
      const titre = document.createElement("h3");
      const paragraphe = document.createElement("p");


      // modification des contenus

      lien.href = "./product.html?id=" + element._id; // modification de l'attribut href de la balise a

      image.src=element.imageUrl; // insère imageUrl dans l'attribut src de la balise image
      image.alt=element.altTxt; // modifie le contenu de alt

      titre.innerHTML=element.name; // modifie le contenu de h3

      paragraphe.innerHTML=element.description; // modifie le contenu de p


      // ajout des éléments en tant qu'enfant (pour les voir sur la page)

      lien.appendChild(article); 
      section.appendChild(lien);
      article.appendChild(image);     
      article.appendChild(titre);
      article.appendChild(paragraphe);
    }

    //  si code statut erroné
  }) 
  .catch(function (err) {
    console.error(err);
  }); 

  


