const CATEGORIES_URL = "https://japdevdep.github.io/ecommerce-api/category/all.json";
const PUBLISH_PRODUCT_URL = "https://japdevdep.github.io/ecommerce-api/product/publish.json";
const CATEGORY_INFO_URL = "https://japdevdep.github.io/ecommerce-api/category/1234.json";
const PRODUCTS_URL = "https://japdevdep.github.io/ecommerce-api/product/all.json";
const PRODUCT_INFO_URL = "https://japdevdep.github.io/ecommerce-api/product/5678.json";
const PRODUCT_INFO_COMMENTS_URL = "https://japdevdep.github.io/ecommerce-api/product/5678-comments.json";
const CART_INFO_URL = "https://japdevdep.github.io/ecommerce-api/cart/987.json";
const CART_BUY_URL = "https://japdevdep.github.io/ecommerce-api/cart/buy.json";

var showSpinner = function(){ 
  document.getElementById("spinner-wrapper").style.display = "block";
}

var hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}  

var getJSONData = function(url){
    var result = {};

    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText); 
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error; 
        
        return result;
    });
}


//Register y login

  if (!window.location.href.endsWith('login.html')
    && !sessionStorage.getItem('logged')) {
      window.location.href = "login.html";
  }
  
  //Cerrar sesión
  const signUpSession = document.getElementById("cerrarSesion")

  signUpSession.addEventListener('click', () =>{
     sessionStorage.removeItem('logged', true);
     window.location.href = "./login.html";
  });
  //Cerrar sesión


  const headDiv = document.getElementById('userProfile');

  let nameUser = JSON.parse(localStorage.getItem('users'));


  if(nameUser != null){
    headDiv.innerHTML = nameUser[0].usuario;
  }

  let myProfileInfo = JSON.parse(localStorage.getItem('myInfoUser'));

  


//Reloj en pantalla
  function clockOnTime(){
    var today = new Date();
    var hr = today.getHours();
    var min = today.getMinutes();
    var sec = today.getSeconds();
    ap = ( hr < 12) ? "<span>AM</span>" : "<span>PM</span>";
    hr = ( hr == 0) ? 12 : hr;
    hr = ( hr > 12) ? hr - 12 : hr;
    hr = checkTime(hr);
    min = checkTime(min);
    sec = checkTime(sec);
    document.getElementById('clock').innerHTML = hr + ":" + min + ":" + sec + " " + ap;
    var time = setTimeout(()=>{clockOnTime()}, 500);
    setInterval(() => {
      clockOnTime
    }, 1000);
  }

  function checkTime(i) {
    if (i < 10){
      i = "0" + i;
    }
    return i;
  }
//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
  
});