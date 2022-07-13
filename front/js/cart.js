

const cartStrings = localStorage.getItem("Cart")
const cart = JSON.parse(cartStrings)
// console.log(cart)
cart.forEach((product) => displayItem(product))


// Formulaire de commande
// const orderButton = document.querySelector("#order")
// orderButton.addEventListener("click", (e) => submitForm(e))


function displayItem(product) {
    const article = makeArticle(product)
    const cartItemImg = makeItemImg(product)
    article.appendChild(cartItemImg)

    const cartItemContent = makeItemContent(product)
    article.appendChild(cartItemContent)

    displayArticle(article)
    displayTotalPrice(product)
    displayTotalQuantity(product)   
   
}

function displayArticle(article) {
    document.querySelector("#cart__items").appendChild(article)
}

function makeArticle(product) {
    const article = document.createElement("article")
    article.classList.add("cart__item")
    article.dataset.id = product.id
    article.dataset.color = product.color
    return article
}

function makeItemImg(product) {
    const divImg = document.createElement("div")
    divImg.classList.add("cart__item__img")
    const image = document.createElement("img")
    image.src = product.image
    image.alt = product.altTxt
    divImg.appendChild(image)
    return divImg
}

function makeItemContent(product) {
    const itemContent = document.createElement("div")
    itemContent.classList.add("cart__item__content")

    const description = makeItemDescription(product)
    const settings = makeItemSettings(product)

    itemContent.appendChild(description)
    itemContent.appendChild(settings)

    return itemContent
}

function makeItemDescription(product) {
    const description = document.createElement("div")
    description.classList.add("cart__item__content__description")

    const h2 = document.createElement("h2")
    h2.textContent = product.name
    const p = document.createElement("p")
    p.textContent = product.color
    const p2 = document.createElement("p")
    p2.textContent = product.price + " €"

    description.appendChild(h2, p, p2)
    description.appendChild(p)
    description.appendChild(p2)

    return description
}

function makeItemSettings(product) {
    const settings = document.createElement("div")
    settings.classList.add("cart__item__content__settings")

    addQuantityToSettings(settings, product)
    addDeleteToSettings(settings, product)
    return settings
}

function addDeleteToSettings(settings) {
    const div = document.createElement("div")
    div.classList.add("cart__item__content__settings__delete")
    const p = document.createElement("p")
    p.textContent = "Supprimer"
    div.appendChild(p)
    settings.appendChild(div)
}

function addQuantityToSettings(settings, product) {
    const quantity = document.createElement("div")
    quantity.classList.add("cart__item__content__settings__quantity")
    const p = document.createElement("p")
    p.textContent = "Qté : "
    quantity.appendChild(p)
    const input = document.createElement("input")
    input.type = "number"
    input.classList.add("itemQuantity")
    input.name = "itemQuantity"
    input.min = "1"
    input.max = "100"
    input.value = product.quantity
    // Update Quantity & Price
    input.addEventListener("input", () => updateQuantityAndTotal(product, product.id, input.value))

    quantity.appendChild(input)
    settings.appendChild(quantity)
}

function updateQuantityAndTotal(product, id, newValue) {
    const itemToUpdate = cart.find((product) => product.id === id)
    itemToUpdate.quantity = Number(newValue)
    displayTotalQuantity()
    displayTotalPrice()
    saveNewDataToCache(product)
}

function saveNewDataToCache(product) {
    const dataToSave = JSON.stringify(product)
    console.log(dataToSave)

}

function displayTotalPrice(product) {
    const totalPrice = document.querySelector("#totalPrice")
    // Méthode 1
    let total = 0
    cart.forEach((product) => {
        const totalUnitPrice = product.price * product.quantity
        total += totalUnitPrice
    })
    // Méthode 2
    // const total = cart.reduce((total, product) => total + product.price * product.quantity, 0)
    totalPrice.textContent = total
}

function displayTotalQuantity(product) {
    const totalQuantity = document.querySelector("#totalQuantity")
    // Méthode 1
    let total = 0
    cart.forEach((product) => {
        const totalQuantity = product.quantity
        total += totalQuantity
    })
    // Méthode 2
    // const total = cart.reduce((total, product) => total + product.quantity, 0)
    totalQuantity.textContent = total
}



function saveNewDataToCache(product) {
    // const dataToSave = JSON.stringify(product)
    // console.log("dataToSave", dataToSave)
    // localStorage.setItem(product.id, dataToSave)

    let localStorageContent = JSON.parse(localStorage.getItem("Cart"))
    localStorageContent != null
    localStorageContent.push(product)
    localStorage.setItem("Cart", JSON.stringify(localStorageContent))
}












//! =================
//! PARTIE FORMULAIRE
//! =================

//* ======================
//* VALIDITÉ DU FORMULAIRE
//* ======================

const firstName = document.querySelector("#firstName");
const lastName = document.querySelector("#lastName");
const address = document.querySelector("#address");
const city = document.querySelector("#city");
const email = document.querySelector("#email");

let valueFirstName, valueLastName, valueAddress, valueCity, valueEmail;

// ! FIRSTNAME
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

// ! LASTNAME
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

// ! ADDRESS
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

// ! CITY
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
            .then( async (res) => res.json())
            .then( async (data) => {
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
