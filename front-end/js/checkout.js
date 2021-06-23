window.onload = function() {
    let searchParams = new URLSearchParams(window.location.search);
    let orderId = searchParams.get("orderId")
    
    getOrder(orderId)
}
/**
 * Récupère un numéro de commande par son ID puis l'affiche
 * @param {string} orderId 
 */
function getOrder(orderId) {

    let container = document.getElementById("orderContainer")
    let html = `<p> Votre numéro de commande est le n° ${orderId}.`;
    container.innerHTML += html
    
}