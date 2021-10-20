var loginState = "Login";
if (sessionStorage.getItem("logState") !== null && sessionStorage.getItem("logState") == "true") {
    loginState = "Logout";
    document.getElementById("loginState").innerHTML = loginState;
    document.querySelectorAll(".kopuruak").forEach(a=>a.style.display = "initial");
} else {
    loginState = "Login";
    sessionStorage.setItem("logState", "false");
    document.getElementById("loginState").innerHTML = loginState;
    document.querySelectorAll(".kopuruak").forEach(a=>a.style.display = "none");
}


var kopuruak = new Array()
if (sessionStorage.getItem("estadoKarrito") !== null && sessionStorage.getItem("estadoKarrito").length > 0) {
    kopuruak = [];
    kopuruak = JSON.parse(sessionStorage.getItem("estadoKarrito"));

    if (window.location.href.endsWith("About.html")){
        for (let i = 0; i < kopuruak.length; i++) {
            document.getElementById("kopurua" + i).innerHTML = kopuruak[i].kopurua;
        }
    }
    else if(window.location.href.endsWith("saskia.html")){
        refreshCart();
    }
}

//si estamos en saskia
if(window.location.href.endsWith("saskia.html")){
    if(loginState == "Logout"){ //si estamos logueados
        if(document.getElementById("saskiItem").innerHTML==""){
            document.getElementById("ordainketa").innerHTML = "<h5>Nahi dituzun produktuak gehitu saskira!</h5><br><br>Hauek dira ordaintzeko erabil ahal dituzun  metodoak";
            document.getElementById("divDatos").style.display = "none";
            document.getElementById("divSaskia").style.display = "none";
            document.getElementById("parentDivForm").style.display = "none";
        }
        else{
            document.getElementById("ordainketa").innerHTML = "Aukeratu ordainketa metodoa";
            document.getElementById("parentDivForm").style.display = "none";
            document.getElementById("divSaskia").style.display = "initial";
        }
        document.getElementById("divDatos").style.display = "initial";
    }
    else{                       //si no estamos logueados
        document.getElementById("ordainketa").innerHTML = "<h5>Logeatu eta nahi dituzun produktuak gehitu saskira!</h5><br><br> Hauek dira ordaintzeko erabil ahal dituzun  metodoak";
        document.getElementById("divSaskia").style.display = "none"
        document.getElementById("divDatos").style.display = "none"
        document.getElementById("parentDivForm").style.display = "none"
    }
}

//valida los formularios de pago
function validateForms(){
    if(document.getElementById("divTxartela").style.display == "inline-block"){
        if(document.getElementById("pk").value != "" && document.getElementById("helbidea").value != "" && 
            document.getElementById("owner").value != "" && document.getElementById("cvv").value !="" && 
            document.getElementById("cardNumber").value !=""){
                kopuruak = [];
                sessionStorage.setItem("estadoKarrito", "");
                window.location.href = "index.html";
                alert("Eskaria ondo egin da, laster janaria zure etxera helduko da!");
        }
        else{
            alert("Mesedez bete atal guztiak");
        }
    }
    else{
        if(document.getElementById("pk").value != "" && document.getElementById("helbidea").value != ""){
            kopuruak = [];
            sessionStorage.setItem("estadoKarrito", "");
            window.location.href = "index.html";
            alert("Eskaria ondo egin da, laster janaria zure etxera helduko da!");
        }
        else{
            alert("Mesedez bete atal guztiak");
        }
    }
}

//metodo para comprobar si hemos introducido el usuario correcto
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
            document.querySelectorAll(".kopuruak").forEach(a=>a.style.display = "initial");
        }
        else {
            alert("Ez zera erabiltzailea.")
        }
    }
    else{
        sessionStorage.clear();
        loginState = "Login";
        document.getElementById("loginState").innerHTML = loginState;
        document.querySelectorAll(".kopuruak").forEach(a=>a.style.display = "none");
    }
}

//Enseña los dos formularios de pago
function showAllForms(){
    if(loginState =="Logout"){
        if(document.getElementById("saskiItem").innerHTML!=""){
            document.getElementById("parentDivForm").style.display = "block"
            document.getElementById("divTxartela").style.display = "inline-block"
            document.getElementById("divHelbidea").style.display = "inline-block"
        }
    }
}

//Enseña solo el formulario de direccion
function showAddressForm(){
    if(loginState =="Logout"){
        if(document.getElementById("saskiItem").innerHTML!=""){
            document.getElementById("parentDivForm").style.display = "block"
            document.getElementById("divHelbidea").style.display = "inline-block"
            document.getElementById("divTxartela").style.display = "none"
        }
    }
}

