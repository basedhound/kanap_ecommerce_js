//*--------------------------------------------------------------------------
//* Variables principales
//*--------------------------------------------------------------------------
const myCart = JSON.parse(localStorage.getItem("Cart"))
// console.log("Mon Panier :", myCart)

// Bouton "Commander" => Appel de la fonction "submitForm"
listenForm()

const orderButton = document.querySelector("#order")
orderButton.addEventListener("click", (e) => submitForm(e))

//*------------------------------------------------------------------------
//* Récupération de l'objet produit à afficher via l'API
//*------------------------------------------------------------------------ 
fetch("http://localhost:3000/api/products")
    .then((response) => response.json())
    .then((products) => {
        console.log("Produits API :", products);
        // appel de la fonction affichagePanier
        getProducts(products);
    })
    .catch((error) => {
        document.querySelector("#cartAndFormContainer").innerHTML = "<h1>erreur 404</h1>";
        console.log("API - erreur 404 : " + error);
    });

//*---------------------------------------------------------------------
//* Fonction détermine les conditions d'affichage des produits du panier
//*---------------------------------------------------------------------
function getProducts(product) {
    // on récupère le panier converti
    const myCart = JSON.parse(localStorage.getItem("Cart"));
    // si il y a un panier avec une taille differante de 0 (donc supérieure à 0)
    if (myCart && myCart.length != 0) {
        // zone de correspondance clef/valeur de l'api et du panier grâce à l'id produit choisit dans le localStorage
        for (let purchase of myCart) {
            for (let g = 0, h = product.length; g < h; g++) {
                if (purchase.id === product[g]._id) {
                    // création et ajout de valeurs à panier qui vont servir pour les valeurs dataset
                    purchase.name = product[g].name;
                    purchase.price = product[g].price;
                    purchase.imageUrl = product[g].imageUrl;
                    purchase.altTxt = product[g].altTxt;
                    purchase.description = product[g].description;
                }
            }
        }
        console.log("Panier :", myCart)
        // on joue affiche,  panier a des clefs/valeurs ajoutés que l'on a pas remonté dans le local storage et sont pourtant réèlles
        // ici panier à les valeurs du local storage + les valeurs définies au dessus
        //on demande à affiche() de jouer avec les données panier 
        //les valeurs ajoutés à panier ont un scope agrandi puisque appelé via la fonction affiche() d'ailleur dans affiche() il n'y a pas d'appel à panier de local storage.
        hydrateCart(myCart);
    }
    else {
        // Si le panier est vide : 
        document.querySelector("#totalQuantity").innerHTML = "0";
        document.querySelector("#totalPrice").innerHTML = "0";
        document.querySelector("h1").innerHTML =
            "Vous n'avez pas d'article dans votre panier";
    }
    // reste à l'écoute grâce aux fonctions suivantes pour modifier l'affichage
    updateQuantity();
    deletePurchase();
}

