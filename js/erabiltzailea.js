function erabiltzailea() {
    var erabil1={
        izena: "Manu",
        pasahitza: "123",     
        }
        const erabiltzaileak= new Array(erabil1);
        prompt("Sartu erabiltzaile izena:")
        prompt("Sartu pasahitza:")
        for (let i= 0; i <= erabiltzaileak.length; i++) {
            if(erabiltzaileak[i].izena && erabiltzaileak[i].pasahitza){
                alert("Erabiltzailea zera.") 
            }
            else{
                alert("Ez zera erabiltzailea.")
            }
            
            
        }


}