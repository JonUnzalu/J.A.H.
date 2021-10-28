var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1; 
var yyyy = today.getFullYear();
today = yyyy+'-'+mm+'-'+dd;
document.getElementById("egutegia").setAttribute("min", today);