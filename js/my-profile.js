const profileName = document.getElementById('nameProfile');
const profileLastName = document.getElementById('lastNameProfile');
const profileAge = document.getElementById('ageProfile');
const profileEmail = document.getElementById('emailProfile');
const profilePhone = document.getElementById('phoneProfile');
const formChange = document.getElementById('formProfile');
const btnChangeInfo = document.getElementById('changeInfo');
const tableName = document.getElementById('showName');
const tableLastName = document.getElementById('showLastName');
const tableAge = document.getElementById('showAge');
const tableEmail = document.getElementById('showEmail');
const tablePhone = document.getElementById('showPhone');
const numberErr = document.getElementById('errorNumber');
var changeMyInfo = {};

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
    changeMyInfo = new Object(localStorage.setItem('myInfoUser', JSON.stringify(user)));
    const tableInfo = JSON.parse(localStorage.getItem('myInfoUser'))
    if (tableInfo) {
        tableName.innerHTML = tableInfo[0].name;
        tableLastName.innerHTML = tableInfo[0].lastName;
        tableAge.innerHTML = tableInfo[0].age;
        tableEmail.innerHTML = tableInfo[0].email;
        tablePhone.innerHTML = tableInfo[0].phone;
    }

    formDataUser();
});

function validationForm() {
    var num = RegExp(/^\d{9}$/)

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

    tableInfo = JSON.parse(localStorage.getItem('myInfoUser'))
    if (tableInfo) {
        tableName.innerHTML = tableInfo[0].name;
        tableLastName.innerHTML = tableInfo[0].lastName;
        tableAge.innerHTML = tableInfo[0].age;
        tableEmail.innerHTML = tableInfo[0].email;
        tablePhone.innerHTML = tableInfo[0].phone;
    }

});