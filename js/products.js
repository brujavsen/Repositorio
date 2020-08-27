function showProductList(array){

    let htmlContentToAppend = "";

    for(let i = 0; i < array.length; i++){
        let category = array[i];
 
        htmlContentToAppend += `
        <div class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                    <img src="` + category.imgSrc + `" alt="` + category.description + `" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <h3 class="mb-1">`+ category.name +`</h4>
                    </div>
                    <div class="d-flex w-100 justify-content-between">
                        <small class="text-muted">` + category.description +`</small>
                    </div>
                    <div class="d-flex w-100 justify-content-between">
                        <small class="text-muted">`+ category.soldCount +` articulos</small>
                    </div>
                    <div class="d-flex w-100 justify-content-between">
                        <small class="text-muted">`+ category.cost + " " + category.currency +` </small>
                    </div> 
                </div>
            </div>
        </div>
        `
    }  
    document.getElementById("categoria").innerHTML = htmlContentToAppend;
} 


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCTS_URL).then(function(resultObj){
    if (resultObj.status === "ok"){
    var productsArray = resultObj.data;


    //Input cantidad
    document.getElementById("filtrar-cant").addEventListener("click", ()=>{
        productsArray.sort((a,b) =>{
        if(a.soldCount < b.soldCount) return -1;
        else if(a.soldCount > b.soldCount) return 1;
        return 0;
        });
    showProductList(productsArray);
    });

    //Input mayor precio (orden ascendente)
    document.getElementById("orderAscen").addEventListener("click", ()=>{
        productsArray.sort((a, b) => {
            if (a.cost < b.cost) return 1;
            else if (a.cost > b.cost) return -1;
            return 0;
        });
    showProductList(productsArray);
    });

    //Input menor precio (orden descendente)
    document.getElementById("orderDesce").addEventListener("click", ()=>{
        productsArray.sort((a, b) => {
          if (a.cost < b.cost) return -1;
          else if (a.cost > b.cost) return 1;
          return 0;
        });
    showProductList(productsArray);
    });

    //Input relevancia
    document.getElementById("orderRel").addEventListener("click", ()=>{
        productsArray.sort((a,b) =>{
        if(a.soldCount < b.soldCount) return 1;
        else if(a.soldCount > b.soldCount) return -1;
        return 0;
        });
    showProductList(productsArray);
    });

    //Muestra los productos en el orden original de JSON
    showProductList(productsArray);
};
});
});
