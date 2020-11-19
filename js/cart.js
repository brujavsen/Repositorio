const CART_URL = "https://japdevdep.github.io/ecommerce-api/cart/654.json";
const formAction = document.getElementById('formCart');
const container_info = document.getElementById('cntCart');
const subtotalCnt = document.getElementById('subtotal');
const costShipCnt = document.getElementById('costShip');
const totalCnt = document.getElementById('total');
const inputStreet = document.getElementById('inputAddress1');
const inputCorner = document.getElementById('inputAddress2');
const inputNumber = document.getElementById('inputAddress3');
const PremiumInput = document.getElementById('inputPremium');
const ExpressInput = document.getElementById('inputExpress');
const StandardInput = document.getElementById('inputStandard');
const inputCard = document.getElementById('cardInput');
const inputTransfer = document.getElementById('transferInput');
const numberCard = document.getElementById('numCardInput');
const cvvCard = document.getElementById('cvvCardInput');
const expirCard = document.getElementById('cardExpInput');
const numberAccount = document.getElementById('numAccount');
var subtotal = [];
let total = [];
let converUSDaUY = 40;
let percentPremium = 15 / 100;
let percentExpress = 7 / 100;
let percentStandard = 5 / 100;


//Muestra información de carrito
function showInfoCart(data) {

    let htmlContentToAppend = "";

    for (let i = 0; i < data.length; i++) {
        let info = data[i];

        htmlContentToAppend +=
            `            
            <div class="container shadow-lg p-3 mb-1 bg-white rounded justify-content-md-left">
                <div class="row">
                    <div class="col img-cnt">
                        <img src="`+ info.src + `" class="rounded">
                    </div>
                    <div class="col">
                        <h2>`+ info.name + `</h2>
                    </div>
                    <div class="col">
                        <p>Precio:</p>
                        <h4>$`+ info.unitCost + " " + info.currency + `</h4>
                    </div>
                    <div class="col">
                        <label for="cantUser">Cantidad:</label>
                        <input type="number" min="0" class="amountUser" id="input${i}" value="0">
                    </div>
                </div>
            </div>
        `
    };

    container_info.innerHTML = htmlContentToAppend;

    //Muestra subtotal y total, sin haber seleccionado el tipo de envío
    for (let j = 0; j < data.length; j++) {
        document.getElementById("input" + j).addEventListener('change', function showSubtotal() {

            //Recorro el objeto
            for (let index in data) {
                amount = document.getElementsByClassName('amountUser')[index].value;
                if (data[index].currency === "USD") {
                    subtotal += data[index].unitCost * converUSDaUY * amount;
                } else if (data[index].currency === "UYU") {
                    subtotal = data[index].unitCost * amount;
                }
            };
            subtotalCnt.innerHTML = subtotal + " UYU";
            totalCnt.innerHTML = subtotal + " UYU"
        });
    };

};

//Inicio: Muestra total con selección de tipo de envío
PremiumInput.addEventListener('change', () => {

    if (PremiumInput.checked) {
        var per = parseInt(subtotal) * percentPremium;
        costShipCnt.innerHTML = per + " UYU";
    } else if (!PremiumInput.checked) {
        totalCnt.innerHTML = subtotal + " UYU";
    }

    if (PremiumInput.checked || StandardInput.checked) {
        totalCnt.innerHTML = per + subtotal + " UYU";
    } else if (ExpressInput.checked) {
        totalCnt.innerHTML = round + subtotal + " UYU";
    }
});

ExpressInput.addEventListener('change', () => {
    if (ExpressInput.checked) {
        per = parseInt(subtotal) * percentExpress;
        round = Math.round(per);
        costShipCnt.innerHTML = round + " UYU";
    } else if (!ExpressInput.checked) {
        totalCnt.innerHTML = subtotal + " UYU";
    }

    if (PremiumInput.checked || StandardInput.checked) {
        totalCnt.innerHTML = per + subtotal + " UYU";
    } else if (ExpressInput.checked) {
        totalCnt.innerHTML = round + subtotal + " UYU";
    }
});

StandardInput.addEventListener('change', () => {
    if (StandardInput.checked) {
        per = parseInt(subtotal) * percentStandard;
        costShipCnt.innerHTML = per + " UYU";
    } else if (!StandardInput.checked) {
        totalCnt.innerHTML = subtotal + " UYU"
    }

    if (PremiumInput.checked || StandardInput.checked) {
        totalCnt.innerHTML = per + subtotal + " UYU";
    } else if (ExpressInput.checked) {
        totalCnt.innerHTML = round + subtotal + " UYU";
    }
});
//Fin: Muestra total con selección de tipo de envío

