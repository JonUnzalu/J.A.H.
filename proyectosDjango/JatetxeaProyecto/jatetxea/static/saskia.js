$(document).ready(function() {
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

    $("#confirm-purchase").click(function(){
        var expreg = new RegExp(/^[0-9]{16}$/);
        var cn = document.getElementById("cardNumber").value;
        if (document.getElementById("divTxartela").style.display == "inline-block") {
            if (document.getElementById("pk").value != ""  && document.getElementById("helbidea").value != "" &&
                document.getElementById("owner").value != "" && document.getElementById("cvv").value != "" &&
               cn != ""&& expreg.test(cn)){
                
                alert("Zure eskaria ondo egin da. Laster janaria zure atean izango duzu.");
                confirmarPedido();
            }
            else {
                alert("Mesedez bete atal guztiak");
            }
        }
        else {
            if (document.getElementById("pk").value != "" && document.getElementById("helbidea").value != "") {
                alert("Zure eskaria ondo egin da. Laster janaria zure atean izango duzu.");
                confirmarPedido();
            }
            else {
                alert("Mesedez bete atal guztiak");
            }
        }
    })

    $("#creditoDiv").click(function(){
        if (document.querySelectorAll('.usuarioNombreLogado').length>0) {
            if (document.getElementById("saskiItem").innerHTML != "") {
                document.getElementById("parentDivForm").style.display = "block"
                document.getElementById("divTxartela").style.display = "inline-block"
                document.getElementById("divHelbidea").style.display = "inline-block"
            }
        }
    });

    $("#efectivoDiv").click(function(){
        if(document.querySelectorAll('.usuarioNombreLogado').length>0) {
            if (document.getElementById("saskiItem").innerHTML != "") {
                document.getElementById("parentDivForm").style.display = "block"
                document.getElementById("divHelbidea").style.display = "inline-block"
                document.getElementById("divTxartela").style.display = "none"
            }
        }
    });
    
    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }

    function confirmarPedido(){
        var resultado ="";
        var csrftoken = getCookie('csrftoken')
        kopuruak = [];
        kopuruak = JSON.parse(localStorage.getItem("estadoKarrito"));

        if (kopuruak !== null){
            for (let i=0;i<kopuruak.length;i++){
                if(kopuruak[i].kopurua == 0){
                    kopuruak.splice(i, 1);
                    i--;
                }
            }
        }
        var kopuruakuwu = JSON.stringify(kopuruak)

        $.ajax({
            url: "/confirmarPedido/",
            type: "POST",
            dataType: "json",
            data: {
                kopuruakuwu: kopuruakuwu,
                csrfmiddlewaretoken: csrftoken,
                },
            success : function(json) {
            },
            error : function(xhr,errmsg,err) {
            }
        });

        localStorage.clear();
        location.href = "/"
    }
});