function showProductList(array){

    let htmlContentToAppend = "";

    for(let i = 0; i < array.length; i++){
        let category = array[i];
 
        htmlContentToAppend += `
        
        <a href="./product-info.html?nameProduct=`+ category.name +`">
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
        </a>
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

    
    // Input buscar por nombre del producto
    const search_bar = document.getElementById("search");
    const boton_srch = document.getElementById("search-btn");
    const result = document.getElementById("categoria");

    let filtrado = ()=>{
        
        result.innerHTML = '';

        var texto = search_bar.value.toLowerCase();

        for(let productoArr of productsArray){
            let nombre = productoArr.name.toLowerCase();
            if(nombre.indexOf(texto) !== -1){
                result.innerHTML += `<div id="categoria"><div class="list-group-item list-group-item-action">
                <div class="row">
                    <div class="col-3">
                        <img src="` + productoArr.imgSrc + `" alt="` + productoArr.description + `" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h3 class="mb-1">`+ productoArr.name +`</h4>
                        </div>
                        <div class="d-flex w-100 justify-content-between">
                            <small class="text-muted">` + productoArr.description +`</small>
                        </div>
                        <div class="d-flex w-100 justify-content-between">
                            <small class="text-muted">`+ productoArr.soldCount +` articulos</small>
                        </div>
                        <div class="d-flex w-100 justify-content-between">
                            <small class="text-muted">`+ productoArr.cost + " " + productoArr.currency +` </small>
                        </div> 
                    </div>
                </div>
            </div></div>`;
            }
        }

        if(result.innerHTML === ''){
            result.innerHTML += `<p>No se encontró el producto</p>`
        }
    }

    boton_srch.addEventListener('click', filtrado)
    search_bar.addEventListener('keyup', filtrado)

    
    //Input filtrar por cantidad
    document.getElementById("filtrar-cant").addEventListener("click", ()=>{
        productsArray.sort((a,b) =>{
        if(a.soldCount < b.soldCount) return -1;
        else if(a.soldCount > b.soldCount) return 1;
        return 0;
        });
    showProductList(productsArray);
    });

    //Input filtrar por mayor precio (orden ascendente)
    document.getElementById("orderAscen").addEventListener("click", ()=>{
        productsArray.sort((a, b) => {
            if (a.cost < b.cost) return 1;
            else if (a.cost > b.cost) return -1;
            return 0;
        });
    showProductList(productsArray);
    });

    //Input filtrar por menor precio (orden descendente)
    document.getElementById("orderDesce").addEventListener("click", ()=>{
        productsArray.sort((a, b) => {
          if (a.cost < b.cost) return -1;
          else if (a.cost > b.cost) return 1;
          return 0;
        });
    showProductList(productsArray);
    });

    //Input filtrar por relevancia
    document.getElementById("orderRel").addEventListener("click", ()=>{
        productsArray.sort((a,b) =>{
        if(a.soldCount < b.soldCount) return 1;
        else if(a.soldCount > b.soldCount) return -1;
        return 0;
        });
    showProductList(productsArray);
    });

    showProductList(productsArray);
};
});
});
