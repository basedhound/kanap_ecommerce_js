// GET LOCALSTORAGECONTENT + DISPLAY PRODUCTS
// cart.forEach((product) => displayCart(product));

// cart.forEach((product) => getProductsFromApi(product.id))
// async function getProductsFromApi(id) {
//     return fetch(`http://localhost:3000/api/products/${id}`)
//         .catch((error) => {
//             console.log(error)
//         })
//         .then((response) => response.json())
//         .then(productApi => displayPrice(productApi))
// }

// async function displayPrice(productApi) {
//     const productApiPrice = productApi
//     console.log(productApiPrice)
//     return productApi  
// }

//*--------------------------------------------------------------------------
//* Variables principales
//*--------------------------------------------------------------------------
const myCart = JSON.parse(localStorage.getItem("Cart"))
console.log("Panier :", myCart)


//*--------------------------------------------------------------------------
//* Contrôler l'état du localstorage
//*--------------------------------------------------------------------------
function checkLocalStorage() {}
if (myCart === null || myCart.length == 0 ){
    document.querySelector("#cartAndFormContainer").innerHTML = "<h1>Votre panier est vide</h1>";
    // alert("Votre Panier est vide. Veuillez ajouter des produits pour continuer.")  
    // window.location.href = "index.html"
} else { 
    myCart.forEach((product) => displayCart(product));
}

function displayCart(product, res) {

    const productArticle = makeProductArticle(product)
    const productImage = makeProductImage(product)
    productArticle.appendChild(productImage)

    const cartItemContent = makeProductContent(product)
    productArticle.appendChild(cartItemContent)

    displayProductArticle(productArticle)
    displayTotalPrice(product)
    displayTotalQuantity(product)
}

function makeProductArticle(product) {
    const article = document.createElement("article")
    article.classList.add("cart__item")
    article.dataset.id = product.id
    article.dataset.color = product.color
    return article
}
function displayProductArticle(article) {
    document.querySelector("#cart__items").appendChild(article)
}

function makeProductImage(product) {
    const divImg = document.createElement("div")
    divImg.classList.add("cart__item__img")
    const image = document.createElement("img")
    image.src = product.image
    image.alt = product.altTxt
    divImg.appendChild(image)
    return divImg
}

function makeProductContent(product) {
    const contentDiv = document.createElement("div")
    contentDiv.classList.add("cart__item__content")

    const description = makeProductDescription(product)
    const settings = makeProductSettings(product)

    contentDiv.appendChild(description)
    contentDiv.appendChild(settings)

    return contentDiv
}

function makeProductDescription(product) {
    const descriptionDiv = document.createElement("div")
    descriptionDiv.classList.add("cart__item__content__description")

    const nameH2 = document.createElement("h2")
    nameH2.textContent = product.name
    const colorP = document.createElement("p")
    colorP.textContent = product.color

    const priceP = document.createElement("p")
    priceP.textContent = product.price + " €"
    // priceP.textContent = Number(prixProduit)

    descriptionDiv.appendChild(nameH2)
    descriptionDiv.appendChild(colorP)
    descriptionDiv.appendChild(priceP)

    return descriptionDiv
}

function makeProductSettings(product) {
    const settingsDiv = document.createElement("div")
    settingsDiv.classList.add("cart__item__content__settings")

    addQuantitySetting(settingsDiv, product)
    addDeleteToSettings(settingsDiv, product)
    return settingsDiv
}

function addQuantitySetting(settings, product) {
    const quantityDiv = document.createElement("div")
    quantityDiv.classList.add("cart__item__content__settings__quantity")
    const p = document.createElement("p")
    p.textContent = "Qté : "
    quantityDiv.appendChild(p)
    const input = document.createElement("input")
    input.type = "number"
    input.classList.add("itemQuantity")
    input.name = "itemQuantity"
    input.min = "1"
    input.max = "100"
    input.value = product.quantity
    // Update Quantity & Price
    input.addEventListener("input", () => updateQuantityAndTotal(product, product.id, product.color, input.value))

    quantityDiv.appendChild(input)
    settings.appendChild(quantityDiv)
}




function updateQuantityAndTotal(product, id, color, newValue) {
    const itemToUpdate = myCart.find((product) => product.id === id && product.color === color)
    itemToUpdate.quantity = Number(newValue)
    displayTotalQuantity()
    displayTotalPrice()
    saveNewDataToCache(product)
}

function displayTotalPrice() {
    const totalPriceDiv = document.querySelector("#totalPrice")
    // Méthode 1
    let totalPrice = 0
    myCart.forEach((product) => {
        const totalCartPrice = product.price * product.quantity
        totalPrice += totalCartPrice
    })
    // Méthode 2
    // const total = cart.reduce((total, product) => total + product.price * product.quantity, 0)
    totalPriceDiv.textContent = totalPrice
}

function displayTotalQuantity() {
    const totalQuantityDiv = document.querySelector("#totalQuantity")
    // Méthode 1
    let totalQuantity = 0
    myCart.forEach((product) => {
        const totalCartQuantity = product.quantity
        totalQuantity += totalCartQuantity
    })
    // Méthode 2
    // const total = cart.reduce((total, product) => total + product.quantity, 0)
    totalQuantityDiv.textContent = totalQuantity
}

function saveNewDataToCache() {
    const cartUpdate = JSON.stringify(myCart)
    console.log("Mise à jour du Panier :", myCart)
    localStorage.setItem("Cart", cartUpdate)
}

function addDeleteToSettings(settings, product) {
    const div = document.createElement("div")
    div.classList.add("cart__item__content__settings__delete")
    div.addEventListener("click", () => deleteProduct((product)))

    const p = document.createElement("p")
    p.textContent = "Supprimer"
    div.appendChild(p)
    settings.appendChild(div)
}

function deleteProduct(product) {
    const purchaseToDelete = myCart.findIndex((purchase) => product.id === purchase.id && product.color === purchase.color)
    myCart.splice(purchaseToDelete, 1)

    deleteProductFromPage(product)
    saveNewDataToCache(product)
    displayTotalQuantity()
    displayTotalPrice()

    // Supprime la key "Cart" une fois tous les produits supprimés
    if (myCart == 0) {
        const cache = window.localStorage
        cache.clear()
    }
}

// Supprime la balise <article> du produit supprimé afin de le retirer visuellement de la page
function deleteProductFromPage(product) {
    const productToDelete = document.querySelector(
        `article[data-id="${product.id}"][data-color="${product.color}"]`
    )
    productToDelete.remove()
}



























//! =================
//! PARTIE FORMULAIRE
//! =================

//* ======================
//* VALIDITÉ DU FORMULAIRE
//* ======================


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
        firstNameErrorMsg.innerHTML = "Prenom  ne doit pas contenir de caractères spéciaux et/ou d'accents"
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














//* ================================
//* OBJET À ENVOYER À L'API (BENOIT)
//* ================================
//     function makeRequestBody() {
//     const form = document.querySelector(".cart__order__form")

//     const firstName = form.elements.firstName.value
//     const lastName = form.elements.lastName.value
//     const address = form.elements.address.value
//     const city = form.elements.city.value
//     const email = form.elements.email.value

//     const body = {
//         contact: {
//             firstName: firstName,
//             lastName: lastName,
//             address: address,
//             city: city,
//             email: email
//         },
//         products: getIds(cart)
//     }
//     // console.log(body)
//     return body
// }


//* ===========================
//* RÉCUPÉRER LES IDs DU PANIER
//* ===========================
// function getIds(cart) {
//     let products = []
//     for (i = 0; i < cart.length; i++) {
//         products.push(cart[i].id)
//     }
//     return products
// }