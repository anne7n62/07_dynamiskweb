//variabler/konstanter
let filter = "alle";
let steder;

//funktionen loadJSON kaldes, når DOMen er lukket
document.addEventListener("DOMContentLoaded", loadJSON);
const popop = document.querySelector("#popop");


//json henter data fra google sheet. indholdet sættes = funktion steder
async function loadJSON() {

    const JSONData = await fetch("https://spreadsheets.google.com/feeds/list/1HM38zJiPVJez_N7FT8A_-ysQwbudtVIVaQspUv_v9jY/od6/public/values?alt=json");

    steder = await JSONData.json();

    //funktioner kaldes
    addEventListenersToButtons();
    visSteder();
}


function visSteder() {
    console.log("funktion steder");

    //konstanter for liste og template
    const list = document.querySelector("#liste");
    const stederTemplate = document.querySelector("template");

    //indholdet i konstanten list bliver nulstillet
    list.innerHTML = "";


    //steder-array bliver gennemgået sted for sted
    steder.feed.entry.forEach(sted => {
        if (filter == "alle" || filter == sted.gsx$kategori.$t.toLowerCase()) {
            let clone = stederTemplate.cloneNode(true).content;

          //det nye indhold bliver placeret
            clone.querySelector(".navn").textContent = sted.gsx$navn.$t;
            clone.querySelector(".kort").textContent = sted.gsx$kort.$t;
           // clone.querySelector("img").src = "imgs/small/" + ret.gsx$billede.$t + "-sm.jpg";


           //når der klikkes på vores article-tag kaldes funktionen visDetaljer
 clone.querySelector("article").addEventListener("click", () => visDetaljer(sted));

            list.appendChild(clone);
            console.log(sted);

        }
    })
}

//funktion indsætter data i vores popop
function visDetaljer(sted) {
    console.log(sted);
    popop.querySelector("h2").textContent = sted.gsx$navn.$t;
    //popop.querySelector("img").src = "imgs/small/" + ret.gsx$billede.$t + "-sm.jpg";
    popop.querySelector(".lang").textContent = sted.gsx$lang.$t;
    popop.style.display = "block";

}


document.querySelector("#luk").addEventListener("click", () => popop.style.display = "none");


//funktionen lytter efter om der klikkes på knapperne
function addEventListenersToButtons() {
    document.querySelectorAll(".filter").forEach((btn) => {
        btn.addEventListener("click", filterBTNs);
    });
}

//funktion vælger hvilke data der skal vises når man trykke på knappen
function filterBTNs() {
 filter = this.dataset.kategori;

    document.querySelector("h1").textContent = this.textContent;
document.querySelectorAll(".filter").forEach((btn) => {
        btn.classList.remove("valgt");
})

    this.classList.add("valgt");

    visSteder();
}
