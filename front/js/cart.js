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
        hydrateProducts(products);
    })
    .catch((error) => {
        document.querySelector("#cartAndFormContainer").innerHTML = "<h1>erreur 404</h1>";
        console.log("API - erreur 404 : " + error);
    });


//*---------------------------------------------------------------------
//* Fonction détermine les conditions d'affichage des produits du panier
//*---------------------------------------------------------------------
function hydrateProducts(product) {
    // on récupère le panier converti
    let myCart = JSON.parse(localStorage.getItem("Cart"));
    console.log("Panier :", myCart)
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
        // on joue affiche,  panier a des clefs/valeurs ajoutés que l'on a pas remonté dans le local storage et sont pourtant réèlles
        // ici panier à les valeurs du local storage + les valeurs définies au dessus
        //on demande à affiche() de jouer avec les données panier 
        //les valeurs ajoutés à panier ont un scope agrandi puisque appelé via la fonction affiche() d'ailleur dans affiche() il n'y a pas d'appel à panier de local storage.
        displayCart(myCart);
    }
    else {
        // En cas de panier vide : 
        document.querySelector("#totalQuantity").innerHTML = "0";
        document.querySelector("#totalPrice").innerHTML = "0";
        document.querySelector("h1").innerHTML =
            "Vous n'avez pas d'article dans votre panier";
    }
    // reste à l'écoute grâce aux fonctions suivantes pour modifier l'affichage
    updateQuantity();
    deleteItem();
}

//*--------------------------------------------------------------
//* Fonction d'affichage d'un panier (tableau)
//* --------------------------------------------------------------
function displayCart(myCart) {
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
    totalProduit();
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
            let myCart = JSON.parse(localStorage.getItem("Cart"));
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
                    totalProduit();
                }
            console.log("Produit modifié :", product)
            console.log("Panier à jour :", myCart)
        });

    });
}

//--------------------------------------------------------------
// fonction ajout nombre total produit et coût total
//--------------------------------------------------------------
function totalProduit() {
    // déclaration variable en tant que nombre
    let totalArticle = 0;
    // déclaration variable en tant que nombre
    let totalPrice = 0;
    // on pointe l'élément
    const cart = document.querySelectorAll(".cart__item");
    // pour chaque élément cart
    cart.forEach((cart) => {
        //je récupère les quantités des produits grâce au dataset
        totalArticle += JSON.parse(cart.dataset.quantity);
        // je créais un opérateur pour le total produit grâce au dataset
        totalPrice += cart.dataset.quantity * cart.dataset.price;
    });
    // je pointe l'endroit d'affichage nombre d'article
    document.getElementById("totalQuantity").textContent = totalArticle;
    // je pointe l'endroit d'affichage du prix total
    document.getElementById("totalPrice").textContent = totalPrice;
    //   totalPriceDiv.textContent = totalPrice
}

function deleteItem() {
    // déclaration de variables
    const cartdelete = document.querySelectorAll(".cart__item .deleteItem");
    // pour chaque élément cartdelete
    cartdelete.forEach((cartdelete) => {
        // On écoute s'il y a un clic dans l'article concerné
        cartdelete.addEventListener("click", () => {
            // appel de la ressource du local storage
            // let myCart = JSON.parse(localStorage.getItem("Cart"));
            for (let d = 0, c = myCart.length; d < c; d++)
                if (
                    myCart[d].id === cartdelete.dataset.id &&
                    myCart[d].color === cartdelete.dataset.color
                ) {
                    // déclaration de variable utile pour la suppression
                    const num = [d];
                    // création d'un tableau miroir, voir mutation
                    let newCart = JSON.parse(localStorage.getItem("Cart"));
                    //suppression de 1 élément à l'indice num
                    newCart.splice(num, 1);

                    // suppression visuelle de l'élément sur la page, évite de devoir reload la page
                    const productToDelete = document.querySelector(
                        `article[data-id="${cartdelete.dataset.id}"][data-color="${cartdelete.dataset.color}"]`
                    )
                    productToDelete.remove()

                    // on renvoit le nouveau panier converti dans le local storage et on joue la fonction
                    localStorage.Cart = JSON.stringify(newCart);
                    console.log("Panier à jour :", newCart)

                    //affichage informatif
                    if (newCart && newCart.length == 0) {
                        window.localStorage.clear();
                        // si il n'y a pas de panier on créait un H1 informatif et quantité appropriées
                        document.querySelector("#totalQuantity").innerHTML = "0";
                        document.querySelector("#totalPrice").innerHTML = "0";
                        document.querySelector("h1").innerHTML =
                            "Vous n'avez pas d'article dans votre panier";
                    }

                    totalProduit(); // logique mais pas obligatoire à cause du reload plus bas qui raffraichit l'affichage; serait necessaire avec suppression sans reload
                    // on recharge la page qui s'affiche sans le produit grace au nouveau panier
                    // return location.reload();
                }
        });
    });
}

