window.onload = function() {
    let searchParams = new URLSearchParams(window.location.search);
    let idProduct = searchParams.get("id")

    getProductById(idProduct);
}

/**
 * Récupère un produit par son ID
 * @param {string} id
 */
 function getProductById(idProduct) {
    fetch('http://localhost:3000/api/furniture/' + idProduct)
    .then(response => response.json())
    .then(product => {
        console.log(product);

        let container = document.getElementById("product1")
        container.innerHTML = ``;

        displayDetailProduct(container, product)

        let form = document.getElementById('form');

        form.onsubmit = function(e) {
            e.preventDefault()
            let quantity = document.getElementById('qty').value;
            console.log(document.getElementById('varnish').value)

            buy(product.imageUrl, product._id, Number(quantity), document.getElementById('varnish').value, product.name, product.price);
            console.log(localStorage.getItem("product"));
            window.location = "store.html"
        }
    })
}

/**
 * Affiche le detal du produit dans le conteneur
 * @param {HTMLElement} container : Conteneur du produit
 * @param product : le produit
 */
 function displayDetailProduct(container, product) {
    console.log(product)
    let html = `<div class="col-lg-6 py-3 order-1 order-lg-1">
        <div class="card shadow">
            <img src="${product.imageUrl}" alt="Table de chevet">
        </div>
    </div>
    <div class="d-flex flex-column align-item-center col-lg-6 col-xl-5 pl-lg-5 mb-5 order-2 order-lg-2">
        <h1 class="mb-4">${product.name}</h1>
        <div class="d-flex flex-sm-row align-items-sm-center justify-content-sm-between mb-4">
            <ul class="list-inline mb-2 mb-sm-0">
                <li class="list-inline-item h4 font-weight-light mb-0">${product.price/100} €</li>
            </ul>
        </div>
        <p class="mb-4 text-muted">${product.description}</p>
        <form id="form">
            <div class="row">
                <div class="col-sm-6 col-lg-12 detail-option mb-3">
                    <h6 class="detail-option-heading h5">
                        Vernis
                        <span class="text-muted h6">(Obligatoire)</span>
                    </h6>
                    <label for="size_0" class="btn btn-sm btn-outline-secondary detail-option-btn-label mx-1"
                        data-children-count="1">
                            <select id="varnish">
                    `;
                    for(let varnish of product.varnish) {
                        html += `<option value="${varnish}">${varnish}</option>`
                    }
                    html += `
                        </select>
                    </label>
                </div>
            </div>
            <div class="row">
                <div class="col-12 col-lg-6 detail-option mb-5" data-children-count="1">
                    <label for="size_0" class="detail-option-heading h5" data-children-count="1">
                        Nombres
                        <span class="text-muted h6" data-children-count="0">(Obligatoire)</span>
                    </label>
                    <input id="qty" class="form-control detail-quantity" type="number" name="items" value="1">
                </div>
            </div>
            <ul class="list-inline">
                <li class="list-inline-item">
                    <button class="btn btn-dark btn-lg mb-1" type="submit" data-id="${product._id}" data-name="${product.name}" data-price="${product.price/100} €" data-varnish="${product.varnish}" data-url="${'http://localhost:3000/api/furniture/' + product._id}">
                        Ajouter au Panier
                    </button>
                </li>
            </ul>
        </form>
    </div>`;
container.innerHTML += html 
}

/**
 * Ajoute un produit à la liste d'achat par son id
 * @param {string} id
 * @param {number} quantity
 * @param {string} varnish
 * @param {string} name
 * @param {number} price
 */
function buy(imageUrl, id, quantity, varnish, name, price) {
    let purchaseList = localStorage.getItem("product");
    console.log(varnish)

    if (purchaseList == null) {
        purchaseList = [];
    }
    console.log(typeof purchaseList)

    if (typeof purchaseList == "string") {
        purchaseList = JSON.parse(purchaseList);
    }

    let exist = false;

    for (let i = 0; i < purchaseList.length; i++) {
        const element = purchaseList[i];
        
        if (element.id == id && element.varnish == varnish) {
            element.quantity = quantity + element.quantity;
            purchaseList[i] = element;
            exist = true;
        }

    }
    if (!exist) {
        let newItem = {
            imageUrl: imageUrl,
            id: id,
            quantity: quantity,
            varnish: varnish,
            name: name,
            price: price,
        }
        purchaseList.push(newItem)

    }

    localStorage.setItem("product",JSON.stringify(purchaseList));
}

