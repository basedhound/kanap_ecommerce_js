// Main function, auto executed at load time
; (async () => {
    const productId = getProductId()
    const productData = await getProductData(productId)
    hydratePage(productData)
})()

function getProductId() {
    return new URL(window.location.href).searchParams.get('id')
}

function getProductData(productId) {
    return fetch(`http://localhost:3000/api/products/${productId}`)
        .catch((error) => {
            console.log(error)
        })
        .then((response) => response.json())
        .then((productData) => productData)
}

function hydratePage(product) {
    // Hydrate page with data

    // Display IMG :
    const imageUrl = product.imageUrl
    const altTxt = product.altTxt
    const image = document.createElement("img")
    image.src = imageUrl
    image.alt = altTxt
    const parent = document.querySelector(".item__img")
    parent.appendChild(image)

    // Display Elements : title / price / description
    document.getElementById('title').textContent = product.name
    document.getElementById('price').textContent = product.price
    document.getElementById('description').textContent = product.description

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