//Cambia atributos de modal de formas de pago, interactua con los cambios a selección

//Opción de Tarjeta de crédito
inputCard.addEventListener('change', function () {
    numberAccount.disabled = true;
    numberCard.disabled = false;
    cvvCard.disabled = false;
    expirCard.disabled = false;
});

//Opción de Transferencia bancaria
inputTransfer.addEventListener('change', function () {
    numberAccount.disabled = false;
    numberCard.disabled = true;
    cvvCard.disabled = true;
    expirCard.disabled = true;
});

//Validaciones con expresiones regulares
function validationRegExp(){
    var text = RegExp(/[a-zA-Zá-ü0-9]{2,15}$/)
    var num = RegExp(/^[0-9]{2,5}$/)
    var numCard = RegExp(/^[0-9]{15}$/)
    var numCvv = RegExp(/^[0-9]{3}$/)
    var numExpir = RegExp(/[0-9\-]{5}$/)
    let errorStreet = document.getElementById('errStreet');
    let errorCorner = document.getElementById('errCorner');
    let errorNumber = document.getElementById('errNumber');
    let numberErrCard = document.getElementById('errCardNum');
    let cvvErrCard = document.getElementById('errCvvCard');
    let expirErrCard = document.getElementById('errExpCard');

    //Inicio: formulario datos
    inputStreet.addEventListener('keyup', () => {
        if (!text.test(inputStreet.value) || inputStreet.value > 20) {
            errorStreet.innerHTML = `
                <span style="color:red">Error</span> datos inválidos
                `
        } else {
            errorStreet.innerHTML = ``
        }
    });

    inputCorner.addEventListener('keyup', () => {
        if (!text.test(inputCorner.value) || inputCorner.value > 20) {
            errorCorner.innerHTML = `
                <span style="color:red">Error</span> datos inválidos
                `
        } else {
            errorCorner.innerHTML = ``
        }
    });

    inputNumber.addEventListener('keyup', () => {
        if (!num.test(inputNumber.value)) {
            errorNumber.innerHTML = `
                <span style="color:red">Error</span> datos inválidos
                `
        } else {
            errorNumber.innerHTML = ``
        }
    });
    //Fin: formulario datos

    //Inicio: formulario Modal (solo tarjeta de crédito)
    numberCard.addEventListener('keyup', () => {
        if (!numCard.test(numberCard.value)) {
            numberErrCard.innerHTML = `
                <span style="color:red">Error</span> datos inválidos
                `
        } else {
            numberErrCard.innerHTML = ``
        }
    });

    cvvCard.addEventListener('keyup', () => {
        if (!numCvv.test(cvvCard.value)) {
            cvvErrCard.innerHTML = `
                <span style="color:red">Error</span> datos inválidos
                `
        } else {
            cvvErrCard.innerHTML = ``
        }
    });

    expirCard.addEventListener('keyup', ()=>{
        if(!numExpir.test(expirCard.value)){
            expirErrCard.innerHTML = `
            <span style="color:red">Error</span> datos inválidos
            `
        }else {
            expirErrCard.innerHTML = ``
        }
    });
    //Fin: formulario Modal

};

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener('DOMContentLoaded', () => {

    getJSONData(CART_URL).then(function (resObj) {
        if (resObj.status === "ok") {
            var infoCart = resObj.data;
            showInfoCart(infoCart.articles);
        };
    });
    
    validationRegExp();

    formAction.addEventListener('submit', (e) => {

        let existErr = false;

        //Validación de campos vacíos (datos)
        if (inputStreet.value === "" || inputCorner.value === "" || inputNumber.value === "") {
            document.getElementById('alertFields').innerHTML = `
                <div class="alert alert-danger alert-dismissible fade show" role="alert">
                    <strong>Por favor.</strong> Rellene todos los campos para continuar.
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                `
            existErr = true;
        }

        //Validación de tipo de envío
        if (!document.querySelector('input[name="optionType"]:checked')) {
            document.getElementById('errShippType').innerHTML = `
                    
                    <div class="alert alert-primary alert-dismissible fade show" role="alert">
                        <strong>Por favor.</strong> Seleccione un tipo de envío para continuar.
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    `
            existErr = true;
        }

        //Validación de formas de pago
        if (!document.querySelector('input[name="modalOption"]:checked')) {
            document.getElementById('alertPay').innerHTML = `
                    
                    <div class="alert alert-warning alert-dismissible fade show" role="alert">
                        <strong>Por favor.</strong> Seleccione y rellene los campos de forma de pago para continuar.
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    `
            existErr = true;
        }


        if (existErr) {
            e.preventDefault();
        }
    });
});



