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


const form = document.querySelector('form');
form.addEventListener('submit', function(event) {
 event.preventDefault(); // Opreste reload-ul paginii
    const feedback_Text2 = document.getElementById("form-feedback2");
    
    const nume = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const mesaj = document.getElementById("message").value;

    if (nume.trim().length < 2 || !email.includes('@') || !mesaj.trim().length) {
        feedback_Text2.textContent = "Te rog completează toate câmpurile înainte de a trimite mesajul.";
        alert("Te rog completează toate câmpurile înainte de a trimite mesajul.");
        return;
    }

    if (nume && email && mesaj) {
        alert("Mesajul a fost trimis cu succes!");
        form.reset(); // Reseteaza formularul 
    }else {
        alert("Te rog completează toate câmpurile înainte de a trimite mesajul.");
        
    }
});
