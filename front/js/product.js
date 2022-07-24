//*--------------------------------------------------------------------------
//* Récupérer l'ID du produit via l'URL 
//*--------------------------------------------------------------------------
// Constante "params" : récupère l'URL de la page affichée
const params = new URLSearchParams(window.location.search);
// Constante "id" : récupère la valeur du paramètre "id" dans l'URL (id=...)
const id = params.get("id");
console.log("ID du produit à afficher :", id);

//*--------------------------------------------------------------------------
//* Déclaration du panier "Cart" (key) dans le localStorage
//*--------------------------------------------------------------------------
// La variable "cart" donne accès au contenu du localStorage, dans la clée "cart"
let myCart = JSON.parse(localStorage.getItem("Cart")) 
console.log(myCart)

//*------------------------------------------------------------------------
//* Récupération de l'objet produit à afficher via l'API
//*------------------------------------------------------------------------ 
// fetch(`http://localhost:3000/api/products/${id}`)
fetch(`http://localhost:3000/api/products`)
    .then((response) => response.json())
    .then((products) => {
        // Appel de la fonction "hydrateProduct"    
        hydrateProduct(products);
    })
    // Si ERREUR : Remplacer titre par un h1 "erreur 404" et renvoit en console l'erreur.
    .catch((error) => {
        document.querySelector(".item").innerHTML = "<h1>erreur 404</h1>";
        console.error("API - erreur 404 : " + error);
    });

//*------------------------------------------------------------------------
//* Affichage du Produit
//*------------------------------------------------------------------------
function hydrateProduct(products) {
    // boucle for pour chercher un indice
    for (const product of products) {
        //si id (définit par l'url) est identique à un _id d'un des produits du tableau, on récupère son indice de tableau qui sert pour les éléments produit à ajouter
        if (id === product._id) {

            // Titre de la page (affiché dans l'onglet)
            document.title = product.name

            // Éléments : Nom, Prix, Description
            document.querySelector('#title').textContent = product.name
            document.querySelector('#price').textContent = product.price
            document.querySelector('#description').textContent = product.description

            // Élément : Image (+alt) 
            const imageParent = document.querySelector(".item__img")
            const image = document.createElement("img")
            image.src = product.imageUrl
            image.alt = product.altTxt
            imageParent.appendChild(image)
            // const image = document.querySelector("article div.item__img");
            // image.innerHTML = `<img src="${product.imageUrl}" alt="${product.altTxt}">`

            // Éléments : Couleurs disponibles
            const colorsParent = document.querySelector("#colors")
            const colors = product.colors
            colors.forEach((color) => {
                const colorSettings = document.createElement("option")
                colorSettings.value = color
                colorSettings.textContent = color
                colorsParent.appendChild(colorSettings)
                // colorsParent.innerHTML += `<option value="${color}">${color}</option>`;
            })
            console.log(`${product.name} est affiché`);
            productToPurchase(product)
        }
    }
}

//*------------------------------------------------------------------------
//* Lancer procédure d'achat : Créer objet "Purchase" + Appel des fonctions
//*------------------------------------------------------------------------
function productToPurchase(product) {
    // On écoute ce qu'il se passe dans :
    const button = document.querySelector('#addToCart')
    button.addEventListener("click", () => {
        // On récupére les valeurs de #colors & #quantity
        const color = document.querySelector('#colors').value
        const quantity = document.querySelector('#quantity').value
        // On crée un objet qui recueille les valeurs de l'achat
        const purchase = {
            id: product._id,
            color: color,
            quantity: Number(quantity),
            // price: product.price,
            // image: product.imageUrl,
            // altText: product.altTxt,
            name: product.name
        }
        console.log("Produit en attente :", purchase)

        // Contrôler la validité de l'achat (couleur, quantité)
        if (purchaseInvalid(color, quantity)) return
        // Ajouter un produit au panier
        addToCart(product, purchase, color)
        // Réinitialiser le style du bouton "Ajouter au panier" après un achat
        resetButton()
    })
}

