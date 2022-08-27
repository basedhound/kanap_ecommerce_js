//*--------------------------------------------------------------
//* MAIN | Variables / Constantes / Appels de Fonctions
//*--------------------------------------------------------------
// Formulaire : Écoute des inputs pour contrôle validité
listenToForm()

//*------------------------------------------------------------------------
//* FETCH | Récupération et Transmission des données de l'API
//*------------------------------------------------------------------------ 
fetch("http://localhost:3000/api/products")
    // Obtention des données de l'API => conversion du résultat en .json
    .then((res) => res.json())
    // Les données sont transmises sous forme de paramètre : "products" [...]     
    .then((products) => {
        console.log("API :", products)
        // Appel de la fonction "getProducts" + paramètre "products"
        getPurchaseData(products)
    })
    // Si ERREUR : Affichage via HTML + console
    .catch((err) => {
        document.querySelector("#cartAndFormContainer").innerHTML = "<h1>erreur 404</h1>"
        console.log("API - erreur 404 : " + err)
    })

//*---------------------------------------------------------------------
//* Récupération/Ajout des données non-stockées dans le Local Storage
//*---------------------------------------------------------------------
function getPurchaseData(products) {
    // Récupération de notre panier "Cart"
    const myCart = JSON.parse(localStorage.getItem("Cart"));
    // Si mon panier n'est pas vide [...]
    if (myCart != null) {
        // Boucle sur les produits du panier 
        for (let purchase of myCart) {
            // Boucle sur les produits de l'API
            for (let a = 0, b = products.length; a < b; a++) {
                // Si id produit PANIER = id produit API
                if (purchase.id === products[a]._id) {
                    // Récupération des informations manquantes
                    purchase.name = products[a].name;
                    purchase.price = products[a].price;
                    purchase.imageUrl = products[a].imageUrl;
                    purchase.altTxt = products[a].altTxt;
                    purchase.description = products[a].description;
                }
            }
        }
        // Affichage console : 
        // "myCart" possède les valeurs du Local Storage + celles récupérées au dessus
        // Les valeurs récupérées ne sont pas envoyées au Local Storage
        console.log("Panier :", myCart)
        // Appel de la fonction "hydrateCart" + paramètre "myCart" qui cumule les valeurs
        hydrateCart(myCart);
    }
    else {
        // Si le Panier est vide : 
        document.querySelector("#totalQuantity").innerHTML = "0";
        document.querySelector("#totalPrice").innerHTML = "0";
        document.querySelector("h1").innerHTML =
            "Vous n'avez pas d'article dans votre panier";
    }
}

//*--------------------------------------------------------------
//* Affichage du Panier
//* --------------------------------------------------------------
function hydrateCart(myCart) {
    // Déclaration + Pointage de la zone d'affichage du Panier
    const cartArea = document.querySelector("#cart__items");
    // Création du HTML dynamique : Méthode .map() + introduction de data-set
    cartArea.innerHTML += myCart.map((purchase) =>
        `<article class="cart__item" data-id="${purchase.id}" data-color="${purchase.color}" data-quantity="${purchase.quantity}" data-price="${purchase.price}"> 
            <div class="cart__item__img">
                <img src="${purchase.imageUrl}" alt="${purchase.altTxt}">
            </div>
            <div class="cart__item__content">
                <div class="cart__item__content__description">
                    <h2>${purchase.name}</h2>
                    <span>Couleur : ${purchase.color}</span>
                    <p data-price="${purchase.price}">Prix : ${purchase.price} €</p>
                </div>
                <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                        <p>Quantité : </p>
                        <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${purchase.quantity}">
                    </div>
                    <div class="cart__item__content__settings__delete">
                    <p class="deleteItem" data-id="${purchase.id}" data-color="${purchase.color}">Supprimer</p>
                    </div>
                </div>
            </div>
        </article>`
    ).join("")
    // ".join()" permet de définir la jonction entre chaque <article> affiché
    // Par défaut c'est une virgule, on la remplace par un espace vide

    // Appel des fonctions pour écoute : 
    updateQuantity() // Modification de la quantité
    deletePurchase() // Suppression d'un produit
    totalCart() // Calcul total produits/prix panier
}

