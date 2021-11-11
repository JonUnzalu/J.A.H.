var loginState=false;
function changeLoginState(logState){
    loginState = logState;
    sessionStorage.setItem("logState", logState);
}


if (sessionStorage.getItem("logState") !== null && sessionStorage.getItem("logState") == "true") {
    loginState = "Logout";
    document.querySelectorAll(".kopuruak").forEach(a=>a.style.display = "initial");
} else {
    loginState = "Login";
    sessionStorage.setItem("logState", "false");
    document.querySelectorAll(".kopuruak").forEach(a=>a.style.display = "none");
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

$(document).ready(function() {
    $("#logout1,#logout2").click(function() {
        var csrftoken = getCookie('csrftoken')
        kopuruak = [];
        kopuruak = JSON.parse(sessionStorage.getItem("estadoKarrito"));

        if (kopuruak !== null){
            for (let i=0;i<kopuruak.length;i++){
                if(kopuruak[i].kopurua == 0){
                    kopuruak.splice(i);
                }
            }
        }

        var kopuruakuwu = JSON.stringify(kopuruak)

        $.ajax({
            url: "/logout/",
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
        sessionStorage.clear();
    });


    kopuruak = [];
    $(".sesioSaskiItems").each(function(){
        var idYKopuru = $(this).innerHTML();
        var idJanari = idYKopuru.split("|")[0]
        var kopuru = idYKopuru.split("|")[1]
        
        sessionStorage.getItem("estadoKarrito");
    });
}); 