function listenForm() {
    let firstNameField = document.getElementById('firstName')
    firstNameField.addEventListener('input', validateFirstName)

    let lastNameField = document.getElementById('lastName')
    lastNameField.addEventListener('input', validateLastName)

    let cityField = document.getElementById('city')
    cityField.addEventListener('input', validateCity)

    let addressField = document.getElementById('address')
    addressField.addEventListener('input', validateAddress)

    let emailField = document.getElementById('email')
    emailField.addEventListener('input', validateEmail)
}

function submitForm(e) {
    // e.preventDefault()
    const valueFirstName = document.getElementById("firstName").value
    const valueLastName = document.getElementById("lastName").value
    const valueAddress = document.getElementById("address").value
    const valueCity = document.getElementById("city").value
    const valueEmail = document.getElementById("email").value

    const valideForm = validateEmail() && validateAddress() && validateCity() && validateFirstName() && validateLastName()

    if (valueFirstName !== '' && valueLastName !== '' && valueAddress !== '' && valueCity !== '' && valueEmail !== '' && valideForm) {
        
    // Récupérer les id(s) des produits dans mon panier
    const productsIds = []
    myCart.forEach((product) => {
        productsIds.push(product.id)
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
            .then(response => response.json())
            .then(order => {
                console.log("Formulaire de commande : ", order)
                alert("Votre commande a été effectuée !")
                // window.location.href = (`./confirmation.html?orderId=${res.orderId}`)
                // window.location.replace(`./confirmation.html?orderId=${res.orderId}`)

            })
            .catch((err) => {
                alert(err.message)
                console.log(err)
            })
    } else {
        e.preventDefault()
        console.log("Champs invalides")
        alert("Le formulaire n'est pas correctement rempli, veuillez réessayer.")
    }
}






function validateFirstName() {

    let firstNameInput = document.getElementById("firstName")
    let firstNameValidate = document.getElementById("firstName").value
    let firstNameErrorMsg = document.getElementById("firstNameErrorMsg")
    let order = document.getElementById("order")

    const firstNameRGEX = /^[a-zA-Z ]+$/
    let firstNameResult = firstNameRGEX.test(firstNameValidate)

    if (firstNameResult == false) {
        firstNameInput.style.backgroundColor = "red"
        firstNameInput.style.color = "white"
        firstNameErrorMsg.innerHTML = "Votre prénom ne doit comporter que des lettres"
        firstNameErrorMsg.style.display = "inherit"
        order.disabled = true
        return false
    } else {
        firstNameErrorMsg.style.display = "none"
        firstNameInput.style.backgroundColor = "rgb(0, 205, 0)"
        firstNameInput.style.color = "black"
        order.disabled = false
        return true
    }
}


function validateLastName() {
    let lastNameInput = document.getElementById("lastName")
    let lastNameValidate = document.getElementById("lastName").value
    let lastNameErrorMsg = document.getElementById("lastNameErrorMsg")

    const lastNameRGEX = /^[a-zA-Z ]+$/
    let lastNameResult = lastNameRGEX.test(lastNameValidate)

    if (lastNameResult == false) {
        lastNameInput.style.backgroundColor = "red"
        lastNameInput.style.color = "white"
        lastNameErrorMsg.innerHTML = "Votre nom ne doit comporter que des lettres"
        lastNameErrorMsg.style.display = "inherit"
        return false
    } else {
        lastNameErrorMsg.style.display = "none"
        lastNameInput.style.backgroundColor = "rgb(0, 205, 0)"
        lastNameInput.style.color = "black"
        return true
    }
}


function validateAddress() {
    let addressInput = document.getElementById("address")
    let addressValidate = document.getElementById("address").value
    let addressErrorMsg = document.getElementById("addressErrorMsg")

    const addressRGEX = /^[a-zA-Z0-9\s\,\''\-]*$/
    let addressResult = addressRGEX.test(addressValidate)

    if (addressResult == false) {
        addressInput.style.backgroundColor = "red"
        addressInput.style.color = "white"
        addressErrorMsg.innerHTML = "Votre adresse ne doit pas comporter de caractères spéciaux"
        addressErrorMsg.style.display = "inherit"
        return false
    } else {
        addressErrorMsg.style.display = "none"
        addressInput.style.backgroundColor = "rgb(0, 205, 0)"
        addressInput.style.color = "black"
        return true
    }

}

function validateCity() {
    let cityInput = document.getElementById("city")
    let cityValidate = document.getElementById("city").value
    let cityErrorMsg = document.getElementById("cityErrorMsg")

    const cityRGEX = /^([a-zA-Z\u0080-\u024F]+(?:. |-| |'))*[a-zA-Z\u0080-\u024F]*$/
    let cityResult = cityRGEX.test(cityValidate)

    if (cityResult == false) {
        cityInput.style.backgroundColor = "red"
        cityInput.style.color = "white"
        cityErrorMsg.innerHTML = "Votre ville ne doit pas comporter que des lettres et certains caractères spéciaux"
        cityErrorMsg.style.display = "inherit"
        return false
    } else {
        cityInput.style.backgroundColor = "rgb(0, 205, 0)"
        cityInput.style.color = "black"
        cityErrorMsg.style.display = "none"
        return true
    }
}


function validateEmail() {

    let emailInput = document.getElementById("email")
    let emailValidate = document.getElementById("email").value
    let emailErrorMsg = document.getElementById("emailErrorMsg")

    const emailRGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
    let emailResult = emailRGEX.test(emailValidate)

    if (emailResult == false) {
        emailInput.style.backgroundColor = "red"
        emailInput.style.color = "white"
        emailErrorMsg.innerHTML = "Exemple : kanap@gmail.com"
        //   emailErrorMsg.style.display="inherit"
        return false
    } else {
        emailInput.style.backgroundColor = "rgb(0, 205, 0)"
        emailInput.style.color = "black"
        emailErrorMsg.style.display = "none"
        return true
    }
}











function testcancel() {
    // Faire une fonction 1 : Build Contact Form
    const firstName = document.querySelector("#firstName");
    const lastName = document.querySelector("#lastName");
    const address = document.querySelector("#address");
    const city = document.querySelector("#city");
    const email = document.querySelector("#email");

    let valueFirstName, valueLastName, valueAddress, valueCity, valueEmail;
    // Appeler les fonctions suivantes


    // Faire une fonction : Firstname validator
    //! FIRSTNAME
    firstName.addEventListener("input", function (e) {
        valueFirstName;
        if (e.target.value.length == 0) {
            firstNameErrorMsg.innerHTML = "Ce champ est obligatoire"
            valueFirstName = null;
        }
        else if (e.target.value.length < 3 || e.target.value.length > 25) {
            firstNameErrorMsg.innerHTML = "Prénom doit contenir entre 3 et 25 caractères"
            // firstName.style.backgroundColor="red"
            // firstName.style.color="white"
            valueFirstName = null
        }
        if (e.target.value.match(/^[a-z A-Z]{3,25}$/)) {
            firstNameErrorMsg.innerHTML = ""
            valueFirstName = e.target.value
        }
        if (
            // ! = different
            !e.target.value.match(/^[a-z A-Z]{3,25}$/)
            && e.target.value.length > 3
            && e.target.value.length < 25
        ) {
            firstNameErrorMsg.innerHTML = "Votre prénom ne doit comporter que des lettres"
            valueFirstName = null
        }
    });

    // Faire une fonction : lastname validator
    //! LASTNAME
    lastName.addEventListener("input", function (e) {
        valueLastName;
        if (e.target.value.length == 0) {
            lastNameErrorMsg.innerHTML = "Ce champ est obligatoire"
            valueLastName = null
        }
        else if (e.target.value.length < 3 || e.target.value.length > 25) {
            lastNameErrorMsg.innerHTML = "Nom doit contenir entre 3 et 25 caractères"
            valueLastName = null
        }
        if (e.target.value.match(/^[a-z A-Z]{3,25}$/)) {
            lastNameErrorMsg.innerHTML = ""
            valueLastName = e.target.value
        }
        if (
            // ! = different
            !e.target.value.match(/^[a-z A-Z]{3,25}$/)
            && e.target.value.length > 3
            && e.target.value.length < 25
        ) {
            lastNameErrorMsg.innerHTML = "Nom ne doit pas contenir de caractères spéciaux et/ou d'accents"
            valueLastName = null
        }
    });

    // Faire une fonction : address validator
    //! ADDRESS
    address.addEventListener("input", function (e) {
        valueAddress;
        if (e.target.value.length == 0) {
            addressErrorMsg.innerHTML = "Ce champ est obligatoire"
            valueAddress = null;
        }
        else if (e.target.value.length < 3 || e.target.value.length > 35) {
            addressErrorMsg.innerHTML = "Adresse doit contenir entre 3 et 35 caractères"
            valueAddress = null
        }
        if (e.target.value.match(/^[0-9]{1,3} [a-z A-Z]{3,35}$/)) {
            addressErrorMsg.innerHTML = ""
            valueAddress = e.target.value
        }
        if (
            // ! = different
            !e.target.value.match(/^[0-9]{1,3} [a-z A-Z]{3,35}$/)
            && e.target.value.length > 3
            && e.target.value.length < 35
        ) {
            addressErrorMsg.innerHTML = "Adresse commence par des chiffres, ne contient ni caractères spéciaux, ni accents"
            valueAddress = null
        }
    });

    // Faire une fonction : city validator
    //! CITY
    city.addEventListener("input", function (e) {
        valueCity;
        if (e.target.value.length == 0) {
            cityErrorMsg.innerHTML = "Ce champ est obligatoire"
            valueCity = null;
        }
        else if (e.target.value.length < 3 || e.target.value.length > 25) {
            cityErrorMsg.innerHTML = "Ville doit contenir entre 3 et 25 caractères"
            valueCity = null
        }
        if (e.target.value.match(/^[a-z A-Z]{3,25}$/)) {
            cityErrorMsg.innerHTML = ""
            valueCity = e.target.value
        }
        if (
            // ! = different
            !e.target.value.match(/^[a-z A-Z]{3,25}$/)
            && e.target.value.length > 3
            && e.target.value.length < 25
        ) {
            cityErrorMsg.innerHTML = "Ville ne contient ni chiffres, ni caractères spéciaux, ni accents"
            valueCity = null
        }
    });

    // Faire une fonction : email validator
    //! EMAIL
    email.addEventListener("input", (e) => {
        if (e.target.value.length == 0) {
            emailErrorMsg.innerHTML = "Ce champ est obligatoire"
            valueEmail = null
        }
        else if (e.target.value.match(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/)) {
            emailErrorMsg.innerHTML = ""
            valueEmail = e.target.value
        }
        if (!e.target.value.match(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/)
            && !e.target.value.length == 0) {
            emailErrorMsg.innerHTML = "Adresse email invalide (Ex : moi@exemple.com)"
            valueEmail = null
        }
    });

    // Faire une fonction : Final Form validator
    const orderForm = document.querySelector(".cart__order__form")
    orderForm.addEventListener("submit", (e) => {
        e.preventDefault()
        // console.log("stop")

        if (valueFirstName && valueLastName && valueAddress && valueCity && valueEmail) {
            const orderComplete = JSON.parse(localStorage.getItem("Cart"))
            let productsIds = []

            orderComplete.forEach((product) => {
                productsIds.push(product.id)
            })

            // console.log(orderId)

            const orderData = {
                contact: {
                    firstName: valueFirstName,
                    lastName: valueLastName,
                    address: valueAddress,
                    city: valueCity,
                    email: valueEmail
                },
                products: productsIds
            }
            // console.log(orderData)

            //* Faire une fonction : sendFormtoApi
            //! ===============================================================
            //! Envoyer l'objet "orderData" à l'API pour obtenir ID de commande
            //! ===============================================================
            fetch("http://localhost:3000/api/products/order", {
                method: "POST",
                body: JSON.stringify(orderData),
                headers: {
                    "Content-Type": "application/json",
                }
            })
                .then(async (res) => res.json())
                .then(async (data) => {
                    console.log(data)
                    const orderId = data.orderId
                    window.location.href = "./confirmation.html" + "?orderId=" + orderId
                })
                .catch((err) => console.log(err))
            //! ===============================================================

        } else {
            e.preventDefault()
            console.log("Champs invalides")
            alert("Le formulaire n'est pas correctement rempli, veuillez réessayer.")
        }
    })

}