//* --------------------------------------------------------------
//* Modification de la Quantité d'un Produit
//* --------------------------------------------------------------
function updateQuantity() {
    // Déclaration + Pointage de tous les éléments ".cart__item"
    const cartArea = document.querySelectorAll(".cart__item");

    // Écoute des évènements (eQuantity) sur chaque article (".itemQuantity")
    cartArea.forEach((purchase) => {
        purchase.addEventListener("change", (eQuantity) => {
            const myCart = JSON.parse(localStorage.getItem("Cart"))
            // Boucle sur les produits du Panier
            for (product of myCart)
                if (
                    // Si id + color similaires
                    product.id === purchase.dataset.id &&
                    purchase.dataset.color === product.color
                ) {
                    // Modification de la quantité
                    product.quantity = Math.min(eQuantity.target.value, 100)
                    // Envoi au Local Storage
                    localStorage.Cart = JSON.stringify(myCart)
                    // Mise à jour du dataset quantity
                    purchase.dataset.quantity = eQuantity.target.value
                    // Appel de la fonction de Total dynamique
                    totalCart();
                }
            console.log("Article modifié :", product.name, purchase.dataset.color)
            console.log("Panier mis à jour :", myCart)
        })
    })
}

//*--------------------------------------------------------------
//* Calcul et Affichage du Total Panier : Quantité + Prix
//*--------------------------------------------------------------
function totalCart() {
    // Déclaration des variables de "Total" en tant que Number
    let totalProducts = 0
    let totalPrice = 0
    // Déclaration + Pointage de tous les éléments ".cart__item"
    const purchases = document.querySelectorAll(".cart__item")
    // Boucle : pour chaque élément "purchase" des purchaseS
    purchases.forEach((purchase) => {
        // Récupération des quantités des produits via les dataset
        totalProducts += JSON.parse(purchase.dataset.quantity)
        // Calcul de prix panier total via les dataset
        totalPrice += purchase.dataset.quantity * purchase.dataset.price
    });
    // Affichage des résultats dans le HTML
    document.getElementById("totalQuantity").textContent = totalProducts
    document.getElementById("totalPrice").textContent = totalPrice
}

//*--------------------------------------------------------------
//* Suppression du Panier : Local Storage + Affichage HTML
//*--------------------------------------------------------------
function deletePurchase() {
    // Déclaration + Pointage de tous les éléments ".cart__item .deleteItem"
    const deletePurchase = document.querySelectorAll(".cart__item .deleteItem")
    // Pour chaque éléments [...]
    deletePurchase.forEach((purchase) => {
        // Écoute du click sur bouton "Supprimer" de chaque produit
        purchase.addEventListener("click", () => {
            // Appel du Panier en Local Storage
            let myCart = JSON.parse(localStorage.getItem("Cart"))
            // Boucle : Pour chaque élément du Panier [...]
            for (let a = 0, b = myCart.length; a < b; a++)
                if (
                    // Si correspondance Panier/dataset (id/color)
                    myCart[a].id === purchase.dataset.id &&
                    myCart[a].color === purchase.dataset.color
                ) {
                    // Variable utile pour suppression
                    const picked = [a];
                    // Suppression de 1 élément à l'indice picked
                    myCart.splice(picked, 1)
                    // Renvoi du (nouveau) panier converti dans le Local Storage 
                    localStorage.Cart = JSON.stringify(myCart)

                    // Suppression de l'Affichage HTML
                    const displayToDelete = document.querySelector(
                        `article[data-id="${purchase.dataset.id}"][data-color="${purchase.dataset.color}"]`)
                    displayToDelete.remove()

                    // Confirmation(s) de la console
                    console.log("Article supprimé")
                    console.log("Panier mis à jour :", myCart)

                    // Si Panier vide
                    if (myCart && myCart.length == 0) {
                        // Vider Local Storage ([] vide)                       
                        window.localStorage.clear()
                        // Affichage informatif
                        document.querySelector("#totalQuantity").innerHTML = "0"
                        document.querySelector("#totalPrice").innerHTML = "0"
                        document.querySelector("h1").innerHTML =
                            "Vous n'avez pas d'article dans votre panier"
                    }
                    totalCart(); // Appel de la fonction Total Quantité/Prix
                }
        })
    })
}

