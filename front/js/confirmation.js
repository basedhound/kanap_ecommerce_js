//*--------------------------------------------------------------
//* MAIN | Variables / Constantes / Appels de Fonctions
//*--------------------------------------------------------------
const orderId = getOrderId()
displayOrderId(orderId)
// cleanCache() 

//*--------------------------------------------------------------
//* Récupération du Numéro de Commande
//*--------------------------------------------------------------
function getOrderId() {
const urlParams = new URLSearchParams(location.search)
console.log("Numéro de commande :", urlParams.get("orderId"))
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
// function cleanCache() {
//     const cache = window.localStorage
//     cache.clear()
// }