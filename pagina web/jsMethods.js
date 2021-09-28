function erosketak() {
    var erosketa={
        CodEskaera: "",
        NanBezeroa: "",
        NanBanatzailea: "",
        IdJanaria: "",
        EskaeraData: "",
        Entregatua: "",
        PrezioTotala: ""
        }
        
        erosketa.CodEskaera= prompt("Sartu CodEskaera:")
        erosketa.NanBezeroa= prompt("Sartu NanBezeroa:")
        erosketa.NanBanatzailea= prompt("Sartu NanBanatzailea:")
        erosketa.IdJanaria= prompt("Sartu IdJanaria:")
        erosketa.EskaeraData= prompt("Sartu EskaeraData:")
        erosketa.Entregatua= prompt("Sartu Entregatua:")
        erosketa.PrezioTotala= prompt("Sartu PrezioTotala:")

        const erosketak = new Array( );
        erosketak.forEach(erosketa => {
            erosketak.push(erosketa);
            
        });
}

var kopuruak = new Array();

function initFoods(){
    for(let i=0;i<14;i++){
        const kopuruxJanari = {
            kopurua: 0,
            idJanari : i
        }
        kopuruak.push(kopuruxJanari)
        document.getElementById("kopurua"+i).innerHTML = kopuruak[i].kopurua;
    }
}


function addFood(codJanaria){
    kopuruak[codJanaria].kopurua = kopuruak[codJanaria].kopurua + 1;
    document.getElementById("kopurua"+codJanaria).innerHTML = kopuruak[codJanaria].kopurua;
}

function subtractFood(codJanaria){
    if(kopuruak[codJanaria].kopurua>0){
        kopuruak[codJanaria].kopurua = kopuruak[codJanaria].kopurua - 1;
        document.getElementById("kopurua"+codJanaria).innerHTML = kopuruak[codJanaria].kopurua;
    }
}