//*--------------------------------------------------------------
//* Écoute des champs "input" du Formulaire de commande
//*--------------------------------------------------------------
function listenToForm() {
    // Formulaire : Bouton "Commander"
    const orderButton = document.querySelector("#order")
    // => Appel de la fonction "submitForm"
    orderButton.addEventListener("click", (e) => submitForm(e))

    // Déclaration + Pointage de l'élément 
    let firstNameField = document.querySelector('#firstName')
    // Écoute d'évènement au niveau de l'input
    firstNameField.addEventListener('input', checkFirstName)

    let lastNameField = document.querySelector('#lastName')
    lastNameField.addEventListener('input', checkLastName)

    let cityField = document.querySelector('#city')
    cityField.addEventListener('input', checkCity)

    let addressField = document.querySelector('#address')
    addressField.addEventListener('input', checkAddress)

    let emailField = document.querySelector('#email')
    emailField.addEventListener('input', checkEmail)
}

//*--------------------------------------------------------------
//* Envoi du Formulaire de commande
//*--------------------------------------------------------------
function submitForm(e) {
    // Récupération du Formulaire valide
    const form = buildForm(e)
    // Si Formulaire invalide : Envoi annulé
    if (form == null) return

    fetch("http://localhost:3000/api/products/order", {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
    })
        .then(res => res.json())
        .then(res => {
            console.log("Formulaire de commande : ", res)
            alert("Votre commande a bien été effectuée !")
            window.location.replace(`./confirmation.html?orderId=${res.orderId}`)
        })
        .catch((err) => {
            alert(err.message)
            console.log(err)
        })
}

//*--------------------------------------------------------------
//* Construction du Formulaire de commande
//*--------------------------------------------------------------
function buildForm(e) {
    // Déclaration et pointage des éléments nécéssaires
    const myCart = JSON.parse(localStorage.getItem("Cart"))
    const firstName = document.getElementById("firstName").value
    const lastName = document.getElementById("lastName").value
    const address = document.getElementById("address").value
    const city = document.getElementById("city").value
    const email = document.getElementById("email").value
    // Constante : Appel des fonctions de validation
    const formValid = checkEmail() && checkAddress() && checkCity() && checkFirstName() && checkLastName()

    // Conditions nécessaires à la validation finale du formulaire
    if (myCart !== null && [firstName, lastName, address, city, email] !== '' && formValid) {

        // Récupération des id(s) Produits du Panier
        const productsIds = []
        myCart.forEach((purchase) => {
            productsIds.push(purchase.id)
        })

        const form = {
            // Objet respectant les attentes de l'API
            contact: {
                firstName: firstName,
                lastName: lastName,
                address: address,
                city: city,
                email: email
            },
            products: productsIds
        }
        return form

    } else {
        console.error("Champs invalides et/ou Panier vide")
        alert("Formulaire invalide et/ou Panier vide.\nNote : TOUS les champs sont requis !")
        e.preventDefault()
    }
}

//*--------------------------------------------------------------
//* Contrôle du Formulaire : Prénom
//*--------------------------------------------------------------
function checkFirstName() {
    let firstNameInput = document.getElementById("firstName")
    let firstNameValidate = document.getElementById("firstName").value
    let firstNameErrorMsg = document.getElementById("firstNameErrorMsg")
    let order = document.getElementById("order")

    const firstNameRGEX = /^(?![\s.]+$)[A-zÀ-ú\s\-]{1,25}$/
    let firstNameResult = firstNameRGEX.test(firstNameValidate)

    if (firstNameResult == false) {
        firstNameInput.style.backgroundColor = "red"
        firstNameInput.style.color = "white"
        firstNameErrorMsg.innerHTML = `Champ requis :<br>
                                    - "Prénom" ne doit comporter que des lettres<br>
                                    - Tirets et accents sont autorisés`
        firstNameErrorMsg.style.display = "inherit"
        order.disabled = true
        return false
    }
    else {
        firstNameErrorMsg.style.display = "none"
        firstNameInput.style.backgroundColor = "rgb(0, 205, 0)"
        firstNameInput.style.color = "black"
        order.disabled = false
        return true
    }
}

