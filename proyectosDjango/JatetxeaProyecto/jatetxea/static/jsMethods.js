
$(document).ready(function() {
    $("#logout1,#logout2").click(function() {
        location.href="/"
        logOut();
    });

    var janariakCarrito = new Array()

    var cantidadSaskiItems = document.querySelectorAll('.sesioSaskiItems').length
    if(cantidadSaskiItems>0){
        
        var cantidadComidas = document.querySelectorAll('.kopuruak').length;
        if(cantidadComidas>0){
            
            $(".kopuruak").each(function() {
                var itemInfo = $(this).html();  
                var idJanaria = parseInt(itemInfo.split("|")[0]);
                var izena = itemInfo.split("|")[1];
                var prezio = itemInfo.split("|")[2] + "€";             
            
                const kopuruxJanari = {
                    kopurua: 0,
                    kopuruMax: 20,
                    prezioa: prezio,
                    idJanari: idJanaria,
                    desJanari: izena
                }
                janariakCarrito.push(kopuruxJanari)
            });

            $(".sesioSaskiItems").each(function() {
                var itemInfo = $(this).html();  
                var idJanari = parseInt(itemInfo.split("|")[0]);
                var kopuru = parseInt(itemInfo.split("|")[1]);             
            
                janariakCarrito[idJanari-1].kopurua = kopuru
            });
           
            localStorage.setItem("estadoKarrito", JSON.stringify(janariakCarrito));  
        }     
    }

    function logOut(){
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

        localStorage.clear();
        location.href="/"

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
}); 