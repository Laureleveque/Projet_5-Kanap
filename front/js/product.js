
// récupération du paramètre id de l'URL

const url = new URL( window.location.href );
const id = url.searchParams.get("id");
console.log(id);


// Envoi de la requête spécifique à chaque id

fetch("http://localhost:3000/api/products/" + id) 
 .then(function (res) { 
    if (res.ok) { 
 
        return res.json(); 
 }
 })
 .then(function (value) { 
 console.log(value); 


// récupération de l'image
const photo= document.getElementsByClassName("item__img");


// récupération de l'élément titre   
const titre= document.getElementById("title");
titre.innerHTML= value.name;


// récupération de l'élément prix 
const prix=document.getElementById("price");
prix.innerHTML= value.price;


// récupération de l'élément description 
const paragraphe=document.getElementById("description");
paragraphe.innerHTML=value.description;


// choix de la couleur



// choix de la quantité



//  si code statut erroné
}) 
.catch(function (err) {
  console.error(err);
}); 