//Para cargar el carrito
function initFoods() {
    if (kopuruak.length > 0) {
    }
    else {
        for (let i = 0; i < 14; i++) {
            const kopuruxJanari = {
                kopurua: 0,
                kopuruMax: 20,
                prezioa: document.getElementById("prezioa"+i).innerHTML,
                idJanari: i,
                desJanari: document.getElementById("janari"+i).innerHTML
            }
            kopuruak.push(kopuruxJanari)
            document.getElementById("kopurua" + i).innerHTML = kopuruak[i].kopurua;
        }
        sessionStorage.setItem("estadoKarrito", JSON.stringify(kopuruak));
    }
}


function addFood(codJanaria) {
    if (kopuruak[codJanaria].kopurua < kopuruak[codJanaria].kopuruMax) {
        kopuruak[codJanaria].kopurua = kopuruak[codJanaria].kopurua + 1;
        document.getElementById("kopurua" + codJanaria).innerHTML = kopuruak[codJanaria].kopurua;

        sessionStorage.setItem("estadoKarrito", JSON.stringify(kopuruak));
    }
}

function subtractFood(codJanaria) {
    if (kopuruak[codJanaria].kopurua > 0) {
        kopuruak[codJanaria].kopurua = kopuruak[codJanaria].kopurua - 1;
        document.getElementById("kopurua" + codJanaria).innerHTML = kopuruak[codJanaria].kopurua;

        sessionStorage.setItem("estadoKarrito", JSON.stringify(kopuruak));
    }
}

function refreshCart(){
    let e =0;
    let prezioTotala = 0;
    let prezioLinea = 0;
    for(let i=0; i<kopuruak.length;i++){
        if(kopuruak[i].kopurua>0){
            var uwu = kopuruak[i].prezioa;

            if(e>0){
                prezioLinea = parseFloat(uwu.replace('€','')) * parseInt(kopuruak[i].kopurua)
                prezioTotala = prezioTotala + prezioLinea;
                document.getElementById("saskiItem").innerHTML = document.getElementById("saskiItem").innerHTML + "<li>" + prezioLinea.toFixed(2) + "€..........................." + kopuruak[i].desJanari + " / x" + kopuruak[i].kopurua + "</li>";
            }
            else{
                prezioTotala = parseFloat(uwu.replace('€','')) * parseInt(kopuruak[i].kopurua);
                document.getElementById("saskiItem").innerHTML = "<li>" + prezioTotala.toFixed(2) + "€..........................." + kopuruak[i].desJanari + " / x" + kopuruak[i].kopurua + "</li>";
            }
            e++;
        }
    }
    if(document.getElementById("saskiItem").innerHTML!=""){
        document.getElementById("prezioaTotala").innerHTML = "Prezioa guztira: " + prezioTotala.toFixed(2) + "€"
    }
}

function onTabClosing() {
    sessionStorage.clear();
}


function beherapenak() {
    var erosketa={
        bezeroizena: "",
        produktuizena: "",
        produktukantitatea: "",
        produktuprezioa: "",
        
        }
        
        erosketa.bezeroizena= prompt("Nola deitzen zara?")
        erosketa.produktuizena= prompt("Zer erosi nahi duzu?")
        erosketa.produktukantitatea= prompt("Zenbat erosi nahi dituzu?")
        erosketa.produktuprezioa= prompt("Zer preziotara erosi nahi duzu?")
        var guztira= erosketa.produktukantitatea*erosketa.produktuprezioa
        var beherapena = guztira - 5
        if (guztira>20) {
            alert("Saskia\n"+ erosketa.bezeroizena+"ren erosketa:\n"+erosketa.produktuizena+":"+erosketa.produktukantitatea+"x"+erosketa.produktuprezioa+"= "+ guztira+"€\n" + "Beherapenarekin:\n"+erosketa.produktuizena+":"+erosketa.produktukantitatea+"x"+erosketa.produktuprezioa+"= "+ beherapena+"€")         
        }
           else{
           alert("Saskia\n"+ erosketa.bezeroizena+"ren erosketa guztira:\n"+erosketa.produktuizena+":"+erosketa.produktukantitatea+"x"+erosketa.produktuprezioa+"= "+ guztira+"€")   
           }

    
}

function saskia() {
    var erosketa={
        bezeroizena: "",
        produktuizena: "",
        produktukantitatea: "",
        produktuprezioa: "",
        
        }
        
        erosketa.bezeroizena= prompt("Nola deitzen zara?")
        erosketa.produktuizena= prompt("Zer erosi nahi duzu?")
        erosketa.produktukantitatea= prompt("Zenbat erosi nahi dituzu?")
        erosketa.produktuprezioa= prompt("Zer preziotara erosi nahi duzu?")
        var guztira= erosketa.produktukantitatea*erosketa.produktuprezioa
           
           alert("Saskia\n"+ erosketa.bezeroizena+"ren erosketa:\n"+erosketa.produktuizena+":"+erosketa.produktukantitatea+"x"+erosketa.produktuprezioa+"= "+ guztira+"€")   
}