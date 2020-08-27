//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
});

const form = document.getElementById('signin')
const userName = document.getElementById("inputUser");
const userEmail = document.getElementById("inputEmail");
const userPass = document.getElementById("inputPass");


form.addEventListener('submit', function(event) {
    event.preventDefault();

let user = Array(
    {
        usuario: userName.value,
        correo: userEmail.value,
        clave: userPass.value
    } 
);

localStorage.setItem('users', JSON.stringify(user));

window.location.href = "./index.html";
    sessionStorage.setItem('logged', true);
    return true
});