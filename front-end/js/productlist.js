/**
 * Récupere la liste des produits de l'API
 */
function getProducts() {
    fetch('http://localhost:3000/api/furniture')
    .then(response => response.json())
    .then(products => {
        console.log(products);

        let container = document.getElementById("productContainer")
        container.innerHTML = ``;

        for (const product of products) {
            displayProduct(container, product);
        }
    })
}

/**
 * Affiche le produit dans le conteneur
 * @param {HTMLElement} container : Conteneur du produit
 * @param product : le produit
 */
function displayProduct(container, product) {
        console.log(product)
        let html = `<div class="col-6 col-lg-3 mt-4">
        <div class="card shadow">
            <img src="${product.imageUrl}" alt="${product.name}" class="card-img-top">
            <div class="card-body">
                <h5 class="card-title">${product.name}</h5>
                <p class="card-text">${product.price/100} €</p>
                <a href="./product.html?id=${product._id}" class="btn btn-primary stretched-link"> Voir le produit</a>
            </div>
        </div>
    </div>`;
    container.innerHTML += html 
}

/**
 * Récupère un produit par son ID
 * @param {string} id
 */
function getProductById(id) {
    fetch('http://localhost:3000/api/furniture/' + id)
    .then(response => response.json())
    .then(product => {
        console.log(product);
    })
}