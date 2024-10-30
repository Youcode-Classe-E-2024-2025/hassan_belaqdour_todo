let modal = document.querySelector('#modal');


function zidtsck() {
    modal.classList.remove('hidden'); // Affiche la modal en retirant 'hidden'
}

// Fonction pour fermer la modal
function closeModal() {
    modal.classList.add('hidden'); // Cache la modal en ajoutant 'hidden'
}