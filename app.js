document.addEventListener('DOMContentLoaded', () => {
    const tradingForm = document.getElementById('tradingForm');

    tradingForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const amount = e.target.querySelector('input[type="number"]').value;
        const asset = e.target.querySelector('select').value;
        
        if (amount > 0) {
            alert(`Ordre d'achat envoyé : ${amount} USD de ${asset}.`);
            tradingForm.reset();
        } else {
            alert("Veuillez entrer un montant valide.");
        }
    });
});
