const container_info = document.getElementById('cntCart');
const subtotalCnt = document.getElementById('subtotal');
const CART_URL = "https://japdevdep.github.io/ecommerce-api/cart/654.json";

function showInfoCart(data){

    let htmlContentToAppend = "";

    for(let i=0; i < data.length; i++){
        let info = data[i];

        htmlContentToAppend += 
        `            
            <div class="showCnt container shadow-lg p-3 mb-1 bg-white rounded">
                <div class="row">
                    <div class="col imgPrd">
                        <img src="`+ info.src +`" class="rounded">
                    </div>
                    <div class="col font-weight-bold namePrd">
                        <h2>`+ info.name +`</h2>
                    </div>
                    <div class="col priceCnt">
                        <p>Precio:</p>
                        <h4>$`+ info.unitCost + " " + info.currency +`</h4>
                    </div>
                    <div class="col amountPrd">
                        <label for="cantUser">Cantidad:</label>
                        <input type="number" class="cantUser" id="input${i}" value="1">
                    </div>
                </div>
            </div>
        ` 
    };
    
    container_info.innerHTML = htmlContentToAppend;

    for(let i=0; i < data.length; i++){
        document.getElementById("input"+ i).addEventListener('change', function showSubtotal(){
    
            var suma = 0;
            //Recorro el objeto
            for(let index in data){
                cantidad = document.getElementsByClassName('cantUser')[index].value;
                if(data[index].currency === "USD"){
                    suma += data[index].unitCost * 40 * cantidad ;
                }else if(data[index].currency === "UYU"){
                    suma += data[index].unitCost * cantidad;
                }
            };
            subtotalCnt.innerHTML = "Subtotal: $" + suma + " UYU";
        })
    }
};




//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    
    getJSONData(CART_URL).then(function(resObj) {
        if(resObj.status === "ok"){
            var infoCart = resObj.data;
            showInfoCart(infoCart.articles);

        };
    });
}); 

