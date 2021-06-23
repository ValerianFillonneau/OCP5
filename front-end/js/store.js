// aficher le panier - function pour afficher le panier
let caddy;

function displayCaddy() {
    caddy = localStorage.getItem("product")

    if (caddy == null) {
        caddy = []
    } else {
        caddy = JSON.parse(caddy);
    }
    console.log(caddy)
    let container = document.getElementById('container')
    let html = `<table class="table">
                    <thead>
                        <tr class="text-center">
                            <th><img width="150" src=""></th>
                            <th>Article</th>
                            <th>Colorie</th>
                            <th>Prix</th>
                            <th>Quantité</th>
                            <th>Total</th>
                        <tr>
                    </thead>
                    <tbody>`
                        for(let i = 0; i < caddy.length; i++) {
                            const element = caddy[i];
                            html += `<tr class="text-center">
                                        <td><img width="150" src="${element.imageUrl}"></td>
                                        <td>${element.name}</td>
                                        <td>${element.varnish}</td>
                                        <td>${element.price/100} €</td>
                                        <td>${element.quantity}</td>
                                        <td>${(element.quantity * element.price)/100} €</td>
                                        <td><button onclick="removeitem(${i})">X</button></td>
                                    </tr>`
                        }`
                    </tbody>
                </table>`
container.innerHTML += html
}

displayCaddy()

//affiche le total TTC du panier
function displayTotals() {
    caddy = localStorage.getItem("product")
    
    if (caddy == null) {
        caddy = []
    } else {
        caddy = JSON.parse(caddy);
    }

    let total = 0;

    for (let i = 0; i < caddy.length; i++) {
        const element = caddy[i];
        
        total += (Number(element.quantity) * Number(element.price))/100
    }
    
    let delivery = total * 0.005

    let container = document.getElementById('totalsContainer')
    let html = `<div class="block mb-5">
                    <div class="block-header">
                        <h6 class="text-uppercase">Votre Commande</h6>
                    </div>
                    <div class="block-body bg-light pt-1">
                        <ul class="order-summary list-unstyled">
                            <li class="oreder-summary-item">
                                <span>Total HT</span>
                                <span>${total} €</span>
                            </li>
                            <li class="oreder-summary-item">
                                <span>Cout de livraison</span>
                                <span>${Math.round((delivery)*100)/100} €</span>
                            </li>
                            <li class="oreder-summary-item">
                                <span>Taxe</span>
                                <span>20%</span>
                            </li>
                            <li class="oreder-summary-item border-0">
                                <span>Total TTC</span>
                                <strong class="order-summary-total">${Math.round(((total + delivery)* 1.2)*100)/100} €</strong>
                            </li>
                        </ul>
                    </div>
                </div>`
    
    console.log()

    container.innerHTML += html
}

displayTotals()

//Supprimer un item du panier

function removeitem(i) {
    caddy.splice(i,1)

    localStorage.setItem("product",JSON.stringify(caddy));

    window.location.reload()
}

//Si le tableau est vide

function emptyArray(){
    if(caddy.length == 0) {
        let empty = document.getElementById('emptyCaddy')
        let html = `<p>Votre Panier est Vide</p>`

        empty.innerHTML += html
    }
}

emptyArray()


form = document.getElementById("contact")


contact.addEventListener('submit', function orderarray(e) {
    e.preventDefault();
    let firstName = document.getElementById('firstName').value;
    let lastName = document.getElementById('lastName').value;
    let email = document.getElementById('email').value;
    let address = document.getElementById('address').value;
    let city = document.getElementById('city').value;

    let contact = {
        firstName,
        lastName,
        email,
        address,
        city,
    }
    console.log(contact)

    caddy = localStorage.getItem("product");
    caddy = JSON.parse(caddy);
    let products = caddy.map(x => x.id)
     
    console.log(products)

    let body = {contact, products}
    fetch('http://localhost:3000/api/furniture/order', {
        method: "POST",
        headers: {
            'Accept': 'application/json', 
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(
            body
        )}
    )
        .then(function(res) {
            if (res.ok) {
                return res.json();
            }
        })
        .then(function(res) {
            console.log(res)
            window.location = `checkout.html?orderId=${res.orderId}`
        })
    
    }
)

/*
1a- récuperer les données du formulaire
1b- récuperer les ID des produits du panier

2- afficher les données et ID dans un tableau où ils auront leur propres tableau
a- afficher les données du formulaire dans un tableau clé-valeur 
b- afficher les ID dans un tableau de liste ordonnée listant les ID de chaque produit

3- envoyer les 2 différentes données ensemble à l'order dans le body
*/