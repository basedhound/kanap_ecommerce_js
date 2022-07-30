//! NOTE : Les console.log restants seront supprimés avant déploiement du site.
//! Ils servent ici à illustrer certaines opération lors de la présentation.
//! Il en va de même pour un certain nombre de commentaires exlicatifs.

//*--------------------------------------------------------------
//* MAIN | Variables / Constantes / Appels de Fonctions
//*--------------------------------------------------------------
const orderId = getOrderId()
displayOrderId(orderId)
cleanCache() 

//*--------------------------------------------------------------
//* Récupération du Numéro de Commande
//*--------------------------------------------------------------
function getOrderId() {
const urlParams = new URLSearchParams(location.search)
return urlParams.get("orderId")
// return new URL(window.location.href).searchParams.get('orderId')
}

//*--------------------------------------------------------------
//* Affichge du Numéro de Commande 
//*--------------------------------------------------------------
function displayOrderId(orderId) {
    const orderIdElement = document.getElementById("orderId")
    orderIdElement.textContent = orderId
}

//*--------------------------------------------------------------
//* Suppression du Panier 
//*--------------------------------------------------------------
function cleanCache() {
    const cache = window.localStorage
    cache.clear()
}

