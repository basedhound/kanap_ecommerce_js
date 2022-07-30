//! NOTE : Les console.log restants seront supprimés avant déploiement du site.
//! Ils servent ici à illustrer certaines opération lors de la présentation.
//! Il en va de même pour un certain nombre de commentaires exlicatifs.

//*--------------------------------------------------------------
//* MAIN | Variables / Constantes / Appels de Fonctions
//*--------------------------------------------------------------
// Récupération de la valeur "id" dans l'URL (id=...)
const id = new URLSearchParams(window.location.search).get("id")
console.log("ID du produit à afficher :", id)

//*------------------------------------------------------------------------
//* FETCH | Récupération de l'objet "produit" à afficher via l'API
//*------------------------------------------------------------------------ 
fetch(`http://localhost:3000/api/products/${id}`)
    // Obtention des données de l'API => conversion du résultat en .json
    .then((res) => res.json())
    // Les données sont transmises sous forme de paramètre : "product" [...]        
    .then((product) => {
        // Appel de la fonction "hydrateProduct" + paramètre "product"        
        hydrateProduct(product)
        console.log(`Données de ${product.name} récupérées :`, product)
    })
    // Si ERREUR : Affichage via HTML + console
    .catch((err) => {
        document.querySelector(".item").innerHTML = "<h1>erreur 404</h1>";
        console.error("API - erreur 404 : " + err)
    })

//*------------------------------------------------------------------------
//* Affichage du Produit 
//*------------------------------------------------------------------------
function hydrateProduct(product) {
            // Titre de la page : Affichage dans l'onglet de navigation
            document.title = `${product.name} | Kanap`

            // Nom, Prix, Description
            document.querySelector('#title').textContent = product.name
            document.querySelector('#price').textContent = product.price
            document.querySelector('#description').textContent = product.description

            // Image + Alt
            const imageParent = document.querySelector(".item__img")
            const image = document.createElement("img")
            image.src = product.imageUrl
            image.alt = product.altTxt
            imageParent.appendChild(image)

            // Éléments : Couleurs disponibles
            const colorsParent = document.querySelector("#colors")
            const colors = product.colors
            colors.forEach((color) => {
                const colorSettings = document.createElement("option")
                colorSettings.value = color
                colorSettings.textContent = color
                colorsParent.appendChild(colorSettings)
            })
            // Appel de la fonction + transmission du paramètre "product"
            productToPurchase(product)
        }


//*------------------------------------------------------------------------
//* Création d'un objet "Purchase" au clic du bouton "addToCart"
//*------------------------------------------------------------------------
function productToPurchase(product) {
    // Écoute de l'élément #addToCart via méthode "addEventListener"
    const buttonAddToCart = document.querySelector('#addToCart')
    buttonAddToCart.addEventListener("click", () => {
        // Récupération des valeurs input de #colors & #quantity
        const color = document.querySelector('#colors').value
        const quantity = document.querySelector('#quantity').value
        // Création de la classe qui sera utilisée pour ajouter au panier
        const purchase = {
            id: product._id,
            color: color,
            quantity: Number(quantity),
            name: product.name
        }
        console.log(`Préparation de ${purchase.name}:`, purchase)

        // Contrôle de la validité de l'achat (Couleur / Quantité)
        if (purchaseInvalid(purchase, color, quantity)) return
        // Ajout du produit au Panier du Local Storage
        addToCart(purchase, color)
        // Réinitialisation du bouton "Ajouter au panier" après un achat
        resetButton()
    })
}

//*------------------------------------------------------------------------
//* Contrôle de la validité d'ajout au panier
//*------------------------------------------------------------------------
function purchaseInvalid(purchase, color, quantity) {
    // Invalide si : Couleur non définie / Quantité inféreure à 1 ou supérieure à 100 [...]
    if (!color || quantity < 1 || quantity > 100) {
        console.error(`Erreur lors de l'ajout au Panier de ${purchase.name} ! \n Couleur et/ou Quantité invalides :`, purchase)
        alert(`Pour valider le choix de ${purchase.name} : \nVeuillez renseigner une couleur, et/ou une quantité entre 1 et 100`)
        return true
    }
}

