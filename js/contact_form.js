window.addEventListener('DOMContentLoaded', () => {

    // Salut dinamic in functie de ora
    const headerParagraph = document.querySelector('header p');
    if (headerParagraph) {
        const hour = new Date().getHours();
        let greeting = '';
        if (hour >= 6 && hour < 12) {
            greeting = 'Buna dimineata! Bine ai venit pe pagina mea.';
        } else if (hour >= 12 && hour < 18) {
            greeting = 'Buna ziua! Bine ai venit pe pagina mea.';
        } else {
            greeting = 'Buna seara! Bine ai venit pe pagina mea.';
        }
        headerParagraph.textContent = greeting;
    }

    // Validare formular
    const form = document.querySelector('form');
    const feedback = document.getElementById('form-feedback');

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const nume = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const mesaj = document.getElementById('message').value.trim();

        if (nume.length < 2) {
            feedback.textContent = 'Numele trebuie sa aiba minim 2 caractere.';
            feedback.style.color = 'red';
            return;
        }
        if (!email.includes('@')) {
            feedback.textContent = 'Adresa de email trebuie sa contina @.';
            feedback.style.color = 'red';
            return;
        }
        if (mesaj.length < 10) {
            feedback.textContent = 'Mesajul trebuie sa aiba minim 10 caractere.';
            feedback.style.color = 'red';
            return;
        }

        feedback.textContent = 'Mesajul a fost trimis cu succes!';
        feedback.style.color = 'green';
        form.reset();
    });

    // Dark mode toggle
    const darkModeBtn = document.getElementById('dark-mode-toggle');
    darkModeBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        darkModeBtn.textContent = document.body.classList.contains('dark-mode')
            ? '\u2600 Light Mode'
            : '\uD83C\uDF19 Dark Mode';
    });

    // Toggle sectiuni la click pe h2 din main
    document.querySelectorAll('main h2').forEach(h2 => {
        h2.style.cursor = 'pointer';
        h2.addEventListener('click', () => {
            const section = h2.parentElement;
            Array.from(section.children).forEach(child => {
                if (child !== h2) {
                    child.classList.toggle('hidden');
                }
            });
        });
    });

});
