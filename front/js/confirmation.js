/*Pour les routes POST, l’objet contact envoyé au serveur doit contenir les champs firstName,
lastName, address, city et email*/

// Envoi de la requête POST pour récupérer le numéro de commande

fetch("http://localhost:3000/api/products/order" + id)
  .then(function (res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function (num_commande) {
    console.log(num_commande);

    const message = document.getElementById("orderId");
    message.innerHTML = num_commande;
  })

  //  si code statut erroné

  .catch(function (err) {
    console.error(err);
  });
