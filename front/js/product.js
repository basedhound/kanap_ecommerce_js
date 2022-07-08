// Main function, auto executed at load time
; (async () => {
    const productId = getProductId()
    const productData = await getProductData(productId)
    hydratePage(productData)
    addProductToCart(productData)
})()

function getProductId() {
    return new URL(window.location.href).searchParams.get('id')
}

async function getProductData(productId) {
    return fetch(`http://localhost:3000/api/products/${productId}`)
        .catch((error) => {
            console.log(error)
        })
        .then((response) => response.json())
        .then((productData) => productData)
}


function hydratePage(product) {
    // Hydrate page with data

    // Display ELEMENTS : title / price / description
    document.getElementById('title').textContent = product.name
    document.getElementById('price').textContent = product.price
    document.getElementById('description').textContent = product.description

    // Display IMG :
    const imageUrl = product.imageUrl
    const altTxt = product.altTxt
    const image = document.createElement("img")
    image.src = imageUrl
    image.alt = altTxt
    const parent = document.querySelector(".item__img")
    parent.appendChild(image)

    // Display COLORS :
    const colors = product.colors
    const select = document.querySelector("#colors")
    colors.forEach((color) => {
        const option = document.createElement("option")
        option.value = color
        option.textContent = color
        select.appendChild(option)
    })
}


function addProductToCart(product) {
    const button = document.getElementById('addToCart')
    button.addEventListener("click", (e) => {
        const color = document.getElementById('colors').value
        const quantity = document.getElementById('quantity').value
        const purchase = {
            id: product._id,
            color: color,
            quantity: Number(quantity),
            price: product.price,
            image: product.imageUrl,
            altText: product.altTxt,
            name: product.name
        }

        if (OrderIsInvalid(color, quantity)) return

        let localStorageContent = JSON.parse(localStorage.getItem("Cart"))

        // Fenêtre pop-up de confirmation d'ajout au panier
        const purchaseConfirmation = () => {
            if (window.confirm(`${product.name} option: ${purchase.color} a bien été ajouté au panier !
            Consuler le Panier [OK] | Revenir à l'accueil [Annuler]`)) {
                window.location.href = "cart.html"
            } else {
                window.location.href = "index.html"

            }
        }

        // Si il y a déjà des produits enregistrés dans le local storage
        if (localStorageContent) {
            localStorageContent.push(purchase)
            localStorage.setItem("Cart", JSON.stringify(localStorageContent))
            purchaseConfirmation()
        }

        // Si il n'y a pas de produit enregistré dans local storage
        else {
            localStorageContent = []
            localStorageContent.push(purchase)
            localStorage.setItem("Cart", JSON.stringify(localStorageContent))
            purchaseConfirmation()
        }

    })
}











function OrderIsInvalid(color, quantity) {
    // if (color == null || color === "" || quantity == null || quantity == 0) 
    if (!color || !quantity || quantity == 0) {
        alert("Merci de choisir une couleur et une quantité")
        return true
    }
}

