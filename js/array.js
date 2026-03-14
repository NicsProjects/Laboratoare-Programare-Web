// Array din lista de educatie
const listaEducatie = document.querySelector("ol");
const arrayEducatie = Array.from(listaEducatie.querySelectorAll("li"))
    .map(li => li.textContent.trim());
console.log("Array educatie:", arrayEducatie);

// Filtru 1: doar elementele care contin "Master"
const filtruMaster = arrayEducatie.filter(item => item.includes("Master"));
console.log("Filtru Master:", filtruMaster);

// Filtru 2: studii incepute dupa 2020
const filtruDupa2020 = arrayEducatie.filter(item => {
    const anInceput = parseInt(item.split('-')[0]);
    return anInceput >= 2020;
});
console.log("Filtru dupa 2020:", filtruDupa2020);

// Primul cuvant relevant din fiecare element (Master, Licenta, Liceu)
const tipuriStudii = arrayEducatie.map(item => item.split(':')[1].trim().split(' ')[0]);
console.log("Tipuri studii:", tipuriStudii);

// Total ani de studiu cu reduce()
const totalAni = arrayEducatie.reduce((total, item) => {
    const ani = item.match(/(\d{4})-(\d{4})/);
    if (ani) {
        return total + (parseInt(ani[2]) - parseInt(ani[1]));
    }
    return total;
}, 0);
console.log("Total ani de studiu:", totalAni);

// Bonus: proiecte afisate in sectiunea #projects
const proiecte = [
    { titlu: "Pagina web personala", tehnologie: "HTML, CSS, JS" },
    { titlu: "Formular de contact", tehnologie: "JavaScript" },
    { titlu: "Aplicatie web", tehnologie: "Node.js" }
];

const sectionProjects = document.getElementById("projects");
if (sectionProjects) {
    proiecte.forEach(proiect => {
        const card = document.createElement("div");
        card.classList.add("project-card");
        card.innerHTML = "<h3>" + proiect.titlu + "</h3><p>" + proiect.tehnologie + "</p>";
        sectionProjects.appendChild(card);
    });
}
