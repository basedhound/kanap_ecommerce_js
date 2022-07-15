
//! Récupérer les données de l'API

fetch("http://localhost:3000/api/products")
    .then((response) => response.json())
    .then((data) => displayProducts(data))

//! Créer les éléments HTML depuis le script JS

function displayProducts(data) {
    data.forEach((product) => {        
        
        const _id = product._id
        const imageUrl = product.imageUrl
        const altTxt = product.altTxt
        const name = product.name
        const description = product.description
        // (ou) const {_id, imageUrl, altTxt, name, description} = product
        
        const anchorLink = makeAnchorLink(_id)
        const article = document.createElement("article")
        const image = makeImage(imageUrl, altTxt)
        const title = makeTitle(name)
        const p = makeParagraph(description)
        
        addElementsToArticle(article, [image, title, p])
        addArticleToAnchor(anchorLink, article)
    })
}

function addElementsToArticle(article, array) {
    array.forEach((product) => {
        article.appendChild(product)
    })
    // (ou)
    // article.appendChild(image)
    // article.appendChild(title)
    // article.appendChild(p)
}

function makeAnchorLink(id) {
    const anchorLink = document.createElement("a")
    anchorLink.href = "./product.html?id=" + id
    return anchorLink
}

function addArticleToAnchor(anchorLink, article) {
    const products = document.querySelector("#items")
    if (products != null) {
        products.appendChild(anchorLink)
        anchorLink.appendChild(article)
    }
}



function makeImage(imageUrl, altTxt) {
    const image = document.createElement("img")
    image.src = imageUrl
    image.alt = altTxt
    return image
}

function makeTitle(name) {
    const h3 = document.createElement("h3")
    h3.textContent = name
    h3.classList.add("productName")
    return h3
}

function makeParagraph(description) {
    const p = document.createElement("p")
    p.textContent = description
    p.classList.add("productDescription")
    return p
}



