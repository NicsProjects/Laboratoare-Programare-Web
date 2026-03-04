const form = document.querySelector('form');

form.addEventListener('submit', function(event) {
    event.preventDefault(); // Opreste reload-ul paginii
    const feedbackElement = document.getElementById("form-feedback");
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (name.length < 2 ){
        feedback_Text.textContent = "Numele trebuie să conțină cel puțin 2 caractere.";
         feedback_Text.style.color = "red";
         return;
    }
    if (!email.includes('@')){
            feedback_Text.textContent = "Adresa de email trebuie să conțină '@'.";
            feedback_Text.style.color = "red";
        return;
    }
    if (message.length < 10){
        feedback_Text.textContent = "Mesajul trebuie să conțină cel puțin 10 caractere.";
         feedback_Text.style.color = "red";
        return;
    }
    feedback_Text.textContent = `Multumim ${name}! Mesajul a fost trimis cu succes!`;
    feedback_Text.style.color = "green";
    form.reset(); // Reseteaza formularul
});