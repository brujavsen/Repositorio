const profilePhoto = document.getElementById('photoProfile');
const profileImg = document.getElementById('addImgProfile');
const profileName = document.getElementById('nameProfile');
const profileLastName = document.getElementById('lastNameProfile');
const profileAge = document.getElementById('ageProfile');
const profileEmail = document.getElementById('emailProfile');
const profilePhone = document.getElementById('phoneProfile');
const formChange = document.getElementById('formProfile');
const classForm = document.getElementsByClassName('form-control');
const btnChangeInfo = document.getElementById('changeInfo');
const tableName = document.getElementById('showName');
const tableLastName = document.getElementById('showLastName');
const tableAge = document.getElementById('showAge');
const tableEmail = document.getElementById('showEmail');
const tablePhone = document.getElementById('showPhone');
const emailErr = document.getElementById('errorEmail');
const numberErr = document.getElementById('errorNumber');
var changeMyInfo = {};
var formInfoUser = {};
var users = '';

//muestra formulario
btnChangeInfo.addEventListener('click', () => {
    formChange.classList.remove('hideForm');
});

function formDataUser(){

    if (profileName.value == '' || profileLastName.value == '' || profileAge.value == '' || profileEmail.value == '' || profilePhone.value == '') {
        document.getElementById('errForm').innerHTML = `
            <div class="alert alert-danger alert-dismissible fade show" role="alert">
                <strong>Por favor.</strong> Rellene todos los campos para continuar.
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
        `
        return false;
    }else{
        changeMyInfo = new Object(localStorage.setItem('myInfoUser', JSON.stringify(user)));
        formInfoUser = JSON.parse(localStorage.getItem('myInfoUser'));
        formChange.classList.add('hideForm');
        tableName.innerHTML = formInfoUser[0].name;
        tableLastName.innerHTML = formInfoUser[0].lastName;
        tableAge.innerHTML = formInfoUser[0].age;
        tableEmail.innerHTML = formInfoUser[0].email;
        tablePhone.innerHTML = formInfoUser[0].phone;

    }
}


//modifica los datos del usuario
formChange.addEventListener('submit', (e) => {
    e.preventDefault();

    let user = Array(
        {
            name: profileName.value,
            lastName: profileLastName.value,
            age: profileAge.value,
            email: profileEmail.value,
            phone: profilePhone.value
        }
    );
    formDataUser();
});

function validationForm() {
    // var email = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3,4})+$/
    var num = RegExp(/^\d{9}$/)

    // profileEmail.addEventListener('keyup', ()=>{
    //     if(!email.test(profileEmail.value)){
    //         emailErr.innerHTML = `
    //         <span style="color:red">Error</span> correo inválido
    //         `
    //     }else {
    //         emailErr.innerHTML = ``
    //     }
    // });

    profilePhone.addEventListener('keyup', () => {
        if (!num.test(profilePhone.value)) {
            numberErr.innerHTML = `
            <span style="color:red">Error</span> número inválido
            `
            return false;
        } else {
            numberErr.innerHTML = ``
            return true;
        }
    });
};
//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    validationForm();

    users = JSON.parse(localStorage.getItem('myInfoUser'))
    if (users) {
        tableName.innerHTML = users[0].name;
        tableLastName.innerHTML = users[0].lastName;
        tableAge.innerHTML = users[0].age;
        tableEmail.innerHTML = users[0].email;
        tablePhone.innerHTML = users[0].phone;
    }

});

