const params = new URLSearchParams(window.location.search);
const id = params.get("id");
console.log("ID du produit affiché :", id); 
const cart = JSON.parse(localStorage.getItem("Cart"))
console.log("Panier :", cart)

fetch(`http://localhost:3000/api/products/${id}`)
  .then((response) => response.json())
  .then((res) => hydrateProduct(res))

function hydrateProduct(product) {
    // Titre de la page : En fonction du produit affiché
    document.title = product.name

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
    addProductToCart(product)
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

        if (localStorageContent == null) {
            localStorageContent = []
            console.log("Produit ajouté au Panier : ", purchase)
            localStorageContent.push(purchase)
            localStorage.setItem("Cart", JSON.stringify(localStorageContent))
            purchaseConfirmation()
        } else if (localStorageContent != null) {
            for (i = 0; i < localStorageContent.length; i++) {                
                if (
                    localStorageContent[i].id == product._id &&
                    localStorageContent[i].color == color
                ) {
                    return (console.log("Produit ajouté au Panier : ", purchase),                        
                        localStorageContent[i].quantity=localStorageContent[i].quantity+purchase.quantity,                                               
                        localStorage.setItem("Cart", JSON.stringify(localStorageContent)),
                        (localStorageContent = JSON.parse(localStorage.getItem("Cart"))),
                        purchaseConfirmation()
                    );            
                }
            }
            for (i = 0; i < localStorageContent.length; i++) { 
                if (localStorageContent[i].id == product._id && 
                    localStorageContent[i].color != color || 
                    localStorageContent[i].id != product._id
                    ) {
                    return (console.log("Produit ajouté au Panier : ", purchase),
                    localStorageContent.push(purchase),
                    localStorage.setItem("Cart", JSON.stringify(localStorageContent)),
                    (localStorageContent = JSON.parse(localStorage.getItem("Cart"))),
                    purchaseConfirmation()
                    )                     
                }
            }             
        }

    })
    return (localStorageContent = JSON.parse(localStorage.getItem("Cart")))
}

function OrderIsInvalid(color, quantity) {
    // if (color == null || color === "" || quantity == null || quantity == 0) 
    if (!color || !quantity || quantity == 0) {
        alert("Merci de choisir une couleur et une quantité")
        console.log("Achat invalide : Manque quantité / couleur")
        return true
    }
}
