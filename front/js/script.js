// Exemple réponse API "Product" :
// _id: "107fb5b75607497b96722bda5b504926"
// imageUrl: "http://localhost:3000/images/kanar01.jpeg"
// altTxt: "Canard mandarin"
// name: "Mandarin Duck"
// description: "Excepteur sint occaecat cupidatat non proident"

//*------------------------------------------------------------------------
//* Récupération des produits de l'API
//*------------------------------------------------------------------------ 
fetch("http://localhost:3000/api/products")
    // Récupérer les données de l'API, convertir le résultat en .json
    .then((res) => res.json())
    // Les informations reçues, traitées en .json, sont nommées "products"
    .then((products) => {
        // Console : Afficher les informations récupérées dans un tableau
        console.table(products);
        // Appeler la fonction "hydrateProducts", lui transmettre les informations (products)
        hydrateProducts(products);
    })
    // Si ERREUR : Remplacer titre par un h1 "erreur 404" et renvoit en console l'erreur.
    .catch((err) => {
        document.querySelector(".titles").innerHTML = "<h1>erreur 404</h1>";
        console.error("API - erreur 404 : " + err);
    });

//*----------------------------------------------------------------------
//* Affichage des Produits (Méthode 1 : innerHTML)
//*----------------------------------------------------------------------
function hydrateProducts(products) {
    // Variable qui sélectionne la <section> "#items" contenant les futurs <article>
    const sectionItems = document.querySelector("#items");
    // Pour chaque indice (product) de "products" ... ->
    for (const product of products) {    
    // : Création de : a.>article>img+h3+p + valeurs dynamiques
      sectionItems.innerHTML += `<a href="./product.html?id=${product._id}">
      <article>
        <img src="${product.imageUrl}" alt="${product.altTxt}">
        <h3 class="productName">${product.name}</h3>
        <p class="productDescription">${product.description}</p>
      </article>
    </a>`;
    }
}

//*----------------------------------------------------------------------
//* Affichage des Produits (Méthode 2 : createElement)
//*----------------------------------------------------------------------
// function hydrateProducts(products) {
//     // Pour chaque indice (product) de "products" ... ->
//     products.forEach((product) => {
//         // On déclare des variables appelant les fonctions qui vont créer nos éléments
//         // + On ajoute en argument à chaque fonction la valeur de "product" associée
//         const anchor = createAnchorLink(product._id)
//         const article = createArticle()
//         const image = createImage(product.imageUrl, product.altTxt)
//         const name = createName(product.name)
//         const description = createDescription(product.description)

//         // Appel de la fonction qui va ajouter les enfants aux parents associés
//         appendChildrenToParents(anchor, article, [image, name, description])
//     })
// }

// // Fonctions qui crée les éléments : Anchor, Article, Image, Name, Description
// function createAnchorLink(id) {
//     const anchorID = document.createElement("a")
//     anchorID.href = "./product.html?id=" + id
//     return anchorID
// }

// function createArticle() {
//     const article = document.createElement("article")
//     return article
// }

// function createImage(imageUrl, altTxt) {
//     const image = document.createElement("img")
//     image.src = imageUrl
//     image.alt = altTxt
//     return image
// }

// function createName(name) {
//     const nameH3 = document.createElement("h3")
//     nameH3.textContent = name
//     nameH3.classList.add("productName")
//     return nameH3
// }

// function createDescription(description) {
//     const descriptionP = document.createElement("p")
//     descriptionP.textContent = description
//     descriptionP.classList.add("productDescription")
//     return descriptionP
// }

// // Fonction qui ajoute les enfants aux parents respectifs
// function appendChildrenToParents(anchor, article, array) {
//     // La variable "sectionItems" incarne la section associée à l'id "items"
//     const sectionItems = document.querySelector(".items")
//     // On ajoute à "sectionItems" -> la balise <a> ("anchor")
//     sectionItems.appendChild(anchor)
//     // On ajoute à la balise <a> ("anchor") -> la balise <article>
//     anchor.appendChild(article)

//     // Array = [image, name, description]    
//     // On sélectionne chaque élément du tableau (array)
//     array.forEach((element) => {
//         // On ajoute à la balise <article> ("anchor") -> Les éléments du tableau [image, name, description] 
//         article.appendChild(element)
//     })
//     // = 
//     // article.appendChild(image)
//     // article.appendChild(h3)
//     // article.appendChild(p)
// }

