
                // Affichage du numéro de commande

// récupèration de l'id et insertion du numéro de commande

const url = new URL(window.location.href); // récupération de l'id du produit dans l'URL
const id = url.searchParams.get("id");

const message = document.getElementById("orderId");

message.innerHTML = id;




