

const orderId = getOrderId()
displayOrderId(orderId)
// cleanCache() 

function getOrderId() {
const urlParams = new URLSearchParams(location.search)
console.log("Numéro de commande :", urlParams.get("orderId"))
return urlParams.get("orderId")

// return new URL(window.location.href).searchParams.get('orderId')
}

function displayOrderId(orderId) {
    const orderIdElement = document.getElementById("orderId")
    orderIdElement.textContent = orderId
}

// function cleanCache() {
//     const cache = window.localStorage
//     cache.clear()
// }