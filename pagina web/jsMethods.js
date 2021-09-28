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

var kopurua = 0;
document.getElementById("kopurua").innerHTML = kopurua;


function getFood(codJanaria){
    var kopurua = 1;
    return kopurua;
}

function addFood(codJanaria){
    kopurua = kopurua + 1;
    document.getElementById("kopurua").innerHTML = kopurua;
}

function subtractFood(codJanaria){
    kopurua = kopurua - 1;
    document.getElementById("kopurua").innerHTML = kopurua;
}