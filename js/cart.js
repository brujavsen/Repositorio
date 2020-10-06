const container_info = document.getElementById('cntCart');
const subtotalCnt = document.getElementById('subtotal');
const CART_URL = "https://japdevdep.github.io/ecommerce-api/cart/654.json";

function showInfoCart(data){

    let htmlContentToAppend = "";

    for(let i=0; i < data.length; i++){
        let info = data[i];

        htmlContentToAppend += 
        `            
            <div class="showCnt">
                <div class="imgPrd">
                    <img src="`+ info.src +`" class="rounded">
                </div>
                <div class="namePrd">
                    <h2>`+ info.name +`</h2>
                </div>
                <div class="priceCnt">
                    <p>Precio:</p>
                    <h4>$`+ info.unitCost + " " + info.currency +`</h4>
                </div>
                <div class="amountPrd">
                    <div class="dropCnt">
                        <button class="btn btn-warning" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                           Cantidad:  `+ info.count +`
                        </button>
                    </div>
                </div>
            </div>
        ` 
    };
    
    container_info.innerHTML = htmlContentToAppend;
};


function showSubtotal(data){
    
    var suma = 0;

    //Recorro el objeto
    for(let index in data){
        suma += data[index].unitCost * data[index].count; //Multiplico sus propiedades
    };
    
    subtotalCnt.innerHTML = "Subtotal: " + suma;

};


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    
    getJSONData(CART_URL).then(function(resObj) {
        if(resObj.status === "ok"){
            var infoCart = resObj.data;
            showInfoCart(infoCart.articles);
            showSubtotal(infoCart.articles)
        };
    });
}); 

