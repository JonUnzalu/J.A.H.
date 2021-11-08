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

function onTabClosing() {
    
    //sessionStorage.clear();
}

$(document).ready(function() {
    $("#logout1,#logout2").click(function() {
        var kopuruakuwu = sessionStorage.getItem("estadoKarrito");

        $.ajax({
            url: "/Logout/",
            type: "POST",
            dataType: "json",
            data: {
                kopuruakuwu: kopuruakuwu,
                csrfmiddlewaretoken: '{{ csrf_token }}'
                },
            success : function(json) {
                
            },
            error : function(xhr,errmsg,err) {
                alert("Could not send URL to Django. Error: " + xhr.status + ": " + xhr.responseText);
            }
        });
    });
});