//*------------------------------------------------------------------------
//* Système d'ajout des produits au Panier 
//*------------------------------------------------------------------------
function addToCart(purchase, color) {
    // Déclaration du Panier, clé "Cart" dans Local Storage
    let myCart = JSON.parse(localStorage.getItem("Cart"))

    // Si "myCart" est vide -> Création d'un tableau -> Ajout du 1er produit
    if (myCart == null) {
        myCart = []
        myCart.push(purchase)
        localStorage.setItem("Cart", JSON.stringify(myCart))
        // Confirmation de l'ajout au panier
        purchaseConfirmation(purchase)
    }

    // Ajouter d'autres produits : 1er cas de figure ->
    // Si "myCart" n'est pas vide [...]
    else if (myCart != null) {
        // Boucle sur les éléments de "myCart"
        for (i = 0; i < myCart.length; i++) {
            if (
                // Si le produit à ajouter est similaire : id/couleur
                myCart[i].id == purchase.id &&
                myCart[i].color == color
            ) {
                return (
                    // => Ajout de quantité au produit déjà dans le panier
                    myCart[i].quantity = Math.min(myCart[i].quantity + purchase.quantity, 100),
                    localStorage.setItem("Cart", JSON.stringify(myCart)),
                    // Confirmation de l'ajout au panier
                    purchaseConfirmation(purchase)
                )
            }
        }

        // Ajouter d'autres produits : 2eme cas de figure ->
        // Boucle sur les éléments de "myCart"
        for (i = 0; i < myCart.length; i++) {
            // Si produit à ajouter = ID similaire et couleur différente (OU) ID différent
            if (myCart[i].id == purchase.id &&
                myCart[i].color != color ||
                myCart[i].id != purchase.id
            ) {
                return (
                    // => Ajout d'un nouvel article dans le panier
                    myCart.push(purchase),
                    localStorage.setItem("Cart", JSON.stringify(myCart)),
                    // Confirmation de l'ajout au panier
                    purchaseConfirmation(purchase)
                )
            }
        }
    }
}

//*------------------------------------------------------------------------
//* Confirmation de l'ajout de produit(s) au Panier
//*------------------------------------------------------------------------
function purchaseConfirmation(purchase) {
    // Confirmations dans la Console
    console.log(`${purchase.name} ${purchase.color} ajouté au Panier :`, purchase)
    let myCart = JSON.parse(localStorage.getItem("Cart"))
    console.log("Panier à jour :", myCart)

    // Fenêtre de confirmation dans le navigateur
    if (window.confirm(`${purchase.name} option: ${purchase.color} a bien été ajouté au panier !
        Consuler le Panier [OK] | Rester à ${purchase.name} [Annuler]`)) {
        window.location.href = "cart.html"
    } else {
        window.close
    }
    // Changement du style visuel du bouton "Ajouter au panier" (couleur/texte)
    document.querySelector("#addToCart").style.color = "rgb(0, 205, 0)"
    document.querySelector("#addToCart").textContent = "Produit ajouté !"
}

//*------------------------------------------------------------------------
//* Réinitialisation des styles du Bouton "Ajouter au panier" :
//*------------------------------------------------------------------------
function resetButton() {
    // On écoute "#colors"
    let colorSettings = document.querySelector("#colors");
    // Si évènement sur "input" ...
    colorSettings.addEventListener("input", () => {
        // Modification du style et texte
        document.querySelector("#addToCart").style.color = "white";
        document.querySelector("#addToCart").textContent = "Ajouter au panier";
    });
    // On écoute 'input[id="quantity"]'
    let quantitySettings = document.querySelector('input[id="quantity"]');
    quantitySettings.addEventListener("input", () => {
        // Si évènement sur "input" ...
        document.querySelector("#addToCart").style.color = "white";
        // Modification du style et texte
        document.querySelector("#addToCart").textContent = "Ajouter au panier";
    });
}
