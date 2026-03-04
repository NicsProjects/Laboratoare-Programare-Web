// Salut personalizat în funcție de ora zilei
window.addEventListener('DOMContentLoaded', () => {
    const headerParagraph = document.querySelector('header p');
    if (headerParagraph) {
        const hour = new Date().getHours();
        let greeting = '';
        if (hour >= 6 && hour < 12) {
            greeting = 'Bună dimineața! Bine ai venit pe pagina mea.';
        } else if (hour >= 12 && hour < 18) {
            greeting = 'Bună ziua! Bine ai venit pe pagina mea.';
        } else {
            greeting = 'Bună seara! Bine ai venit pe pagina mea.';
        }
        headerParagraph.textContent = greeting;
    }
});
function submitForm() {
    const nume = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const mesaj = document.getElementById("message").value;
    console.log("Nume:", nume);
    console.log("Email:", email);
    console.log("Mesaj:", mesaj);
    console.warn("Goodbye World!");
    // Previne trimiterea formularului
    return false;
}
