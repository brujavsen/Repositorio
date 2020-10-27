const CART_URL = "https://japdevdep.github.io/ecommerce-api/cart/654.json";
const formAction = document.getElementById('formCart');
const btnSubForm = document.getElementById('btnPay')
const container_info = document.getElementById('cntCart');
const subtotalCnt = document.getElementById('subtotal');
const costShipCnt = document.getElementById('costShip');
const totalCnt = document.getElementById('total');
const inputStreet = document.getElementById('inputAddress1');
const inputCorner = document.getElementById('inputAddress2');
const inputNumber = document.getElementById('inputAddress3');
const formType = document.getElementById('formShippType');
const PremiumInput = document.getElementById('inputPremium');
const ExpressInput = document.getElementById('inputExpress');
const StandardInput = document.getElementById('inputStandard');
const inputCard = document.getElementById('cardInput');
const inputTransfer = document.getElementById('transferInput');
const optionCardCnt = document.getElementById('optionCard');
const optionTransferCnt = document.getElementById('optionTransfer');
const modalData = document.getElementById('saveDataModal');
const numberCard = document.getElementById('numCardInput');
const cvvCard = document.getElementById('cvvCardInput');
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
            <div class="showCnt container shadow-lg p-3 mb-1 bg-white rounded">
                <div class="row">
                    <div class="col imgPrd">
                        <img src="`+ info.src + `" class="rounded">
                    </div>
                    <div class="col font-weight-bold namePrd">
                        <h2>`+ info.name + `</h2>
                    </div>
                    <div class="col priceCnt">
                        <p>Precio:</p>
                        <h4>$`+ info.unitCost + " " + info.currency + `</h4>
                    </div>
                    <div class="col amountPrd">
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

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function () {

    getJSONData(CART_URL).then(function (resObj) {
        if (resObj.status === "ok") {
            var infoCart = resObj.data;
            showInfoCart(infoCart.articles);
        };
    });

});

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


//Validación para compra
document.addEventListener('DOMContentLoaded', () => {

    function validateFields() {

        var text = RegExp(/[a-zA-Z0-9]{5,15}$/)
        var num = RegExp(/^[0-9]{5}$/)
        let street = inputStreet;
        let corner = inputCorner;
        let number = inputNumber;
        let errorStreet = document.getElementById('errStreet');
        let errorCorner = document.getElementById('errCorner');
        let errorNumber = document.getElementById('errNumber');
        

        btnSubForm.addEventListener('click', ()=>{
            if (street.value === "" || corner.value === "" || number === "") {
                document.getElementById('alertFields').innerHTML = `
                <div class="alert alert-danger alert-dismissible fade show" role="alert">
                    <strong>Por favor.</strong> Rellene todos los campos para continuar.
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                `
            }
        });

        street.addEventListener('keyup', () => {
            if (!text.test(street.value) || street.length > 20) {
                errorStreet.innerHTML = `
                <span style="color:red">Error</span> datos inválidos
                `
                return false;
            } else {
                errorStreet.innerHTML = ``
            }
        });

        corner.addEventListener('keyup', () => {
            if (!text.test(corner.value) || corner.length > 20) {
                errorCorner.innerHTML = `
                <span style="color:red">Error</span> datos inválidos
                `
                return false;
            } else {
                errorCorner.innerHTML = ``
            }
        });

        number.addEventListener('keyup', () => {
            if (!num.test(number.value)) {
                errorNumber.innerHTML = `
                <span style="color:red">Error</span> datos inválidos
                `
                return false;
            } else {
                errorNumber.innerHTML = ``
            }
        });
        let numCard = RegExp(/^[0-9]{16}$/)
        let numCvv = RegExp(/^[0-9]{3}$/)

        btnSubForm.addEventListener('click', ()=>{
            if (numberCard.value === "" || cvvCard.value === "" || numberAccount.value === "") {
                document.getElementById('alertPay').innerHTML = `
                
                <div class="alert alert-warning alert-dismissible fade show" role="alert">
                    <strong>Por favor.</strong> Seleccione y rellene los campos de forma de pago para continuar.
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                `
                console.log("error")
            }
        });

        let errorCardNum = document.getElementById('errCardNum');
        numberCard.addEventListener('keyup', ()=>{
            if(!numCard.test(numberCard.value)){
                errorCardNum.innerHTML = `
                <span style="color:red">Error</span> datos inválidos
                `
            }else{
                errorCardNum.innerHTML = ``
            }
        })
        let errorCvv = document.getElementById('errCvvCard');
        cvvCard.addEventListener('keyup', ()=>{
            if(!numCvv.test(cvvCard.value)){
                errorCvv.innerHTML = `
                <span style="color:red">Error</span> datos inválidos
                `
            }else{
                errorCvv.innerHTML = ``
            }
        })
    }
    
    validateFields();
});

document.getElementById('formCart').addEventListener('submit', ()=>{});
