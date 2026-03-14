
  const listaEducatie = document.querySelector("ol");
  const arrayEducatie = Array.from(listaEducatie.querySelectorAll("li"))
   .map(li => li.textContent.trim());
  console.log(arrayEducatie);