//*--------------------------------------------------------------
//* Contrôle du Formulaire : Nom
//*--------------------------------------------------------------
function checkLastName() {
    let lastNameInput = document.getElementById("lastName")
    let lastNameValidate = document.getElementById("lastName").value
    let lastNameErrorMsg = document.getElementById("lastNameErrorMsg")

    const lastNameRGEX = /^(?![\s.]+$)[A-zÀ-ú\s\-']{1,25}$/
    let lastNameResult = lastNameRGEX.test(lastNameValidate)

    if (lastNameResult == false) {
        lastNameInput.style.backgroundColor = "red"
        lastNameInput.style.color = "white"
        lastNameErrorMsg.innerHTML = `Champ requis :<br>
                                    - "Nom" ne doit comporter que des lettres<br>
                                    - Tirets, apostrophes, et accents sont autorisés`
        lastNameErrorMsg.style.display = "inherit"
        return false
    } else {
        lastNameErrorMsg.style.display = "none"
        lastNameInput.style.backgroundColor = "rgb(0, 205, 0)"
        lastNameInput.style.color = "black"
        return true
    }
}

//*--------------------------------------------------------------
//* Contrôle du Formulaire : Adresse
//*--------------------------------------------------------------
function checkAddress() {
    let addressInput = document.getElementById("address")
    let addressValidate = document.getElementById("address").value
    let addressErrorMsg = document.getElementById("addressErrorMsg")

    const addressRGEX = /^[0-9]{1,3}(?![\s.]+$)[a-zA-Z\s\-'.]+$/
    let addressResult = addressRGEX.test(addressValidate)

    if (addressResult == false) {
        addressInput.style.backgroundColor = "red"
        addressInput.style.color = "white"
        addressErrorMsg.innerHTML = "Champ requis<br>Exemple : 7 rue des Fleurs"
        addressErrorMsg.style.display = "inherit"
        return false
    } else {
        addressErrorMsg.style.display = "none"
        addressInput.style.backgroundColor = "rgb(0, 205, 0)"
        addressInput.style.color = "black"
        return true
    }
}

//*--------------------------------------------------------------
//* Contrôle du Formulaire : Ville
//*--------------------------------------------------------------
function checkCity() {
    let cityInput = document.getElementById("city")
    let cityValidate = document.getElementById("city").value
    let cityErrorMsg = document.getElementById("cityErrorMsg")

    const cityRGEX = /^(?![\s.]+$)[A-zÀ-ú\s\-']{1,25}$/
    let cityResult = cityRGEX.test(cityValidate)

    if (cityResult == false) {
        cityInput.style.backgroundColor = "red"
        cityInput.style.color = "white"
        cityErrorMsg.innerHTML = `Champ requis :<br>
                                - "Ville" ne doit comporter que des lettres<br>
                                - Tirets, apostrophes, et accents sont autorisés`
        cityErrorMsg.style.display = "inherit"
        return false
    } else {
        cityInput.style.backgroundColor = "rgb(0, 205, 0)"
        cityInput.style.color = "black"
        cityErrorMsg.style.display = "none"
        return true
    }
}

//*--------------------------------------------------------------
//* Contrôle du Formulaire : Email
//*--------------------------------------------------------------
function checkEmail() {
    let emailInput = document.getElementById("email")
    let emailValidate = document.getElementById("email").value
    let emailErrorMsg = document.getElementById("emailErrorMsg")

    const emailRGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
    let emailResult = emailRGEX.test(emailValidate)

    if (emailResult == false) {
        emailInput.style.backgroundColor = "red"
        emailInput.style.color = "white"
        emailErrorMsg.innerHTML = `Champ requis<br>Exemple : moi@kanap.com`
        emailErrorMsg.style.display = "inherit"
        return false
    } else {
        emailInput.style.backgroundColor = "rgb(0, 205, 0)"
        emailInput.style.color = "black"
        emailErrorMsg.style.display = "none"
        return true
    }
}




