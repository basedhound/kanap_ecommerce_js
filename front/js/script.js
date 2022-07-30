//! NOTE : Les console.log restants seront supprimés avant déploiement du site.
//! Ils servent ici à illustrer certaines opération lors de la présentation.
//! Il en va de même pour un certain nombre de commentaires exlicatifs.

//*------------------------------------------------------------------------
//* FETCH | Récupération et Transmission des données de l'API
//*------------------------------------------------------------------------ 
fetch("http://localhost:3000/api/products")
    // Obtention des données de l'API => conversion du résultat en .json
    .then((res) => res.json())
    // Les données sont transmises sous forme de paramètre : "products" [...]
    .then((products) => {
        // Affichage des données dans un tableau via la console
        console.table(products)
        // Appel de la fonction "hydrateProducts" + paramètre "products"
        hydrateProducts(products)
    })
    // Si ERREUR : Affichage via HTML + console
    .catch((err) => {
        document.querySelector(".titles").innerHTML = "<h1>erreur 404</h1>"
        console.error("[API] erreur 404 : " + err)
    })

//*----------------------------------------------------------------------
//* Affichage des Produits de l'API
//*----------------------------------------------------------------------
function hydrateProducts(products) {
    // Déclaration + Pointage de la <section> ayant pour id "#items"
    const productsArea = document.querySelector("#items")
    // Pour chaque indice "product" de "products" [...]
    for (const product of products) {
        // Création de : a>article>img+h3+p + ajout des valeurs dynamiques de l'API
        productsArea.innerHTML +=
            `<a href="./product.html?id=${product._id}">
      <article>
        <img src="${product.imageUrl}" alt="${product.altTxt}">
        <h3 class="productName">${product.name}</h3>
        <p class="productDescription">${product.description}</p>
      </article>
    </a>`
    }
}

// Exemple réponse de API "http://localhost:3000/api/products" :
// _id: "107fb5b75607497b96722bda5b504926"
// imageUrl: "http://localhost:3000/images/kanar01.jpeg"
// altTxt: "Canard mandarin"
// name: "Mandarin Duck"
// description: "Excepteur sint occaecat cupidatat non proident"