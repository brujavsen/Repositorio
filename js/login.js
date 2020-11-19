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

//crear un inicio de sesión y redirecciona al index
window.location.href = "./index.html";
    sessionStorage.setItem('logged', true);
    return true
});
 

//mostrar u ocultar contraseña
const togglePass = document.getElementById("togglePass");

togglePass.addEventListener('click', function () {
    // alterna el tipo de atributo
    const type = userPass.getAttribute('type') === 'password' ? 'text' : 'password';
    userPass.setAttribute('type', type);
    // alterna el icono a Eye-slash
    this.classList.toggle('fa-eye-slash');
}); 