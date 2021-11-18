$(document).ready(function() {

});

if (localStorage.getItem("estadoKarrito") !== null && localStorage.getItem("estadoKarrito").length > 0) {
    refreshCart();

    if (document.getElementById("saskiItem").innerHTML == "") {
        document.getElementById("ordainketa").innerHTML = "<h5>Nahi dituzun produktuak gehitu saskira!</h5><br><br>Hauek dira ordaintzeko erabil ahal dituzun  metodoak";
        document.getElementById("divDatos").style.display = "none";
        document.getElementById("divSaskia").style.display = "none";
        document.getElementById("parentDivForm").style.display = "none";
    }
    else {
        document.getElementById("ordainketa").innerHTML = "Aukeratu ordainketa metodoa";
        document.getElementById("parentDivForm").style.display = "none";
        document.getElementById("divSaskia").style.display = "initial";
    }
    document.getElementById("divDatos").style.display = "initial";
}
else{
    document.getElementById("ordainketa").innerHTML = "<h5>Ez daude produkturik saskian, logeatu eta Janarien orritik produktuak gehitu saskira</h5><br><br> Hauek dira ordaintzeko erabil ahal dituzun  metodoak";
    document.getElementById("divSaskia").style.display = "none"
    document.getElementById("divDatos").style.display = "none"
    document.getElementById("parentDivForm").style.display = "none"
}

//Enseña los dos formularios de pago
function showAllForms() {
    if (document.querySelectorAll('.usuarioNombreLogado').length>0) {
        if (document.getElementById("saskiItem").innerHTML != "") {
            document.getElementById("parentDivForm").style.display = "block"
            document.getElementById("divTxartela").style.display = "inline-block"
            document.getElementById("divHelbidea").style.display = "inline-block"
        }
    }
}

//Enseña solo el formulario de direccion
function showAddressForm() {
    if(document.querySelectorAll('.usuarioNombreLogado').length>0) {
        if (document.getElementById("saskiItem").innerHTML != "") {
            document.getElementById("parentDivForm").style.display = "block"
            document.getElementById("divHelbidea").style.display = "inline-block"
            document.getElementById("divTxartela").style.display = "none"
        }
    }
}

//valida los formularios de pago
//FALTA VACIAR EL CARRITO

function validateForms() {
    if (document.getElementById("divTxartela").style.display == "inline-block") {
        if (document.getElementById("pk").value != "" && document.getElementById("helbidea").value != "" &&
            document.getElementById("owner").value != "" && document.getElementById("cvv").value != "" &&
            document.getElementById("cardNumber").value != "") {

            localStorage.setItem("estadoKarrito", "");
            window.location.href = "index.html";
            alert("Eskaria ondo egin da, laster janaria zure etxera helduko da!");
        }
        else {
            alert("Mesedez bete atal guztiak");
        }
    }
    else {
        if (document.getElementById("pk").value != "" && document.getElementById("helbidea").value != "") {

            localStorage.setItem("estadoKarrito", "");
            window.location.href = "index.html";
            alert("Eskaria ondo egin da, laster janaria zure etxera helduko da!");
        }
        else {
            alert("Mesedez bete atal guztiak");
        }
    }
}

function refreshCart() {
    kopuruak = new Array();
    kopuruak = JSON.parse(localStorage.getItem("estadoKarrito"));

    //json
    //var jsonString= JSON.stringify(kopuruak);   

    let e = 0;
    let prezioTotala = 0;
    let prezioLinea = 0;
    for (let i = 0; i < kopuruak.length; i++) {
        if (kopuruak[i].kopurua > 0) {
            var uwu = kopuruak[i].prezioa;

            if (e > 0) {
                prezioLinea = parseFloat(uwu.replace('€', '')) * parseInt(kopuruak[i].kopurua)
                prezioTotala = prezioTotala + prezioLinea;
                document.getElementById("saskiItem").innerHTML = document.getElementById("saskiItem").innerHTML + "<li>" + prezioLinea.toFixed(2) + "€..........................." + kopuruak[i].desJanari + " / x" + kopuruak[i].kopurua + "</li>";
            }
            else {
                prezioTotala = parseFloat(uwu.replace('€', '')) * parseInt(kopuruak[i].kopurua);
                document.getElementById("saskiItem").innerHTML = "<li>" + prezioTotala.toFixed(2) + "€..........................." + kopuruak[i].desJanari + " / x" + kopuruak[i].kopurua + "</li>";
            }
            e++;
        }
    }
    if (document.getElementById("saskiItem").innerHTML != "") {
        document.getElementById("prezioaTotala").innerHTML = "Prezioa guztira: " + prezioTotala.toFixed(2) + "€"
    }
}