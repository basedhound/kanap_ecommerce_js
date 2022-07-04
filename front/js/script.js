
//! Récupérer les données de l'API

fetch("http://localhost:3000/api/products")
    .then((response) => response.json())
    .then((data) => {
        // console.log(data)
        return getProducts(data)
    })

// 1. Le script "fetch" des données
// 2. Ces données sont converties en .json
// 3. Ces données sont transmises à "getProducts"


//! Créer les éléments HTML depuis le script JS

function getProducts(data) {
    const _id = data[0]._id
    const imageUrl = data[0].imageUrl
    const altTxt = data[0].altTxt
    const name = data[0].name
    const description = data[0].description
    // const {_id, imageUrl, altTxt, name, description} = data[0]

    const anchor = makeAnchor(_id)
    const article = document.createElement("article")
    const image = makeImage(imageUrl, altTxt)
    const title = makeTitle(name)
    const p = makeParagraph(description)

    addElementsToArticle(article, image, title, p)
    addArticleToAnchor(anchor, article)
}

// 4. La fonction "getProducts" récupère les données précédemment transmises
// 5. Avec ces données, la fonction appelle l'imageUrl du premier élément (0) (constante)
// 6. "getProducts" appelle/exécute la fonction "createAnchor" et met le résultat dans la constante "anchor"
// 7. La constante "anchor" et ensuite passée à "appendChildren(anchor)" qui s'exécute 
// 8. La fonction "getProducts", appelle la fonction "appendChildren" avec le paramètre (anchor)


function addElementsToArticle(article, image, title, p) {
    article.appendChild(image)
    article.appendChild(title)
    article.appendChild(p)
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



