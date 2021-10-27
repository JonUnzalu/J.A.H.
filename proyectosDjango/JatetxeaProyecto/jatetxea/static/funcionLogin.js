function erabiltzailea() {
    //aqui se pillaria del prompt
    var gureErabiltzailea = {
        izena: "",
        pasahitza: ""
    }

    var erabil1 = {
        izena: "foo",
        pasahitza: "foo1"
    }
    //apuntamos b -> true:ok / false:no

    const erabiltzaileak = new Array(erabil1);

    gureErabiltzailea.izena = prompt("Sartu erabiltzaile izena: ")

    if(gureErabiltzailea.izena!="" && !(gureErabiltzailea.izena==null)){
        gureErabiltzailea.pasahitza = prompt("Sartu pasahitza: ")
    }else{
        alert("Ez zera erabiltzailea.")
        return;
    }

    if ((erabiltzaileak[0].izena == gureErabiltzailea.izena) && (erabiltzaileak[0].pasahitza == gureErabiltzailea.pasahitza)) {
        alert("Erabiltzailea zera.")
    }
    else {
        alert("Ez zera erabiltzailea.")
    }

}

function data() {




    
}

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

function bezeroa() {
    var bezeroa={
    Nan: "",
    Izena: "",
    Abizena: "",
    Telefonoa: "",
    Helbidea: "",
    PostaKodea: ""
    }
    bezeroa.Nan= prompt("Sartu Nan:")
    bezeroa.Izena= prompt("Sartu Izena:")
    bezeroa.Abizena= prompt("Sartu Abizena:")
    bezeroa.Telefonoa= prompt("Sartu Telefonoa:")
    bezeroa.Helbidea= prompt("Sartu Helbidea:")
    bezeroa.Postakodea= prompt("Sartu Helbidea:")

    const bezeroak = new Array( );
    bezeroak.push(bezeroa);
    
}