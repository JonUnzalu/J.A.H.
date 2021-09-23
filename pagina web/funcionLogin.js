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
    
}

function bezeroa() {
    var bezeroa={
    Nan:prompt("Sartu Nan:"),
    Izena: prompt("Sartu Izena:"),
    Abizena: prompt("Sartu Abizena:"),
    Telefonoa: prompt("Sartu Telefonoa:"),
    Helbidea: prompt("Sartu Helbidea:"),
    PostaKodea: prompt("Sartu PostaKodea:") 
    }
    const bezeroak = new Array( );
    bezeroak.push(bezeroa);
    
}