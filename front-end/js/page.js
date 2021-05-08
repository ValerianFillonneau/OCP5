fetch('http://localhost:3000/api/furniture')
.then(response => response.json())
.then(data => {
    console.log(data)
    let container = document.getElementById("productContainer")
    container.innerHTML = ``;
    for(let i in data) {
        console.log(data[i])
        let html = `<div class="col-12 col-lg-3 mt-4">
        <div class="card shadow">
            <img src="${data[i].imageUrl}" alt="table de chevet" class="card-img-top">
            <div class="card-body">
                <h5 class="card-title">${data[i].name}</h5>
                <p class="card-text">${data[i].price} €</p>
                <a href="../html/product1.html" class="btn btn-primary stretched-link"> Voir le produit</a>
            </div>
        </div>
    </div>`;
    container.innerHTML += html 
    }
});

