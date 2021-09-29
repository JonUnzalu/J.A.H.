function erabiltzailea() {
    if (loginState == "Login") {
        //aqui se pillaria del prompt
        var gureErabiltzailea = {
            izena: "",
            pasahitza: ""
        }

        var erabil1 = {
            izena: "admin",
            pasahitza: "admin"
        }
        //apuntamos b -> true:ok / false:no

        const erabiltzaileak = new Array(erabil1);

        gureErabiltzailea.izena = prompt("Sartu erabiltzaile izena: ")

        if (gureErabiltzailea.izena != "" && !(gureErabiltzailea.izena == null)) {
            gureErabiltzailea.pasahitza = prompt("Sartu pasahitza: ")
        } else {
            alert("Ez zera erabiltzailea.")
            return;
        }

        if ((erabiltzaileak[0].izena == gureErabiltzailea.izena) && (erabiltzaileak[0].pasahitza == gureErabiltzailea.pasahitza)) {
            alert("Erabiltzailea zera.")
            sessionStorage.setItem("logState", "true");
        }
        else {
            alert("Ez zera erabiltzailea.")
        }
    }
    else{
        sessionStorage.clear();
        loginState = "Login";
        document.getElementById("loginState").innerHTML = loginState;
    }
}

var loginState = "Login";
if (sessionStorage.getItem("logState") !== null && sessionStorage.getItem("logState") == "true") {
    loginState = "Logout";
    document.getElementById("loginState").innerHTML = loginState;
} else {
    loginState = "Login";
    sessionStorage.setItem("logState", "false");
    document.getElementById("loginState").innerHTML = loginState;
}

var kopuruak = new Array()
if (sessionStorage.getItem("estadoKarrito") !== null && sessionStorage.getItem("estadoKarrito").length > 0) {
    kopuruak = [];
    kopuruak = JSON.parse(sessionStorage.getItem("estadoKarrito"));

    for (let i = 0; i < kopuruak.length; i++) {
        document.getElementById("kopurua" + i).innerHTML = kopuruak[i].kopurua;
    }
}

function initFoods() {
    if (kopuruak.length > 0) {
    }
    else {
        for (let i = 0; i < 14; i++) {
            const kopuruxJanari = {
                kopurua: 0,
                idJanari: i
            }
            kopuruak.push(kopuruxJanari)
            document.getElementById("kopurua" + i).innerHTML = kopuruak[i].kopurua;
        }
        sessionStorage.setItem("estadoKarrito", JSON.stringify(kopuruak));
    }
}


function addFood(codJanaria) {
    kopuruak[codJanaria].kopurua = kopuruak[codJanaria].kopurua + 1;
    document.getElementById("kopurua" + codJanaria).innerHTML = kopuruak[codJanaria].kopurua;

    sessionStorage.setItem("estadoKarrito", JSON.stringify(kopuruak));
}

function subtractFood(codJanaria) {
    if (kopuruak[codJanaria].kopurua > 0) {
        kopuruak[codJanaria].kopurua = kopuruak[codJanaria].kopurua - 1;
        document.getElementById("kopurua" + codJanaria).innerHTML = kopuruak[codJanaria].kopurua;

        sessionStorage.setItem("estadoKarrito", JSON.stringify(kopuruak));
    }
}

function onTabClosing() {
    sessionStorage.clear();
}
