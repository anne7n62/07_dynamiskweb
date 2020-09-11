        let filter = "alle";
        let retter;

        document.addEventListener("DOMContentLoaded", loadJSON);
        const popop = document.querySelector("#popop");

        async function loadJSON() {
            const JSONData = await fetch("https://spreadsheets.google.com/feeds/list/17Dd7DvkPaFamNUdUKlrFgnH6POvBJXac7qyiS6zNRw0/od6/public/values?alt=json");
            retter = await JSONData.json();
            addEventListenersToButtons();
            visRetter();
        }


        function visRetter() {
            const list = document.querySelector("#liste");
            const menuTemplate = document.querySelector("template");
            list.innerHTML = "";

            retter.feed.entry.forEach(ret => {
                if (filter == "alle" || filter == ret.gsx$kategori.$t.toLowerCase()) {
                    let clone = menuTemplate.cloneNode(true).content;
                    clone.querySelector(".navn").textContent = ret.gsx$navn.$t;
                    clone.querySelector(".kort").textContent = ret.gsx$kort.$t;
                    clone.querySelector(".pris").textContent = "Pris: " + ret.gsx$pris.$t + " kr.";
                    clone.querySelector("img").src = "imgs/small/" + ret.gsx$billede.$t + "-sm.jpg";

                    clone.querySelector("article").addEventListener("click", () => visDetaljer(ret));

                    list.appendChild(clone);
                    console.log(ret);

                }
            })
        }

        function visDetaljer(ret) {
            console.log(ret);
            popop.querySelector("h2").textContent = ret.gsx$navn.$t;
            popop.querySelector("img").src = "imgs/small/" + ret.gsx$billede.$t + "-sm.jpg";
            popop.querySelector(".pris").textContent = ret.gsx$pris.$t + " kr.";
            popop.querySelector(".lang").textContent = ret.gsx$lang.$t;
            popop.style.display = "block";

        }


        document.querySelector("#luk").addEventListener("click", () => popop.style.display = "none");

        function addEventListenersToButtons() {
            document.querySelectorAll(".filter").forEach((btn) => {
                btn.addEventListener("click", filterBTNs);
            });
        }


        function filterBTNs() {

            filter = this.dataset.kategori;

            document.querySelector("h1").textContent = this.textContent;

            document.querySelectorAll(".filter").forEach((btn) => {
                btn.classList.remove("valgt");
                btn.classList.remove("valgt");


            })
            this.classList.add("valgt");
            this.classList.add("red");


            visRetter();
        }
