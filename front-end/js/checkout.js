window.onload = function() {
    let searchParams = new URLSearchParams(window.location.search);
    let orderId = searchParams.get("orderId")
    let price = searchParams.get("price")
    
    getOrder(orderId, price)
}
/**
 * Récupère un numéro de commande par son ID puis l'affiche
 * @param {string} orderId 
 */
function getOrder(orderId, price) {

    let container = document.getElementById("orderContainer")
    let html = `<p> Votre numéro de commande est le n° ${orderId} pour un montant de ${price}`;
    container.innerHTML += html
       
}