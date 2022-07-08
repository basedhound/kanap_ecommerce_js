
//! Récupérer les données de l'API

fetch("http://localhost:3000/api/products")
    .then((response) => response.json())
    .then((data) => displayProducts(data))

// 1. Le script "fetch" des données
// 2. Ces données sont converties en .json
// 3. Ces données sont transmises à "getProducts"

//! Créer les éléments HTML depuis le script JS

function displayProducts(data) {

    data.forEach((product) => {        
        
        const _id = product._id
        const imageUrl = product.imageUrl
        const altTxt = product.altTxt
        const name = product.name
        const description = product.description
        // const {_id, imageUrl, altTxt, name, description} = couch
        
        const anchor = makeAnchor(_id)
        const article = document.createElement("article")
        const image = makeImage(imageUrl, altTxt)
        const title = makeTitle(name)
        const p = makeParagraph(description)
        
        addElementsToArticle(article, [image, title, p])
        addArticleToAnchor(anchor, article)
    })
}


function addElementsToArticle(article, array) {
    array.forEach((item) => {
        article.appendChild(item)
    })
    // article.appendChild(image)
    // article.appendChild(title)
    // article.appendChild(p)
}

function makeAnchor(id) {
    const anchor = document.createElement("a")
    anchor.href = "./product.html?id=" + id
    return anchor
}

function addArticleToAnchor(anchor, article) {
    const items = document.querySelector("#items")
    if (items != null) {
        items.appendChild(anchor)
        anchor.appendChild(article)
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



