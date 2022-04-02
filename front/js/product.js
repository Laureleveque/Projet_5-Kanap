
// récupération du paramètre id de l'URL

const url = new URL( window.location.href );
const id = url.searchParams.get("id");
console.log(id);


// Envoi de la requête spécifique à chaque id

fetch("http://localhost:3000/api/products/"+id) 
 .then(function (res) { 
    if (res.ok) { 
 
        return res.json(); 
 }
 })
 .then(function (value) { 
 console.log(value); 


//  si code statut erroné
}) 
.catch(function (err) {
  console.error(err);
}); 