const profilePhoto = document.getElementById('photoProfile');
const profileImg = document.getElementById('addImgProfile');
const profileName = document.getElementById('nameProfile');
const profileLastName = document.getElementById('lastNameProfile');
const profileAge = document.getElementById('ageProfile');
const profileEmail = document.getElementById('emailProfile');
const profilePhone = document.getElementById('phoneProfile');
const formChange = document.getElementById('formProfile');
const classForm = document.getElementsByClassName('form-control');
var changeMyInfo = '';
//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {

    formChange.addEventListener('submit', (e) => {
        e.preventDefault();

        let user = Array(
            {
                image: profileImg.value,
                name: profileName.value,
                lastName: profileLastName.value,
                age: profileAge.value,
                email: profileEmail.value,
                phone: profilePhone.value
            }
        );

        changeMyInfo = new Object(localStorage.setItem('myInfoUser', JSON.stringify(user)));
    })

    let nameValidation = JSON.parse(localStorage.getItem('myInfoUser'));

    $(document).on('change', '#addImageProfile',function(){
        if(this.files && this.files[0]){
            var img = $('<img >');
            img.attr('src', URL.createObjectURL(this.files[0]));
          $('#photoProfile').append(img);
        }
    });

    if (profileName.value == "") {
        profileName.value = nameValidation[0].name;
    }
    if (profileLastName.value == "") {
        profileLastName.value = nameValidation[0].lastName;
    }
    if (profileAge.value == "") {
        profileAge.value = nameValidation[0].age;
    }
    if (profileEmail.value == "") {
        profileEmail.value = nameValidation[0].email;
    }
    if (profilePhone.value == "") {
        profilePhone.value = nameValidation[0].phone;
    }
});

