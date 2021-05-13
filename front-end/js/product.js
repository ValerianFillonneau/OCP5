let searchParams = new URLSearchParams(window.location.search);
let idProduct = searchParams.get("id")

fetch('http://localhost:3000/api/furniture/' + idProduct)
.then(response => response.json())
.then(data => {
    console.log(data)
    let product = document.getElementById("product1")
    product1.innerHTML = ``;
        let html = `<div class="col-lg-6 py-3 order-1 order-lg-1">
        <div class="card shadow">
            <img src="${data.imageUrl}" alt="Table de chevet">
        </div>
    </div>
    <div class="d-flex flex-column align-item-center col-lg-6 col-xl-5 pl-lg-5 mb-5 order-2 order-lg-2">
        <h1 class="mb-4">${data.name}</h1>
        <div class="d-flex flex-sm-row align-items-sm-center justify-content-sm-between mb-4">
            <ul class="list-inline mb-2 mb-sm-0">
                <li class="list-inline-item h4 font-weight-light mb-0">${data.price} €</li>
            </ul>
        </div>
        <p class="mb-4 text-muted">${data.description}</p>
        <form action="#">
            <div class="row">
                <div class="col-sm-6 col-lg-12 detail-option mb-3">
                    <h6 class="detail-option-heading h5">
                        Colorie
                        <span class="text-muted h6">(Obligatoire)</span>
                    </h6>`;
                    for(let varnish of data.varnish) {
                        html += `<label for="size_0" class="btn btn-sm btn-outline-secondary detail-option-btn-label mx-1"
                        data-children-count="1">
                        ${varnish}
                    </label>`
                    }
                    html += `
                </div>
            </div>
            <div class="row">
                <div class="col-12 col-lg-6 detail-option mb-5" data-children-count="1">
                    <label for="size_0" class="detail-option-heading h5" data-children-count="1">
                        Nombres
                        <span class="text-muted h6" data-children-count="0">(Obligatoire)</span>
                    </label>
                    <input class="form-control detail-quantity" type="number" name="items" value="1">
                </div>
            </div>
            <ul class="list-inline">
                <li class="list-inline-item">
                    <button class="btn btn-dark btn-lg mb-1" type="submit">
                        <i class="bi bi-cart-fill"></i>
                        Ajouter au Panier
                    </button>
                </li>
            </ul>
        </form>
    </div>`;
    product.innerHTML = html
})
