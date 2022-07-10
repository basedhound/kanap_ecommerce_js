

const cartStrings = localStorage.getItem("Cart")
const cart = JSON.parse(cartStrings)
// console.log(cart)

cart.forEach((product) => displayItem(product))


// Formulaire de commande
const orderButton = document.querySelector("#order")
orderButton.addEventListener("click", (e) => submitForm(e))


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





// ======================
// Formulaire de commande
// ======================
function submitForm(e) {
    e.preventDefault()
    // if (cart.length == 0) alert("Votre panier est vide")
    const body = makeRequestBody()
    fetch("http://localhost:3000/api/products/order", {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json",
        }
    })
        .then((res) => res.json())
        .then((data) => console.log(data))
    // console.log(form.elements)
}

function makeRequestBody() {
    const form = document.querySelector(".cart__order__form")

    const firstName = form.elements.firstName.value
    const lastName = form.elements.lastName.value
    const address = form.elements.address.value
    const city = form.elements.city.value
    const email = form.elements.email.value

    const body = {
        contact: {
            firstName: firstName,
            lastName: lastName,
            address: address,
            city: city,
            email: email
        },
        products: getIds(cart)
    }
    // console.log(body)
    return body
}

//Get only id of products
function getIds(cart) {
    let products = []
    for (i = 0; i < cart.length; i++) {
        products.push(cart[i].id)
    }
    return products
}
