
//! Récupérer les données de l'API

fetch("http://localhost:3000/api/products")
    .then((response) => response.json())
    .then((data) => displayProducts(data))
    // "Récupérer "data" et les transmettre (=>) à "displayProducts"



//! Créer les éléments HTML depuis le script JS
// NB : Le nom donné à l'argument "data" est sans importance.

function displayProducts(data) {
    const imageUrl = data[0].imageUrl

    const anchor = document.createElement("a")
    anchor.href = imageUrl
    anchor.text = "Test"
    const items = document.querySelector("#items")
    items.appendChild(anchor)
}