//*--------------------------------------------------------------
//* Fonction d'affichage d'un panier (tableau)
//* --------------------------------------------------------------
function hydrateCart(myCart) {
    // on déclare et on pointe la zone d'affichage
    let cartArea = document.querySelector("#cart__items");
    // on créait les affichages des produits du panier via un map et introduction de dataset dans le code
    cartArea.innerHTML += myCart.map((purchase) =>
        `<article class="cart__item" data-id="${purchase.id}" data-color="${purchase.color}" data-quantity="${purchase.quantity}" data-price="${purchase.price}"> 
      <div class="cart__item__img">
        <img src="${purchase.imageUrl}" alt="${purchase.altTxt}">
      </div>
      <div class="cart__item__content">
        <div class="cart__item__content__titlePrice">
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
    ).join(""); //on remplace les virgules de jonctions des objets du tableau par un vide
    // reste à l'écoute des modifications de quantité pour l'affichage et actualiser les données      
    totalCart();

}

//* --------------------------------------------------------------
//* on modifie dynamiquement les quantités du panier
//* --------------------------------------------------------------
function updateQuantity() {
    const cartArea = document.querySelectorAll(".cart__item");
    // manière de regarder ce que l'on a d'affiché dynamiquement grace au dataset
    // cartArea.forEach((purchase) => { console.log("item panier en dataset: " + " " + purchase.dataset.id + " " + purchase.dataset.color + " " + purchase.dataset.quantity); });
    // On écoute ce qu'il se passe dans itemQuantity de l'article concerné
    cartArea.forEach((purchase) => {
        purchase.addEventListener("change", (eq) => {
            // vérification d'information de la valeur du clic et son positionnement dans les articles
            const myCart = JSON.parse(localStorage.getItem("Cart"));
            // boucle pour modifier la quantité du produit du panier grace à la nouvelle valeur
            for (product of myCart)
                if (
                    product.id === purchase.dataset.id &&
                    purchase.dataset.color === product.color
                ) {
                    product.quantity = Math.min(eq.target.value, 100);
                    localStorage.Cart = JSON.stringify(myCart);
                    // on met à jour le dataset quantité
                    purchase.dataset.quantity = eq.target.value;
                    // on joue la fonction pour actualiser les données
                    totalCart();
                }
            console.log("Produit modifié :", product)
            console.log("Panier mis à jour :", myCart)
        });

    });
}

//*--------------------------------------------------------------
//* Fonction ajout nombre total produit et coût total
//*--------------------------------------------------------------
function totalCart() {
    // déclaration variable en tant que nombre
    let totalArticle = 0;
    // déclaration variable en tant que nombre
    let totalPrice = 0;
    // on pointe l'élément
    const purchases = document.querySelectorAll(".cart__item");
    // pour chaque élément cart
    purchases.forEach((purchase) => {
        //je récupère les quantités des produits grâce au dataset
        totalArticle += JSON.parse(purchase.dataset.quantity);
        // je créais un opérateur pour le total produit grâce au dataset
        totalPrice += purchase.dataset.quantity * purchase.dataset.price;
    });
    // je pointe l'endroit d'affichage nombre d'article
    document.getElementById("totalQuantity").textContent = totalArticle;
    // je pointe l'endroit d'affichage du prix total
    document.getElementById("totalPrice").textContent = totalPrice;
    //   totalPriceDiv.textContent = totalPrice
}

//*--------------------------------------------------------------
//* Fonction ajout nombre total produit et coût total
//*--------------------------------------------------------------
function deletePurchase() {
    // déclaration de variables
    const deletePurchase = document.querySelectorAll(".cart__item .deleteItem");
    // pour chaque élément cartdelete
    deletePurchase.forEach((purchase) => {
        // On écoute s'il y a un clic dans l'article concerné
        purchase.addEventListener("click", () => {
            // appel de la ressource du local storage
            const myCart = JSON.parse(localStorage.getItem("Cart"));
            for (let d = 0, c = myCart.length; d < c; d++)
                if (
                    myCart[d].id === purchase.dataset.id &&
                    myCart[d].color === purchase.dataset.color
                ) {
                    // déclaration de variable utile pour la suppression
                    const num = [d];
                    // création d'un tableau miroir, voir mutation
                    let newCart = JSON.parse(localStorage.getItem("Cart"));
                    //suppression de 1 élément à l'indice num
                    newCart.splice(num, 1);

                    // suppression visuelle de l'élément sur la page, évite de devoir reload la page
                    const productToDelete = document.querySelector(
                        `article[data-id="${purchase.dataset.id}"][data-color="${purchase.dataset.color}"]`
                    )
                    productToDelete.remove()

                    // on renvoit le nouveau panier converti dans le local storage et on joue la fonction
                    localStorage.Cart = JSON.stringify(newCart);
                    console.log("Panier mis à jour :", newCart)

                    //affichage informatif
                    if (newCart && newCart.length == 0) {
                        window.localStorage.clear();
                        // si il n'y a pas de panier on créait un H1 informatif et quantité appropriées
                        document.querySelector("#totalQuantity").innerHTML = "0";
                        document.querySelector("#totalPrice").innerHTML = "0";
                        document.querySelector("h1").innerHTML =
                            "Vous n'avez pas d'article dans votre panier";
                    }

                    totalCart(); // logique mais pas obligatoire à cause du reload plus bas qui raffraichit l'affichage; serait necessaire avec suppression sans reload
                    // on recharge la page qui s'affiche sans le produit grace au nouveau panier
                    // return location.reload();
                }
        });
    });
}

//*--------------------------------------------------------------
//* Fonction ajout nombre total produit et coût total
//*--------------------------------------------------------------
function listenForm() {
    let firstNameField = document.querySelector('#firstName')
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
//* Fonction ajout nombre total produit et coût total
//*--------------------------------------------------------------
function submitForm(e) {
    // e.preventDefault()
    const valueFirstName = document.getElementById("firstName").value
    const valueLastName = document.getElementById("lastName").value
    const valueAddress = document.getElementById("address").value
    const valueCity = document.getElementById("city").value
    const valueEmail = document.getElementById("email").value

    const myCart = JSON.parse(localStorage.getItem("Cart"));
    const valideForm = checkEmail() && checkAddress() && checkCity() && checkFirstName() && checkLastName()

    if (myCart != null &&
        valueFirstName !== '' &&
        valueLastName !== '' &&
        valueAddress !== '' &&
        valueCity !== '' &&
        valueEmail !== '' &&
        valideForm) {

        // Récupérer les id(s) des produits dans mon panier
        const productsIds = []
        myCart.forEach((purchase) => {
            productsIds.push(purchase.id)
        })

        fetch("http://localhost:3000/api/products/order", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                "Content-Type": "application/json",
            },
            body: JSON.stringify({

                // Create the contact object with the form information
                contact: {
                    firstName: valueFirstName,
                    lastName: valueLastName,
                    address: valueAddress,
                    city: valueCity,
                    email: valueEmail
                },

                // Sending the productsID array as the variable "products" 
                products: productsIds
            })

        })
            .then(res => res.json())
            .then(res => {
                console.log("Formulaire de commande : ", res)
                alert("Votre commande a été effectuée !")
                window.location.href = (`./confirmation.html?orderId=${res.orderId}`)
                // window.location.replace(`./confirmation.html?orderId=${res.orderId}`)

            })
            .catch((err) => {
                alert(err.message)
                console.log(err)
            })
    } else {
        e.preventDefault()
        console.error("Champs invalides")
        alert("Formulaire invalide et/ou Panier vide.\nNote : TOUS les champs sont requis !")
    }
}

//*--------------------------------------------------------------
//* Fonction ajout nombre total produit et coût total
//*--------------------------------------------------------------
function checkFirstName() {

    let firstNameInput = document.getElementById("firstName")
    let firstNameValidate = document.getElementById("firstName").value
    let firstNameErrorMsg = document.getElementById("firstNameErrorMsg")
    let order = document.getElementById("order")

    const firstNameRGEX = /^(?![\s.]+$)[A-zÀ-ú\s\-']{1,25}$/
    let firstNameResult = firstNameRGEX.test(firstNameValidate)

    if (firstNameResult == false) {
        firstNameInput.style.backgroundColor = "red"
        firstNameInput.style.color = "white"
        firstNameErrorMsg.innerHTML = `"Prénom" ne doit comporter que des lettres.<br>(Tirets et apostrophes autorisés)<br>Champ requis`
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
//* Fonction ajout nombre total produit et coût total
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
        lastNameErrorMsg.innerHTML = `"Nom" ne doit comporter que des lettres.<br>(Tirets et apostrophes autorisés)<br>Champ requis"`
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
//* Fonction ajout nombre total produit et coût total
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
        addressErrorMsg.innerHTML = "Exemple : 7 rue des Fleurs<br>Champ requis"
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
//* Fonction ajout nombre total produit et coût total
//*--------------------------------------------------------------
function checkCity() {
    let cityInput = document.getElementById("city")
    let cityValidate = document.getElementById("city").value
    let cityErrorMsg = document.getElementById("cityErrorMsg")

    const cityRGEX = /^(?![\s.]+$)[A-zÀ-ú\s\-']{1,25}$/
    let cityResult = cityRGEX.test(cityValidate)

    if (cityResult == false || cityInput.value.length === 0) {
        cityInput.style.backgroundColor = "red"
        cityInput.style.color = "white"
        cityErrorMsg.innerHTML = "Votre ville ne doit comporter que des lettres.<br>(Tirets et apostrophes autorisés)<br>Champ requis"
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
//* Fonction ajout nombre total produit et coût total
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
        emailErrorMsg.innerHTML = "Exemple : moi@exemple.com<br>Champ requis"
        emailErrorMsg.style.display = "inherit"
        return false
    } else {
        emailInput.style.backgroundColor = "rgb(0, 205, 0)"
        emailInput.style.color = "black"
        emailErrorMsg.style.display = "none"
        return true
    }
}




