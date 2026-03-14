const form = document.querySelector('form');

form.addEventListener('submit', function(event) {
    event.preventDefault(); // Opreste reload-ul paginii
    const feedback_Text = document.getElementById("form-feedback");
    const feedback_Text2 = document.getElementById("form-feedback2");

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

     if (name.trim().length < 2 || !email.includes('@') || !message.trim().length) {
        feedback_Text2.textContent = "Te rog completează toate câmpurile înainte de a trimite mesajul.";
        feedback_Text2.style.color = "red";
        alert("Te rog completează toate câmpurile înainte de a trimite mesajul.");
        //return;
    }

   

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
    if (message.trim().length < 10){
        feedback_Text.textContent = "Mesajul trebuie să conțină cel puțin 10 caractere.";
         feedback_Text.style.color = "red";
        return;
    }
     if (name && email && message) {
        alert("Mesajul a fost trimis cu succes!");
        form.reset(); // Reseteaza formularul 
    }else {
        alert("Te rog completează toate câmpurile înainte de a trimite mesajul.");
        
    }
    feedback_Text.textContent = `Multumim ${name}! Mesajul a fost trimis cu succes!`;
    feedback_Text2.textContent = "        ";
    feedback_Text.style.color = "green";
    form.reset(); // Reseteaza formularul
});