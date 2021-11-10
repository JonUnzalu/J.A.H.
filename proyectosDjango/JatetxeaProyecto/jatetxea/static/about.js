//ABOUT.HTML
var kopuruak = new Array()
var cantidadComidas = document.querySelectorAll('.kopuruak').length;

//Pillamos el id de la primera comida de la página :)
var idPrimeraComida = parseInt(document.querySelectorAll(".janariId")[0].innerHTML);     

if (sessionStorage.getItem("estadoKarrito") !== null && sessionStorage.getItem("estadoKarrito").length > 0) {
    kopuruak = [];
    kopuruak = JSON.parse(sessionStorage.getItem("estadoKarrito"));

    for (let i = 1; i < cantidadComidas+1; i++) {

        document.getElementById("kopurua" + idPrimeraComida).innerHTML = kopuruak[idPrimeraComida-1].kopurua;
        idPrimeraComida++;
    }
}
else{
    if (kopuruak.length > 0) {
    }
    else {
        for (let i = 1; i < cantidadComidas+1; i++) {
            const kopuruxJanari = {
                kopurua: 0,
                kopuruMax: 20,
                prezioa: document.getElementById("prezioa" + i).innerHTML,
                idJanari: i,
                desJanari: document.getElementById("janari" + i).innerHTML
            }
            kopuruak.push(kopuruxJanari)
            document.getElementById("kopurua" + i).innerHTML = kopuruak[i-1].kopurua;
        }
        sessionStorage.setItem("estadoKarrito", JSON.stringify(kopuruak));
    }
}



function addFood(codJanaria) {
    if (kopuruak[codJanaria-1].kopurua < kopuruak[codJanaria-1].kopuruMax) {
        kopuruak[codJanaria-1].kopurua = kopuruak[codJanaria-1].kopurua + 1;
        document.getElementById("kopurua" + codJanaria).innerHTML = kopuruak[codJanaria-1].kopurua;

        sessionStorage.setItem("estadoKarrito", JSON.stringify(kopuruak));
    }
}

function subtractFood(codJanaria) {
    if (kopuruak[codJanaria-1].kopurua > 0) {
        kopuruak[codJanaria-1].kopurua = kopuruak[codJanaria-1].kopurua - 1;
        document.getElementById("kopurua" + codJanaria).innerHTML = kopuruak[codJanaria-1].kopurua;

        sessionStorage.setItem("estadoKarrito", JSON.stringify(kopuruak));
    }
}