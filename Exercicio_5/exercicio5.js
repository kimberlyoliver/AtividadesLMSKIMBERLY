var acc = document.getElementsByClassName("acordeao");
var i;

for (i = 0; i < acc.length; i++) {
    acc[i].onclick = function(){
        this.classList.toggle("active");
        var cont = this.nextElementSibling;
        if (cont.style.display === "block") {
            cont.style.display = "none";
        } else {
            cont.style.display = "block";
        }
    }
}

let button = document.querySelector('.menu');
let navlateral = document.querySelector(".lateral");



function mostrar() {
    navlateral.classList.toggle("active");
}

button.addEventListener("click", mostrar);