//*------------------------------------------------------------------------
//* Contrôler la validité de l'achat : 
//*------------------------------------------------------------------------
function purchaseInvalid(color, quantity) {
    if (!color || !quantity || quantity == 0 || quantity < 1 || quantity > 100) {
        alert("Pour valider le choix de cet article, veuillez renseigner une couleur, et/ou une quantité entre 1 et 100")
        console.error("Erreur : Quantité et/ou Couleur invalides")
        return true
    }
}

//*------------------------------------------------------------------------
//* Ajouter l'article au Panier :
//*------------------------------------------------------------------------
function addToCart(product, purchase, color) {
    // Variable "myCart"
    // let myCart = JSON.parse(localStorage.getItem("Cart"))

    // Si "myCart" est vide -> création d'un tableau -> ajout du 1er produit
    if (myCart == null) {
        myCart = []
        myCart.push(purchase)
        localStorage.setItem("Cart", JSON.stringify(myCart))
        purchaseConfirmation(purchase)
    }

    // Si "myCart" n'est pas vide -> boucle sur "myCart" 
    else if (myCart != null) {
        // + Si produit similaire (id/couleur) => Ajout de quantité 
        for (i = 0; i < myCart.length; i++) {
            if (
                myCart[i].id == product._id &&
                myCart[i].color == color
            ) {
                return (
                    myCart[i].quantity = Math.min(myCart[i].quantity + purchase.quantity, 100),
                    localStorage.setItem("Cart", JSON.stringify(myCart)),
                    purchaseConfirmation(purchase)
                );
            }
        }

        // + Si produit similaire (id/couleur) => Ajout d'un nouveau produit dans "myCart"
        for (i = 0; i < myCart.length; i++) {
            if (myCart[i].id == product._id &&
                myCart[i].color != color ||
                myCart[i].id != product._id
            ) {
                return (
                    myCart.push(purchase),
                    localStorage.setItem("Cart", JSON.stringify(myCart)),
                    purchaseConfirmation(purchase)
                )
            }
        }
    }
}

//*------------------------------------------------------------------------
//* Confirmer l'achat à l'aide d'indications visuelles :
//*------------------------------------------------------------------------
function purchaseConfirmation(purchase) {
    console.log("Produit ajouté au Panier : ", purchase)
    console.log("Panier à jour : ", myCart)
    // alert(`${purchase.name} option: ${purchase.color} a bien été ajouté au panier !`)
    // Ouvre une fenêtre dans le navigateur permettant de se diriger vers le panier
    if (window.confirm(`${purchase.name} option: ${purchase.color} a bien été ajouté au panier !
        Consuler le Panier [OK] | Rester à ${purchase.name} [Annuler]`)) {
        window.location.href = "cart.html"
    } else {
        window.close
    }
    // Change le style visuel du bouton d'achat
    document.querySelector("#addToCart").style.color = "rgb(0, 205, 0)";
    document.querySelector("#addToCart").textContent = "Produit ajouté !";
}

//*------------------------------------------------------------------------
//* Réinitialiser le style du bouton "Ajouter au panier" après un achat :
//*------------------------------------------------------------------------
function resetButton() {
    // On écoute "#colors"
    let colorSettings = document.querySelector("#colors");
    colorSettings.addEventListener("input", () => {
        document.querySelector("#addToCart").style.color = "white";
        document.querySelector("#addToCart").textContent = "Ajouter au panier";
    });
    // On écoute 'input[id="quantity"]'
    let quantitySettings = document.querySelector('input[id="quantity"]');
    quantitySettings.addEventListener("input", () => {
        document.querySelector("#addToCart").style.color = "white";
        document.querySelector("#addToCart").textContent = "Ajouter au panier";
    });
}

// // console.log("Panier :", myCart);
// // La variable "purchase" est un objet qui va accueillir les informations du produit
// let purchase = {};
// // id du procuit
// purchase._id = id;