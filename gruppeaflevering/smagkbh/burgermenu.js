//Kalder funktionen sidenVises, når den er loadet
window.addEventListener("load", sidenVises);


// BURGERMENU ----------------------------------------------------------


// Lytter om der bliver klikket på menuknappen
function sidenVises() {
    console.log("sidenVises");
    document.querySelector("#menuknap").addEventListener("click", toggleMenu);
}

//når jeg klikker på menu skal den gå ned i togglemenu
//åbner og lukker menuen

function toggleMenu() {
    console.log("toggleMenu");
    document.querySelector("#menu").classList.toggle("hidden");

    let erSkjult = document.querySelector("#menu").classList.contains("hidden");

    if (erSkjult == true) {
        document.querySelector("#menuknap").textContent = "☰";
    } else {
        document.querySelector("#menuknap").textContent = "×";
    }
}

//toggle: hvis den ikke er der tilføjer man hidden, hvis den ikke er der tilføjer man

//indeholder classe menu har hidden. hvis den indeholder hidden hvad betyder det
